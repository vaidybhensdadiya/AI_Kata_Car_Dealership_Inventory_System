import os
import pymysql
import datetime

print("Dumping live MySQL database (dealership_db) into database.sql...")

conn = pymysql.connect(
    host='127.0.0.1',
    user='root',
    password='Vaidy@2005',
    port=3306,
    database='dealership_db',
    charset='utf8mb4'
)

sql = [
    "-- ========================================================",
    "-- Car Dealership Inventory System - MySQL Database Export",
    "-- Database Name: dealership_db",
    "-- ========================================================\n",
    "CREATE DATABASE IF NOT EXISTS `dealership_db` DEFAULT CHARACTER SET utf8mb4;",
    "USE `dealership_db`;\n"
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

sql_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database.sql')
with open(sql_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(sql))

print(f"Successfully dumped live MySQL database state to {sql_path}")
