import{r as u,j as e,T as s}from"./index-CNTZnqQQ.js";import{P as d,T as E,a as t,b as r,Q as h,C as o,I as i,c as a}from"./shared-Cgke19x4.js";const m=[{id:"intro",label:"What is SQLite?"},{id:"create",label:"CREATE & INSERT"},{id:"select",label:"SELECT & Filter"},{id:"update",label:"UPDATE & DELETE"},{id:"python",label:"Python sqlite3"},{id:"flask",label:"Flask + SQLite"},{id:"quiz",label:"Quiz 🎯"}],T=[{q:"Which SQL command creates a new table?",opts:["INSERT","CREATE TABLE","NEW TABLE","MAKE TABLE"],ans:1,exp:"CREATE TABLE defines the structure (columns and types) for a new table."},{q:"Which command adds data to a table?",opts:["ADD","PUT","INSERT INTO","APPEND"],ans:2,exp:"INSERT INTO table_name (cols) VALUES (vals) adds a new row."},{q:"How do you filter rows in a SELECT?",opts:["FILTER BY","WHERE","HAVING","LIMIT"],ans:1,exp:"WHERE adds conditions to filter which rows are returned."},{q:"Which clause sorts results?",opts:["SORT BY","ORDER RESULTS","ORDER BY","ARRANGE BY"],ans:2,exp:"ORDER BY col ASC/DESC sorts the result set ascending or descending."},{q:"What does PRIMARY KEY do?",opts:["Encrypts the column","Ensures values are unique and not null","Sets the first column","Indexes all columns"],ans:1,exp:"PRIMARY KEY uniquely identifies each row. Often combined with AUTOINCREMENT to auto-generate IDs."},{q:"In Python, what method executes a SQL query?",opts:["cursor.run()","cursor.sql()","cursor.execute()","cursor.query()"],ans:2,exp:"cursor.execute(sql, params) runs a SQL statement. Use ? placeholders for safe parameterization."},{q:"Why use ? placeholders instead of f-strings in SQL?",opts:["They're faster","They prevent SQL injection attacks","They're required syntax","They handle NULL values"],ans:1,exp:"Never use f-strings or string formatting for SQL queries — it enables SQL injection. Always use ? placeholders."},{q:"Which sqlite3 method saves changes to the database file?",opts:["cursor.save()","conn.flush()","conn.commit()","cursor.write()"],ans:2,exp:"conn.commit() saves all pending changes. Without it, INSERT/UPDATE/DELETE changes are lost when you close the connection."},{q:"What does INTEGER PRIMARY KEY AUTOINCREMENT do?",opts:["Requires manual ID entry","Auto-generates a unique, incrementing integer ID for each new row","Creates a composite key","Encrypts the ID column"],ans:1,exp:"AUTOINCREMENT makes SQLite automatically assign the next available integer ID when you insert a row without specifying one. Most tables that store 'records' should have this."},{q:"Which SQL keyword removes duplicate rows from SELECT results?",opts:["UNIQUE","NODUPE","DISTINCT","FILTER"],ans:2,exp:"SELECT DISTINCT col FROM table returns only unique values in that column. Without DISTINCT, duplicate rows are returned."}];function p(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"🗄 What is SQLite?"}),e.jsx("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10},children:"Most beginners skip databases and store everything in Python lists or text files — and then regret it the moment they need to search, sort, or keep data after the program closes. SQLite fixes all of that, and it's already installed with Python. You don't have to set up a server or create an account anywhere."}),e.jsxs("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10},children:["SQLite is a ",e.jsx("strong",{style:{color:s.text},children:"lightweight, file-based database"}),". All your data lives in a single ",e.jsx(a,{children:".db"})," file that you can copy, back up, or share. And you query it with SQL — the same language used in every major database on the planet."]}),e.jsxs(i,{type:"info",children:["SQLite comes built into Python — no installation needed. Just ",e.jsx(a,{children:"import sqlite3"}),"."]})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"📊 Database Concepts"}),e.jsx("div",{style:{fontFamily:"'Fira Code',monospace",fontSize:12},children:[{term:"Database",def:"A file that stores organized data (e.g. myapp.db)",color:s.sky},{term:"Table",def:"Like a spreadsheet — columns define structure, rows hold data",color:s.accent},{term:"Column",def:"A field in each row (e.g. name, age, email)",color:s.green},{term:"Row",def:"One record in the table (e.g. one user)",color:s.amber},{term:"PRIMARY KEY",def:"A unique ID for each row — usually auto-incremented",color:s.rose},{term:"SQL",def:"Structured Query Language — commands to create/read/update/delete data",color:s.muted2}].map(n=>e.jsxs("div",{style:{display:"flex",gap:14,padding:"7px 0",borderBottom:`1px solid ${s.border}`,alignItems:"flex-start"},children:[e.jsx("span",{style:{color:n.color,fontWeight:700,minWidth:110,flexShrink:0},children:n.term}),e.jsx("span",{style:{color:s.muted2,fontSize:11.5},children:n.def})]},n.term))}),e.jsx(o,{lang:"py",code:`# How data looks in a table:
# ID | name    | age | email
# 1  | Alice   | 25  | alice@ex.com
# 2  | Bob     | 30  | bob@ex.com
# 3  | Eve     | 22  | eve@ex.com`})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"SQL vs Python — When to Use Which"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,color:s.sky,fontFamily:"'Fira Code',monospace",marginBottom:6,letterSpacing:"1px"},children:"USE SQL FOR"}),e.jsx(o,{lang:"sql",code:`-- Storing permanent data
-- Searching / filtering
-- Sorting results
-- Counting, summing
-- Joining related tables`})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,color:s.accent,fontFamily:"'Fira Code',monospace",marginBottom:6,letterSpacing:"1px"},children:"USE PYTHON FOR"}),e.jsx(o,{lang:"py",code:`# Logic & calculations
# User interfaces
# Calling the database
# Processing results
# Web apps (Flask)`})]})]})]})]})}function g(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"CREATE TABLE"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Create a users table
CREATE TABLE IF NOT EXISTS users (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    email   TEXT    UNIQUE NOT NULL,
    age     INTEGER,
    score   REAL    DEFAULT 0.0,
    created TEXT    DEFAULT CURRENT_TIMESTAMP
);

-- Data types in SQLite:
-- INTEGER  → whole numbers (1, 42, -5)
-- REAL     → decimals (3.14, 9.99)
-- TEXT     → strings ("Alice", "hello")
-- BLOB     → binary data (images, files)
-- NULL     → no value`}),e.jsxs(i,{type:"tip",children:[e.jsx(a,{children:"PRIMARY KEY AUTOINCREMENT"})," automatically assigns 1, 2, 3… to each new row. ",e.jsx(a,{children:"IF NOT EXISTS"})," prevents errors if you run the script twice."]})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"INSERT INTO"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Insert one row
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 25);

-- Insert with all columns (skip id — it's auto)
INSERT INTO users (name, email, age, score)
VALUES ('Bob', 'bob@example.com', 30, 88.5);

-- Insert multiple rows at once
INSERT INTO users (name, email, age) VALUES
    ('Eve',   'eve@ex.com',  22),
    ('Dan',   'dan@ex.com',  28),
    ('Sarah', 'sarah@ex.com',35);`})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Column Constraints"}),e.jsx(o,{lang:"sql",showLines:!0,code:`CREATE TABLE products (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,         -- cannot be empty
    price    REAL    NOT NULL,
    stock    INTEGER DEFAULT 0,        -- default value
    sku      TEXT    UNIQUE,           -- no duplicates
    category TEXT    CHECK(category IN ('food','tech','clothing'))
);                                     -- must be one of these`})]})]})}function x(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"SELECT — Read Data"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Get all columns, all rows
SELECT * FROM users;

-- Get specific columns
SELECT name, email FROM users;

-- Filter with WHERE
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE name = 'Alice';
SELECT * FROM users WHERE score >= 80 AND age < 30;
SELECT * FROM users WHERE name LIKE 'A%';  -- starts with A
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Sort results
SELECT * FROM users ORDER BY age ASC;    -- youngest first
SELECT * FROM users ORDER BY score DESC; -- highest first

-- Limit results
SELECT * FROM users LIMIT 10;            -- first 10 rows
SELECT * FROM users LIMIT 10 OFFSET 20; -- rows 21–30 (pagination)

-- Count rows
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users WHERE age > 18;`})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Aggregate Functions"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Math on columns
SELECT AVG(age)   FROM users;   -- average age
SELECT SUM(score) FROM users;   -- total score
SELECT MAX(score) FROM users;   -- highest score
SELECT MIN(age)   FROM users;   -- youngest

