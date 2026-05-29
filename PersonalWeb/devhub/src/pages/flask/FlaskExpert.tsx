import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"sqlalchemy", label:"SQLAlchemy"  },
  { id:"auth",       label:"User Auth"   },
  { id:"rest",       label:"REST API"    },
  { id:"uploads",    label:"File Uploads"},
  { id:"security",   label:"Security"    },
  { id:"deploy",     label:"Deploy"      },
  { id:"quiz",       label:"Quiz 🎯"     },
];

const QUIZ: Question[] = [
  { q:"In SQLAlchemy, what does db.session.commit() do?", opts:["Opens a database connection","Saves pending changes to the database","Rolls back changes","Closes all sessions"], ans:1, exp:"db.session.commit() persists all staged changes (add, update, delete) to the database. Without it, changes are lost when the request ends." },
  { q:"What does bcrypt.check_password_hash(stored, entered) return?", opts:["The decrypted password","True if the password matches","The hash of entered","The user object"], ans:1, exp:"bcrypt.check_password_hash() compares a stored hash to a plaintext attempt and returns True or False — never stores or returns the plaintext." },
  { q:"Which HTTP status code means 'resource was created'?", opts:["200","201","204","400"], ans:1, exp:"201 Created is the correct response when a POST request successfully creates a new resource. 200 = OK, 204 = No Content, 400 = Bad Request." },
  { q:"What should you use instead of hardcoding SECRET_KEY?", opts:["A random string in code","Environment variable","A config.py file committed to git","No key needed"], ans:1, exp:"Always load secrets from environment variables (os.environ.get('SECRET_KEY')). Never commit secrets to version control." },
  { q:"What does CORS stand for and why is it needed for APIs?", opts:["Cross-Origin Resource Sharing — allows browser JS from other domains to call your API","Cross-Origin Request Security — blocks all API calls","Content-Origin Routing System — routes API requests","Code Origin Resolver — resolves import paths"], ans:0, exp:"CORS headers tell browsers it's safe to make requests from a different origin. Without them, browser JS from another domain gets blocked." },
  { q:"What is the purpose of a relationship() in SQLAlchemy?", opts:["Creates a SQL JOIN query","Defines a Python attribute to navigate between linked models","Validates foreign keys","Creates an index"], ans:1, exp:"relationship() lets you navigate between models in Python (e.g., user.posts) without writing JOIN queries — SQLAlchemy handles the SQL." },
  { q:"What is Gunicorn?", opts:["A Flask plugin","A production WSGI server for Python apps","A database ORM","A reverse proxy"], ans:1, exp:"Gunicorn (Green Unicorn) is a production-grade WSGI server. Flask's built-in server is for development only — Gunicorn handles real traffic." },
  { q:"What does jsonify() do in Flask?", opts:["Parses incoming JSON","Converts a Python dict to a JSON Response","Validates JSON schema","Encrypts JSON data"], ans:1, exp:"jsonify() converts a Python dict (or list) to a Flask Response with Content-Type: application/json. Use it for all API responses." },
  { q:"What does db.session.rollback() do and when should you use it?", opts:["Saves pending changes","Deletes all data","Undoes staged but uncommitted changes — call it in except blocks after a db error","Closes the database connection"], ans:2, exp:"rollback() reverts any changes made in the current session that haven't been committed. Always call it in an except block after a db.session.commit() fails to keep the session clean." },
  { q:"In Flask-Login, what does @login_required do?", opts:["Hashes the password","Redirects unauthenticated users to the login page","Creates a user session","Validates a token"], ans:1, exp:"@login_required is a decorator that checks if the current user is authenticated. If not, it redirects to the login_manager.login_view page. Put it on any route that needs to be protected." },
];

