from flask import Flask, request
from config import  init_db, db, test_raw_connection

# from config import get_db_connection,test_connection
def create_app():
     print("Create App function")
     app = app = Flask(__name__)
     
     init_db(app)
    

     @app.route('/test')
     def test_route():
        return test_raw_connection()
     
     return app



app = create_app()

@app.route('/')
def home():
    return test_raw_connection()

