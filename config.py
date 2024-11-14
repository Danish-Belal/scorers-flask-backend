import os
import psycopg2

# Load the environment variable
DATABASE_URL = os.getenv('DATABASE_URL')

def get_db_connection():
    """Establishes a connection to the database."""
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(DATABASE_URL)
        print("Database connection established.")
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def test_connection():
    """Tests the database connection by retrieving the version."""
    print("Test Connection")
    conn = get_db_connection()
    if conn:
        return conn
     #    try:
     #        with conn.cursor() as cur:
     #            cur.execute("SELECT version()")
     #            print(f"Database version: {cur.fetchone()}")
     #    except Exception as e:
     #        print(f"Error during query execution: {e}")
     #    finally:
     #        conn.close()
     #        print("Connection closed.")

    else:
        print("Failed to connect to the database.")
