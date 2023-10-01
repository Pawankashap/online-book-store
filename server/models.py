from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = (
        "-books.user",
        "-_password_hash",
    )

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    

    books = db.relationship("Book", backref="user")

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError("failed simple email validation")
        return address
    

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"<User: {self.username}>"

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    
    __table_args__ = (db.CheckConstraint("length(description) >= 100"),)
    serialize_rules = ("-user.books",)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    description= db.Column(db.String, nullable=False)
    price = db.Column(db.String, nullable=False)
    sold= db.Column(db.String)
    # minutes_to_complete = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    cartitems = db.relationship("CartItem", backref="book")
    reviews = db.relationship("Review", backref="book")
    orders = db.relationship("Order", backref="book")

    def __repr__(self):
        return f"<Book: {self.id}, {self.title}"
    



class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    
    # __table_args__ = (db.CheckConstraint("length(instructions) >= 50"),)
    serialize_rules = ("-user.orders",)

    id = db.Column(db.Integer, primary_key=True)
    shippinginfo = db.Column(db.String, nullable=False)
    orderdt = db.Column(db.DateTime, server_default=db.func.now())
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        return f"<Order: {self.id}, {self.orderdt}"

class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cartitems'
    
    # __table_args__ = (db.CheckConstraint("length(instructions) >= 50"),)
    serialize_rules = ("-user.cartitems",)

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"<CartItem: {self.id}" 
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    
    __table_args__ = (db.CheckConstraint("length(comment) <= 250"),)
    serialize_rules = ("-user.orders",)

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.String, nullable=False)
    comment = db.Column(db.String)
    book_id = db.Column(db.Integer, db.ForeignKey("books.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    def __repr__(self):
        return f"<Review: {self.id}, {self.orderdt}"
 