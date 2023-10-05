import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request, make_response, render_template,session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from models import User,Book,Order,CartItem

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
class AllUser(Resource):
    def get(self):
        
        # users = [user.to_dict() for user in User.query.all()]
        # return make_response(jsonify(users), 200)
       
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        print(user_list)
        return user_list, 200

    
class Books(Resource):
    def get(self):

        
       
        books = Book.query.all()
        books_list = [book.to_dict() for book in books]
        print(books_list)
        return books_list, 200
        
        # return {"error": "401 Unauthorized"}, 401

    def post(self):
        data = request.get_json()
        new_book = Book(
            title=data['title'],
            author=data['author'],
            category=data['category'],
            description=data['description'],
            price=data['price'],
            sold=data['sold'],
            user_id=data['user_id'],
            image_url=data['image_url']
        )
        try:
            print(new_book)
            db.session.add(new_book)
            db.session.commit()
           
            return new_book.to_dict(), 201
        # return make_response(new_plant.to_dict(), 201)
        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422
    
class BooksByID(Resource):

    def get(self, id):
        bookbyid = Book.query.filter_by(id=id).first()
        return bookbyid.to_dict(), 200
   
    def patch(self, id):
        book_data = request.get_json()

        book = Book.query.filter_by(id=id).first()

        for attr in book_data:
            setattr(book, attr, book_data[attr])

        db.session.add(book)
        db.session.commit()

        return book.to_dict(), 200

    def delete(self, id):
        book = Book.query.filter_by(id=id).first()

        db.session.delete(book)
        db.session.commit()

        return (" ", 204)

class CartItems(Resource):
    def get(self):
        
        # if session.get("user_id"):
            
            cartitem = CartItem.query.all()
            cartitems_list = [cartitem.to_dict() for cartitem in cartitem]
            print(cartitems_list)
            return cartitems_list, 200
        
        # return {"error": "401 Unauthorized"}, 401

class CartItemsByID(Resource):
   
    def patch(self, id):
        citem_data = request.get_json()

        citem = CartItem.query.filter_by(id=id).first()

        for attr in citem_data:
            setattr(citem, attr, citem_data[attr])

        db.session.add(citem)
        db.session.commit()

        return citem.to_dict(), 200

    def delete(self, id):
        citem = CartItem.query.filter_by(id=id).first()

        db.session.delete(citem)
        db.session.commit()

        return (" ", 204)
    

class Orders(Resource):
    def get(self):
        orders = Order.query.all()
        orders_list = [order.to_dict() for order in orders]
        print(orders_list)
        return orders_list, 200

    def post(self):
        data = request.get_json()
        new_order = Order(
            shippinginfo=data['shippinginfo'],
            orderdt=data['orderdt'],
            book_id=data['book_id'],
            user_id=data['user_id']
        )
        try:
            print(new_order)
            db.session.add(new_order)
            db.session.commit()
            return new_order.to_dict(), 201
        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422
    


api.add_resource(AllUser, '/users', endpoint='users')
api.add_resource(Orders, '/orders', endpoint='orders')
api.add_resource(CartItemsByID, '/citemsbyid/<int:id>', endpoint='citemsbyid')
api.add_resource(CartItems, '/cartitems', endpoint='cartitems')
api.add_resource(BooksByID, '/booksbyid/<int:id>', endpoint='booksbyid')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')



# @app.route('/')
# @app.route('/<int:id>')
# def index(id=0):
#     return render_template("index.html")


if __name__ == "__main__":
    app.run()