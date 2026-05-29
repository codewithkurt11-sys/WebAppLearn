import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"intro",    label:"How Flask Works" },
  { id:"testf",    label:"testf.py Explained" },
  { id:"routes",   label:"Routes" },
  { id:"requests", label:"Requests" },
  { id:"responses",label:"Responses" },
  { id:"templates",label:"Templates" },
  { id:"simulator",label:"🔴 Live Simulator" },
  { id:"quiz",     label:"Quiz 🎯" },
];

const QUIZ: Question[] = [
  { q:"Which decorator registers a URL route in Flask?", opts:["@flask.url","@app.route()","@route()","@http.get()"], ans:1, exp:"@app.route('/path') is the standard Flask decorator for registering URL routes." },
  { q:"What does request.args.get('name') do?", opts:["Gets a POST form value","Gets a URL query string value","Gets an HTTP header","Gets a cookie"], ans:1, exp:"request.args reads from the URL query string — e.g. /greet?name=Alice gives 'Alice'." },
  { q:"Which import do you need to return JSON from Flask?", opts:["from flask import json","from flask import jsonify","import flask_json","from flask import response"], ans:1, exp:"jsonify() converts a Python dict to a proper JSON HTTP response with correct Content-Type header." },
  { q:"What does debug=True do?", opts:["Enables HTTPS","Auto-reloads on code changes + shows errors","Speeds up requests","Disables logging"], ans:1, exp:"debug=True enables the auto-reloader and the interactive debugger in the browser." },
  { q:"How do you get POST form data?", opts:["request.args.get()","request.query.get()","request.form.get()","request.body.get()"], ans:2, exp:"request.form.get('field') reads from HTML form POST data. request.args reads from the URL." },
  { q:"What does the @app.route decorator's methods= argument do?", opts:["Sets the HTTP status code","Specifies allowed HTTP methods (GET, POST, etc.)","Sets headers","Adds middleware"], ans:1, exp:"methods=['GET','POST'] tells Flask which HTTP methods this route accepts. Default is GET only." },
  { q:"In Jinja2, how do you print a variable?", opts:["<% name %>","{{ name }}","<= name =>","[[ name ]]"], ans:1, exp:"{{ variable }} outputs a variable in Jinja2 templates. {% %} is for logic (if, for)." },
  { q:"Which command runs a Flask app on Alpine Linux (Acode)?", opts:["pip run flask","python -m flask","python3 ~/testf.py","flask serve"], ans:2, exp:"python3 ~/testf.py runs the file directly. Make sure to use the terminal, NOT the play button." },
  { q:"What does redirect(url_for('index')) do in Flask?", opts:["Renders the index template","Sends the user's browser to the index route URL","Returns JSON","Logs the request"], ans:1, exp:"redirect() sends an HTTP 302 response that tells the browser to go to another URL. url_for('index') generates the URL for the function named 'index'." },
  { q:"What is the purpose of app.secret_key?", opts:["It sets the admin password","It encrypts the database","It's required for sessions and flash messages to work securely","It sets the SSL certificate"], ans:2, exp:"Flask uses secret_key to cryptographically sign session cookies and flash messages. Without it, sessions are disabled. Never hardcode it in production — use an environment variable." },
];

// ─── Live URL Simulator ────────────────────────────────────────────
const ROUTES_DB: Record<string, (params: Record<string,string>) => string> = {
  "/":        () => "Hello, World!",
  "/hello":   (p) => `Hello, ${p.name || "Flask"}!`,
  "/greet":   (p) => `Hey ${p.name || "stranger"}, welcome!`,
  "/about":   () => "This is my Flask app — built with Python 🐍",
  "/api/user":(p) => JSON.stringify({ id: 1, name: p.name || "Alice", role: "user" }, null, 2),
  "/square":  (p) => { const n = parseFloat(p.n || "5"); return `${n}² = ${n*n}`; },
  "/add":     (p) => { const a = parseFloat(p.a||"0"), b = parseFloat(p.b||"0"); return `${a} + ${b} = ${a+b}`; },
};