function TabSQLAlchemy() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Setup & Models</CardTitle>
      <CodeBlock lang="py" title="models.py" code={`from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id         = db.Column(db.Integer, primary_key=True)
    username   = db.Column(db.String(80), unique=True, nullable=False)
    email      = db.Column(db.String(120), unique=True, nullable=False)
    password   = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    posts = db.relationship("Post", backref="author", lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"

class Post(db.Model):
    __tablename__ = "posts"

    id         = db.Column(db.Integer, primary_key=True)
    title      = db.Column(db.String(200), nullable=False)
    body       = db.Column(db.Text, nullable=False)
    user_id    = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>App Setup & CRUD</CardTitle>
      <CodeBlock lang="py" title="app.py" code={`from flask import Flask
from models import db, User, Post
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL", "sqlite:///app.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()   # create tables if they don't exist

# CREATE
@app.route("/users", methods=["POST"])
def create_user():
    user = User(username="alice", email="alice@example.com", password="hashed")
    db.session.add(user)
    db.session.commit()
    return f"Created user id={user.id}"

# READ
@app.route("/users/<int:id>")
def get_user(id):
    user = User.query.get_or_404(id)
    return f"{user.username} has {len(user.posts)} posts"

# UPDATE
@app.route("/users/<int:id>/email", methods=["PUT"])
def update_email(id):
    user = User.query.get_or_404(id)
    user.email = request.json["email"]
    db.session.commit()
    return "Updated"

# DELETE
@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return "Deleted"`}/>
      <InfoBox type="tip"><IC>User.query.filter_by(username="alice").first()</IC> finds by attribute. <IC>User.query.all()</IC> returns all rows. <IC>get_or_404(id)</IC> auto-aborts with 404 if not found.</InfoBox>
    </Card>
  </>);
}

function TabAuth() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Password Hashing with bcrypt</CardTitle>
      <CodeBlock lang="py" code={`from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

# REGISTER — hash before saving
@app.route("/register", methods=["POST"])
def register():
    password = request.form["password"]
    hashed   = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(
        username=request.form["username"],
        email=request.form["email"],
        password=hashed
    )
    db.session.add(user)
    db.session.commit()
    return redirect(url_for("login"))

# LOGIN — check without revealing hash
@app.route("/login", methods=["POST"])
def login():
    user = User.query.filter_by(email=request.form["email"]).first()

    if user and bcrypt.check_password_hash(user.password, request.form["password"]):
        session["user_id"] = user.id
        flash("Welcome back!", "success")
        return redirect(url_for("dashboard"))

    flash("Invalid credentials.", "error")
    return redirect(url_for("login"))`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Login Required Decorator</CardTitle>
      <CodeBlock lang="py" code={`from functools import wraps
from flask import session, redirect, url_for, flash

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in first.", "warning")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

@app.route("/dashboard")
@login_required
def dashboard():
    user = User.query.get(session["user_id"])
    return render_template("dashboard.html", user=user)

@app.route("/logout")
@login_required
def logout():
    session.clear()
    flash("Logged out.", "info")
    return redirect(url_for("index"))`}/>
    </Card>
  </>);
}

function TabRest() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Building a REST API</CardTitle>
      <CodeBlock lang="py" title="api/posts.py" code={`from flask import Blueprint, jsonify, request
from models import db, Post

api = Blueprint("api", __name__, url_prefix="/api/v1")

# GET all posts
@api.route("/posts")
def get_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([{
        "id":    p.id,
        "title": p.title,
        "body":  p.body,
        "author": p.author.username,
    } for p in posts])

# GET single post
@api.route("/posts/<int:id>")
def get_post(id):
    post = Post.query.get_or_404(id)
    return jsonify({ "id": post.id, "title": post.title, "body": post.body })

# POST — create new post
@api.route("/posts", methods=["POST"])
def create_post():
    data = request.get_json()
    if not data or not data.get("title"):
        return jsonify({"error": "title is required"}), 400

    post = Post(title=data["title"], body=data.get("body",""), user_id=1)
    db.session.add(post)
    db.session.commit()
    return jsonify({"id": post.id, "title": post.title}), 201

# DELETE
@api.route("/posts/<int:id>", methods=["DELETE"])
def delete_post(id):
    post = Post.query.get_or_404(id)
    db.session.delete(post)
    db.session.commit()
    return "", 204`}/>
      <InfoBox type="info">REST conventions: GET = read, POST = create, PUT/PATCH = update, DELETE = remove. Use 201 for created, 204 for no-content (successful delete).</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>CORS for Frontend Clients</CardTitle>
      <CodeBlock lang="py" code={`from flask_cors import CORS

app = Flask(__name__)
CORS(app)                          # allow all origins (dev only)

# Production — restrict to your frontend domain
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://myapp.com", "https://www.myapp.com"]
    }
})`}/>
    </Card>
  </>);
}

function TabUploads() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Secure File Uploads</CardTitle>
      <CodeBlock lang="py" code={`import os, uuid
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = "static/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "pdf"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = MAX_FILE_SIZE
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/profile/photo", methods=["POST"])
@login_required
def upload_photo():
    if "photo" not in request.files:
        return jsonify({"error": "No file sent"}), 400

    file = request.files["photo"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400
    if not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 415

    ext      = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{uuid.uuid4().hex}.{ext}"   # unique name
    path     = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(path)

    # Save path to user profile in DB
    user = User.query.get(session["user_id"])
    user.avatar = filename
    db.session.commit()

    return jsonify({"url": f"/static/uploads/{filename}"}), 201`}/>
      <InfoBox type="warn">Always use <IC>secure_filename()</IC> and generate a UUID filename. Never trust the user's original filename — it could contain path traversal attacks like <IC>../../etc/passwd</IC>.</InfoBox>
    </Card>
  </>);
}

function TabSecurity() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Environment Variables for Secrets</CardTitle>
      <CodeBlock lang="py" code={`import os
from dotenv import load_dotenv

load_dotenv()  # reads .env file in development

app.config["SECRET_KEY"]     = os.environ["SECRET_KEY"]
app.config["DATABASE_URL"]   = os.environ["DATABASE_URL"]
app.config["MAIL_PASSWORD"]  = os.environ.get("MAIL_PASSWORD")

# .env file (NEVER commit to git)
# SECRET_KEY=some-random-64-char-string
# DATABASE_URL=postgresql://user:pass@localhost/mydb`}/>
      <InfoBox type="warn">Add <IC>.env</IC> to your <IC>.gitignore</IC> immediately. A leaked <IC>SECRET_KEY</IC> lets attackers forge session cookies.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>CSRF Protection</CardTitle>
      <CodeBlock lang="py" code={`from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)

# In every form template, add:
# <input type="hidden" name="csrf_token" value="{{ csrf_token() }}">

# Or with Flask-WTF forms — automatic`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Rate Limiting</CardTitle>
      <CodeBlock lang="py" code={`from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(app, key_func=get_remote_address)

@app.route("/login", methods=["POST"])
@limiter.limit("5 per minute")   # max 5 login attempts/min per IP
def login():
    ...

@app.route("/api/data")
@limiter.limit("100 per hour")
def api_data():
    ...`}/>
    </Card>
  </>);
}

