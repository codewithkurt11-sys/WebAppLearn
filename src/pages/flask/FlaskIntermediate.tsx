import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"jinja2",   label:"Jinja2"         },
  { id:"forms",    label:"Forms"          },
  { id:"blueprints", label:"Blueprints"   },
  { id:"sessions", label:"Sessions"       },
  { id:"sqlite",   label:"SQLite"         },
  { id:"errors",   label:"Error Handling" },
  { id:"quiz",     label:"Quiz 🎯"        },
];

const QUIZ: Question[] = [
  { q:"In Jinja2, which tag is used to extend a base template?", opts:["{% include %}","{% block %}","{% extends %}","{% import %}"], ans:2, exp:"{% extends 'base.html' %} makes a child template inherit the layout from a parent. Child blocks override parent blocks." },
  { q:"How do you access form data submitted via POST in Flask?", opts:["request.get('name')","request.args['name']","request.form['name']","form.data['name']"], ans:2, exp:"request.form['name'] (or request.form.get('name')) accesses POST body data. request.args is for URL query parameters." },
  { q:"What is a Flask Blueprint?", opts:["A database model","A way to split routes into separate files","A template engine","A form validator"], ans:1, exp:"Blueprints let you organize Flask routes into modular groups. You register them on the app with app.register_blueprint()." },
  { q:"How do you store data in a Flask session?", opts:["cache['key'] = value","session['key'] = value","request.session['key'] = value","flask.store('key', value)"], ans:1, exp:"session is a dict-like object from flask import session. It's cryptographically signed using SECRET_KEY and stored in a cookie." },
  { q:"Which method safely prevents SQL injection in Flask-SQLite?", opts:["f-string formatting","String concatenation","Parameterised queries with ?","json.dumps()"], ans:2, exp:"Always use parameterised queries: cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,)). Never concatenate user input into SQL." },
  { q:"Which HTTP code means 'page not found'?", opts:["200","301","403","404"], ans:3, exp:"404 is Not Found. 200 = OK, 301 = Redirect, 403 = Forbidden. Use abort(404) or return render_template('404.html'), 404 in Flask." },
  { q:"What does flash() do in Flask?", opts:["Sends an email","Stores a one-time message in session","Clears all cookies","Redirects the user"], ans:1, exp:"flash('message') stores a one-time message in the session. get_flashed_messages() retrieves and clears them — great for success/error alerts." },
  { q:"What is the purpose of url_for() in Jinja2?", opts:["Creates external URLs","Generates URLs from route function names","Encodes URL parameters","Validates form URLs"], ans:1, exp:"url_for('route_function') generates the URL for a route, so you don't hardcode paths. url_for('index') returns '/' if your index route is '/'." },
  { q:"In a Blueprint, what does url_prefix='/auth' do?", opts:["Restricts access to admin users","Adds /auth before all routes in that blueprint","Encrypts auth routes","Sets the blueprint's name"], ans:1, exp:"url_prefix='/auth' means every route in the blueprint gets /auth prepended — so @auth.route('/login') becomes /auth/login. This keeps related routes grouped under a common path." },
  { q:"What is the correct way to get a flashed message in a Jinja2 template?", opts:["{{ session.flash }}","{% for msg in flash() %}","{% with msgs = get_flashed_messages() %}{% for msg in msgs %}","{{ get_flash() }}"], ans:2, exp:"{% with messages = get_flashed_messages() %}{% for message in messages %}{{ message }}{% endfor %}{% endwith %} — get_flashed_messages() clears the messages as it retrieves them." },
];