function LiveSimulator() {
  const [path, setPath]     = useState("/hello");
  const [params, setParams] = useState("name=Alice");
  const [method, setMethod] = useState("GET");

  const parseParams = (s: string): Record<string,string> => {
    const out: Record<string,string> = {};
    s.split("&").forEach(pair => {
      const [k,v] = pair.split("=");
      if (k) out[k.trim()] = (v||"").trim();
    });
    return out;
  };

  const fullUrl   = `http://localhost:5000${path}${params ? "?" + params : ""}`;
  const routeKey  = Object.keys(ROUTES_DB).find(k => path.startsWith(k)) || null;
  const response  = routeKey ? ROUTES_DB[routeKey](parseParams(params)) : `404 Not Found\n\nNo route found for: ${path}\n\nAvailable routes:\n${Object.keys(ROUTES_DB).join("\n")}`;
  const isJson    = response.startsWith("{") || response.startsWith("[");
  const status    = routeKey ? 200 : 404;

  const PRESET_ROUTES = Object.keys(ROUTES_DB);

  return (
    <div>
      <Card>
        <CardTitle color={T.rose}>🔴 Live URL Simulator</CardTitle>
        <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:16 }}>
          Type a Flask route and query params — see the response instantly. This simulates a real Flask server running locally.
        </p>

        {/* Preset buttons */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
          {PRESET_ROUTES.map(r => (
            <button key={r} onClick={() => setPath(r)} style={{
              fontSize:10, fontFamily:"'Fira Code',monospace",
              padding:"4px 10px", borderRadius:5,
              border:`1px solid ${path===r?T.green:T.border2}`,
              background: path===r ? "rgba(52,211,153,.1)" : "transparent",
              color: path===r ? T.green : T.muted2, cursor:"pointer", transition:"all .15s",
            }}>{r}</button>
          ))}
        </div>

        {/* URL bar */}
        <div style={{ background:T.bg2, border:`1px solid ${T.border2}`, borderRadius:9, padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <select value={method} onChange={e => setMethod(e.target.value)} style={{
            background:T.surface2, border:`1px solid ${T.border2}`, borderRadius:5, color:T.amber,
            fontFamily:"'Fira Code',monospace", fontSize:11, padding:"4px 8px", cursor:"pointer",
          }}>
            <option>GET</option>
            <option>POST</option>
          </select>
          <span style={{ color:T.muted2, fontFamily:"'Fira Code',monospace", fontSize:11 }}>localhost:5000</span>
          <input
            value={path} onChange={e => setPath(e.target.value)}
            style={{ background:"transparent", border:"none", outline:"none", color:T.text, fontFamily:"'Fira Code',monospace", fontSize:12, flex:1, minWidth:80 }}
            placeholder="/route"
          />
          {params && <span style={{ color:T.muted2, fontFamily:"'Fira Code',monospace", fontSize:11 }}>?</span>}
          <input
            value={params} onChange={e => setParams(e.target.value)}
            style={{ background:"transparent", border:"none", outline:"none", color:T.sky, fontFamily:"'Fira Code',monospace", fontSize:11, minWidth:120, flex:1 }}
            placeholder="key=value&key2=value2"
          />
        </div>

        {/* Full URL preview */}
        <div style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:T.muted, marginBottom:14, wordBreak:"break-all" }}>
          → <span style={{ color:T.muted2 }}>{fullUrl}</span>
        </div>

        {/* Response */}
        <div style={{ background:T.bg, border:`1px solid ${status===200?T.green:T.rose}`, borderRadius:10, overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 14px", background:"rgba(255,255,255,.02)", borderBottom:`1px solid ${T.border}` }}>
            <span style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:status===200?T.green:T.rose, fontWeight:700 }}>{status} {status===200?"OK":"Not Found"}</span>
            {isJson && <span style={{ fontSize:9, fontFamily:"'Fira Code',monospace", color:T.sky, letterSpacing:"1px", border:"1px solid rgba(56,189,248,0.2)", padding:"1px 6px", borderRadius:3 }}>JSON</span>}
            <span style={{ flex:1 }}/>
            <span style={{ fontSize:9, color:T.muted, fontFamily:"'Fira Code',monospace" }}>Content-Type: {isJson?"application/json":"text/html"}</span>
          </div>
          <pre style={{ padding:"14px 18px", fontFamily:"'Fira Code',monospace", fontSize:12.5, color:status===200?T.green:T.rose, whiteSpace:"pre-wrap", wordBreak:"break-word", lineHeight:1.6 }}>
            {response}
          </pre>
        </div>
      </Card>

      {/* Flask code that powers this */}
      <Card>
        <CardTitle color={T.accent}>The Flask code behind these routes</CardTitle>
        <CodeBlock lang="py" showLines code={`from flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "Hello, World!"\n\n@app.route("/hello")\ndef hello():\n    name = request.args.get("name", "Flask")  # ?name=Alice\n    return f"Hello, {name}!"\n\n@app.route("/api/user")\ndef api_user():\n    name = request.args.get("name", "Alice")\n    return jsonify({"id": 1, "name": name, "role": "user"})\n\n@app.route("/square")\ndef square():\n    n = float(request.args.get("n", 5))\n    return f"{n}² = {n**2}"\n\nif __name__ == "__main__":\n    app.run(debug=True)`}/>
      </Card>
    </div>
  );
}

