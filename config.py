import os
from flask_sqlalchemy import SQLAlchemy
from psycopg2 import connect, OperationalError
from flask import jsonify, Response

# Load the environment variable
DATABASE_URL = os.getenv('DATABASE_URL')  # Example: "postgresql://user:password@host/dbname"

# Initialize SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """Initialize SQLAlchemy with the Flask app."""
    print("DATABASE URL", DATABASE_URL)
    # app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://scorer_owner:UNH20pdPxADc@ep-billowing-thunder-a196hpgj.ap-southeast-1.aws.neon.tech/scorer?sslmode=require"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    print("SQLAlchemy connected successfully.")

def get_raw_connection():
    """Establish a raw connection to the PostgreSQL database using psycopg2."""
    try:
        conn = connect(DATABASE_URL)
        print("Raw database connection established successfully.")
        return conn
    except OperationalError as e:
        print(f"Error connecting to the database: {e}")
        return None

def test_raw_connection():
    """Test the raw database connection and return a Flask response."""
    conn = get_raw_connection()
    if conn:
        try:
            with conn.cursor() as cur:
                cur.execute("SELECT version();")
                db_version = cur.fetchone()
                return jsonify({"status": "success", "message": f"Database version: {db_version}"})
        except Exception as e:
            return jsonify({"status": "error", "message": f"Error during query execution: {str(e)}"}), 500
        finally:
            conn.close()
            print("Raw connection closed.")
    else:
        return jsonify({"status": "error", "message": "Failed to connect to the database."}), 500
