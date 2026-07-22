import os
import pymysql
import datetime
from dotenv import load_dotenv

# Load env variables from backend/.env
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(backend_dir, '.env'))

db_name = os.getenv('DB_NAME', 'dealership_db')
print(f"Dumping live MySQL database ({db_name}) into database.sql...")

conn = pymysql.connect(
    host=os.getenv('DB_HOST', '127.0.0.1'),
    user=os.getenv('DB_USER', 'root'),
    password=os.getenv('DB_PASSWORD', ''),
    port=int(os.getenv('DB_PORT', '3306')),
    database=db_name,
    charset='utf8mb4'
)

sql = [
    "-- ========================================================",
    "-- Car Dealership Inventory System - MySQL Database Export",
    f"-- Database Name: {db_name}",
    "-- ========================================================\n",
    f"CREATE DATABASE IF NOT EXISTS `{db_name}` DEFAULT CHARACTER SET utf8mb4;",
    f"USE `{db_name}`;\n"
]

tables_to_dump = ['auth_user', 'inventory_vehicle']

with conn.cursor() as cursor:
    for table in tables_to_dump:
        cursor.execute(f"SHOW CREATE TABLE `{table}`;")
        create_stmt = cursor.fetchone()[1]
        
        sql.append(f"-- Table structure for `{table}`")
        sql.append(f"DROP TABLE IF EXISTS `{table}`;")
        sql.append(f"{create_stmt};\n")

        cursor.execute(f"SELECT * FROM `{table}`;")
        rows = cursor.fetchall()
        if rows:
            cursor.execute(f"SHOW COLUMNS FROM `{table}`;")
            columns = [f"`{col[0]}`" for col in cursor.fetchall()]
            col_names = ", ".join(columns)
            
            sql.append(f"-- Dumping data for `{table}` ({len(rows)} records)")
            row_strings = []
            for row in rows:
                formatted_vals = []
                for val in row:
                    if val is None:
                        formatted_vals.append("NULL")
                    elif isinstance(val, (int, float)):
                        formatted_vals.append(str(val))
                    elif isinstance(val, (datetime.datetime, datetime.date)):
                        formatted_vals.append(f"'{val.strftime('%Y-%m-%d %H:%M:%S')}'")
                    else:
                        escaped = str(val).replace("\\", "\\\\").replace("'", "''")
                        formatted_vals.append(f"'{escaped}'")
                row_strings.append(f"({', '.join(formatted_vals)})")
            sql.append(f"INSERT INTO `{table}` ({col_names}) VALUES\n" + ",\n".join(row_strings) + ";\n")

conn.close()

# database.sql is in the root directory (parent of backend)
workspace_root = os.path.dirname(backend_dir)
sql_path = os.path.join(workspace_root, 'database.sql')

with open(sql_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(sql))

print(f"Successfully dumped live MySQL database state to {sql_path}")
