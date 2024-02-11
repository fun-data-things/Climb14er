from flask import Flask
import logging
import os
import sys

from config import Config
from app.database import db
from app.models.explore import Trail
from app.models.plan import Plan
from app.utils import csv_to_dict

APP_ROOT = os.path.dirname(os.path.abspath(__file__))

app=Flask(__name__,static_folder='static')
app.config.from_object(Config)
app.app_context().push()

db.init_app(app)
db.create_all()

# For Development Only - insert dummy data from JSON into Sqlite DB
csv_file_path = os.path.join(APP_ROOT, 'static', 'colorado_14ers_data.csv')

trail_data = csv_to_dict(csv_file_path)

for trail in trail_data:
    try:
        record = Trail(
            id = int(trail['id']),
            name = trail['peak'],
            route = trail['route'], 
            range = trail['range'],
            difficulty_class = int(trail['class']),
            mileage = float(trail['mileage']),
            elevation_gain = int(trail['elevation_gain']),
            trailhead = trail['trailhead'],
            google_maps = trail['google_maps'],
            distance_to_denver = int(trail['distance_to_denver']),
            kind_of_trip = trail['kind_of_trip'],
            trip_description = trail['trip_description'],
            next_summit_route = trail['next_summit_route'],
            latitude = float(trail['latitude']),
            longitude = float(trail['longitude']),
            notes = trail['notes']
        )
        db.session.add(record)
        db.session.commit()
    except Exception as e:
        # logging.warning(f"Log: trail {trail['peak']} already exists")
        logging.error(e)
        continue
# End of Development Code

from app import routes