-- Group by a column
SELECT category, COUNT(*) as total
FROM products
GROUP BY category;
-- Returns: food|5, tech|12, clothing|8

-- Filter groups with HAVING
SELECT category, AVG(price) as avg_price
FROM products
GROUP BY category
HAVING avg_price > 20
ORDER BY avg_price DESC;`})]})]})}function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"UPDATE — Modify Data"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Update specific rows (ALWAYS use WHERE!)
UPDATE users
SET score = 95
WHERE name = 'Alice';

-- Update multiple columns
UPDATE users
SET age = 26, email = 'newemail@ex.com'
WHERE id = 1;

-- Update based on current value
UPDATE products
SET stock = stock - 1
WHERE id = 42;

-- Update all rows (rare — be careful!)
UPDATE users SET active = 1;`}),e.jsxs(i,{type:"warn",children:["⚠️ Always use ",e.jsx(a,{children:"WHERE"})," with UPDATE and DELETE. Without it, you modify/delete EVERY row in the table."]})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"DELETE — Remove Data"}),e.jsx(o,{lang:"sql",showLines:!0,code:`-- Delete specific rows
DELETE FROM users WHERE id = 5;
DELETE FROM users WHERE name = 'Bob';
DELETE FROM users WHERE score < 50;

-- Delete all rows (but keep the table)
DELETE FROM users;

-- Drop (delete) the entire table
DROP TABLE IF EXISTS old_table;

-- SQLite doesn't have TRUNCATE (just use DELETE FROM)`})]})]})}function R(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Python sqlite3 Module"}),e.jsx(o,{lang:"py",showLines:!0,code:`import sqlite3

# 1. Connect (creates file if it doesn't exist)
conn   = sqlite3.connect("myapp.db")
cursor = conn.cursor()   # creates a "cursor" to execute SQL

# 2. Create table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        name  TEXT    NOT NULL,
        email TEXT    UNIQUE NOT NULL,
        score REAL    DEFAULT 0
    )
