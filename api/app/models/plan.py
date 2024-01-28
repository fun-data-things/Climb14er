from datetime import datetime, timedelta
import json
import requests
import pytz
import sys

from app.database import db
from app.models.explore import Trail

class Plan(db.Model):
    __tablename__ = "plan"

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    start_at = db.Column(db.DateTime)
    trail_id = db.Column(db.Integer, db.ForeignKey(Trail.id))
    forecast_id = db.Column(db.Integer, db.ForeignKey('forecast.id'))

    def __repr__(self):
        return f'<Plan "{self.id}">'
    
    def to_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Forecast(db.Model):
    __tablename__="forecast"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    timestamps = db.Column(db.ARRAY(db.DateTime(timezone=True)))
    temp_12hr = db.Column(db.ARRAY(db.Integer))
    precip_probability_12hr = db.Column(db.ARRAY(db.Integer))
    wind_speed_12hr = db.Column(db.ARRAY(db.String(10)))
    wind_dir_12hr = db.Column(db.ARRAY(db.String(10)))
    icons = db.Column(db.ARRAY(db.String(100)))
    short_forecast_12hr = db.Column(db.ARRAY(db.String(1000)))

    def __repr__(self):
        return f'<Forecast "{self.id}">'
    
    def to_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def get_forecast(latitude, longitude, start_time):
        end_time = start_time + timedelta(hours=12)
        
        point_response = requests.get(f'https://api.weather.gov/points/{latitude},{longitude}').json()

        forecast_response = requests.get(point_response['properties']['forecastHourly']).json()

        generated_at = datetime.strptime(forecast_response['properties']['generatedAt'], '%Y-%m-%dT%H:%M:%S%z')

        hourly_data = forecast_response['properties']['periods']

        timestamp_array = []
        temperature_array = []
        precip_array = []
        wind_speed_array = []
        wind_dir_array = []
        icon_array = []
        short_forecast_array = []
        for forecast in hourly_data:
            forecast_timstamp_local = datetime.strptime(forecast['startTime'], '%Y-%m-%dT%H:%M:%S%z')

            if forecast_timstamp_local >= start_time and forecast_timstamp_local <= end_time:
                timestamp_array.append(forecast_timstamp_local)
                temperature_array.append(forecast.get('temperature'))
                precip_array.append(forecast.get('probabilityOfPrecipitation').get('value'))
                wind_speed_array.append(forecast.get('windSpeed'))
                wind_dir_array.append(forecast.get('windDirection'))
                icon_array.append(forecast.get('icon'))
                short_forecast_array.append(forecast.get('shortForecast'))

        forecast = Forecast(
            created_at = generated_at,
            timestamps = timestamp_array,
            temp_12hr = temperature_array,
            precip_probability_12hr = precip_array,
            wind_speed_12hr = wind_speed_array,
            wind_dir_12hr = wind_dir_array,
            icons = icon_array,
            short_forecast_12hr = short_forecast_array
        )

        db.session.add(forecast)
        db.session.commit()

        forecast_id = forecast.id

        return forecast_id