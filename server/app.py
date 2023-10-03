import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request, make_response, render_template,session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from models import User,Book,Order,CartItem,Review

from config import app, db, api

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
migrate = Migrate(app, db)
db.init_app(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

api = Api(app)

class Signup(Resource):

    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")
        # image_url = json.get("image_url")
        email = json.get("email")
        usertype = json.get("usertype")

        user = User(username=username, email=email, usertype=usertype)

        user.password_hash = password

        try:
                db.session.add(user)
                db.session.commit()

                session["user_id"] = user.id

                print(user.to_dict())

                return user.to_dict(), 201

        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422


class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()

            print(user.to_dict())
            return user.to_dict(), 200

        return {"error": "401 Unauthorized"}, 401

class Login(Resource):
    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session["user_id"] = user.id
                return user.to_dict(), 200

        return {"eror": "401 Unauthorized"}, 401

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None

            return {}, 204

        return {"error": "401 Unauthorized"}, 401

class Books(Resource):
    def get(self):
       
        books = Book.query.all()
        books_list = [book.to_dict() for book in books]
        print(books_list)
        return books_list, 200

        # return {"error": "401 Unauthorized"}, 401
class BooksbyID(Resource):
    def get(self):
            sessionvalue=1
        # if session.get("user_id"):
            # user = User.query.filter(User.id == session["user_id"]).first()
            user = User.query.filter(User.id == sessionvalue).first()

            print(user.to_dict())
            return user.to_dict(), 200

        # return {"error": "401 Unauthorized"}, 401


api.add_resource(BooksbyID, '/booksbyid', endpoint='booksbyid')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")


if __name__ == "__main__":
    app.run()