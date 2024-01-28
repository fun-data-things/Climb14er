from flask import jsonify, request, redirect, url_for
from datetime import datetime
import pytz
import sys

from app import app, APP_ROOT
from app.database import db
from app.models.explore import Trail
from app.models.plan import Plan, Forecast
from app.utils import form_tz_aware_timestamp


@app.route('/')
def home():
    return 'Climb14er!'

@app.route('/explore')
def explore():
    trails = [trail.to_dict() for trail in Trail.query.all()]
    return jsonify(trails)

# TODO: Need to re-factor this route to work with the React app
@app.route('/plan', methods=['GET', 'POST'])
def plan():
    if request.method == 'POST':
        data = request.json
        
        # Query Trail object properties for selected route
        trail = Trail.query.filter_by(name=data['trail']).first()

        # Get timestamp for weather data
        start_at = form_tz_aware_timestamp(data['date'], data['time'], 'America/Denver')
        
        # Fetch weather forecast
        forecast_id = Forecast.get_forecast(trail.latitude, trail.longitude, start_at)

        # Confirm record created
        print(f"forecast_id = {forecast_id}", file=sys.stderr)

        plan = Plan(
            created_at = datetime.now(),
            start_at = start_at,
            trail_id = trail.id,
            forecast_id = forecast_id
        )

        db.session.add(plan)
        db.session.commit()

        plan_id = str(plan.id)

        return plan_id
    
    # GET trail names for dropdown selection
    trail_names = [trail.name for trail in Trail.query.all()]

    return jsonify(trail_names)


@app.route('/plan/<int:id>', methods=['GET']) 
def plan_detail(id):
    plan = db.get_or_404(Plan, id)
    trail = db.get_or_404(Trail, plan.trail_id)
    forecast = db.get_or_404(Forecast, plan.forecast_id)

    response = {"plan": plan.to_dict(), "trail": trail.to_dict(), "forecast": forecast.to_dict()}
    print(response, file=sys.stderr)
    return response