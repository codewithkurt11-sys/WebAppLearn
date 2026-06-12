import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"intro",   label:"What is SQLite?" },
  { id:"create",  label:"CREATE & INSERT" },
  { id:"select",  label:"SELECT & Filter" },
  { id:"update",  label:"UPDATE & DELETE" },
  { id:"python",  label:"Python sqlite3"  },
  { id:"flask",   label:"Flask + SQLite"  },
  { id:"quiz",    label:"Quiz 🎯"         },
];

const QUIZ: Question[] = [
  { q:"Which SQL command creates a new table?", opts:["INSERT","CREATE TABLE","NEW TABLE","MAKE TABLE"], ans:1, exp:"CREATE TABLE defines the structure (columns and types) for a new table." },
  { q:"Which command adds data to a table?", opts:["ADD","PUT","INSERT INTO","APPEND"], ans:2, exp:"INSERT INTO table_name (cols) VALUES (vals) adds a new row." },
  { q:"How do you filter rows in a SELECT?", opts:["FILTER BY","WHERE","HAVING","LIMIT"], ans:1, exp:"WHERE adds conditions to filter which rows are returned." },
  { q:"Which clause sorts results?", opts:["SORT BY","ORDER RESULTS","ORDER BY","ARRANGE BY"], ans:2, exp:"ORDER BY col ASC/DESC sorts the result set ascending or descending." },
  { q:"What does PRIMARY KEY do?", opts:["Encrypts the column","Ensures values are unique and not null","Sets the first column","Indexes all columns"], ans:1, exp:"PRIMARY KEY uniquely identifies each row. Often combined with AUTOINCREMENT to auto-generate IDs." },
  { q:"In Python, what method executes a SQL query?", opts:["cursor.run()","cursor.sql()","cursor.execute()","cursor.query()"], ans:2, exp:"cursor.execute(sql, params) runs a SQL statement. Use ? placeholders for safe parameterization." },
  { q:"Why use ? placeholders instead of f-strings in SQL?", opts:["They're faster","They prevent SQL injection attacks","They're required syntax","They handle NULL values"], ans:1, exp:"Never use f-strings or string formatting for SQL queries — it enables SQL injection. Always use ? placeholders." },
  { q:"Which sqlite3 method saves changes to the database file?", opts:["cursor.save()","conn.flush()","conn.commit()","cursor.write()"], ans:2, exp:"conn.commit() saves all pending changes. Without it, INSERT/UPDATE/DELETE changes are lost when you close the connection." },
  { q:"What does INTEGER PRIMARY KEY AUTOINCREMENT do?", opts:["Requires manual ID entry","Auto-generates a unique, incrementing integer ID for each new row","Creates a composite key","Encrypts the ID column"], ans:1, exp:"AUTOINCREMENT makes SQLite automatically assign the next available integer ID when you insert a row without specifying one. Most tables that store 'records' should have this." },
  { q:"Which SQL keyword removes duplicate rows from SELECT results?", opts:["UNIQUE","NODUPE","DISTINCT","FILTER"], ans:2, exp:"SELECT DISTINCT col FROM table returns only unique values in that column. Without DISTINCT, duplicate rows are returned." },
];