function TabJinja() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Template Inheritance</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Jinja2's most powerful feature: define a <strong style={{ color:T.text }}>base layout</strong> once, then extend it in every page — no copy-paste.
      </p>
      <CodeBlock lang="html" title="templates/base.html" code={`<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}My Site{% endblock %}</title>
  <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
<body>
  <nav>
    <a href="{{ url_for('index') }}">Home</a>
    <a href="{{ url_for('about') }}">About</a>
  </nav>

  <main>
    {% block content %}{% endblock %}
  </main>

  <footer>© 2025 My Site</footer>
</body>
</html>`}/>
      <CodeBlock lang="html" title="templates/index.html" code={`{% extends "base.html" %}

{% block title %}Home — My Site{% endblock %}

{% block content %}
  <h1>Welcome, {{ user.name }}!</h1>
  {% if user.is_admin %}
    <p>You have admin access.</p>
  {% endif %}
{% endblock %}`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Loops, Filters, and Expressions</CardTitle>
      <CodeBlock lang="html" title="templates/products.html" code={`{% extends "base.html" %}
{% block content %}

<h2>Products ({{ products | length }} items)</h2>

<ul>
{% for product in products %}
  <li>
    {{ loop.index }}. {{ product.name | title }}
    — \${{ product.price | round(2) }}
    {% if product.stock == 0 %}
      <span class="out">Out of stock</span>
    {% elif product.stock < 5 %}
      <span class="low">Only {{ product.stock }} left!</span>
    {% endif %}
  </li>
{% else %}
  <li>No products found.</li>
{% endfor %}
</ul>

{# This is a Jinja2 comment — not in the HTML output #}
{% endblock %}`}/>
      <InfoBox type="info">Useful filters: <IC>| upper</IC>, <IC>| lower</IC>, <IC>| title</IC>, <IC>| length</IC>, <IC>| default('N/A')</IC>, <IC>| round(2)</IC>, <IC>| truncate(50)</IC></InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>Macros — Reusable Components</CardTitle>
      <CodeBlock lang="html" title="templates/macros.html" code={`{% macro input(name, label, type="text", value="") %}
  <div class="form-group">
    <label for="{{ name }}">{{ label }}</label>
    <input
      type="{{ type }}"
      id="{{ name }}"
      name="{{ name }}"
      value="{{ value }}"
    >
  </div>
{% endmacro %}

{# Using the macro in another template #}
{% from "macros.html" import input %}

<form method="POST">
  {{ input("username", "Username") }}
  {{ input("email",    "Email",    type="email") }}
  {{ input("password", "Password", type="password") }}
  <button type="submit">Register</button>
</form>`}/>
    </Card>
  </>);
}

function TabForms() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Handling HTML Forms</CardTitle>
      <CodeBlock lang="py" title="app.py" code={`from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name  = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        msg   = request.form.get("message", "").strip()

        errors = []
        if not name:    errors.append("Name is required.")
        if not email:   errors.append("Email is required.")
        if len(msg) < 10: errors.append("Message too short.")

        if errors:
            return render_template("contact.html", errors=errors,
                                   name=name, email=email, msg=msg)

        # process the form (save to DB, send email, etc.)
        return redirect(url_for("thank_you"))

    return render_template("contact.html", errors=[])`}/>
      <CodeBlock lang="html" title="templates/contact.html" code={`{% extends "base.html" %}
{% block content %}
<form method="POST" action="/contact">
  {% for error in errors %}
    <p class="error">{{ error }}</p>
  {% endfor %}

  <input name="name"    value="{{ name    | default('') }}">
  <input name="email"   value="{{ email   | default('') }}">
  <textarea name="message">{{ msg | default('') }}</textarea>
  <button type="submit">Send</button>
</form>
{% endblock %}`}/>
      <InfoBox type="tip">Always use <IC>request.form.get("field")</IC> instead of <IC>request.form["field"]</IC> to avoid a 400 error if the field is missing.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>File Uploads</CardTitle>
      <CodeBlock lang="py" code={`import os
from flask import request
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "uploads"
ALLOWED = {"png", "jpg", "jpeg", "gif", "pdf"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5MB limit

def allowed(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files.get("photo")
    if not file or file.filename == "":
        return "No file", 400
    if not allowed(file.filename):
        return "File type not allowed", 400
    safe_name = secure_filename(file.filename)
    file.save(os.path.join(app.config["UPLOAD_FOLDER"], safe_name))
    return f"Uploaded: {safe_name}"`}/>
    </Card>
  </>);
}

