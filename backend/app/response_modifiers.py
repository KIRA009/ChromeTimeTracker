from flask import request, jsonify, make_response
import os

from .models import User
from app.helpers import error_response


def route(self, rule, **options):
	def decorator(f):
		endpoint = options.pop("endpoint", f.__name__)

		def new_f(*args, **kwargs):
			if request.method == 'OPTIONS':
				response = make_response()
				response.headers.add('Access-Control-Allow-Origin', '*')
				response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
				response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Token')
				return response
			response = f(*args, **kwargs)
			if not isinstance(response, dict):
				return response
			status_code = response['status_code'] if response.get('status_code') else 200
			try:
				token = request.user.generate_auth_token()
			except AttributeError:
				token = None
			response = jsonify({'data': response})
			response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Token')
			if token:
				print
				response.headers.add('Token', token)
			return response, status_code
		self.add_url_rule(rule, endpoint, new_f, **options)

		return new_f
	return decorator


def login_required():
	if request.method == 'OPTIONS':
		response = make_response()
		response.headers.add('Access-Control-Allow-Origin', '*')
		response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
		response.headers.add('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Token')
		return response
	token = request.headers.get('Token')
	if token is not None:
		user = User.check_auth_token(request.headers.get('Token'))
		if next(user):
			user = User.get(username=next(user).split(os.getenv('TOKEN_DECODER_SPLITTER'))[0])
			if not user:
				return error_response("No such user exists", 404)
			request.user = user
			return
		else:
			return error_response(next(user), 401)
	else:
		return error_response('Empty request', 404)