function TabIntro() {
  return (<>
    <Card>
      <CardTitle color={T.green}>🌶 What is Flask?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Flask is a <strong style={{ color:T.text }}>micro web framework</strong> for Python. It lets you create a web server — URLs that your browser can visit — using just a few lines of Python code. No complex setup required.
      </p>
      <InfoBox type="info">Flask is called "micro" not because it's limited, but because it doesn't include everything by default — you add only what you need.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>🔄 How a Web Request Works</CardTitle>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:11.5, lineHeight:2, color:T.muted2 }}>
        {[
          { step:"1", label:"Browser types URL", icon:"🌐", color:T.sky },
          { step:"2", label:"HTTP Request sent to Flask server", icon:"→", color:T.accent },
          { step:"3", label:"Flask matches the URL to a route (@app.route)", icon:"🔍", color:T.amber },
          { step:"4", label:"Python function runs, returns a response", icon:"⚙️", color:T.green },
          { step:"5", label:"Browser displays the response", icon:"✓", color:T.rose },
        ].map(r => (
          <div key={r.step} style={{ display:"flex", alignItems:"center", gap:12, padding:"6px 0", borderBottom:`1px solid ${T.border}` }}>
            <span style={{ width:20, height:20, borderRadius:"50%", background:`${r.color}22`, color:r.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 }}>{r.step}</span>
            <span style={{ fontSize:12 }}>{r.icon}</span>
            <span style={{ color:T.text }}>{r.label}</span>
          </div>
        ))}
      </div>
      <CodeBlock lang="py" showLines code={`# The simplest possible Flask app\nfrom flask import Flask\n\napp = Flask(__name__)    # create app\n\n@app.route("/")          # URL: http://localhost:5000/\ndef index():             # function runs when URL is visited\n    return "Hello!"     # this text appears in browser\n\napp.run(debug=True)      # start the server`}/>
      <InfoBox type="warn">Always run Flask from the <IC>terminal</IC> (not the play button). On Alpine Linux (Acode): <IC>python3 ~/testf.py</IC></InfoBox>
    </Card>
  </>);
}