function TabBlueprints() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Why Blueprints?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        As your app grows, one <IC>app.py</IC> gets messy. Blueprints let you split routes into <strong style={{ color:T.text }}>separate modules</strong> by feature.
      </p>
      <CodeBlock lang="bash" code={`myapp/
├── app.py              # create app, register blueprints
├── auth/
│   ├── __init__.py
│   └── routes.py       # /login, /logout, /register
├── blog/
│   ├── __init__.py
│   └── routes.py       # /posts, /posts/<id>
└── templates/
    ├── auth/
    └── blog/`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Creating a Blueprint</CardTitle>
      <CodeBlock lang="py" title="auth/routes.py" code={`from flask import Blueprint, render_template, redirect, url_for, session

auth = Blueprint("auth", __name__, url_prefix="/auth")

@auth.route("/login", methods=["GET", "POST"])
def login():
    return render_template("auth/login.html")

@auth.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("blog.index"))

@auth.route("/register", methods=["GET", "POST"])
def register():
    return render_template("auth/register.html")`}/>
      <CodeBlock lang="py" title="app.py" code={`from flask import Flask
from auth.routes import auth
from blog.routes import blog

app = Flask(__name__)
app.secret_key = "your-secret-key"

app.register_blueprint(auth)   # routes at /auth/login, /auth/logout
app.register_blueprint(blog)   # routes at /blog/...

if __name__ == "__main__":
    app.run(debug=True)`}/>
      <InfoBox type="info">Use <IC>url_for("auth.login")</IC> — prefix with the blueprint name — to generate URLs for blueprint routes.</InfoBox>
    </Card>
  </>);
}

function TabSessions() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Flask Sessions</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Flask's <IC>session</IC> stores data in a <strong style={{ color:T.text }}>signed cookie</strong> on the client. It survives page loads but requires a <IC>SECRET_KEY</IC>.
      </p>
      <CodeBlock lang="py" code={`from flask import Flask, session, redirect, url_for

app = Flask(__name__)
app.secret_key = "super-secret-key-change-in-production"

@app.route("/set-theme/<theme>")
def set_theme(theme):
    session["theme"] = theme
    return redirect(url_for("index"))

@app.route("/")
def index():
    theme = session.get("theme", "dark")   # default = "dark"
    return f"Current theme: {theme}"

@app.route("/clear")
def clear():
    session.clear()
    return redirect(url_for("index"))`}/>
      <InfoBox type="warn">Never store sensitive data (passwords, tokens) in the session cookie. The data is signed (tamper-proof) but NOT encrypted — users can read it.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>Flash Messages</CardTitle>
      <CodeBlock lang="py" title="app.py" code={`from flask import flash, get_flashed_messages

@app.route("/save", methods=["POST"])
def save():
    # ... save to database ...
    flash("Saved successfully!", "success")
    return redirect(url_for("index"))

@app.route("/delete/<int:id>")
def delete(id):
    # ... delete from database ...
    flash("Item deleted.", "warning")
    return redirect(url_for("index"))`}/>
      <CodeBlock lang="html" title="templates/base.html" code={`{% for category, message in get_flashed_messages(with_categories=true) %}
  <div class="alert alert-{{ category }}">
    {{ message }}
  </div>
{% endfor %}`}/>
    </Card>
  </>);
}

