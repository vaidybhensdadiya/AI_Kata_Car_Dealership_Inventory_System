import os
import sys
import pymysql
from dotenv import load_dotenv

# Load env variables from backend/.env
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(backend_dir, '.env'))

print("Importing database.sql directly into MySQL...")

conn = pymysql.connect(
    host=os.getenv('DB_HOST', '127.0.0.1'),
    user=os.getenv('DB_USER', 'root'),
    password=os.getenv('DB_PASSWORD', ''),
    port=int(os.getenv('DB_PORT', '3306')),
    autocommit=True
)

# database.sql is in the root directory (parent of backend)
workspace_root = os.path.dirname(backend_dir)
sql_file_path = os.path.join(workspace_root, 'database.sql')

with open(sql_file_path, 'r', encoding='utf-8') as f:
    sql_script = f.read()

# Split SQL statements
statements = sql_script.split(';')

with conn.cursor() as cursor:
    for stmt in statements:
        stmt = stmt.strip()
        if stmt and not stmt.startswith('--'):
            try:
                cursor.execute(stmt)
            except Exception as e:
                print(f"Executing statement warning: {e}")

conn.close()
print("Import completed successfully into MySQL database!")
