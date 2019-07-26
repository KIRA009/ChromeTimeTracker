from flask import Blueprint, request
import types
from flask_cors import CORS

from app.helpers import error_response
from app.response_modifiers import route
from app.models import User,Setting

api = Blueprint('unauth', __name__)
api.route = types.MethodType(route, api)

CORS(api, resources='*', expose_headers=['Token'])

#######################################################################################################################
# USER REGISTRATION, VERIFICATION AND LOGIN
#######################################################################################################################


@api.route('/user/register/', methods=['POST'])
def create_user():
	user = User(request.json)
	if user.create():
		Setting.create(user.username)
		return dict()
	else:
		return error_response('User with this email or number already exists', 409)


@api.route('/user/login/', methods={'POST'})
def login():
	data = request.json
	user = User.query.filter_by(email=data['email']).first()
	if not user:
		return error_response('User does not exist', 404)
	if user.authenticate(data['password']):
		auth_token = user.generate_auth_token()
		if auth_token:
			request.user = user
		return dict()
	else:
		return error_response('Invalid Credentials', 401)
