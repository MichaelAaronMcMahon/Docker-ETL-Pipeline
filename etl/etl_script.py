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

source_engine = create_engine(url="postgresql://{0}:{1}@{2}/{3}".format(
    source_config['user'], source_config['password'], source_config['host'], source_config['dbname']
))

destination_engine = create_engine(url="postgresql://{0}:{1}@{2}/{3}".format(
    destination_config['user'], destination_config['password'], destination_config['host'], destination_config['dbname']
))

df = pd.read_sql_query('select * from users', source_engine)
df["first_name"] = df["first_name"].apply(lambda x: re.sub("\s.*", "", x))
df["last_name"] = df["last_name"].apply(lambda x: re.sub("\s.*", "", x))

def matcher(email):
    if (re.search("orangehome.", email)) == None and (re.search("planetall.", email)) == None and (re.search("poboxes.", email)) == None:
        return email
    else:
        return "Match"

df["email"] = df["email"].apply(lambda x: matcher(x))
df = df[df["email"] != "Match"]

df.to_sql("Users", destination_engine)

with destination_engine.connect() as connection:
    connection.execute(text("ALTER TABLE \"Users\" ADD PRIMARY KEY (id);"))
    connection.commit()

print("Ending ETL script...")