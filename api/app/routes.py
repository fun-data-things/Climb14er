from datetime import datetime
from flask import jsonify, request
import logging
import sys
import time

from app import app, APP_ROOT
from app.database import db
from app.models.explore import Trail
from app.models.plan import Plan, Forecast
from app.utils import form_tz_aware_timestamp, build_cors_preflight_response


@app.route('/')
def home():
    return 'Climb14er!'

@app.route('/explore')
def explore():
    trails = [trail.to_dict() for trail in Trail.query.all()]
    resp = jsonify(trails)

    return resp

@app.route('/plan', methods=['GET', 'POST', 'OPTIONS'])
def plan():
    if request.method == 'OPTIONS':
        return build_cors_preflight_response()
    
    if request.method == 'POST':
        data = request.json
        
        # Query Trail object properties for selected route
        trail = Trail.query.filter_by(name=data['trail']).first()

        # Get timestamp for weather data
        start_at = form_tz_aware_timestamp(data['date'], data['time'], 'America/Denver')
        
        # Create associated Forecast
        for attempt in range(3):
            try:
                forecast = Forecast.get_forecast(trail.latitude, trail.longitude, start_at)
                if forecast.id:
                    break
            except Exception as e:
                logging.warn(f"weather api error attempt: {attempt + 1}. ", e)

        # Confirm record created
        print(f"forecast_id = {forecast.id}", file=sys.stderr)

        # Calculate Risk Score
        risk_score, risk_label, risk_profile = Plan.calculate_risk_score(trail, forecast)
        print(f"risk profile: {risk_profile}")

        plan = Plan(
            created_at = datetime.now(),
            start_at = start_at,
            trail_id = trail.id,
            forecast_id = forecast.id,
            risk_score = risk_score,
            risk_label = risk_label
        )

        db.session.add(plan)
        db.session.commit()

        plan_id = str(plan.id)

        resp = jsonify(plan_id)

        return resp
    
    if request.method == 'GET':
        # GET trail names for dropdown selection
        trail_names = [trail.name for trail in Trail.query.all()]
        resp = jsonify(trail_names)

        return resp


@app.route('/plan/<int:id>', methods=['GET']) 
def plan_detail(id):
    plan = db.get_or_404(Plan, id)
    trail = db.get_or_404(Trail, plan.trail_id)
    forecast = db.get_or_404(Forecast, plan.forecast_id)

    payload = {"plan": plan.to_dict(), "trail": trail.to_dict(), "forecast": forecast.to_dict()}\
    
    resp = jsonify(payload)
    
    return resp