function TabTestf() {
  return (<>
    <Card>
      <CardTitle color={T.green}>📄 testf.py — Line by Line</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        This is likely the Flask file you've been experimenting with. Let's break down every line.
      </p>
      <CodeBlock lang="py" showLines code={`from flask import Flask, request   # line 1\n\napp = Flask(__name__)               # line 3\n\n@app.route("/")                     # line 5\ndef index():                        # line 6\n    return "Hello, World!"          # line 7\n\n@app.route("/hello")                # line 9\ndef hello():                        # line 10\n    name = request.args.get(        # line 11\n        "name", "World"             # line 12\n    )                               # line 13\n    return f"Hello, {name}!"        # line 14\n\nif __name__ == "__main__":          # line 16\n    app.run(debug=True)             # line 17`}/>
    </Card>
    {[
      { line:"Line 1 — import", color:T.sky, code:`from flask import Flask, request`, explanation:`Imports two things from the flask package:\n• Flask — the class that creates your app\n• request — gives you access to the incoming HTTP request (URL params, form data, headers)` },
      { line:"Line 3 — create app", color:T.accent, code:`app = Flask(__name__)`, explanation:`Creates the Flask application.\n• __name__ is a special Python variable — when you run a file directly, it equals "__main__"\n• Flask uses it to know where to find files (templates, static assets)` },
      { line:"Lines 5–7 — first route", color:T.green, code:`@app.route("/")\ndef index():\n    return "Hello, World!"`, explanation:`• @app.route("/") — a decorator that tells Flask: "run index() when someone visits /"\n• def index() — a normal Python function\n• return — the string you return becomes what appears in the browser` },
      { line:"Line 11 — request.args", color:T.amber, code:`name = request.args.get("name", "World")`, explanation:`• request.args — a dict of URL query parameters\n• .get("name", "World") — get the "name" param, or use "World" as default\n• Visiting /hello?name=Alice → name = "Alice"\n• Visiting /hello → name = "World"` },
      { line:"Line 16 — guard", color:T.rose, code:`if __name__ == "__main__":\n    app.run(debug=True)`, explanation:`• __name__ == "__main__" is True only when you run the file directly\n• This prevents the server from starting if the file is imported by another module\n• debug=True: auto-restarts when you save, shows errors in browser` },
    ].map((item, i) => (
      <Card key={i}>
        <CardTitle color={item.color}>{item.line}</CardTitle>
        <CodeBlock lang="py" code={item.code}/>
        <div style={{ fontSize:12.5, color:T.muted2, lineHeight:1.7, whiteSpace:"pre-line" }}>{item.explanation}</div>
      </Card>
    ))}
  </>);
}

