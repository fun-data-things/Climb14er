import os
import sys
import sqlalchemy

basedir = os.path.abspath(os.path.dirname(__file__))

def db_connection_string():
    """Returns db connection URI"""

    if "DEV_DB_URI" in os.environ:
        return os.environ["DEV_DB_URI"]

    else:
        db_user = os.environ["DB_USER"]
        db_pass = os.environ["DB_PASS"]
        db_name = os.environ["DB_NAME"]
        unix_socket_path = os.environ["INSTANCE_UNIX_SOCKET"]

        db_url = sqlalchemy.engine.url.URL.create(
                drivername="postgresql+pg8000",
                username=db_user,
                password=db_pass,
                database=db_name,
                query={"unix_sock": f"{unix_socket_path}/.s.PGSQL.5432"},
            )
        return db_url

class Config:
#     # SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = db_connection_string()
    SQLALCHEMY_TRACK_MODIFICATIONS = False