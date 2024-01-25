from flask import jsonify, request, redirect, url_for
from datetime import datetime
import pytz
import sys

from app import app, APP_ROOT
from app.database import db
from app.models.explore import Trail
from app.models.plan import Plan, Forecast


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
        data = request.form
        
        # Query Trail object properties for selected route
        trail = Trail.query.filter_by(name=data['trailname']).first()

        # Get timestamp for weather data
        start_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        start_time = datetime.strptime(data['start-time'], '%H:%M').time()
        naive_timestamp = datetime.combine(start_date, start_time)
        timezone = pytz.timezone('America/Denver')
        aware_timestamp = timezone.localize(naive_timestamp)

        start_at_rounded = aware_timestamp.replace(minute=0, second=0, microsecond=0)

        
        # Fetch weather forecast
        forecast_id = Forecast.get_forecast(trail.latitude, trail.longitude, start_at_rounded)

        # Confirm record created
        print(f"forecast_id = {forecast_id}", file=sys.stderr)

        plan = Plan(
            created_at = datetime.now(),
            start_at = aware_timestamp,
            trail_id = trail.id,
            forecast_id = forecast_id
        )

        db.session.add(plan)
        db.session.commit()

        return redirect(url_for('plan_detail', id=plan.id))

    return 

@app.route('/plan/<int:id>', methods=['GET']) 
def plan_detail(id):
    plan = db.get_or_404(Plan, id)
    return plan