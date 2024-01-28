from flask import Flask
import json
import logging
import os

from config import Config
from app.database import db
from app.models.explore import Trail
from app.models.plan import Plan

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

app=Flask(__name__,static_folder='static')
app.config.from_object(Config)
app.app_context().push()

db.init_app(app)
db.create_all()

# For Development Only - insert dummy data from JSON into Sqlite DB
dev_data_path = os.path.join(APP_ROOT, 'static', 'trails.json')
with open(dev_data_path) as json_file:
    trails_dev_data = json.load(json_file)

for trail in trails_dev_data:
    try:
        record = Trail(
            id = trail['id'],
            name = trail['name'], 
            difficulty_rating = trail['difficulty_rating'],
            miles = trail['miles'],
            elevation_gain = trail['elevation_gain'],
            description = trail['description'],
            latitude = trail['latitude'],
            longitude = trail['longitude']
        )
        db.session.add(record)
        db.session.commit()
    except:
        logging.warning(f"Log: trail {trail['name']} already exists")
        continue
# End of Development Code

from app import routes