from flask import jsonify, make_response
from datetime import timedelta
from datetime import datetime as dt

dt_format = '%Y-%m-%dT%H:%M:%S'


def error_response(message, status_code):
	response = {
		'data': message
	}

	return make_response(jsonify(response), status_code)


def cvt_date(date):
	return dt.strptime(date[:-5], dt_format) + timedelta(hours=5.5)
