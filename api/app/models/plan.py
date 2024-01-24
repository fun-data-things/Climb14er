from datetime import datetime
import json
import requests
import sys

from app.database import db
from app.models.explore import Trail

class Plan(db.Model):
    __tablename__ = "plan"

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    start_at = db.Column(db.Date)
    trail_id = db.Column(db.Integer, db.ForeignKey(Trail.id))
    forecast_id = db.Column(db.Integer, db.ForeignKey('forecast.id'))

    def __repr__(self):
        return f'<Plan "{self.id}">'

class Forecast(db.Model):
    __tablename__="forecast"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    is_daytime = db.Column(db.Boolean)
    temperature_farenheit = db.Column(db.Integer)
    precipitation_probability = db.Column(db.Integer)
    wind_speed = db.Column(db.Integer)
    wind_direction = db.Column(db.String(10))
    icon = db.Column(db.String(100))
    shortForecast = db.Column(db.String(1000))


    def __repr__(self):
        return f'<Forecast "{self.id}">'

    def get_forecast(latitude, longitude, start_time):
        point_response = requests.get(f'https://api.weather.gov/points/{latitude},{longitude}').json()

        forecast_response = requests.get(point_response['properties']['forecastHourly']).json()

        json_object = json.dumps(forecast_response, indent=4)
        with open("sample.json", "w") as outfile:
            outfile.write(json_object)

        generated_at = datetime.strptime(forecast_response['properties']['generatedAt'], '%Y-%m-%dT%H:%M:%S%z')

        hourly_data = forecast_response['properties']['periods']

        forecast_id = None
        for forecast in hourly_data:
            hour = datetime.strptime(forecast['startTime'], '%Y-%m-%dT%H:%M:%S%z')

            if hour == start_time:
                forecast = Forecast(
                    created_at = generated_at,
                    is_daytime = forecast['isDaytime'],
                    temperature_farenheit = forecast['temperature'],
                    precipitation_probability = forecast['probabilityOfPrecipitation']['value'],
                    wind_speed = forecast['windSpeed'],
                    wind_direction = forecast['windDirection'],
                    icon = forecast['icon'],
                    shortForecast = forecast['shortForecast']
                )

                db.session.add(forecast)
                db.session.commit()

                forecast_id = forecast.id

        return forecast_id