function TabIntro() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🗄 What is SQLite?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Most beginners skip databases and store everything in Python lists or text files — and then regret it the moment they need to search, sort, or keep data after the program closes. SQLite fixes all of that, and it's already installed with Python. You don't have to set up a server or create an account anywhere.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        SQLite is a <strong style={{ color:T.text }}>lightweight, file-based database</strong>. All your data lives in a single <IC>.db</IC> file that you can copy, back up, or share. And you query it with SQL — the same language used in every major database on the planet.
      </p>
      <InfoBox type="info">SQLite comes built into Python — no installation needed. Just <IC>import sqlite3</IC>.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📊 Database Concepts</CardTitle>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12 }}>
        {[
          { term:"Database", def:"A file that stores organized data (e.g. myapp.db)", color:T.sky },
          { term:"Table", def:"Like a spreadsheet — columns define structure, rows hold data", color:T.accent },
          { term:"Column", def:"A field in each row (e.g. name, age, email)", color:T.green },
          { term:"Row", def:"One record in the table (e.g. one user)", color:T.amber },
          { term:"PRIMARY KEY", def:"A unique ID for each row — usually auto-incremented", color:T.rose },
          { term:"SQL", def:"Structured Query Language — commands to create/read/update/delete data", color:T.muted2 },
        ].map(r => (
          <div key={r.term} style={{ display:"flex", gap:14, padding:"7px 0", borderBottom:`1px solid ${T.border}`, alignItems:"flex-start" }}>
            <span style={{ color:r.color, fontWeight:700, minWidth:110, flexShrink:0 }}>{r.term}</span>
            <span style={{ color:T.muted2, fontSize:11.5 }}>{r.def}</span>
          </div>
        ))}
      </div>
      <CodeBlock lang="py" code={`# How data looks in a table:\n# ID | name    | age | email\n# 1  | Alice   | 25  | alice@ex.com\n# 2  | Bob     | 30  | bob@ex.com\n# 3  | Eve     | 22  | eve@ex.com`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>SQL vs Python — When to Use Which</CardTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:T.sky, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>USE SQL FOR</div>
          <CodeBlock lang="sql" code={`-- Storing permanent data\n-- Searching / filtering\n-- Sorting results\n-- Counting, summing\n-- Joining related tables`}/>
        </div>
        <div>
          <div style={{ fontSize:10, color:T.accent, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>USE PYTHON FOR</div>
          <CodeBlock lang="py" code={`# Logic & calculations\n# User interfaces\n# Calling the database\n# Processing results\n# Web apps (Flask)`}/>
        </div>
      </div>
    </Card>
  </>);
}

function TabCreate() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>CREATE TABLE</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Create a users table\nCREATE TABLE IF NOT EXISTS users (\n    id      INTEGER PRIMARY KEY AUTOINCREMENT,\n    name    TEXT    NOT NULL,\n    email   TEXT    UNIQUE NOT NULL,\n    age     INTEGER,\n    score   REAL    DEFAULT 0.0,\n    created TEXT    DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Data types in SQLite:\n-- INTEGER  → whole numbers (1, 42, -5)\n-- REAL     → decimals (3.14, 9.99)\n-- TEXT     → strings ("Alice", "hello")\n-- BLOB     → binary data (images, files)\n-- NULL     → no value`}/>
      <InfoBox type="tip"><IC>PRIMARY KEY AUTOINCREMENT</IC> automatically assigns 1, 2, 3… to each new row. <IC>IF NOT EXISTS</IC> prevents errors if you run the script twice.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>INSERT INTO</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Insert one row\nINSERT INTO users (name, email, age)\nVALUES ('Alice', 'alice@example.com', 25);\n\n-- Insert with all columns (skip id — it's auto)\nINSERT INTO users (name, email, age, score)\nVALUES ('Bob', 'bob@example.com', 30, 88.5);\n\n-- Insert multiple rows at once\nINSERT INTO users (name, email, age) VALUES\n    ('Eve',   'eve@ex.com',  22),\n    ('Dan',   'dan@ex.com',  28),\n    ('Sarah', 'sarah@ex.com',35);`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Column Constraints</CardTitle>
      <CodeBlock lang="sql" showLines code={`CREATE TABLE products (\n    id       INTEGER PRIMARY KEY AUTOINCREMENT,\n    name     TEXT    NOT NULL,         -- cannot be empty\n    price    REAL    NOT NULL,\n    stock    INTEGER DEFAULT 0,        -- default value\n    sku      TEXT    UNIQUE,           -- no duplicates\n    category TEXT    CHECK(category IN ('food','tech','clothing'))\n);                                     -- must be one of these`}/>
    </Card>
  </>);
}

function TabSelect() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>SELECT — Read Data</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Get all columns, all rows\nSELECT * FROM users;\n\n-- Get specific columns\nSELECT name, email FROM users;\n\n-- Filter with WHERE\nSELECT * FROM users WHERE age > 25;\nSELECT * FROM users WHERE name = 'Alice';\nSELECT * FROM users WHERE score >= 80 AND age < 30;\nSELECT * FROM users WHERE name LIKE 'A%';  -- starts with A\nSELECT * FROM users WHERE email LIKE '%@gmail.com';\n\n-- Sort results\nSELECT * FROM users ORDER BY age ASC;    -- youngest first\nSELECT * FROM users ORDER BY score DESC; -- highest first\n\n-- Limit results\nSELECT * FROM users LIMIT 10;            -- first 10 rows\nSELECT * FROM users LIMIT 10 OFFSET 20; -- rows 21–30 (pagination)\n\n-- Count rows\nSELECT COUNT(*) FROM users;\nSELECT COUNT(*) FROM users WHERE age > 18;`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Aggregate Functions</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Math on columns\nSELECT AVG(age)   FROM users;   -- average age\nSELECT SUM(score) FROM users;   -- total score\nSELECT MAX(score) FROM users;   -- highest score\nSELECT MIN(age)   FROM users;   -- youngest\n\n-- Group by a column\nSELECT category, COUNT(*) as total\nFROM products\nGROUP BY category;\n-- Returns: food|5, tech|12, clothing|8\n\n-- Filter groups with HAVING\nSELECT category, AVG(price) as avg_price\nFROM products\nGROUP BY category\nHAVING avg_price > 20\nORDER BY avg_price DESC;`}/>
    </Card>
  </>);
}

