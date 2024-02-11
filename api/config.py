import os
# from google.cloud.sql.connector import Connector, IPTypes
import sqlalchemy
import sys

basedir = os.path.abspath(os.path.dirname(__file__))

# Python Connector database connection function
# def getconn():
#     db_user = os.environ["DB_USER"]
#     db_pass = os.environ["DB_PASS"]
#     db_name = os.environ["DB_NAME"]
#     instance_connection_name = os.environ["INSTANCE_CONNECTION_NAME"]
    
#     with Connector() as connector:
#         conn = connector.connect(
#             instance_connection_name, # Cloud SQL Instance Connection Name
#             "pg8000",
#             user=db_user,
#             password=db_pass,
#             db=db_name,
#             ip_type= IPTypes.PUBLIC  # IPTypes.PRIVATE for private IP
#         )
#         return conn

# Test
# def db_connection_string():
#     """Returns db connection URI"""

#     if "DEV_DB_URI" in os.environ:
#         return os.environ["DEV_DB_URI"]

#     else:
#         db_user = os.environ["DB_USER"]
#         db_pass = os.environ["DB_PASS"]
#         db_name = os.environ["DB_NAME"]
#         db_port = os.environ["DB_PORT"]
#         unix_socket_path = os.environ["INSTANCE_UNIX_SOCKET"]

#         db_url = sqlalchemy.engine.url.URL.create(
#                 drivername="postgresql+pg8000",
#                 username=db_user,
#                 password=db_pass,
#                 database=db_name,
#                 query={"unix_sock": f"{unix_socket_path}/.s.PGSQL.{db_port}"},
#             )
#         print(db_url, file=sys.stderr)
#         return db_url

class Config:
    # SQLALCHEMY_DATABASE_URI = "postgresql+pg8000://"
    # SQLALCHEMY_ENGINE_OPTIONS = {"creator": getconn}
    # SQLALCHEMY_DATABASE_URI = db_connection_string()
    SQLALCHEMY_TRACK_MODIFICATIONS = False