import{r as f,j as e,T as t}from"./index-CNTZnqQQ.js";import{P,T as R,a as n,b as a,Q as L,C as l,D as d,c as r,I as h,e as c}from"./shared-Cgke19x4.js";const H=[{id:"intro",label:"What is Flask?"},{id:"testf",label:"testf.py"},{id:"routes",label:"Routes"},{id:"requests",label:"Requests"},{id:"responses",label:"Responses"},{id:"templates",label:"Templates"},{id:"simulator",label:"🔴 Simulator"},{id:"quiz",label:"Quiz 🎯"}],O=[{q:"What decorator marks a function as a Flask route?",opts:["@route","@app.url","@app.route","@flask.route"],ans:2,exp:"@app.route('/path') tells Flask: run this function when the given URL is visited."},{q:"How do you get a URL query parameter in Flask?",opts:["request.params.get()","request.query.get()","request.args.get()","request.get_param()"],ans:2,exp:"request.args is a dict-like object containing query string parameters. Use .get('key', default) to safely read them."},{q:"Which function returns JSON from a Flask route?",opts:["json.dumps()","return json()","jsonify()","flask.json()"],ans:2,exp:"jsonify() serializes a dict to JSON and sets the Content-Type header to application/json automatically."},{q:"What does debug=True do in app.run()?",opts:["Runs faster","Auto-restarts on save + shows errors in browser","Hides error messages","Enables HTTPS"],ans:1,exp:"debug=True enables the auto-reloader (restart on file save) and the interactive debugger in the browser when errors occur."},{q:"Where do Jinja2 template files go?",opts:["static/","templates/","views/","html/"],ans:1,exp:"Flask looks for templates in a folder named 'templates/' in the same directory as your Flask app."},{q:"What does e.preventDefault() stop in a Flask form?",opts:["The Flask server","The CSS animation","The default form reload","The JavaScript from running"],ans:2,exp:"In JavaScript, e.preventDefault() on a form submit event stops the browser from reloading the page — letting you handle submission via fetch() instead."},{q:"What HTTP status code means 'Not Found'?",opts:["200","301","404","500"],ans:2,exp:"404 = resource not found. 200 = OK. 301 = redirect. 500 = server error (your Python code crashed)."},{q:"How do you accept POST requests in Flask?",opts:["@app.route('/path', POST=True)","@app.route('/path', allow='POST')","@app.route('/path', methods=['GET','POST'])","@app.post('/path')"],ans:2,exp:"The methods parameter lists accepted HTTP methods. Default is ['GET'] only."}],m={"/":()=>"Hello, World!","/hello":s=>`Hello, ${s.name||"Flask"}!`,"/api/user":s=>JSON.stringify({id:1,name:s.name||"Alice",role:"user"},null,2),"/square":s=>{const i=parseFloat(s.n||"5");return`${i}² = ${i*i}`}};function A(){const[s,i]=f.useState("/"),[x,T]=f.useState("GET"),[u,w]=f.useState(""),v=o=>{const j={};return o&&o.split("&").forEach(S=>{const[k,_]=S.split("=");k&&(j[k]=_||"")}),j},F=`http://localhost:5000${s}${u?"?"+u:""}`,g=Object.keys(m).find(o=>s.startsWith(o))||null,y=g?m[g](v(u)):`404 Not Found

No route found for: ${s}

Available routes:
${Object.keys(m).join(`
`)}`,b=y.startsWith("{")||y.startsWith("["),p=g?200:404,q=Object.keys(m);return e.jsxs("div",{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.rose,children:"🔴 Live URL Simulator"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:16},children:"Type a Flask route and query params — see the response instantly. This simulates a real Flask server running locally."}),e.jsx("div",{style:{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14},children:q.map(o=>e.jsx("button",{onClick:()=>i(o),style:{fontSize:10,fontFamily:"'Fira Code',monospace",padding:"4px 10px",borderRadius:5,border:`1px solid ${s===o?t.green:t.border2}`,background:s===o?"rgba(34,197,94,.1)":"transparent",color:s===o?t.green:t.muted2,cursor:"pointer",transition:"all .15s"},children:o},o))}),e.jsxs("div",{style:{background:t.bg2,border:`1px solid ${t.border2}`,borderRadius:9,padding:"10px 14px",marginBottom:10,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"},children:[e.jsxs("select",{value:x,onChange:o=>T(o.target.value),style:{background:t.surface2,border:`1px solid ${t.border2}`,borderRadius:5,color:t.amber,fontFamily:"'Fira Code',monospace",fontSize:11,padding:"4px 8px",cursor:"pointer"},children:[e.jsx("option",{children:"GET"}),e.jsx("option",{children:"POST"})]}),e.jsx("span",{style:{color:t.muted2,fontFamily:"'Fira Code',monospace",fontSize:11},children:"localhost:5000"}),e.jsx("input",{value:s,onChange:o=>i(o.target.value),style:{background:"transparent",border:"none",outline:"none",color:t.text,fontFamily:"'Fira Code',monospace",fontSize:12,flex:1,minWidth:80},placeholder:"/route"}),u&&e.jsx("span",{style:{color:t.muted2,fontFamily:"'Fira Code',monospace",fontSize:11},children:"?"}),e.jsx("input",{value:u,onChange:o=>w(o.target.value),style:{background:"transparent",border:"none",outline:"none",color:t.sky,fontFamily:"'Fira Code',monospace",fontSize:11,minWidth:120,flex:1},placeholder:"key=value&key2=value2"})]}),e.jsxs("div",{style:{fontSize:10,fontFamily:"'Fira Code',monospace",color:t.muted,marginBottom:14,wordBreak:"break-all"},children:["→ ",e.jsx("span",{style:{color:t.muted2},children:F})]}),e.jsxs("div",{style:{background:t.bg,border:`1px solid ${p===200?t.green:t.rose}`,borderRadius:10,overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,padding:"8px 14px",background:"rgba(255,255,255,.02)",borderBottom:`1px solid ${t.border}`},children:[e.jsxs("span",{style:{fontFamily:"'Fira Code',monospace",fontSize:11,color:p===200?t.green:t.rose,fontWeight:700},children:[p," ",p===200?"OK":"Not Found"]}),b&&e.jsx("span",{style:{fontSize:9,fontFamily:"'Fira Code',monospace",color:t.sky,letterSpacing:"1px",border:"1px solid rgba(56,189,248,0.2)",padding:"1px 6px",borderRadius:3},children:"JSON"}),e.jsx("span",{style:{flex:1}}),e.jsxs("span",{style:{fontSize:9,color:t.muted,fontFamily:"'Fira Code',monospace"},children:["Content-Type: ",b?"application/json":"text/html"]})]}),e.jsx("pre",{style:{padding:"14px 18px",fontFamily:"'Fira Code',monospace",fontSize:12.5,color:p===200?t.green:t.rose,whiteSpace:"pre-wrap",wordBreak:"break-word",lineHeight:1.6},children:y})]})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.accent,children:"The Flask code behind these routes"}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, World!"

@app.route("/hello")
def hello():
    name = request.args.get("name", "Flask")  # ?name=Alice
    return f"Hello, {name}!"

@app.route("/api/user")
def api_user():
    name = request.args.get("name", "Alice")
    return jsonify({"id": 1, "name": name, "role": "user"})

@app.route("/square")
def square():
    n = float(request.args.get("n", 5))
    return f"{n}² = {n**2}"

if __name__ == "__main__":
    app.run(debug=True)`})]})]})}function C(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🌶 What is Flask?"}),e.jsxs(d,{term:"Flask",children:["A lightweight Python web framework that lets you create a web server — URLs that your browser can visit — using just a few lines of Python code. No complex setup required. A decorator (",e.jsx(r,{children:"@app.route"}),") maps a URL to a Python function."]}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:["Flask is a ",e.jsx("strong",{style:{color:t.text},children:"micro web framework"})," for Python. It lets you create a web server — URLs that your browser can visit — using just a few lines of Python code. No complex setup required."]}),e.jsx(h,{type:"info",children:`Flask is called "micro" not because it's limited, but because it doesn't include everything by default — you add only what you need.`})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🔄 How a Web Request Works"}),e.jsx("div",{style:{fontFamily:"'Fira Code',monospace",fontSize:11.5,lineHeight:2,color:t.muted2},children:[{step:"1",label:"Browser types URL",icon:"🌐",color:t.sky},{step:"2",label:"HTTP Request sent to Flask server",icon:"→",color:t.accent},{step:"3",label:"Flask matches the URL to a route (@app.route)",icon:"🔍",color:t.amber},{step:"4",label:"Python function runs, returns a response",icon:"⚙️",color:t.green},{step:"5",label:"Browser displays the response",icon:"✓",color:t.rose}].map(s=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"6px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("span",{style:{width:20,height:20,borderRadius:"50%",background:`${s.color}22`,color:s.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,flexShrink:0},children:s.step}),e.jsx("span",{style:{fontSize:12},children:s.icon}),e.jsx("span",{style:{color:t.text},children:s.label})]},s.step))}),e.jsx(l,{lang:"py",showLines:!0,code:`# The simplest possible Flask app
from flask import Flask

app = Flask(__name__)    # create app

@app.route("/")          # URL: http://localhost:5000/
def index():             # function runs when URL is visited
    return "Hello!"     # this text appears in browser

app.run(debug=True)      # start the server`}),e.jsxs(h,{type:"warn",children:["Always run Flask from the ",e.jsx(r,{children:"terminal"})," (not the play button). On Alpine Linux (Acode): ",e.jsx(r,{children:"python3 ~/testf.py"})]}),e.jsxs(c,{children:["Install Flask and run your first server:",`
`,`pip install flask
# Create app.py with the code above
python app.py`,`
`,"Visit ",e.jsx(r,{children:"http://localhost:5000"}),' in your browser — you should see "Hello!"']})]})]})}function U(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"📄 testf.py — Line by Line"}),e.jsxs(d,{term:"Route Function",children:["A Python function decorated with ",e.jsx(r,{children:"@app.route('/path')"})," — Flask calls it when someone visits that URL. Whatever you ",e.jsx(r,{children:"return"})," becomes the HTTP response shown in the browser."]}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:"This is likely the Flask file you've been experimenting with. Let's break down every line."}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import Flask, request   # line 1

app = Flask(__name__)               # line 3

@app.route("/")                     # line 5
def index():                        # line 6
    return "Hello, World!"          # line 7

@app.route("/hello")                # line 9
def hello():                        # line 10
    name = request.args.get(        # line 11
        "name", "World"             # line 12
    )                               # line 13
    return f"Hello, {name}!"        # line 14

if __name__ == "__main__":          # line 16
    app.run(debug=True)             # line 17`})]}),[{line:"Line 1 — import",color:t.sky,code:"from flask import Flask, request",explanation:`Imports two things from the flask package:
• Flask — the class that creates your app
• request — gives you access to the incoming HTTP request (URL params, form data, headers)`},{line:"Line 3 — create app",color:t.accent,code:"app = Flask(__name__)",explanation:`Creates the Flask application.
• __name__ is a special Python variable — when you run a file directly, it equals "__main__"
• Flask uses it to know where to find files (templates, static assets)`},{line:"Lines 5–7 — first route",color:t.green,code:`@app.route("/")
def index():
    return "Hello, World!"`,explanation:`• @app.route("/") — a decorator that tells Flask: "run index() when someone visits /"
• def index() — a normal Python function
• return — the string you return becomes what appears in the browser`},{line:"Line 11 — request.args",color:t.amber,code:'name = request.args.get("name", "World")',explanation:`• request.args — a dict of URL query parameters
• .get("name", "World") — get the "name" param, or use "World" as default
• Visiting /hello?name=Alice → name = "Alice"
• Visiting /hello → name = "World"`},{line:"Line 16 — guard",color:t.rose,code:`if __name__ == "__main__":
    app.run(debug=True)`,explanation:`• __name__ == "__main__" is True only when you run the file directly
• This prevents the server from starting if the file is imported by another module
• debug=True: auto-restarts when you save, shows errors in browser`}].map((s,i)=>e.jsxs(n,{children:[e.jsx(a,{color:s.color,children:s.line}),e.jsx(l,{lang:"py",code:s.code}),e.jsx("div",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.7,whiteSpace:"pre-line"},children:s.explanation})]},i)),e.jsx(n,{children:e.jsxs(c,{children:["Open your testf.py file. Add a new route ",e.jsx(r,{children:"/greet"})," that reads a ",e.jsx(r,{children:"name"}),' query param (default "World") and returns ',e.jsxs(r,{children:['f"Hi, ',"{name}",'!"']}),".",`
`,"Restart the server and test at: ",e.jsx(r,{children:"http://localhost:5000/greet?name=YourName"})]})})]})}function W(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🗺 URL Routes"}),e.jsxs(d,{term:"Route",children:["A mapping from a URL pattern to a Python function. Static routes match exactly (",e.jsx(r,{children:"/about"}),"). Dynamic routes capture values from the URL using ",e.jsx(r,{children:"<variable>"})," syntax."]}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:"A route maps a URL pattern to a Python function. The function's return value becomes the HTTP response."}),e.jsx(l,{lang:"py",showLines:!0,code:`# Static routes
@app.route("/")
def index():
    return "Home page"

@app.route("/about")
def about():
    return "About us"

# Dynamic routes — capture values from the URL
@app.route("/user/<name>")          # string
def user(name):
    return f"Hello, {name}!"
    # /user/Alice → "Hello, Alice!"

@app.route("/post/<int:id>")        # typed int
def post(id):
    return f"Post number {id}"
    # /post/42 → "Post number 42"

@app.route("/score/<float:val>")
def score(val):
    return f"Score: {val}"           # /score/9.5`})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🔀 Multiple Methods"}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import Flask, request

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "")
        password = request.form.get("password", "")
        if username == "admin" and password == "1234":
            return f"Welcome, {username}!"
        return "Invalid credentials", 401
    # GET request — show the login form
    return """
        <form method="POST">
          <input name="username" placeholder="Username">
          <input name="password" type="password">
          <button>Login</button>
        </form>
    """`}),e.jsxs(h,{type:"info",children:["Default is ",e.jsx(r,{children:'methods=["GET"]'}),". Add ",e.jsx(r,{children:'"POST"'})," whenever you have an HTML form."]}),e.jsxs(c,{children:["Add a dynamic route ",e.jsxs(r,{children:["/multiply/","<int:a>","/","<int:b>"]})," that returns the product of two numbers.",`
