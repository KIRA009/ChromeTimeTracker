import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serialiser
from itsdangerous.exc import SignatureExpired
from sqlalchemy import or_
import os

from run import db, myapp
from .helpers import cvt_date


class User(db.Model):
	username = db.Column(db.String(128), primary_key=True)
	email = db.Column(db.String(128), unique=True)
	password = db.Column(db.String(256))
	sessions = db.relationship('Session', backref='user', lazy=True)

	def __init__(self, data):
		data['password'] = generate_password_hash(data['password'])
		data['email'] = data['email'].strip().lower()
		data['username'] = data['username'].strip().lower()
		super().__init__(**data)

	def create(self):
		user = User.query.filter(or_(User.email == self.email, User.username == self.username)).first()
		if not user:
			db.session.add(self)
			db.session.commit()
			return True
		else:
			return False

	def detail(self):
		return {
			'username': self.username,
			'email': self.email,
		}

	@staticmethod
	def get(username=None, email=None):
		if username:
			return User.query.filter_by(username=username).first()
		else:
			return User.query.filter_by(email=email).first()

	def authenticate(self, password):
		return check_password_hash(self.password, password)

	def generate_auth_token(self, time=43200):
		try:
			s = Serialiser(myapp.config['SECRET_KEY'], expires_in=time)
			data = {'user': self.username + os.getenv('TOKEN_DECODER_SPLITTER') + self.email}
			return s.dumps(data).decode('utf-8')
		except Exception as e:
			return None

	@staticmethod
	def check_auth_token(token):
		if token is None:
			yield False
			yield 'Missing token'
			return
		try:
			data = Serialiser(myapp.config['SECRET_KEY']).loads(str(token))
			if not User.get(username=data['user'].split(os.getenv('TOKEN_DECODER_SPLITTER'))[0]):
				raise Exception('Invalid user')
			yield True
			yield data['user'].split(os.getenv('TOKEN_DECODER_SPLITTER'))[0]
		except SignatureExpired:
			yield False
			yield 'Token expired. Please log in again'
		except Exception as e:
			yield False
			yield str(e)


class Session(db.Model):
	username = db.Column(db.String(256), db.ForeignKey('user.username'), nullable=False)
	id = db.Column(db.String(256), primary_key=True)
	start_time = db.Column(db.DateTime)
	end_time = db.Column(db.DateTime)
	domains = db.relationship('Domain', backref='session', lazy='dynamic')

	def __init__(self, data):
		data['start_time'] = cvt_date(data['start_time'])
		data['end_time'] = cvt_date(data['end_time'])
		super().__init__(**data)
		try:
			db.session.add(self)
			db.session.commit()
		except Exception as e:
			print(e)

	def detail(self):
		data = data = self.__dict__.copy()
		del data['_sa_instance_state']
		data['domains'] = [domain.detail() for domain in self.domains]
		return data


class Domain(db.Model):
	id = db.Column(db.String(256), primary_key=True)
	session_id = db.Column(db.String(256), db.ForeignKey('session.id'), nullable=False)
	url = db.Column(db.Text)
	title = db.Column(db.Text)
	favicon = db.Column(db.Text)
	start_time = db.Column(db.DateTime())
	end_time = db.Column(db.DateTime())
	time = db.Column(db.Float())

	def __init__(self, data):
		data['id'] = str(uuid.uuid4())
		data['start_time'] = cvt_date(data['start_time'])
		data['end_time'] = cvt_date(data['end_time'])
		data['time'] = (data['end_time'] - data['start_time']).seconds
		super().__init__(**data)
		try:
			db.session.add(self)
			db.session.commit()
		except Exception as e:
			print(e)

	def detail(self):
		data = self.__dict__.copy()
		del data['_sa_instance_state']
		return data