function TabDeploy() {
  return (<>
    <Card>
      <CardTitle color={T.green}>Gunicorn — Production Server</CardTitle>
      <CodeBlock lang="bash" code={`# Install
pip install gunicorn

# Run — 4 worker processes on port 8000
gunicorn -w 4 -b 0.0.0.0:8000 app:app

# With a .env file loaded
gunicorn -w 4 -b 0.0.0.0:8000 --env-file .env app:app`}/>
      <InfoBox type="info">Flask's built-in <IC>app.run()</IC> is single-threaded and not safe for production. Gunicorn spawns multiple workers to handle concurrent requests.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>Procfile (for Heroku / Render)</CardTitle>
      <CodeBlock lang="bash" title="Procfile" code={`web: gunicorn app:app --bind 0.0.0.0:$PORT`}/>
      <CodeBlock lang="bash" title="requirements.txt" code={`flask==3.0.3
flask-sqlalchemy==3.1.1
flask-bcrypt==1.0.1
flask-cors==4.0.0
gunicorn==22.0.0
python-dotenv==1.0.1`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>Checklist Before Going Live</CardTitle>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {[
          ["❌ Never", "debug=True in production"],
          ["✅ Use", "Environment variables for all secrets"],
          ["✅ Use", "Gunicorn (not Flask dev server)"],
          ["✅ Enable", "HTTPS (via Nginx or cloud provider)"],
          ["✅ Set", "SQLALCHEMY_POOL_RECYCLE for long-running apps"],
          ["✅ Add", "Logging to file or monitoring service"],
          ["✅ Set", "MAX_CONTENT_LENGTH to limit upload size"],
        ].map(([status, text]) => (
          <div key={text} style={{ display:"flex", gap:10, fontSize:12.5, padding:"6px 10px", background:status==="✅ Use"||status==="✅ Enable"||status==="✅ Set"||status==="✅ Add" ? "rgba(52,211,153,.06)" : "rgba(251,113,133,.06)", borderRadius:7, border:`1px solid ${status.startsWith("✅") ? "rgba(52,211,153,.2)" : "rgba(251,113,133,.2)"}` }}>
            <span style={{ flexShrink:0 }}>{status}</span>
            <span style={{ color:T.muted2 }}>{text}</span>
          </div>
        ))}
      </div>
    </Card>
  </>);
}

export default function FlaskExpert() {
  const [tab, setTab] = useState("sqlalchemy");
  return (
    <div style={{ padding:"0 0 40px" }}>
      <PageHeader eyebrow="Flask • Expert" title="Flask Expert" sub="SQLAlchemy ORM, user auth, REST APIs, file uploads, security best practices, and production deployment." color={T.green}/>
      <div style={{ padding:"0 16px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          This is what production Flask looks like. SQLAlchemy ORM, bcrypt passwords, JWT-style auth, REST APIs, and deployment to a real server are the exact skills listed in backend web developer job postings. A portfolio project using all of these is genuinely impressive.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab === "sqlalchemy" && <TabSQLAlchemy/>}
        {tab === "auth"       && <TabAuth/>}
        {tab === "rest"       && <TabRest/>}
        {tab === "uploads"    && <TabUploads/>}
        {tab === "security"   && <TabSecurity/>}
        {tab === "deploy"     && <TabDeploy/>}
        {tab === "quiz"       && <Card><CardTitle color={T.green}>Quiz — Flask Expert</CardTitle><Quiz questions={QUIZ}/></Card>}
      </div>
    </div>
  );
}
