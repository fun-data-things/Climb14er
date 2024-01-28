from datetime import datetime
import pytz


def form_tz_aware_timestamp(date, time, timezone):
    start_date = datetime.strptime(date, '%Y-%m-%d').date()
    start_time = datetime.strptime(str(time), '%H').time()

    naive_timestamp = datetime.combine(start_date, start_time)
    tz = pytz.timezone(timezone)
    aware_timestamp = tz.localize(naive_timestamp)

    return aware_timestamp
