from flask import Flask, request
# from flask_cors import CORS

from config import get_db_connection,test_connection
def create_app():
     print("GOnna Create APp")
     app = app = Flask(__name__)
     
     test_connection()

     @app.route('/test')
     def texting():
          conn = get_db_connection()
          if conn:
               return "Connection DOne"
          else :
               return "Some Issue Occured"


          
     return app



app = create_app()

@app.route('/')
def home():
     print("Goin to check connection")
     conn = test_connection()
     print(conn)
     return f'Text Connection done'

@app.route('/home')
def routess():
     return f'Home is Returned'

@app.route("/connection")
def connections():
     print("Goin to check connection")
     conn = test_connection()
     print(conn)
     return f'Text Connection done'

