# Online Bookstore

If you enjoy reading and love books, the Online Bookstore App is a comprehensive web application that's perfect for you. It provides a user-friendly experience that makes it easy to browse, buy, and manage a wide range of books. Online Bookstore app has a carefully selected collection that caters to all literary preferences, ensuring that you can easily find your favorite books

## Features

1. Browse and Search
    Easily find specific books by typing their titles into the search bar. Online Bookstore app provides a quick and efficient way to locate your favorite titles or discover new ones with precision.
2. Book Details
    Immerse yourself in the universe of every book by exploring detailed profiles. You will have access to a vast array of information, such as the book's title, author, description, price, and ordering specifics. Moreover, you can discover the book's current price and crucial order details, which will aid you in making informed purchasing choices. Furthermore, you can read fascinating book descriptions that offer insights into the plot and themes, allowing you to uncover your next captivating read.
3. Shopping Cart
    You can easily add books to your shopping cart with just a few clicks, creating a personalized selection of titles that you're interested in purchasing. You can also easily manage your cart by adjusting quantities or removing items. The Online Bookstore app provides the flexibility to tailor your cart to your preferences, whether you want to increase the number of copies or change your mind about a selection.
4. User Authentication
    Creating a personalized account is simple for new users. All you have to do is provide the necessary information during registration. This process grants access to a variety of app features and functionalities. For returning users, logging in is quick and easy. Just enter your credentials to access your account and all its associated benefits. Administrators have access to manage books and categories, enhancing user roles and permissions and optimizing the platform's functionality.
5. Checkout and Orders
   This application simplifies the checkout process, making it effortless to complete your purchase. Its user-friendly interface enables you to finalize your order with ease and confidence. You can access a comprehensive history of your previous orders, including order details, statuses, and dates. This means that you can review your purchasing history whenever you need to. Plus, you can keep track of the status of your orders, from confirmation to shipping, for a hassle-free shopping experience.
6. Admin Panel
    If you are an administrator, the Online Bookstore app provides you with efficient tools to manage books and categories. This includes adding, editing and removing books from the catalog, as well as organizing books into appropriate categories.

## Getting Started
Set up and run the Online Bookstore App on your local machine by following these instructions.

Prerequisites

    alembic==1.8.1
    aniso8601==9.0.1
    click==8.1.3
    flask==2.2.2
    flask-cors==3.0.10
    flask-migrate==3.1.0
    flask-restful==0.3.9
    flask-sqlalchemy==3.0.2
    gunicorn==20.1.0
    honcho==1.1.0
    importlib-metadata==5.0.0
    itsdangerous==2.1.2
    jinja2==3.1.2
    mako==1.2.3
    markupsafe==2.1.1
    psycopg2-binary==2.9.4
    python-dotenv==0.21.0
    pytz==2022.4
    setuptools==65.5.0
    six==1.16.0
    sqlalchemy==1.4.42
    sqlalchemy-serializer==1.4.1
    werkzeug==2.2.2
    zipp==3.9.0
    flask-bcrypt == 1.0.1

## Installation

Follow these steps to install and run the project locally:

    1.  Clone the repository to your local machine:
        git clone https://github.com/Pawankashap/online-book-store
    2. Change to the project directory: 
       cd online-book-store/client
    3. npm install --prefix client
    4. cd ..
    5. pipenv install && pipenv shell
    6. pip install honcho
    7. pipenv install Flask gunicorn psycopg2-binary Flask-SQLAlchemy Flask-Migrate SQLAlchemy-Serializer Flask-RESTful
    8. export DATABASE_URI=postgresql://a:CV7aM6vmncSdwBHSa7PfIGmLviTJg2yi@dpg-ckc8s2usmu8c73cdab40-a.oregon-postgres.render.com/book_store_lftj
    9. honcho start -f Procfile.dev
## Usage