""")
conn.commit()   # SAVE the changes!

# 3. Insert data (use ? placeholders — never f-strings!)
cursor.execute(
    "INSERT INTO users (name, email, score) VALUES (?, ?, ?)",
    ("Alice", "alice@example.com", 95)
)
conn.commit()

# 4. Query data
cursor.execute("SELECT * FROM users WHERE score > ?", (80,))
rows = cursor.fetchall()       # list of tuples
for row in rows:
    print(row)                 # (1, "Alice", "alice@...", 95)

# 5. Close when done
conn.close()`}),e.jsxs(i,{type:"warn",children:["Never build SQL with f-strings: ",e.jsx(a,{children:`f"... WHERE name='{name}'"`})," — this allows SQL injection. Always use ",e.jsx(a,{children:"?"})," placeholders."]})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Row Factories — Get Dicts"}),e.jsx(o,{lang:"py",showLines:!0,code:`import sqlite3

conn = sqlite3.connect("myapp.db")
conn.row_factory = sqlite3.Row   # ← makes rows dict-like!
cursor = conn.cursor()

cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()

for row in rows:
    print(row["name"])     # access by column name
    print(row["email"])    # instead of row[1]
    print(dict(row))       # convert to real dict

# Single row
cursor.execute("SELECT * FROM users WHERE id = ?", (1,))
user = cursor.fetchone()   # returns one row or None
if user:
    print(f"Found: {user['name']}")`})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Context Manager (Best Practice)"}),e.jsx(o,{lang:"py",showLines:!0,code:`import sqlite3
from contextlib import contextmanager

@contextmanager
def get_db(path="myapp.db"):
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()        # auto-commit on success
    except Exception:
        conn.rollback()      # undo on error
        raise
    finally:
        conn.close()         # always close

# Usage:
with get_db() as conn:
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, email) VALUES (?,?)",
        ("Bob","bob@ex.com")
    )
    # auto-committed when block exits`})]})]})}function L(){return e.jsxs(e.Fragment,{children:[e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Flask + SQLite — Full Example"}),e.jsx(o,{lang:"py",showLines:!0,code:`from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)
DB  = "users.db"

def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id    INTEGER PRIMARY KEY AUTOINCREMENT,
                name  TEXT    NOT NULL,
                email TEXT    UNIQUE NOT NULL,
                score REAL    DEFAULT 0
            )
        """)

