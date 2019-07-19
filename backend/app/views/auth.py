from flask import Blueprint, request
import types
from flask_cors import CORS

from app.helpers import error_response
from app.response_modifiers import route, login_required

api = Blueprint('auth', __name__)
api.before_request(login_required)
api.route = types.MethodType(route, api)

CORS(api, resources='*', expose_headers=['Token'])


@api.route('/get-details/', methods=['GET'])
def get_details():
	total_time = 0
	domains = dict()
	for session in request.user.sessions:
		for domain in session.domains:
			domains[domain.url] = domains.setdefault(domain.url, 0) + domain.time
			total_time += domain.time
	domain_times = list()
	for key, value in sorted(list(domains.items()), key=lambda x: x[1], reverse=True):
		domain_times.append((key, value))
	# domains.sort(key = lambda x: x['time'], reverse=True)
	return dict(total_time=total_time, domains=domain_times)


@api.route('/get-sessions/', methods=['GET'])
def get_session():
	response = dict(sessions=list())
	for session in request.user.sessions:
		response['sessions'].append({session.id: session.detail()})
	return response