function TabUpdate() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>UPDATE — Modify Data</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Update specific rows (ALWAYS use WHERE!)\nUPDATE users\nSET score = 95\nWHERE name = 'Alice';\n\n-- Update multiple columns\nUPDATE users\nSET age = 26, email = 'newemail@ex.com'\nWHERE id = 1;\n\n-- Update based on current value\nUPDATE products\nSET stock = stock - 1\nWHERE id = 42;\n\n-- Update all rows (rare — be careful!)\nUPDATE users SET active = 1;`}/>
      <InfoBox type="warn">⚠️ Always use <IC>WHERE</IC> with UPDATE and DELETE. Without it, you modify/delete EVERY row in the table.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>DELETE — Remove Data</CardTitle>
      <CodeBlock lang="sql" showLines code={`-- Delete specific rows\nDELETE FROM users WHERE id = 5;\nDELETE FROM users WHERE name = 'Bob';\nDELETE FROM users WHERE score < 50;\n\n-- Delete all rows (but keep the table)\nDELETE FROM users;\n\n-- Drop (delete) the entire table\nDROP TABLE IF EXISTS old_table;\n\n-- SQLite doesn't have TRUNCATE (just use DELETE FROM)`}/>
    </Card>
  </>);
}

function TabPython() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>Python sqlite3 Module</CardTitle>
      <CodeBlock lang="py" showLines code={`import sqlite3\n\n# 1. Connect (creates file if it doesn't exist)\nconn   = sqlite3.connect("myapp.db")\ncursor = conn.cursor()   # creates a "cursor" to execute SQL\n\n# 2. Create table\ncursor.execute("""\n    CREATE TABLE IF NOT EXISTS users (\n        id    INTEGER PRIMARY KEY AUTOINCREMENT,\n        name  TEXT    NOT NULL,\n        email TEXT    UNIQUE NOT NULL,\n        score REAL    DEFAULT 0\n    )\n""")\nconn.commit()   # SAVE the changes!\n\n# 3. Insert data (use ? placeholders — never f-strings!)\ncursor.execute(\n    "INSERT INTO users (name, email, score) VALUES (?, ?, ?)",\n    ("Alice", "alice@example.com", 95)\n)\nconn.commit()\n\n# 4. Query data\ncursor.execute("SELECT * FROM users WHERE score > ?", (80,))\nrows = cursor.fetchall()       # list of tuples\nfor row in rows:\n    print(row)                 # (1, "Alice", "alice@...", 95)\n\n# 5. Close when done\nconn.close()`}/>
      <InfoBox type="warn">Never build SQL with f-strings: <IC>{"f\"... WHERE name='{name}'\""}</IC> — this allows SQL injection. Always use <IC>?</IC> placeholders.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Row Factories — Get Dicts</CardTitle>
      <CodeBlock lang="py" showLines code={`import sqlite3\n\nconn = sqlite3.connect("myapp.db")\nconn.row_factory = sqlite3.Row   # ← makes rows dict-like!\ncursor = conn.cursor()\n\ncursor.execute("SELECT * FROM users")\nrows = cursor.fetchall()\n\nfor row in rows:\n    print(row["name"])     # access by column name\n    print(row["email"])    # instead of row[1]\n    print(dict(row))       # convert to real dict\n\n# Single row\ncursor.execute("SELECT * FROM users WHERE id = ?", (1,))\nuser = cursor.fetchone()   # returns one row or None\nif user:\n    print(f"Found: {user['name']}")`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Context Manager (Best Practice)</CardTitle>
      <CodeBlock lang="py" showLines code={`import sqlite3\nfrom contextlib import contextmanager\n\n@contextmanager\ndef get_db(path="myapp.db"):\n    conn = sqlite3.connect(path)\n    conn.row_factory = sqlite3.Row\n    try:\n        yield conn\n        conn.commit()        # auto-commit on success\n    except Exception:\n        conn.rollback()      # undo on error\n        raise\n    finally:\n        conn.close()         # always close\n\n# Usage:\nwith get_db() as conn:\n    cursor = conn.cursor()\n    cursor.execute(\n        "INSERT INTO users (name, email) VALUES (?,?)",\n        ("Bob","bob@ex.com")\n    )\n    # auto-committed when block exits`}/>
    </Card>
  </>);
}

