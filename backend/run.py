from create_app import create_app

myapp, db, migrate = create_app(__name__)

from app.views import unauth, auth, general

myapp.register_blueprint(unauth.api)
myapp.register_blueprint(auth.api)
myapp.register_blueprint(general.http)

if __name__ == '__main__':
	myapp.run()
