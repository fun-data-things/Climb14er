import csv
from datetime import datetime
from flask import make_response
import pytz


def form_tz_aware_timestamp(date, time, timezone):
    start_date = datetime.strptime(date, '%Y-%m-%d').date()
    start_time = datetime.strptime(str(time), '%H').time()

    naive_timestamp = datetime.combine(start_date, start_time)
    tz = pytz.timezone(timezone)
    aware_timestamp = tz.localize(naive_timestamp)

    return aware_timestamp


def csv_to_dict(csv_file_path):
    data = []
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
    return data


def build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response