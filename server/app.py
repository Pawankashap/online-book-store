from flask import Flask, jsonify, request, make_response, render_template,session,abort
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

from models import User,Book,Order,CartItem

from config import app, db, api

class Signup(Resource):

    def post(self):
        json = request.get_json()

        username = json.get("username")
        password = json.get("password")
        email = json.get("email")
        usertype = json.get("usertype")

        user = User(username=username, email=email, usertype=usertype)

        user.password_hash = password
        print(user)
        try:
                db.session.add(user)
                db.session.commit()
                session["user_id"] = user.id
                return user.to_dict(), 201

        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422

class CheckSession(Resource):
    def get(self):
        if session.get("user_id"):
            user = User.query.filter(User.id == session["user_id"]).first()
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
        return {"error": "Wrong Username and password. Try again "}, 401

class Logout(Resource):
    def delete(self):
        if session.get("user_id"):
            session["user_id"] = None
            return {}, 204
        return {"error": "401 Unauthorized"}, 401

class AllUser(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return user_list, 200
    
class Books(Resource):

    def get(self):
        books = Book.query.all()
        books_list = [book.to_dict() for book in books]
        return books_list, 200

    def post(self):
        data = request.get_json()
        new_book = Book(
            title=data['title'],
            author=data['author'],
            category=data['category'],
            description=data['description'],
            price=data['price'],
            sold=data['sold'],
            user_id=data['user_id']
        )
        try:
            db.session.add(new_book)
            db.session.commit()
            return new_book.to_dict(), 201
        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422
    
class BooksByID(Resource):

    def get(self, id):
        bookbyid = Book.query.filter_by(id=id).first()
        return bookbyid.to_dict(), 200
   
    def patch(self, id):
        try:
            book_data = request.get_json()
            book = Book.query.get(id)
            if not book:
                return {"message": "Book not found"}, 404
            for attr, value in book_data.items():
                setattr(book, attr, value)
            db.session.commit()
            return {"message": "Book updated successfully"}, 200
        except Exception as e:
            return {"message": str(e)}, 500

    def delete(self, id):
        book = Book.query.filter_by(id=id).first()
        db.session.delete(book)
        db.session.commit()
        return (" ", 204)

class CartItems(Resource):
    def get(self):
            cartitem = CartItem.query.all()
            cartitems_list = [cartitem.to_dict() for cartitem in cartitem]
            return cartitems_list, 200
    def post(self):
        data = request.get_json()
        new_cart = CartItem(
            user_id=data['user_id'],
            book_id=data['book_id']
        )
        try:
            db.session.add(new_cart)
            db.session.commit()
            return new_cart.to_dict(), 201
        except IntegrityError:
                return {"error": "422 Unprocessable Entity"}, 422

class CartItemsByID(Resource):
    
    def get(self,id):
            cartitem = CartItem.query.filter_by(user_id=id).all()
            cartitems_list = [cartitem.to_dict() for cartitem in cartitem]
            return cartitems_list, 200
   
    def patch(self, id):
        citem_data = request.get_json()
        citem = CartItem.query.filter_by(id=id).first()
        for attr in citem_data:
            setattr(citem, attr, citem_data[attr])
        db.session.add(citem)
        db.session.commit()
        return citem.to_dict(), 200
    
    def delete(self, id):
        citem = CartItem.query.filter(CartItem.user_id == id).first()
        if citem:
            db.session.delete(citem)
            db.session.commit()
            return "", 204  
        else:
            abort(404, description="CartItem not found")
    
class DeleteCartitem(Resource):
     def delete(self, userid,bookid):
        citem = CartItem.query.filter((CartItem.user_id == userid) & (CartItem.book_id == bookid)).first()
        if citem:
            db.session.delete(citem)
            db.session.commit()
            return "", 204  
        else:
            abort(404, description="CartItem not found")

class Orders(Resource):
    def get(self):
        orders = Order.query.all()
        orders_list = [order.to_dict() for order in orders]
        return orders_list, 200

    def post(self):
        data = request.get_json()
        for order in data: 
            try:
                new_order = Order(
                shippinginfo=order['shippinginfo'],
                book_id=order['book_id'],
                user_id=order['user_id']
                )
            except Exception as e:
                db.session.rollback()  
                return {"message": f"Error creating order: {str(e)}"}, 500
            db.session.add(new_order)
            db.session.commit()
            return {"message": "Orders created successfully."}, 201
           
class OrderByID(Resource):
    def get(self,id):
            orders = Order.query.filter(Order.user_id == id).all()
            order_list = [order.to_dict() for order in orders]
            return order_list, 200

api.add_resource(AllUser, '/users', endpoint='users')
api.add_resource(OrderByID, '/ordersbyid/<int:id>', endpoint='ordersbyid')
api.add_resource(Orders, '/orders', endpoint='orders')
api.add_resource(CartItemsByID, '/citemsbyid/<int:id>', endpoint='citemsbyid')
api.add_resource(DeleteCartitem, '/citemsdel/<int:userid>/<int:bookid>', endpoint='citemsdel')
api.add_resource(CartItems, '/cartitems', endpoint='cartitems')
api.add_resource(BooksByID, '/booksbyid/<int:id>', endpoint='booksbyid')
api.add_resource(Books, '/books', endpoint='books')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == "__main__":
    app.run()