function TabSQLite() {
  return (<>
    <Card>
      <CardTitle color={T.green}>SQLite with Flask</CardTitle>
      <CodeBlock lang="py" title="app.py" code={`import sqlite3
from flask import Flask, g

app = Flask(__name__)
DATABASE = "app.db"

def get_db():
    """Get (or create) a DB connection for this request."""
    if "db" not in g:
        g.db = sqlite3.connect(DATABASE)
        g.db.row_factory = sqlite3.Row  # rows behave like dicts
    return g.db

@app.teardown_appcontext
def close_db(error):
    """Close the connection after each request."""
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    """Create tables on first run."""
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS posts (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            body  TEXT NOT NULL,
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    db.commit()`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>CRUD Routes</CardTitle>
      <CodeBlock lang="py" code={`@app.route("/posts")
def list_posts():
    db = get_db()
    posts = db.execute("SELECT * FROM posts ORDER BY created DESC").fetchall()
    return render_template("posts.html", posts=posts)

@app.route("/posts/new", methods=["GET", "POST"])
def new_post():
    if request.method == "POST":
        title = request.form["title"].strip()
        body  = request.form["body"].strip()
        if not title:
            flash("Title is required.", "error")
        else:
            db = get_db()
            db.execute("INSERT INTO posts (title, body) VALUES (?, ?)",
                       (title, body))
            db.commit()
            flash("Post created!", "success")
            return redirect(url_for("list_posts"))
    return render_template("new_post.html")

@app.route("/posts/<int:id>/delete", methods=["POST"])
def delete_post(id):
    db = get_db()
    db.execute("DELETE FROM posts WHERE id = ?", (id,))
    db.commit()
    flash("Post deleted.", "warning")
    return redirect(url_for("list_posts"))`}/>
      <InfoBox type="warn">Always use <IC>?</IC> placeholders — never f-strings or string concatenation in SQL. This prevents SQL injection attacks.</InfoBox>
    </Card>
  </>);
}

function TabErrors() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Custom Error Pages</CardTitle>
      <CodeBlock lang="py" code={`from flask import render_template

@app.errorhandler(404)
def not_found(e):
    return render_template("errors/404.html"), 404

@app.errorhandler(403)
def forbidden(e):
    return render_template("errors/403.html"), 403

@app.errorhandler(500)
def server_error(e):
    return render_template("errors/500.html"), 500

# Trigger manually:
from flask import abort
@app.route("/admin")
def admin():
    if not session.get("is_admin"):
        abort(403)   # raises 403 Forbidden
    return "Admin panel"`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Logging & Debug Tips</CardTitle>
      <CodeBlock lang="py" code={`import logging

# In production, log to a file
if not app.debug:
    logging.basicConfig(
        filename="app.log",
        level=logging.INFO,
        format="%(asctime)s %(levelname)s: %(message)s"
    )

@app.route("/risky")
def risky():
    try:
        result = 1 / 0
    except ZeroDivisionError:
        app.logger.error("Division by zero in /risky")
        abort(500)
    return str(result)`}/>
      <InfoBox type="tip">Only run with <IC>debug=True</IC> in development. In production, use <IC>FLASK_ENV=production</IC> and a proper WSGI server like Gunicorn.</InfoBox>
    </Card>
  </>);
}

export default function FlaskIntermediate() {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("cif_tab_flask-inter") ?? "jinja2"; } catch { return "jinja2"; }
  });
  return (
    <div style={{ padding:"0 0 40px" }}>
      <PageHeader eyebrow="Flask • Intermediate" title="Flask Intermediate" sub="Jinja2 templates, forms, blueprints, sessions, flash messages, and SQLite integration." color={T.green}/>
      <div style={{ padding:"0 16px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Jinja2 template inheritance, Blueprints, and session handling are what turn a toy Flask app into something you could actually show a user. Every non-trivial Flask project uses all three. This is the step where apps start looking and feeling like real software.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab} pageId="flask-inter"/>
        {tab === "jinja2"      && <TabJinja/>}
        {tab === "forms"       && <TabForms/>}
        {tab === "blueprints"  && <TabBlueprints/>}
        {tab === "sessions"    && <TabSessions/>}
        {tab === "sqlite"      && <TabSQLite/>}
        {tab === "errors"      && <TabErrors/>}
        {tab === "quiz"        && <Card><CardTitle color={T.green}>Quiz — Flask Intermediate</CardTitle><Quiz questions={QUIZ} trackId="flask-inter"/></Card>}
      </div>
    </div>
  );
}