function TabRoutes() {
  return (<>
    <Card>
      <CardTitle color={T.green}>🗺 URL Routes</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A route maps a URL pattern to a Python function. The function's return value becomes the HTTP response.</p>
      <CodeBlock lang="py" showLines code={`# Static routes\n@app.route("/")\ndef index():\n    return "Home page"\n\n@app.route("/about")\ndef about():\n    return "About us"\n\n# Dynamic routes — capture values from the URL\n@app.route("/user/<name>")          # string\ndef user(name):\n    return f"Hello, {name}!"\n    # /user/Alice → "Hello, Alice!"\n\n@app.route("/post/<int:id>")        # typed int\ndef post(id):\n    return f"Post number {id}"\n    # /post/42 → "Post number 42"\n\n@app.route("/score/<float:val>")\ndef score(val):\n    return f"Score: {val}"           # /score/9.5`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>🔀 Multiple Methods</CardTitle>
      <CodeBlock lang="py" showLines code={`from flask import Flask, request\n\n@app.route("/login", methods=["GET", "POST"])\ndef login():\n    if request.method == "POST":\n        username = request.form.get("username", "")\n        password = request.form.get("password", "")\n        if username == "admin" and password == "1234":\n            return f"Welcome, {username}!"\n        return "Invalid credentials", 401\n    # GET request — show the login form\n    return """\n        <form method="POST">\n          <input name="username" placeholder="Username">\n          <input name="password" type="password">\n          <button>Login</button>\n        </form>\n    """`}/>
      <InfoBox type="info">Default is <IC>methods=["GET"]</IC>. Add <IC>"POST"</IC> whenever you have an HTML form.</InfoBox>
    </Card>
  </>);
}

function TabRequests() {
  return (<>
    <Card>
      <CardTitle color={T.green}>📥 The request Object</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>The <IC>request</IC> object gives you everything about the incoming HTTP request.</p>
      <CodeBlock lang="py" showLines code={`from flask import request\n\n# URL query string — /search?q=python&page=2\nq    = request.args.get("q", "")      # "python"\npage = request.args.get("page", 1, type=int) # 2\n\n# HTML form POST data\nname  = request.form.get("name")\nemail = request.form.get("email", "")\n\n# JSON body (API requests)\ndata = request.get_json()             # parses JSON body\nusername = data.get("username")       # access fields\n\n# Other useful properties\nrequest.method       # "GET", "POST", "PUT", "DELETE"\nrequest.url          # full URL string\nrequest.path         # just the path: "/search"\nrequest.headers      # HTTP headers dict\nrequest.cookies      # cookies dict\nrequest.files        # uploaded files`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>🔍 Query vs Form Data</CardTitle>
      <CodeBlock lang="py" showLines code={`# QUERY STRING — data in the URL\n# Example: /search?keyword=flask&limit=10\n\n@app.route("/search")\ndef search():\n    keyword = request.args.get("keyword", "")\n    limit   = request.args.get("limit", 10, type=int)\n    return f"Searching '{keyword}', showing {limit} results"\n\n# FORM DATA — data from HTML form POST\n# <form method="POST" action="/submit">\n\n@app.route("/submit", methods=["POST"])\ndef submit():\n    name    = request.form.get("name", "")\n    message = request.form.get("message", "")\n    return f"Thanks {name}! Got: {message}"`}/>
      <InfoBox type="tip"><IC>request.args</IC> = URL params (GET) · <IC>request.form</IC> = Form data (POST) · <IC>request.get_json()</IC> = JSON body (API)</InfoBox>
    </Card>
  </>);
}

function TabResponses() {
  return (<>
    <Card>
      <CardTitle color={T.green}>📤 HTTP Responses</CardTitle>
      <CodeBlock lang="py" showLines code={`from flask import jsonify, redirect, url_for, abort\n\n# Plain text\n@app.route("/text")\ndef text():\n    return "Plain text response"\n\n# HTML\n@app.route("/html")\ndef html():\n    return "<h1>Big heading</h1><p>paragraph</p>"\n\n# JSON — for APIs\n@app.route("/api/user")\ndef api_user():\n    return jsonify({"name": "Alice", "age": 25})\n    # Sets Content-Type: application/json automatically\n\n# Custom status code\n@app.route("/not-here")\ndef not_here():\n    return "Nothing here", 404\n\n# Redirect\n@app.route("/old-page")\ndef old_page():\n    return redirect(url_for("index"))  # redirect to /\n\n# Abort with error code\n@app.route("/admin")\ndef admin():\n    if not is_logged_in():\n        abort(403)    # Forbidden`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>📊 HTTP Status Codes</CardTitle>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12 }}>
        {[
          { code:"200", label:"OK", desc:"Request succeeded", color:T.green },
          { code:"201", label:"Created", desc:"Resource created (POST)", color:T.green },
          { code:"301", label:"Moved Permanently", desc:"Use redirect()", color:T.sky },
          { code:"302", label:"Found", desc:"Temporary redirect", color:T.sky },
          { code:"400", label:"Bad Request", desc:"Invalid input from client", color:T.amber },
          { code:"401", label:"Unauthorized", desc:"Login required", color:T.amber },
          { code:"403", label:"Forbidden", desc:"No permission", color:T.rose },
          { code:"404", label:"Not Found", desc:"URL doesn't exist", color:T.rose },
          { code:"500", label:"Internal Server Error", desc:"Your Python code crashed", color:T.rose },
        ].map(s => (
          <div key={s.code} style={{ display:"flex", alignItems:"center", gap:12, padding:"7px 0", borderBottom:`1px solid ${T.border}` }}>
            <span style={{ color:s.color, fontWeight:700, width:36, flexShrink:0 }}>{s.code}</span>
            <span style={{ color:T.text, width:160, flexShrink:0 }}>{s.label}</span>
            <span style={{ color:T.muted2, fontSize:11 }}>{s.desc}</span>
          </div>
        ))}
      </div>
    </Card>
  </>);
}

function TabTemplates() {
  return (<>
    <Card>
      <CardTitle color={T.green}>🎨 Jinja2 Templates</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Instead of writing HTML inside Python strings, Flask uses Jinja2 template files. Templates live in a <IC>templates/</IC> folder.</p>
      <CodeBlock lang="html" title="templates/index.html" code={`<!DOCTYPE html>\n<html>\n<head><title>{{ title }}</title></head>\n<body>\n  <h1>Hello, {{ name }}!</h1>\n\n  {% if logged_in %}\n    <p>Welcome back!</p>\n  {% else %}\n    <a href="/login">Log in</a>\n  {% endif %}\n\n  <ul>\n  {% for item in items %}\n    <li>{{ item }}</li>\n  {% endfor %}\n  </ul>\n</body>\n</html>`}/>
    </Card>
    <Card>
      <CardTitle color={T.green}>render_template()</CardTitle>
      <CodeBlock lang="py" showLines code={`from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return render_template(\n        "index.html",           # template filename\n        title  = "My Site",     # passed as {{ title }}\n        name   = "Alice",       # passed as {{ name }}\n        logged_in = True,\n        items  = ["Python","Flask","JS"],\n    )\n\n# Project structure:\n# myapp/\n# ├── testf.py          ← your Flask app\n# └── templates/\n#     └── index.html    ← your template`}/>
      <InfoBox type="note">Jinja2 syntax: <IC>{"{{ var }}"}</IC> outputs a value · <IC>{"{% if %}"}</IC> / <IC>{"{% for %}"}</IC> for logic · <IC>{"{# comment #}"}</IC> for comments</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>🔗 Template Inheritance</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Share a common layout (header, footer, nav) across all pages.</p>
      <CodeBlock lang="html" title="templates/base.html" code={`<!DOCTYPE html>\n<html>\n<head>\n  <title>{% block title %}My App{% endblock %}</title>\n</head>\n<body>\n  <nav>← navigation here →</nav>\n\n  {% block content %}\n  {% endblock %}\n\n  <footer>© 2025</footer>\n</body>\n</html>`}/>
      <CodeBlock lang="html" title="templates/page.html" code={`{% extends "base.html" %}\n\n{% block title %}Home Page{% endblock %}\n\n{% block content %}\n  <h1>Welcome!</h1>\n  <p>This is the home page.</p>\n{% endblock %}`}/>
    </Card>
  </>);
}

export default function FlaskBasics() {
  const [tab, setTab] = useState("intro");
  const content: Record<string, React.ReactNode> = {
    intro:<TabIntro/>, testf:<TabTestf/>, routes:<TabRoutes/>,
    requests:<TabRequests/>, responses:<TabResponses/>, templates:<TabTemplates/>,
    simulator:<LiveSimulator/>,
  };
  return (
    <div>
      <PageHeader eyebrow="Flask · Beginner" title="Flask Basics" sub="Build web servers and APIs with Python — routes, requests, responses, templates" color={T.green}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Flask feels confusing for about an hour — then the first working route clicks and it feels obvious. Once you understand routes, requests, and responses, you can build any API or web app backend. Flask powers everything from hobby projects to production systems handling millions of requests.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.green}>🎯 Flask Basics Quiz</CardTitle><Quiz questions={QUIZ}/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