function TabFlask() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>Flask + SQLite — Full Example</CardTitle>
      <CodeBlock lang="py" showLines code={`from flask import Flask, request, jsonify\nimport sqlite3\n\napp = Flask(__name__)\nDB  = "users.db"\n\ndef get_db():\n    conn = sqlite3.connect(DB)\n    conn.row_factory = sqlite3.Row\n    return conn\n\ndef init_db():\n    with get_db() as conn:\n        conn.execute("""\n            CREATE TABLE IF NOT EXISTS users (\n                id    INTEGER PRIMARY KEY AUTOINCREMENT,\n                name  TEXT    NOT NULL,\n                email TEXT    UNIQUE NOT NULL,\n                score REAL    DEFAULT 0\n            )\n        """)\n\n# GET /api/users — list all users\n@app.route("/api/users")\ndef list_users():\n    conn  = get_db()\n    users = conn.execute("SELECT * FROM users").fetchall()\n    conn.close()\n    return jsonify([dict(u) for u in users])\n\n# POST /api/users — create a user\n@app.route("/api/users", methods=["POST"])\ndef create_user():\n    data = request.get_json()\n    name  = data.get("name")\n    email = data.get("email")\n    if not name or not email:\n        return jsonify({"error": "name and email required"}), 400\n    try:\n        conn = get_db()\n        conn.execute(\n            "INSERT INTO users (name, email) VALUES (?, ?)",\n            (name, email)\n        )\n        conn.commit()\n        conn.close()\n        return jsonify({"message": "User created"}), 201\n    except sqlite3.IntegrityError:\n        return jsonify({"error": "Email already exists"}), 409\n\n# GET /api/users/<id> — get one user\n@app.route("/api/users/<int:user_id>")\ndef get_user(user_id):\n    conn = get_db()\n    user = conn.execute(\n        "SELECT * FROM users WHERE id = ?", (user_id,)\n    ).fetchone()\n    conn.close()\n    if not user:\n        return jsonify({"error": "Not found"}), 404\n    return jsonify(dict(user))\n\nif __name__ == "__main__":\n    init_db()\n    app.run(debug=True)`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Testing the API</CardTitle>
      <CodeBlock lang="py" showLines code={`# Test with Python requests library\nimport requests\n\nBASE = "http://localhost:5000/api"\n\n# Create a user\nres = requests.post(f"{BASE}/users", json={\n    "name":  "Alice",\n    "email": "alice@example.com"\n})\nprint(res.json())   # {"message": "User created"}\n\n# List all users\nres = requests.get(f"{BASE}/users")\nprint(res.json())   # [{id:1, name:Alice, ...}]\n\n# Get one user\nres = requests.get(f"{BASE}/users/1")\nprint(res.json())   # {id:1, name:"Alice", email:...}`}/>
      <InfoBox type="tip">This pattern — Flask + SQLite + JSON API — is the foundation for building full-stack web applications. Your JavaScript frontend calls these endpoints with <IC>fetch()</IC>.</InfoBox>
    </Card>
  </>);
}

export default function SQLitePage() {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("cif_tab_sqlite") ?? "intro"; } catch { return "intro"; }
  });
  const content: Record<string, React.ReactNode> = {
    intro:<TabIntro/>, create:<TabCreate/>, select:<TabSelect/>,
    update:<TabUpdate/>, python:<TabPython/>, flask:<TabFlask/>,
  };
  return (
    <div>
      <PageHeader eyebrow="SQLite · Beginner" title="SQLite & Databases" sub="Store data permanently — CREATE, SELECT, INSERT, UPDATE, DELETE + Python & Flask integration" color={T.sky}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Every real app needs to store data somewhere. Once you add a database to your projects, you stop losing data on restart, you can search and filter thousands of records instantly, and you can build things users actually rely on. SQL is also a skill that never goes out of date.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab} pageId="sqlite"/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.sky}>🎯 SQLite Quiz</CardTitle><Quiz questions={QUIZ} trackId="sqlite"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
