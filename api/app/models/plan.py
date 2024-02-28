from datetime import datetime, timedelta
import requests
import time

from app.database import db
from app.models.explore import Trail
from app.utils import average_over_array

class Plan(db.Model):
    __tablename__ = "plan"

    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    start_at = db.Column(db.DateTime)
    trail_id = db.Column(db.Integer, db.ForeignKey(Trail.id))
    forecast_id = db.Column(db.Integer, db.ForeignKey('forecast.id'))
    risk_score = db.Column(db.Float)
    risk_label = db.Column(db.String(100))
    primary_risk_factor = db.Column(db.String(100))
    risk_explanation = db.Column(db.String(150))

    forecast = db.relationship("Forecast", foreign_keys=[forecast_id], backref="plan", uselist=False)

    def __repr__(self):
        return f'<Plan "{self.id}">'


    def to_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


    def calculate_risk_score(trail, forecast):
        avg_temp = average_over_array(forecast.temp_12hr)
        avg_precip = average_over_array(forecast.precip_probability_12hr)
        avg_wind_speed = average_over_array([int(speed.split()[0]) for speed in forecast.wind_speed_12hr])

        if avg_temp >= 50.0 and avg_temp <= 75.0:
            temperature_factor = 0
        elif avg_temp < 50.0:
            temperature_factor = 50.0 - avg_temp
        elif avg_temp > 75.0:
            temperature_factor = avg_temp - 75.0

        precip_factor = (avg_precip * 50)
        trail_difficult_factor = trail.difficulty_class * 20
        snow_factor = 0
        for i in forecast.short_forecast_12hr:
            if "snow" in i.lower():
                snow_factor = 20
        wind_factor = avg_wind_speed
        

        risk_score = temperature_factor + precip_factor + trail_difficult_factor + snow_factor + wind_factor

        risk_label = None
        if risk_score < 50:
            risk_label = 'Low'
        if risk_score >= 50 and risk_score < 100:
            risk_label = 'Medium'
        if risk_score >= 100 and risk_score < 150:
            risk_label = 'High'
        if risk_score >= 150:
            risk_label = 'Extreme'

        risk_factors = {
            "temp_factor": temperature_factor, 
            "precip_factor": precip_factor,
            "trail_factor": trail_difficult_factor,
            "snow_factor": snow_factor,
            "wind_factor": wind_factor
        }

        risk_explanation_map = {
            "temp_factor": "Severe temperatures forecasted", 
            "precip_factor": "Heavy precipitation forecasted",
            "trail_factor": "Challenging route selected",
            "snow_factor": "Snowy conditions expected",
            "wind_factor": "Severe winds forecasted"
        }

        primary_risk_factor = max(risk_factors, key=risk_factors.get)
        risk_explanation = risk_explanation_map.get(primary_risk_factor)

        
        return risk_score, risk_label, primary_risk_factor, risk_explanation


class Forecast(db.Model):
    __tablename__="forecast"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime)
    timestamps = db.Column(db.ARRAY(db.DateTime(timezone=True)))
    temp_12hr = db.Column(db.ARRAY(db.Integer))
    precip_probability_12hr = db.Column(db.ARRAY(db.Float))
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
        
        for attempt in range(3):
            try:
                point_response = requests.get(f'https://api.weather.gov/points/{latitude},{longitude}').json()
                forecast_response = requests.get(point_response['properties']['forecastHourly']).json()
                generated_at = datetime.strptime(forecast_response['properties']['generatedAt'], '%Y-%m-%dT%H:%M:%S%z')
                break
            except Exception as e:
                print(f"Error making weather API requests. Attempt number={attempt+1}")
                time.sleep(1)

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

            if forecast_timstamp_local >= start_time and forecast_timstamp_local < end_time:
                timestamp_array.append(forecast_timstamp_local)
                temperature_array.append(forecast.get('temperature'))
                precip_array.append(forecast.get('probabilityOfPrecipitation').get('value')/100)
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

        return forecast