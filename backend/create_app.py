from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os


def create_app(name):
	env_path = '.env'
	load_dotenv(dotenv_path=env_path)
	app = Flask(name)
	app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
	app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DB_NAME')
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

	db = SQLAlchemy(app)
	migrate = Migrate(app, db)

	return app, db, migrate
