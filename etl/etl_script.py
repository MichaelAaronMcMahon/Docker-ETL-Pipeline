import subprocess
import time
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import text
import re

def wait_for_postgres(host, max_retries=5, delay_seconds=5):
    retries = 0
    while retries < max_retries:
        try:
            result = subprocess.run(
                ["pg_isready", "-h", host], check=True, capture_output=True, text=True)
            if "accepting connections" in result.stdout:
                print("Successfully connected to PostgreSQL!")
                return True
        except subprocess.CalledProcessError as e:
            print(f"Error connecting to PostgreSQL: {e}")
            retries += 1
            print(
                f"Retrying in {delay_seconds} seconds... (Attempt {retries}/{max_retries})")
            time.sleep(delay_seconds)
    print("Max retries reached. Exiting.")
    return False

#Connect to the source database
if not wait_for_postgres(host="source_postgres"):
    exit(1)

print("Starting ETL script...")

source_config = {
    'dbname': 'source_db',
    'user': 'postgres',
    'password': 'McMahon',
    'host': 'source_postgres',
    'port': '5433:5432'
}

destination_config = {
    'dbname': 'destination_db',
    'user': 'postgres',
    'password': 'McMahon',
    'host': 'destination_postgres',
    'port': '5434:5432'
}

#Create engines for the source and destination databases:
source_engine = create_engine(url="postgresql://{0}:{1}@{2}/{3}".format(
    source_config['user'], source_config['password'], source_config['host'], source_config['dbname']
))
destination_engine = create_engine(url="postgresql://{0}:{1}@{2}/{3}".format(
    destination_config['user'], destination_config['password'], destination_config['host'], destination_config['dbname']
))

#Read the Users and Authors tables from the source database into dataframes:
dfUsers = pd.read_sql_query('select * from users', source_engine)
dfAuthors = pd.read_sql_query('select * from authors', source_engine)

#Remove additional text after whitespaces in the name fields, such as middle initials and last name suffixes:
dfUsers["first_name"] = dfUsers["first_name"].apply(lambda x: re.sub("\s.*", "", x))
dfUsers["last_name"] = dfUsers["last_name"].apply(lambda x: re.sub("\s.*", "", x))

#Remove users who have email domains which are no longer in service:
def matcher(email):
    if (re.search("orangehome.", email)) == None and (re.search("planetall.", email)) == None and (re.search("poboxes.", email)) == None:
        return email
    else:
        return "Match"

dfUsers["email"] = dfUsers["email"].apply(lambda x: matcher(x))
dfUsers = dfUsers[dfUsers["email"] != "Match"]

#We have redundant data in the country_of_origin column because it is functionally determined by city_of_origin, which is not a superkey.
#Normalize the Authors table by splitting it into two tables in BCNF:
dfAuthorsR1 = dfAuthors[["first_name", "last_name", "date_of_birth", "city_of_origin"]]
dfAuthorsR2 = dfAuthors[["city_of_origin", "country_of_origin"]]

#Drop duplicate rows from the city, country table
dfAuthorsR2 = dfAuthorsR2.drop_duplicates()

#Load the transformed data into the destination database:
dfUsers.to_sql("Users", destination_engine)
dfAuthorsR1.to_sql("Authors", destination_engine)
dfAuthorsR2.to_sql("Locations", destination_engine)

#Set the primary key constraints for the tables in the destination database
with destination_engine.connect() as connection:
    connection.execute(text("ALTER TABLE \"Users\" ADD PRIMARY KEY (id);"))
    connection.execute(text("ALTER TABLE \"Authors\" ADD PRIMARY KEY (first_name, last_name);"))
    connection.execute(text("ALTER TABLE \"Locations\" ADD PRIMARY KEY (city_of_origin);"))
    connection.commit()

print("Ending ETL script...")