1. Register a New User Account or Log In as an Existing User:
    To begin using the app, if you are a new user, please register for an account. You will need to provide your email, create a username, and set a password. If you are already a user, please log in using your registered email and password. It is important to note that the default username for existing users is "pawan" and the password is "123456789".
2. Browse and Search for Books: 
    After logging in, you will arrive at the homepage of the app. From there, you can start to explore the catalog. You can browse through books by either scrolling or utilizing the navigation menus that categorize books by genres, authors, or special categories. If you are searching for a particular book, you can use the search bar located at the top of the page. Simply type in the title, author, or relevant keywords to locate it quickly.
3. Add Books to Your Shopping Cart and Proceed to Checkout:
    To buy a book, select the "Add to Cart" button beside it. If you change your mind, you can remove it from your cart. Once you've added all the desired books, tap "Proceed to Checkout" to complete your purchase.
4. View Your Order History and Manage Your Account Settings:
    After completing your purchase, you will receive an order confirmation. To view information on past orders, including dates and statuses, access your order history.

## Python/Flask-SQLAlchemy Backend

**config.py**

This file contains configuration settings and parameters for a software application or script. It is used in programming to separate configuration details from the code logic, making it easier to manage and modify settings without altering the actual program code

**models.py**

This document holds all the table models that are used in the database structure. It contains different imports from sqlalchemy that are used to form join tables, create models, and define base models and record entries. The models file does not have a Serializer set up as Marshmallow is used to serialize record entries in this application.

1. User
The User Model represents individuals interacting with the system, including customers, administrators, and employees. It typically includes attributes such as usernames, email addresses, passwords (hashed for security), and roles to distinguish between user types, like customers and admin staff.

2. Book Model 
The Book Model encapsulates information about the books available for purchase. This model typically includes details like the book's title, author, description, price, availability status. This information helps users browse and select books easily.

3. CartItem Model 
The CartItem Model assists in managing users' shopping experiences by tracking the items they've added to their shopping carts. It includes data about the selected book, the quantity, and a reference to the user who added it. This allows users to gather their preferred items before proceeding to checkout.

4. Order Model 
The CartItem Model assists in managing users' shopping experiences by tracking the items they've added to their shopping carts. It includes data about the selected book,and a reference to the user who added it. This allows users to gather their preferred items before proceeding to checkout

## app.py

This document relies on important imports such as flask_restful and flask_marshmallow to establish serialized schemas and API endpoints. It consists of two main sections: Model Schemas and API Resources. All table models are imported and used in this document to define database interactions for the designated API endpoints. Flask-Marshmallow is used to define all schemas and Flask-RESTful conventions are utilized to define all API endpoints. Some resources use session cookies to confirm that users are authorized to access the requested content. This document is responsible for running most of the application's processes.
To keep this README concise, I will provide brief descriptions here. Please use my Postman Collections to test and view the functionality of important database requests. For a detailed explanation of the Schemas defined here, refer to the Marshmallow documentation. Marshmallow is used to serialize JSON responses and determine the data included in these responses. At the end of this file, all API endpoints are listed, and authorization/authentication functions are combined into a singular function that is passed to each required resource.


## React Frontend

**Components**
In this folder, you will find all the components used in the React application, except for App.js and Index.js which are located in the /src folder. React Router v6 and React-Bootstrap were both used in the development of this application. App.js manages all the frontend routes and holds the user and game state. Index.js is responsible for rendering the application. In this section, I will provide a brief explanation of each component, but I will not cover stylesheets or media assets as each component has its own stylesheet.


## Links

**Website Online Link**

https://book-store-fjqm.onrender.com/


## Contributing

We welcome contributions from the community! To contribute to the Online Bookstore App:
    1. Fork the repository.
    2. Create a new branch for your feature or bug fix.
    3. Make your changes, commit them, and push to your fork.
    4. Create a pull request to the main branch of the original repository.

## License
This project is licensed under the MIT License.