`,"Test it at ",e.jsx(r,{children:"/multiply/6/7"}),' — should return "42". Try ',e.jsx(r,{children:"/multiply/100/100"}),"."]})]})]})}function z(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"📥 The request Object"}),e.jsx(d,{term:"request",children:"The Flask object containing everything about the incoming HTTP request — URL params, form data, JSON body, headers, cookies, and more. Import it from flask and use it inside any route function."}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:["The ",e.jsx(r,{children:"request"})," object gives you everything about the incoming HTTP request."]}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import request

# URL query string — /search?q=python&page=2
q    = request.args.get("q", "")      # "python"
page = request.args.get("page", 1, type=int) # 2

# HTML form POST data
name  = request.form.get("name")
email = request.form.get("email", "")

# JSON body (API requests)
data = request.get_json()             # parses JSON body
username = data.get("username")       # access fields

# Other useful properties
request.method       # "GET", "POST", "PUT", "DELETE"
request.url          # full URL string
request.path         # just the path: "/search"
request.headers      # HTTP headers dict
request.cookies      # cookies dict
request.files        # uploaded files`})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🔍 Query vs Form Data"}),e.jsx(l,{lang:"py",showLines:!0,code:`# QUERY STRING — data in the URL
# Example: /search?keyword=flask&limit=10