# GET /api/users — list all users
@app.route("/api/users")
def list_users():
    conn  = get_db()
    users = conn.execute("SELECT * FROM users").fetchall()
    conn.close()
    return jsonify([dict(u) for u in users])

# POST /api/users — create a user
@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    name  = data.get("name")
    email = data.get("email")
    if not name or not email:
        return jsonify({"error": "name and email required"}), 400
    try:
        conn = get_db()
        conn.execute(
            "INSERT INTO users (name, email) VALUES (?, ?)",
            (name, email)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "User created"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Email already exists"}), 409

# GET /api/users/<id> — get one user
@app.route("/api/users/<int:user_id>")
def get_user(user_id):
    conn = get_db()
    user = conn.execute(
        "SELECT * FROM users WHERE id = ?", (user_id,)
    ).fetchone()
    conn.close()
    if not user:
        return jsonify({"error": "Not found"}), 404
    return jsonify(dict(user))

if __name__ == "__main__":
    init_db()
    app.run(debug=True)`})]}),e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"Testing the API"}),e.jsx(o,{lang:"py",showLines:!0,code:`# Test with Python requests library
import requests

BASE = "http://localhost:5000/api"

# Create a user
res = requests.post(f"{BASE}/users", json={
    "name":  "Alice",
    "email": "alice@example.com"
})
print(res.json())   # {"message": "User created"}

# List all users
res = requests.get(f"{BASE}/users")
print(res.json())   # [{id:1, name:Alice, ...}]

# Get one user
res = requests.get(f"{BASE}/users/1")
print(res.json())   # {id:1, name:"Alice", email:...}`}),e.jsxs(i,{type:"tip",children:["This pattern — Flask + SQLite + JSON API — is the foundation for building full-stack web applications. Your JavaScript frontend calls these endpoints with ",e.jsx(a,{children:"fetch()"}),"."]})]})]})}function j(){const[n,l]=u.useState(()=>{try{return localStorage.getItem("cif_tab_sqlite")??"intro"}catch{return"intro"}}),c={intro:e.jsx(p,{}),create:e.jsx(g,{}),select:e.jsx(x,{}),update:e.jsx(y,{}),python:e.jsx(R,{}),flask:e.jsx(L,{})};return e.jsxs("div",{children:[e.jsx(d,{eyebrow:"SQLite · Beginner",title:"SQLite & Databases",sub:"Store data permanently — CREATE, SELECT, INSERT, UPDATE, DELETE + Python & Flask integration",color:s.sky}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:s.muted2,lineHeight:1.7,marginBottom:20},children:"Every real app needs to store data somewhere. Once you add a database to your projects, you stop losing data on restart, you can search and filter thousands of records instantly, and you can build things users actually rely on. SQL is also a skill that never goes out of date."}),e.jsx(E,{tabs:m,active:n,onChange:l,pageId:"sqlite"}),n==="quiz"?e.jsxs(t,{children:[e.jsx(r,{color:s.sky,children:"🎯 SQLite Quiz"}),e.jsx(h,{questions:T,trackId:"sqlite"})]}):c[n]]})]})}export{j as default};
