from flask import Flask, Blueprint, request
from flask_cors import CORS
import json

from app.models import User, Session, Domain

http = Blueprint('http', __name__)
CORS(http, resources='*', expose_headers=['Token'])


@http.route('/save-sessions/', methods=['POST'])
def save_session():
	data = request.form
	sessions = json.loads(data['sessions'])
	token = data.get('token')
	print(token)
	user = User.check_auth_token(token)
	if next(user):
		user = next(user)
		for session in sessions:
			Session(dict(username=user, id=session['id'], start_time=session['start'], end_time=session['end']))
			for _, tab_info in session['tab_manager']['tabs'].items():
				url = tab_info['url']
				title = tab_info['title']
				favicon = tab_info['favIconUrl']
				if url.startswith('chrome://'):
					continue
				for i in range(len(tab_info['active_start_times'])):
					Domain(dict(session_id=session['id'], url=url, title=title, favicon=favicon,
					            start_time=tab_info['active_start_times'][i], end_time=tab_info['active_end_times'][i]))
			for tab_info in session['tab_manager']['discarded_tabs']:
				url = tab_info['url']
				title = tab_info['title']
				favicon = tab_info['favIconUrl']
				if url.startswith('chrome://'):
					continue
				for i in range(len(tab_info['active_start_times'])):
					Domain(dict(session_id=session['id'], url=url, title=title, favicon=favicon,
					            start_time=tab_info['active_start_times'][i], end_time=tab_info['active_end_times'][i]))
	else:
		return 'Invalid token'
	return User.get(username=user).generate_auth_token(time=9999999999999999999)
