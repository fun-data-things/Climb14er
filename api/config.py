import os
from google.cloud.sql.connector import Connector, IPTypes
import sqlalchemy
import sys
# from dotenv import load_dotenv

# load_dotenv()

basedir = os.path.abspath(os.path.dirname(__file__))

# Python Connector database connection function
def getconn():
    db_user = os.environ["DB_USER"]
    db_pass = os.environ["DB_PASS"]
    db_name = os.environ["DB_NAME"]
    instance_connection_name = os.environ["INSTANCE_CONNECTION_NAME"]
    
    with Connector() as connector:
        conn = connector.connect(
            instance_connection_name, # Cloud SQL Instance Connection Name
            "pg8000",
            user=db_user,
            password=db_pass,
            db=db_name,
            ip_type= IPTypes.PUBLIC  # IPTypes.PRIVATE for private IP
        )
        return conn

class Config:
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DB_URI')
    SQLALCHEMY_DATABASE_URI = "postgresql+pg8000://"
    SQLALCHEMY_ENGINE_OPTIONS = {"creator": getconn}
    SQLALCHEMY_TRACK_MODIFICATIONS = False