@app.route("/search")
def search():
    keyword = request.args.get("keyword", "")
    limit   = request.args.get("limit", 10, type=int)
    return f"Searching '{keyword}', showing {limit} results"

# FORM DATA — data from HTML form POST
# <form method="POST" action="/submit">

@app.route("/submit", methods=["POST"])
def submit():
    name    = request.form.get("name", "")
    message = request.form.get("message", "")
    return f"Thanks {name}! Got: {message}"`}),e.jsxs(h,{type:"tip",children:[e.jsx(r,{children:"request.args"})," = URL params (GET) · ",e.jsx(r,{children:"request.form"})," = Form data (POST) · ",e.jsx(r,{children:"request.get_json()"})," = JSON body (API)"]}),e.jsxs(c,{children:["Add a route ",e.jsx(r,{children:"/calculate"})," that reads two numbers ",e.jsx(r,{children:"a"})," and ",e.jsx(r,{children:"b"})," from URL params and returns their sum.",`
`,"Test: ",e.jsx(r,{children:"/calculate?a=10&b=25"}),' → should return "35". Also try with ',e.jsx(r,{children:"type=float"})," for decimal support."]})]})]})}function I(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"📤 HTTP Responses"}),e.jsxs(d,{term:"HTTP Response",children:["What the server sends back after receiving a request. Every Flask route function returns a response — it can be plain text, HTML, JSON (using ",e.jsx(r,{children:"jsonify()"}),"), or a redirect. You can also return a tuple ",e.jsx(r,{children:"(body, status_code)"}),"."]}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import jsonify, redirect, url_for, abort

# Plain text
@app.route("/text")
def text():
    return "Plain text response"

# HTML
@app.route("/html")
def html():
    return "<h1>Big heading</h1><p>paragraph</p>"

# JSON — for APIs
@app.route("/api/user")
def api_user():
    return jsonify({"name": "Alice", "age": 25})
    # Sets Content-Type: application/json automatically

# Custom status code
@app.route("/not-here")
def not_here():
    return "Nothing here", 404

# Redirect
@app.route("/old-page")
def old_page():
    return redirect(url_for("index"))  # redirect to /

# Abort with error code
@app.route("/admin")
def admin():
    if not is_logged_in():
        abort(403)    # Forbidden`})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"📊 HTTP Status Codes"}),e.jsx("div",{style:{fontFamily:"'Fira Code',monospace",fontSize:12},children:[{code:"200",label:"OK",desc:"Request succeeded",color:t.green},{code:"201",label:"Created",desc:"Resource created (POST)",color:t.green},{code:"301",label:"Moved Permanently",desc:"Use redirect()",color:t.sky},{code:"302",label:"Found",desc:"Temporary redirect",color:t.sky},{code:"400",label:"Bad Request",desc:"Invalid input from client",color:t.amber},{code:"401",label:"Unauthorized",desc:"Login required",color:t.amber},{code:"403",label:"Forbidden",desc:"No permission",color:t.rose},{code:"404",label:"Not Found",desc:"URL doesn't exist",color:t.rose},{code:"500",label:"Internal Server Error",desc:"Your Python code crashed",color:t.rose}].map(s=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,padding:"7px 0",borderBottom:`1px solid ${t.border}`},children:[e.jsx("span",{style:{color:s.color,fontWeight:700,width:36,flexShrink:0},children:s.code}),e.jsx("span",{style:{color:t.text,width:160,flexShrink:0},children:s.label}),e.jsx("span",{style:{color:t.muted2,fontSize:11},children:s.desc})]},s.code))}),e.jsxs(c,{children:["Add an ",e.jsx(r,{children:"/api/stats"})," route that returns a JSON object with: your name, current year, and a favourite language.",`
`,"Use ",e.jsx(r,{children:"jsonify()"})," to return it. Test it using the Simulator tab or in your browser."]})]})]})}function B(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🎨 Jinja2 Templates"}),e.jsxs(d,{term:"Jinja2 Template",children:["An HTML file with special syntax for embedding dynamic data. ",e.jsx(r,{children:"{{ variable }}"})," outputs a value, ",e.jsx(r,{children:"{% if %}"})," / ",e.jsx(r,{children:"{% for %}"})," add logic. Flask looks for templates in a ",e.jsx(r,{children:"templates/"})," folder."]}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:["Instead of writing HTML inside Python strings, Flask uses Jinja2 template files. Templates live in a ",e.jsx(r,{children:"templates/"})," folder."]}),e.jsx(l,{lang:"html",title:"templates/index.html",code:`<!DOCTYPE html>
<html>
<head><title>{{ title }}</title></head>
<body>
  <h1>Hello, {{ name }}!</h1>

  {% if logged_in %}
    <p>Welcome back!</p>
  {% else %}
    <a href="/login">Log in</a>
  {% endif %}

  <ul>
  {% for item in items %}
    <li>{{ item }}</li>
  {% endfor %}
  </ul>
</body>
</html>`})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"render_template()"}),e.jsx(l,{lang:"py",showLines:!0,code:`from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template(
        "index.html",           # template filename
        title  = "My Site",     # passed as {{ title }}
        name   = "Alice",       # passed as {{ name }}
        logged_in = True,
        items  = ["Python","Flask","JS"],
    )

# Project structure:
# myapp/
# ├── testf.py          ← your Flask app
# └── templates/
#     └── index.html    ← your template`}),e.jsxs(h,{type:"note",children:["Jinja2 syntax: ",e.jsx(r,{children:"{{ var }}"})," outputs a value · ",e.jsx(r,{children:"{% if %}"})," / ",e.jsx(r,{children:"{% for %}"})," for logic · ",e.jsx(r,{children:"{# comment #}"})," for comments"]})]}),e.jsxs(n,{children:[e.jsx(a,{color:t.sky,children:"🔗 Template Inheritance"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"Share a common layout (header, footer, nav) across all pages."}),e.jsx(l,{lang:"html",title:"templates/base.html",code:`<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}My App{% endblock %}</title>
</head>
<body>
  <nav>← navigation here →</nav>

  {% block content %}
  {% endblock %}

  <footer>© 2025</footer>
</body>
</html>`}),e.jsx(l,{lang:"html",title:"templates/page.html",code:`{% extends "base.html" %}

{% block title %}Home Page{% endblock %}

{% block content %}
  <h1>Welcome!</h1>
  <p>This is the home page.</p>
{% endblock %}`}),e.jsxs(c,{children:["Create a ",e.jsx(r,{children:"templates/"})," folder next to your testf.py. Inside it, create ",e.jsx(r,{children:"hello.html"})," with a Jinja2 template that shows a personalized greeting using a ",e.jsx(r,{children:"name"})," variable.",`
`,"Add a route ",e.jsx(r,{children:"/greet-template"})," that calls ",e.jsx(r,{children:'render_template("hello.html", name="YourName")'}),"."]})]})]})}function J(){const[s,i]=f.useState(()=>{try{return localStorage.getItem("cif_tab_flask-basics")??"intro"}catch{return"intro"}}),x={intro:e.jsx(C,{}),testf:e.jsx(U,{}),routes:e.jsx(W,{}),requests:e.jsx(z,{}),responses:e.jsx(I,{}),templates:e.jsx(B,{}),simulator:e.jsx(A,{})};return e.jsxs("div",{children:[e.jsx(P,{eyebrow:"Flask · Beginner",title:"Flask Basics",sub:"Build web servers and APIs with Python — routes, requests, responses, templates",color:t.green}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:t.muted2,lineHeight:1.7,marginBottom:20},children:"Flask feels confusing for about an hour — then the first working route clicks and it feels obvious. Once you understand routes, requests, and responses, you can build any API or web app backend. Flask powers everything from hobby projects to production systems handling millions of requests."}),e.jsx(R,{tabs:H,active:s,onChange:i,pageId:"flask-basics"}),s==="quiz"?e.jsxs(n,{children:[e.jsx(a,{color:t.green,children:"🎯 Flask Basics Quiz"}),e.jsx(L,{questions:O,trackId:"flask-basics"})]}):x[s]]})]})}export{J as default};
