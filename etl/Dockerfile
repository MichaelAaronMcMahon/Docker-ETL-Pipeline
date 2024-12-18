FROM python:3.8-slim

RUN apt-get update && apt-get install -y postgresql-client-15 && pip install pandas && pip install sqlalchemy && pip install psycopg2-binary

COPY etl_script.py .

CMD ["python", "etl_script.py"]