from flask import Blueprint, request
import types
from flask_cors import CORS
from urllib.parse import urlparse
from sqlalchemy import desc

from app.helpers import error_response
from app.response_modifiers import route, login_required
from app.models import Session, Domain

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
			if domain.url not in domains:
				domains[domain.url] = [domain.title, 0]
			domains[domain.url][1] += domain.time
			total_time += domain.time
	domain_times = list()
	for key, value in sorted(list(domains.items()), key=lambda x: x[1][1], reverse=True):
		domain_times.append((key, value))
	return dict(total_time=total_time, domains=domain_times)


@api.route('/get-sessions/', methods=['GET'])
def get_session():
	response = dict(sessions=list())
	for session in sorted(request.user.sessions, key=lambda x: x.start_time, reverse=True):
		response['sessions'].append({session.id: session.detail()})
	return response


@api.route('/delete-domains/', methods=['POST'])
def delete_domains():
	domains = request.json['domains']
	for domain in domains:
		Domain.delete(domain)
	return dict()


@api.route('/get-settings/', methods=['GET'])
def get_settings():
	return request.user.settings.detail()


@api.route('/block-site/', methods=['POST'])
def block_site():
	url = urlparse(request.json['value'])
	if url.scheme != '' and url.netloc != '':
		setting = request.user.settings
		setting.update(new_site=f'{url.scheme}://{url.netloc}')
		return dict()
	return error_response('Invalid url', 500)


@api.route('/unblock-sites/', methods=['POST'])
def unblock_sites():
	setting = request.user.settings
	setting.unblock_sites(request.json['sites'])
	return dict()


@api.route('/change-mintime/', methods=['POST'])
def change_mintime():
	setting = request.user.settings
	min_time_set, message = setting.set_mintime(request.json['min_time'])
	if min_time_set:
		return dict()
	return error_response(message, 500)
