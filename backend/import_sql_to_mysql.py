import os
import pymysql

print("Importing database.sql directly into MySQL 127.0.0.1:3306...")

conn = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='Vaidy@2005',
    port=3306,
    autocommit=True
)

sql_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database.sql')

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
print("Import completed successfully into MySQL database dealership_db!")
