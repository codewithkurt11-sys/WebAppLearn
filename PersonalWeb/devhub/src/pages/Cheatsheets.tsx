import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, PageHeader, useWindowWidth } from "../shared";
import { CodeExplanation } from "../components/CodeExplanation";

type Lang = "all" | "python" | "javascript" | "flask" | "html";

interface Sheet {
  title: string;
  icon: string;
  lang: Exclude<Lang, "all">;
  color: string;
  tag: string;
  items: { label: string; code: string; langCode?: string; note?: string }[];
}

const SHEETS: Sheet[] = [
  // ── PYTHON ──────────────────────────────────────────────────────
  {
    title:"Python · Variables & Types", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Variable assignment", code:`name = "Alice"\nage = 25\nheight = 1.75\nactive = True\nempty = None` },
      { label:"Type conversion", code:`int("42")       # → 42\nstr(99)         # → "99"\nfloat("3.14")   # → 3.14\nbool(0)         # → False\nbool("hi")      # → True` },
      { label:"Check type", code:`type(42)        # <class 'int'>\ntype("hi")      # <class 'str'>\nisinstance(42, int)  # True` },
      { label:"Multiple assignment", code:`x = y = z = 0\na, b, c = 1, 2, 3\nfirst, *rest = [1,2,3,4]  # first=1, rest=[2,3,4]` },
    ]
  },
  {
    title:"Python · Strings", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"String methods", code:`s = "Hello, World!"\ns.upper()         # "HELLO, WORLD!"\ns.lower()         # "hello, world!"\ns.title()         # "Hello, World!"\ns.strip()         # remove whitespace\ns.replace("o","0")  # "Hell0, W0rld!"\ns.split(", ")     # ["Hello", "World!"]\ns.startswith("He")  # True\ns.endswith("!")     # True\nlen(s)            # 13` },
      { label:"Slicing", code:`s = "Python"\ns[0]        # 'P'\ns[-1]       # 'n'\ns[1:4]      # 'yth'\ns[:3]       # 'Pyt'\ns[3:]       # 'hon'\ns[::-1]     # 'nohtyP'  (reversed)` },
      { label:"f-strings", code:`name = "Alice"\nage = 25\nf"Hello {name}"           # Hello Alice\nf"Age: {age}"             # Age: 25\nf"Double: {age*2}"        # Double: 50\nf"Pi: {3.14159:.2f}"      # Pi: 3.14\nf"{name.upper()}"         # ALICE` },
    ]
  },
  {
    title:"Python · Lists", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"List methods", code:`lst = [3, 1, 4, 1, 5, 9]\nlst.append(2)      # add to end\nlst.insert(0, 0)   # add at index 0\nlst.remove(1)      # remove first 1\nlst.pop()          # remove & return last\nlst.pop(0)         # remove & return first\nlst.sort()         # sort in place\nlst.reverse()      # reverse in place\nlst.count(1)       # count occurrences\nlst.index(4)       # index of first 4\nlst.copy()         # shallow copy\nlen(lst)           # length` },
      { label:"Slicing & copying", code:`lst = [0,1,2,3,4,5]\nlst[1:4]    # [1,2,3]\nlst[::2]    # [0,2,4] (every 2nd)\nlst[::-1]   # reversed\ncopy = lst[:]  # full copy` },
      { label:"List comprehension", code:`squares = [x**2 for x in range(1,6)]\n# [1, 4, 9, 16, 25]\n\nevens = [x for x in range(10) if x%2==0]\n# [0, 2, 4, 6, 8]\n\nupper = [w.upper() for w in ["hi","bye"]]\n# ["HI", "BYE"]` },
    ]
  },
  {
    title:"Python · Dictionaries", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Dict operations", code:`d = {"name":"Alice", "age":25, "city":"NYC"}\nd["name"]              # "Alice"\nd.get("email","N/A")   # "N/A" (safe)\nd["score"] = 95        # add/update\ndel d["age"]           # delete key\n"name" in d            # True\nlen(d)                 # 2\nd.keys()               # dict_keys([...])\nd.values()             # dict_values([...])\nd.items()              # dict_items([...])` },
      { label:"Looping", code:`for k in d:              # keys\nfor v in d.values():     # values\nfor k, v in d.items():   # both\n    print(f"{k}: {v}")` },
      { label:"Dict comprehension", code:`scores = {"Alice":90,"Bob":75,"Eve":88}\npassed = {k:v for k,v in scores.items() if v>=80}\n# {"Alice":90, "Eve":88}` },
    ]
  },
  {
    title:"Python · Functions", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Function syntax", code:`def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\ngreet("Alice")              # Hello, Alice!\ngreet("Bob", "Hi")          # Hi, Bob!\ngreet(greeting="Hey", name="Eve")  # keyword args` },
      { label:"*args and **kwargs", code:`def total(*nums):          # variable positional\n    return sum(nums)\ntotal(1, 2, 3)             # 6\n\ndef info(**data):           # variable keyword\n    for k,v in data.items():\n        print(f"{k}: {v}")\ninfo(name="Alice", age=25)` },
      { label:"Lambda (anonymous)", code:`square = lambda x: x**2\nprint(square(5))           # 25\n\n# Common use: sorted with key\nnames = ["Bob","Alice","Eve"]\nsorted(names, key=lambda x: x.lower())` },
    ]
  },
  {
    title:"Python · Control Flow", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"If / elif / else", code:`score = 85\nif score >= 90:\n    grade = "A"\nelif score >= 80:\n    grade = "B"\nelif score >= 70:\n    grade = "C"\nelse:\n    grade = "F"\n\n# One-liner (ternary)\nresult = "pass" if score >= 60 else "fail"` },
      { label:"For loops", code:`for i in range(5):          # 0–4\nfor i in range(1,6):        # 1–5\nfor i in range(0,10,2):     # 0,2,4,6,8\nfor item in my_list:        # each item\nfor i,item in enumerate(lst): # index + item\nfor k,v in my_dict.items(): # dict key+value` },
      { label:"While + break/continue", code:`i = 0\nwhile i < 5:\n    i += 1\n    if i == 3: continue  # skip 3\n    if i == 5: break     # stop at 5\n    print(i)             # 1 2 4` },
    ]
  },
  {
    title:"Python · Classes & OOP", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Class definition", code:`class Animal:\n    def __init__(self, name, sound):\n        self.name  = name\n        self.sound = sound\n\n    def speak(self):\n        return f"{self.name} says {self.sound}"\n\n    def __str__(self):          # string representation\n        return f"Animal({self.name})"\n\ndog = Animal("Rex", "Woof")\nprint(dog.speak())             # Rex says Woof\nprint(dog.name)                # Rex` },
      { label:"Inheritance", code:`class Dog(Animal):             # inherits Animal\n    def fetch(self):\n        return f"{self.name} fetches!"\n\ndog = Dog("Rex", "Woof")\ndog.speak()                    # from Animal\ndog.fetch()                    # from Dog` },
    ]
  },
  {
    title:"Python · Exceptions", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Try / except", code:`try:\n    result = 10 / int(input("num: "))\nexcept ValueError:\n    print("Not a number")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")\nelse:\n    print(f"Result: {result}")  # runs if no error\nfinally:\n    print("Always runs")       # cleanup` },
      { label:"Common exceptions", code:`ValueError         # wrong value type\nTypeError          # wrong type in op\nKeyError           # dict key missing\nIndexError         # list index OOB\nFileNotFoundError  # file missing\nZeroDivisionError  # divide by 0\nAttributeError     # no such attribute` },
    ]
  },
  {
    title:"Python · Modules & stdlib", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"random", code:`import random\n\nrandom.random()              # 0.0–1.0 float\nrandom.randint(1, 6)         # 1–6 int (dice)\nrandom.choice(["a","b","c"]) # random pick\nrandom.shuffle(my_list)      # shuffle in place` },
      { label:"math", code:`import math\n\nmath.sqrt(16)    # 4.0\nmath.pi          # 3.14159…\nmath.ceil(3.2)   # 4\nmath.floor(3.9)  # 3\nmath.pow(2, 8)   # 256.0\nmath.log(100,10) # 2.0` },
      { label:"pathlib (files)", code:`from pathlib import Path\n\npath = Path("data.txt")\npath.read_text()           # read entire file\npath.write_text("hello")   # write to file\npath.exists()              # True/False\npath.suffix                # ".txt"\npath.stem                  # "data"` },
    ]
  },
  // ── JAVASCRIPT ─────────────────────────────────────────────────
  {
    title:"JavaScript · Variables & Types", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"var / let / const", langCode:"js", code:`var   name = "Alice";  // function-scoped, can reassign\nlet   age = 25;        // block-scoped, can reassign\nconst PI = 3.14;       // block-scoped, cannot reassign\n\n// Best practice: always prefer const, use let when needed` },
      { label:"Data types", langCode:"js", code:`const num    = 42;           // Number\nconst str    = "Hello";      // String\nconst flag   = true;         // Boolean\nconst empty  = null;         // Null\nlet  nothing;                // undefined\nconst obj    = {a: 1};       // Object\nconst arr    = [1,2,3];      // Array\n\ntypeof 42          // "number"\ntypeof "hi"        // "string"\ntypeof true        // "boolean"` },
      { label:"Template literals", langCode:"js", code:`const name = "Alice";\nconst age  = 25;\n\n// Template literal (backtick) — like Python f-strings\nconst msg = \`Hello \${name}, you are \${age}\`;\nconsole.log(msg);           // Hello Alice, you are 25\nconsole.log(\`\${2 + 2}\`);  // 4` },
    ]
  },
  {
    title:"JavaScript · Arrays", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Array methods", langCode:"js", code:`const arr = [1, 2, 3, 4, 5];\narr.push(6);         // add to end\narr.pop();           // remove from end\narr.shift();         // remove from front\narr.unshift(0);      // add to front\narr.indexOf(3);      // 2 (position)\narr.includes(4);     // true\narr.length;          // count\narr.reverse();       // reverse in place\narr.sort();          // sort (alphabetical by default)` },
      { label:"map / filter / reduce", langCode:"js", code:`const nums = [1,2,3,4,5];\n\n// map — transform each element\nconst doubled = nums.map(x => x * 2);\n// [2,4,6,8,10]\n\n// filter — keep matching elements\nconst evens = nums.filter(x => x % 2 === 0);\n// [2,4]\n\n// reduce — combine into single value\nconst total = nums.reduce((acc, x) => acc + x, 0);\n// 15` },
      { label:"Spread & destructuring", langCode:"js", code:`// Spread\nconst a = [1,2];\nconst b = [3,4];\nconst combined = [...a, ...b]; // [1,2,3,4]\n\n// Destructuring\nconst [first, second, ...rest] = [1,2,3,4,5];\n// first=1, second=2, rest=[3,4,5]` },
    ]
  },
  {
    title:"JavaScript · Operators", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Comparison operators", langCode:"js", code:`5 == "5"    // true  (loose — type coercion)\n5 === "5"   // false (strict — NO coercion) ✅ use this\n5 != "5"    // false\n5 !== "5"   // true  ✅ use this\n5 > 3       // true\n5 >= 5      // true` },
      { label:"Logical operators", langCode:"js", code:`true && false  // false (AND)\ntrue || false  // true  (OR)\n!true          // false (NOT)\n\n// Nullish coalescing — default if null/undefined\nconst val = null ?? "default";  // "default"\n\n// Optional chaining — safe property access\nconst name = user?.profile?.name;  // undefined if missing` },
      { label:"Ternary & spread", langCode:"js", code:`// Ternary (one-liner if/else)\nconst label = age >= 18 ? "Adult" : "Minor";\n\n// Spread (copy / merge objects)\nconst obj1 = {a: 1};\nconst obj2 = {b: 2};\nconst merged = {...obj1, ...obj2}; // {a:1, b:2}` },
    ]
  },
  {
    title:"JavaScript · Functions", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Function styles", langCode:"js", code:`// Function declaration\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function (modern — preferred)\nconst add = (a, b) => a + b;\n\n// Default parameters\nconst greet = (name = "World") => \`Hello \${name}!\`;\n\n// Shorter: if single expression, no braces/return needed\nconst square = x => x * x;` },
      { label:"Async / Await", langCode:"js", code:`// Fetch data from an API\nconst loadUser = async (id) => {\n  try {\n    const res  = await fetch(\`/api/users/\${id}\`);\n    const data = await res.json();\n    console.log(data.name);\n  } catch (err) {\n    console.error("Failed:", err);\n  }\n};\n\nloadUser(1);` },
    ]
  },
  {
    title:"JavaScript · DOM & Events", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Selecting elements", langCode:"js", code:`document.getElementById("myId")\ndocument.querySelector(".myClass")   // first match\ndocument.querySelectorAll("p")        // all <p> tags\ndocument.querySelector("[data-id]")   // attribute` },
      { label:"Manipulating DOM", langCode:"js", code:`const el = document.querySelector("#box");\n\nel.textContent = "Hello!";           // change text\nel.innerHTML   = "<b>Bold</b>";      // change HTML\nel.style.color = "red";              // change style\nel.classList.add("active");          // add class\nel.classList.remove("hidden");       // remove class\nel.classList.toggle("open");         // toggle class\nel.setAttribute("data-id", "42");    // set attribute` },
      { label:"Events", langCode:"js", code:`const btn = document.querySelector("#btn");\n\nbtn.addEventListener("click", (e) => {\n  console.log("Clicked!", e.target);\n});\n\n// Common events:\n// click, dblclick, mouseover, mouseout\n// keydown, keyup, keypress\n// submit, change, input, focus, blur\n// load, resize, scroll` },
    ]
  },
  {
    title:"JavaScript · Loops & Strings", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Loops", langCode:"js", code:`// for\nfor (let i = 0; i < 5; i++) { console.log(i); }\n\n// for...of (arrays)\nfor (const item of myArray) { console.log(item); }\n\n// for...in (object keys)\nfor (const key in myObj) { console.log(key, myObj[key]); }\n\n// while\nlet i = 0;\nwhile (i < 5) { i++; }` },
      { label:"String methods", langCode:"js", code:`const s = "Hello, World!";\ns.length            // 13\ns.toUpperCase()     // "HELLO, WORLD!"\ns.toLowerCase()     // "hello, world!"\ns.includes("World") // true\ns.startsWith("He")  // true\ns.indexOf("o")      // 4\ns.slice(0, 5)       // "Hello"\ns.replace("l","L")  // "HeLlo, World!"\ns.split(", ")       // ["Hello","World!"\ns.trim()            // strip whitespace` },
    ]
  },
  {
    title:"JavaScript · Objects", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Object syntax", langCode:"js", code:`const person = {\n  firstName: "John",\n  lastName:  "Doe",\n  age:       25,\n  greet() {                          // method\n    return \`Hi, I'm \${this.firstName}\`;\n  }\n};\n\nperson.firstName     // "John"\nperson["lastName"]   // "Doe"\nperson.greet()       // "Hi, I'm John"\n\n// Destructuring\nconst { firstName, age } = person;` },
      { label:"JSON", langCode:"js", code:`// Object → JSON string\nconst json = JSON.stringify({ name:"Alice", age:25 });\n// '{"name":"Alice","age":25}'\n\n// JSON string → Object\nconst obj = JSON.parse(json);\n// { name: "Alice", age: 25 }\n\n// Pretty print\nJSON.stringify(obj, null, 2);` },
    ]
  },
  // ── FLASK ───────────────────────────────────────────────────────
  {
    title:"Flask · Routes & Requests", icon:"🌶", lang:"flask", color:T.green, tag:"flask",
    items:[
      { label:"Basic app structure", code:`from flask import Flask, request, jsonify\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return "Hello, World!"\n\nif __name__ == "__main__":\n    app.run(debug=True)` },
      { label:"Route methods", code:`@app.route("/login", methods=["GET","POST"])\ndef login():\n    if request.method == "POST":\n        name = request.form.get("name")\n        return f"Welcome, {name}!"\n    return "Show login form"` },
      { label:"URL parameters", code:`@app.route("/user/<name>")        # string\ndef user(name):\n    return f"Hello, {name}"\n\n@app.route("/post/<int:id>")       # typed\ndef post(id):\n    return f"Post #{id}"\n\n# Query string: /search?q=flask\nq = request.args.get("q", "")` },
    ]
  },
  {
    title:"Flask · JSON API", icon:"🌶", lang:"flask", color:T.green, tag:"flask",
    items:[
      { label:"Return JSON", code:`from flask import jsonify\n\n@app.route("/api/user")\ndef api_user():\n    user = {\n        "id":   1,\n        "name": "Alice",\n        "role": "admin"\n    }\n    return jsonify(user)    # sets Content-Type automatically` },
      { label:"Receive JSON", code:`@app.route("/api/create", methods=["POST"])\ndef create():\n    data = request.get_json()   # parse request body\n    name = data.get("name", "")\n    return jsonify({"ok": True, "name": name}), 201` },
      { label:"Error responses", code:`from flask import abort\n\n@app.route("/api/item/<int:id>")\ndef item(id):\n    if id > 100:\n        abort(404)              # triggers 404 response\n    return jsonify({"id": id})\n\n@app.errorhandler(404)\ndef not_found(e):\n    return jsonify({"error": "not found"}), 404` },
    ]
  },
  {
    title:"Flask · Jinja2 Templates", icon:"🌶", lang:"flask", color:T.green, tag:"flask",
    items:[
      { label:"Template syntax", code:`{# Comment #}\n{{ variable }}            {# output variable #}\n{{ user.name }}           {# attribute #}\n{{ items[0] }}            {# index #}\n\n{% if user.admin %}\n  <p>Admin panel</p>\n{% elif user.active %}\n  <p>Active user</p>\n{% else %}\n  <p>Inactive</p>\n{% endif %}\n\n{% for item in items %}\n  <li>{{ loop.index }}: {{ item }}</li>\n{% endfor %}` },
      { label:"Template inheritance", code:`{# base.html #}\n<!DOCTYPE html>\n<html>\n<head><title>{% block title %}Site{% endblock %}</title></head>\n<body>\n  {% block content %}{% endblock %}\n</body>\n</html>\n\n{# page.html #}\n{% extends "base.html" %}\n{% block title %}Home{% endblock %}\n{% block content %}\n  <h1>Welcome!</h1>\n{% endblock %}` },
      { label:"render_template & url_for", code:`from flask import render_template, url_for\n\n@app.route("/")\ndef index():\n    return render_template("index.html",\n        title="Home",\n        items=["a","b","c"])\n\n# In template:\n# <a href="{{ url_for('index') }}">Home</a>\n# <img src="{{ url_for('static', filename='logo.png') }}">` },
    ]
  },
  {
    title:"Flask · Sessions & Flash", icon:"🌶", lang:"flask", color:T.green, tag:"flask",
    items:[
      { label:"Sessions", code:`from flask import session\n\napp.secret_key = "your-secret-key"  # required!\n\n# Store data\nsession["username"] = "Alice"\nsession["cart"] = ["item1", "item2"]\n\n# Read data\nname = session.get("username", "guest")\n\n# Clear one key\nsession.pop("username", None)\n\n# Clear all\nsession.clear()` },
      { label:"Flash messages", code:`from flask import flash, get_flashed_messages\n\n@app.route("/login", methods=["POST"])\ndef login():\n    if valid:\n        flash("Login successful!", "success")\n        return redirect(url_for("dashboard"))\n    flash("Wrong password", "error")\n    return redirect(url_for("login"))\n\n{# In template: #}\n{% for cat, msg in get_flashed_messages(with_categories=True) %}\n  <div class="alert {{ cat }}">{{ msg }}</div>\n{% endfor %}` },
      { label:"Login guard", code:`from functools import wraps\nfrom flask import session, redirect, url_for\n\ndef login_required(f):\n    @wraps(f)\n    def decorated(*args, **kwargs):\n        if "username" not in session:\n            return redirect(url_for("login"))\n        return f(*args, **kwargs)\n    return decorated\n\n@app.route("/dashboard")\n@login_required\ndef dashboard():\n    return f"Hello {session['username']}"` },
    ]
  },
  // ── PYTHON EXTRAS ────────────────────────────────────────────────
  {
    title:"Python · File I/O", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Reading files", code:`# Read entire file as string\nwith open("data.txt", "r") as f:\n    content = f.read()\n\n# Read lines as list\nwith open("data.txt") as f:\n    lines = f.readlines()     # includes \\n\n    lines = f.read().splitlines()  # no \\n\n\n# Read line by line (memory efficient)\nwith open("big_file.txt") as f:\n    for line in f:\n        print(line.strip())` },
      { label:"Writing files", code:`# Write (overwrites existing file)\nwith open("out.txt", "w") as f:\n    f.write("Hello\\n")\n    f.write("World\\n")\n\n# Append (add to end of file)\nwith open("log.txt", "a") as f:\n    f.write("New entry\\n")\n\n# Write multiple lines at once\nlines = ["line1\\n", "line2\\n", "line3\\n"]\nwith open("out.txt", "w") as f:\n    f.writelines(lines)` },
      { label:"JSON & CSV files", code:`import json, csv\n\n# JSON read/write\nwith open("data.json") as f:\n    data = json.load(f)        # dict/list\n\nwith open("out.json","w") as f:\n    json.dump(data, f, indent=2)\n\n# CSV read\nwith open("data.csv") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["age"])\n\n# CSV write\nwith open("out.csv","w", newline="") as f:\n    w = csv.DictWriter(f, fieldnames=["name","age"])\n    w.writeheader()\n    w.writerow({"name":"Alice","age":25})` },
    ]
  },
  {
    title:"Python · Async / Asyncio", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"async def & await", code:`import asyncio\n\nasync def fetch_data(url: str) -> str:\n    await asyncio.sleep(1)     # simulate network I/O\n    return f"data from {url}"\n\nasync def main():\n    result = await fetch_data("https://example.com")\n    print(result)\n\nasyncio.run(main())  # entry point` },
      { label:"Run tasks concurrently", code:`import asyncio\n\nasync def task(name, delay):\n    await asyncio.sleep(delay)\n    print(f"{name} done")\n    return name\n\nasync def main():\n    # gather runs all tasks concurrently\n    results = await asyncio.gather(\n        task("A", 2),\n        task("B", 1),\n        task("C", 3),\n    )\n    print(results)  # ['A','B','C']\n\nasyncio.run(main())  # total time: ~3s, not 6s` },
      { label:"async with aiohttp", code:`import aiohttp, asyncio\n\nasync def get_json(url):\n    async with aiohttp.ClientSession() as session:\n        async with session.get(url) as response:\n            return await response.json()\n\nasync def main():\n    data = await get_json("https://api.example.com/data")\n    print(data)\n\nasyncio.run(main())` },
    ]
  },
  {
    title:"Python · Sets & Tuples", icon:"🐍", lang:"python", color:T.accent, tag:"python",
    items:[
      { label:"Set operations", code:`a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\n\na | b   # union:        {1,2,3,4,5,6}\na & b   # intersection: {3,4}\na - b   # difference:   {1,2}\na ^ b   # symmetric diff:{1,2,5,6}\n\na.add(10)       # add element\na.discard(99)   # remove safely (no error)\n3 in a          # True\nlen(a)          # 4` },
      { label:"Tuple basics", code:`# Tuples are immutable — can't change after creation\npoint = (3, 7)\nx, y = point         # unpack\n\ncoords = (1, 2, 3)\ncoords[0]            # 1 (read-only)\n\n# Named tuple (like a lightweight class)\nfrom collections import namedtuple\nPoint = namedtuple("Point", ["x","y"])\np = Point(3, 7)\nprint(p.x, p.y)      # 3 7` },
      { label:"collections.Counter & defaultdict", code:`from collections import Counter, defaultdict\n\n# Counter — count occurrences\nwords = ["cat","dog","cat","fish","cat","dog"]\nc = Counter(words)\n# Counter({'cat':3, 'dog':2, 'fish':1})\nc.most_common(2)   # [('cat',3), ('dog',2)]\n\n# defaultdict — no KeyError for missing keys\ndd = defaultdict(list)\ndd["fruits"].append("apple")\ndd["fruits"].append("banana")\n# {"fruits": ["apple", "banana"]}` },
    ]
  },
  // ── JAVASCRIPT EXTRAS ────────────────────────────────────────────
  {
    title:"JavaScript · Promises & Async", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Promise basics", langCode:"js", code:`// Creating a Promise\nconst delay = (ms) => new Promise(resolve =>\n  setTimeout(resolve, ms)\n);\n\n// Chaining\nfetch("/api/user")\n  .then(res => res.json())\n  .then(data => console.log(data.name))\n  .catch(err => console.error(err))\n  .finally(() => setLoading(false));` },
      { label:"Promise.all & allSettled", langCode:"js", code:`// all() — fails fast if any reject\ntry {\n  const [user, posts] = await Promise.all([\n    fetch("/api/user").then(r => r.json()),\n    fetch("/api/posts").then(r => r.json()),\n  ]);\n} catch (err) { /* one failed */ }\n\n// allSettled() — always gets all results\nconst results = await Promise.allSettled([\n  fetch("/api/a").then(r => r.json()),\n  fetch("/api/b").then(r => r.json()),\n]);\nresults.forEach(r => {\n  if (r.status === "fulfilled") console.log(r.value);\n  else console.error(r.reason);\n});` },
      { label:"async/await patterns", langCode:"js", code:`// Basic async function\nconst getUser = async (id) => {\n  const res  = await fetch(\`/api/users/\${id}\`);\n  if (!res.ok) throw new Error("Not found");\n  return res.json();\n};\n\n// Error handling\nconst load = async () => {\n  try {\n    const user = await getUser(1);\n    console.log(user.name);\n  } catch (err) {\n    console.error("Failed:", err.message);\n  }\n};\n\nload();` },
    ]
  },
  {
    title:"JavaScript · Error Handling", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"try / catch / finally", langCode:"js", code:`try {\n  const data = JSON.parse(badString);  // throws\n  console.log(data);\n} catch (err) {\n  console.error("Parse failed:", err.message);\n} finally {\n  console.log("Always runs");  // cleanup here\n}` },
      { label:"Custom errors", langCode:"js", code:`class ValidationError extends Error {\n  constructor(field, message) {\n    super(message);\n    this.name   = "ValidationError";\n    this.field  = field;\n  }\n}\n\nfunction validateAge(age) {\n  if (age < 0 || age > 150) {\n    throw new ValidationError("age", "Age must be 0–150");\n  }\n}\n\ntry {\n  validateAge(-5);\n} catch (err) {\n  if (err instanceof ValidationError) {\n    console.log(\`Field '\${err.field}': \${err.message}\`);\n  }\n}` },
      { label:"Guard clauses & safe access", langCode:"js", code:`// Optional chaining — no TypeError on null/undefined\nconst city = user?.address?.city;       // undefined if missing\nconst first = arr?.[0];                 // undefined if arr is null\nconst result = obj?.method?.();         // call if exists\n\n// Nullish coalescing — default only for null/undefined\nconst name = user.name ?? "Anonymous"; // not "" or 0\n\n// Logical OR — default for any falsy value\nconst count = value || 0;              // also catches 0, ""` },
    ]
  },
  {
    title:"JavaScript · ES6+ Features", icon:"⚡", lang:"javascript", color:T.amber, tag:"javascript",
    items:[
      { label:"Destructuring", langCode:"js", code:`// Object destructuring\nconst { name, age, city = "Unknown" } = user;\n// city gets default if undefined\n\n// Rename on destructure\nconst { firstName: first, lastName: last } = user;\n\n// Array destructuring\nconst [a, b, ...rest] = [1, 2, 3, 4, 5];\n// a=1, b=2, rest=[3,4,5]\n\n// Nested\nconst { address: { city, zip } } = user;\n\n// In function params\nconst greet = ({ name, age }) => \`\${name} is \${age}\`;` },
      { label:"Modules (import / export)", langCode:"js", code:`// math.js — named exports\nexport const add  = (a, b) => a + b;\nexport const PI   = 3.14159;\nexport function square(x) { return x * x; }\n\n// utils.js — default export\nexport default function formatDate(d) {\n  return d.toLocaleDateString();\n}\n\n// main.js — importing\nimport formatDate from "./utils.js";          // default\nimport { add, PI } from "./math.js";          // named\nimport { add as sum } from "./math.js";       // rename\nimport * as Math from "./math.js";            // all named` },
      { label:"Classes & private fields", langCode:"js", code:`class BankAccount {\n  #balance = 0;          // private field (ES2022)\n\n  constructor(owner) {\n    this.owner = owner;\n  }\n\n  deposit(amount) {\n    if (amount > 0) this.#balance += amount;\n  }\n\n  get balance() {        // getter\n    return this.#balance;\n  }\n}\n\nconst acc = new BankAccount("Alice");\nacc.deposit(100);\nconsole.log(acc.balance);   // 100\nconsole.log(acc.#balance);  // SyntaxError — private!` },
    ]
  },
  // ── HTML / CSS ───────────────────────────────────────────────────
  {
    title:"HTML · Document Structure", icon:"🌐", lang:"html", color:"#f59e0b", tag:"html",
    items:[
      { label:"Page boilerplate", langCode:"html", code:`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Page</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <h1>Hello World</h1>\n\n  <script src="app.js"></script>\n</body>\n</html>` },
      { label:"Semantic elements", langCode:"html", code:`<header>   top of page: logo, nav        </header>\n<nav>      navigation links               </nav>\n<main>     the main unique content        </main>\n<article>  a self-contained piece of content</article>\n<section>  a thematic group of content    </section>\n<aside>    sidebar / related content       </aside>\n<footer>   bottom of page: links, copyright</footer>\n\n<!-- Use these instead of <div> where possible -->\n<!-- They mean something to search engines and screen readers -->` },
      { label:"Head meta tags", langCode:"html", code:`<meta charset="UTF-8">                  <!-- character encoding -->\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description for Google">\n<meta name="author"      content="Alice">\n<title>Page Title — shown in browser tab</title>\n\n<!-- Open Graph (social sharing previews) -->\n<meta property="og:title"       content="My Site">\n<meta property="og:description" content="Description">\n<meta property="og:image"       content="https://example.com/img.jpg">` },
    ]
  },
  {
    title:"HTML · Common Elements", icon:"🌐", lang:"html", color:"#f59e0b", tag:"html",
    items:[
      { label:"Text & headings", langCode:"html", code:`<h1>Most important heading</h1>     <!-- one per page -->\n<h2>Section heading</h2>\n<h3>Sub-section</h3>                <!-- h1–h6 available -->\n\n<p>A paragraph of text.</p>\n<strong>Bold / important</strong>\n<em>Italic / emphasis</em>\n<br>                                <!-- line break -->\n<hr>                                <!-- horizontal rule -->\n\n<blockquote>A quoted passage.</blockquote>\n<code>inline code</code>\n<pre><code>code block</code></pre>` },
      { label:"Links & images", langCode:"html", code:`<!-- Links -->\n<a href="https://example.com">External link</a>\n<a href="/about">Internal link</a>\n<a href="#section-id">Jump to section</a>\n<a href="mailto:hi@example.com">Email link</a>\n<a href="..." target="_blank" rel="noopener">New tab</a>\n\n<!-- Images -->\n<img src="photo.jpg" alt="A cat sitting on a desk">\n<img src="logo.svg" alt="Company logo" width="200" height="80">\n<!-- alt is required — screen readers and broken image fallback -->` },
      { label:"Lists & tables", langCode:"html", code:`<!-- Unordered list -->\n<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n</ul>\n\n<!-- Ordered list -->\n<ol>\n  <li>First step</li>\n  <li>Second step</li>\n</ol>\n\n<!-- Table -->\n<table>\n  <thead>\n    <tr><th>Name</th><th>Score</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>95</td></tr>\n    <tr><td>Bob</td><td>82</td></tr>\n  </tbody>\n</table>` },
    ]
  },
  {
    title:"HTML · Forms", icon:"🌐", lang:"html", color:"#f59e0b", tag:"html",
    items:[
      { label:"Form inputs", langCode:"html", code:`<form action="/submit" method="POST">\n\n  <label for="name">Name:</label>\n  <input type="text"     id="name"  name="name"  required>\n\n  <label for="email">Email:</label>\n  <input type="email"    id="email" name="email" placeholder="you@example.com">\n\n  <label for="age">Age:</label>\n  <input type="number"   id="age"   name="age"   min="0" max="120">\n\n  <input type="password" name="pass">\n  <input type="checkbox" name="agree" value="yes"> I agree\n  <input type="radio"    name="color" value="red"> Red\n\n  <button type="submit">Submit</button>\n</form>` },
      { label:"Select & textarea", langCode:"html", code:`<!-- Dropdown -->\n<select name="country">\n  <option value="">Choose a country</option>\n  <option value="us">United States</option>\n  <option value="uk" selected>United Kingdom</option>\n</select>\n\n<!-- Multi-line text -->\n<textarea name="bio" rows="5" cols="40"\n  placeholder="Tell us about yourself...">\n</textarea>\n\n<!-- File upload -->\n<input type="file" name="avatar" accept="image/*">` },
    ]
  },
  {
    title:"CSS · Selectors & Properties", icon:"🎨", lang:"html", color:"#38bdf8", tag:"css",
    items:[
      { label:"Selectors", langCode:"css", code:`/* Element */          p { color: red; }\n/* Class */            .card { padding: 16px; }\n/* ID */               #header { background: navy; }\n/* Descendant */       .card p { font-size: 14px; }\n/* Direct child */     ul > li { list-style: none; }\n/* Adjacent sibling */ h2 + p { margin-top: 0; }\n/* Attribute */        input[type="text"] { border: 1px solid; }\n/* Pseudo-class */     a:hover { color: blue; }\n/* Pseudo-class */     li:first-child { font-weight: bold; }\n/* Pseudo-element */   p::first-line { font-variant: small-caps; }` },
      { label:"Common properties", langCode:"css", code:`/* Text */\ncolor: #333;\nfont-size: 16px;\nfont-family: "Inter", sans-serif;\nfont-weight: 700;     /* 100–900, or bold/normal */\nline-height: 1.6;\ntext-align: center;   /* left | right | center | justify */\ntext-decoration: none;  /* underline | none */\n\n/* Spacing */\nmargin: 16px;          /* outside */\npadding: 12px 24px;    /* inside: top/bottom left/right */\nmargin: 8px 16px 8px 16px; /* top right bottom left */\n\n/* Size */\nwidth: 100%;\nmax-width: 800px;\nheight: auto;` },
      { label:"Colors & backgrounds", langCode:"css", code:`/* Color formats */\ncolor: red;                  /* named */\ncolor: #ff6347;              /* hex */\ncolor: rgb(255, 99, 71);     /* rgb */\ncolor: rgba(255, 99, 71, 0.5); /* rgba — 0.5 opacity */\ncolor: hsl(9, 100%, 64%);    /* hsl */\n\n/* Background */\nbackground-color: #f0f4f8;\nbackground-image: url("bg.jpg");\nbackground-size: cover;        /* or contain, 100% */\nbackground-position: center;\nbackground-repeat: no-repeat;\n\n/* Shorthand */\nbackground: #fff url("bg.png") no-repeat center/cover;` },
    ]
  },
  {
    title:"CSS · Box Model & Layout", icon:"🎨", lang:"html", color:"#38bdf8", tag:"css",
    items:[
      { label:"Box model", langCode:"css", code:`/* Every element is a box: content + padding + border + margin */\n\n.box {\n  width: 200px;          /* content width */\n  padding: 20px;         /* space inside border */\n  border: 2px solid #333;\n  margin: 16px;          /* space outside border */\n\n  /* box-sizing: border-box makes width include padding+border */\n  box-sizing: border-box; /* recommended — add to * {} globally */\n}\n\n/* Global reset (always include) */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}` },
      { label:"Display & position", langCode:"css", code:`/* Display */\ndisplay: block;      /* full width, stacks vertically */\ndisplay: inline;     /* flows with text, no width/height */\ndisplay: inline-block; /* inline but accepts width/height */\ndisplay: flex;       /* flexbox container */\ndisplay: grid;       /* grid container */\ndisplay: none;       /* hidden (removed from layout) */\n\n/* Position */\nposition: static;    /* default — normal flow */\nposition: relative;  /* offset from where it would be */\nposition: absolute;  /* relative to nearest positioned parent */\nposition: fixed;     /* fixed to viewport (stays on scroll) */\nposition: sticky;    /* scrolls until threshold, then sticks */\ntop: 0; left: 0; right: 0; bottom: 0;  /* offset props */` },
      { label:"Border, radius, shadow", langCode:"css", code:`border: 1px solid #ddd;\nborder-top: 3px solid blue;     /* single side */\nborder-radius: 8px;             /* rounded corners */\nborder-radius: 50%;             /* circle (on square) */\n\nbox-shadow: 0 2px 8px rgba(0,0,0,0.15);\n/* x-offset y-offset blur spread color */\nbox-shadow: 2px 2px 0 0 black;   /* hard shadow */\nbox-shadow: inset 0 2px 4px rgba(0,0,0,0.1); /* inward */\n\nopacity: 0.8;      /* 0 = invisible, 1 = fully visible */\nvisibility: hidden; /* hidden but still takes up space */` },
    ]
  },
  {
    title:"CSS · Flexbox", icon:"🎨", lang:"html", color:"#38bdf8", tag:"css",
    items:[
      { label:"Container properties", langCode:"css", code:`/* Apply to the parent container */\n.container {\n  display: flex;\n\n  flex-direction: row;          /* row | column | row-reverse */\n  justify-content: center;      /* main axis alignment */\n  /* flex-start | flex-end | center | space-between | space-around */\n\n  align-items: center;          /* cross axis alignment */\n  /* stretch | flex-start | flex-end | center | baseline */\n\n  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */\n  gap: 16px;                    /* space between items */\n}` },
      { label:"Item properties", langCode:"css", code:`/* Apply to individual flex children */\n.item {\n  flex: 1;           /* grow to fill space (shorthand) */\n  flex: 0 0 200px;   /* grow=0 shrink=0 basis=200px (fixed) */\n\n  align-self: flex-end; /* override parent's align-items */\n\n  order: 2;             /* change visual order */\n\n  flex-grow:   1;    /* how much to grow relative to siblings */\n  flex-shrink: 0;    /* 0 = don't shrink below flex-basis */\n  flex-basis:  auto; /* initial main size */\n}` },
      { label:"Common flex patterns", langCode:"css", code:`/* Center anything */\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n/* Navbar: logo left, links right */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n/* Card grid that wraps */\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card { flex: 1 1 280px; } /* grow, shrink, min-width */` },
    ]
  },
  {
    title:"CSS · Grid", icon:"🎨", lang:"html", color:"#38bdf8", tag:"css",
    items:[
      { label:"Grid basics", langCode:"css", code:`/* Define a grid container */\n.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr; /* 3 cols, middle is twice as wide */\n  grid-template-rows: auto 1fr auto;  /* header, main, footer */\n  gap: 16px;                          /* shorthand for row-gap + column-gap */\n}\n\n/* Common patterns */\ngrid-template-columns: repeat(3, 1fr);         /* 3 equal cols */\ngrid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* responsive */\ngrid-template-columns: 250px 1fr;              /* sidebar + content */` },
      { label:"Placing items", langCode:"css", code:`/* Span across columns or rows */\n.header  { grid-column: 1 / -1; }        /* span all columns */\n.sidebar { grid-column: 1 / 2; grid-row: 2 / 4; }\n.main    { grid-column: 2 / -1; }\n\n/* Named template areas */\n.layout {\n  grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";\n}\n.header  { grid-area: header;  }\n.sidebar { grid-area: sidebar; }\n.main    { grid-area: main;    }\n.footer  { grid-area: footer;  }` },
    ]
  },
];

function SheetCard({ sheet }: { sheet: Sheet }) {
  const isMobile = useWindowWidth() < 900;
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", marginBottom:16 }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display:"flex", alignItems:"center", gap:12, width:"100%",
        padding:"14px 18px", background:"transparent", border:"none",
        textAlign:"left", cursor:"pointer", color:T.text,
      }}>
        <span style={{ fontSize:20 }}>{sheet.icon}</span>
        <span style={{ flex:1, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:13 }}>{sheet.title}</span>
        <span style={{ fontSize:9, fontFamily:"'Fira Code',monospace", letterSpacing:"1px", textTransform:"uppercase", padding:"2px 7px", borderRadius:4, background:`${sheet.color}18`, color:sheet.color }}>{sheet.tag}</span>
        <span style={{ color:T.muted, fontSize:12, marginLeft:8 }}>{open?"▲":"▼"}</span>
      </button>
      {open && (
        <div style={{ padding: isMobile ? "0 12px 12px" : "0 18px 18px", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(320px,1fr))", gap:12 }}>
          {sheet.items.map((item, i) => (
            <div key={i} style={{ background:T.bg2, border:`1px solid ${T.border2}`, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:sheet.color, letterSpacing:"1px", textTransform:"uppercase", marginBottom:8 }}>{item.label}</div>
              <CodeBlock code={item.code} lang={item.langCode || "py"}/>
              <CodeExplanation code={item.code} lang={item.langCode || "py"} />
              {item.note && <div style={{ fontSize:11, color:T.muted2, marginTop:6, lineHeight:1.5 }}>{item.note}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const FILTER_TABS = [
  { id:"all",        label:"All"         },
  { id:"python",     label:"🐍 Python"   },
  { id:"javascript", label:"⚡ JavaScript"},
  { id:"flask",      label:"🌶 Flask"    },
  { id:"html",       label:"🌐 HTML/CSS" },
];

export default function Cheatsheets() {
  const isMobile = useWindowWidth() < 900;
  const [filter, setFilter] = useState<Lang>("all");
  const [search, setSearch] = useState("");

  const filtered = SHEETS.filter(s => {
    const matchLang = filter === "all" || s.lang === filter;
    const matchSearch = search === "" || s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.items.some(item => item.label.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase()));
    return matchLang && matchSearch;
  });

  return (
    <div>
      <PageHeader eyebrow="Reference" title="Cheatsheets" sub="Quick-reference cards for Python, JavaScript, and Flask — searchable and filterable" color={T.green}/>
      <div style={{ padding: isMobile ? "0 16px 40px" : "0 24px 40px" }}>

        {/* Search */}
        <div style={{ marginBottom:16 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cheatsheets…"
            style={{
              width:"100%", padding:"10px 14px",
              background:T.surface, border:`1px solid ${T.border2}`,
              borderRadius:10, color:T.text,
              fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:13,
              outline:"none",
            }}
            onFocus={e => (e.target as HTMLInputElement).style.borderColor=T.green}
            onBlur={e  => (e.target as HTMLInputElement).style.borderColor=T.border2}
          />
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:3, flexWrap:"nowrap", overflowX:"auto", background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:4, marginBottom:24 }}>
          {FILTER_TABS.map(t => (
            <button key={t.id} onClick={() => setFilter(t.id as Lang)} style={{
              flexShrink:0, padding:"8px 14px", border:"none", borderRadius:7,
              background:filter===t.id ? T.surface2 : "transparent",
              color:filter===t.id ? T.text : T.muted2,
              fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:600, fontSize:12,
              transition:"all .15s", whiteSpace:"nowrap", cursor:"pointer",
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <div style={{ fontSize:11, fontFamily:"'Fira Code',monospace", color:T.muted, marginBottom:16 }}>
          // showing {filtered.length} sheet{filtered.length!==1?"s":""} — {filtered.reduce((a,s)=>a+s.items.length,0)} reference cards
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"48px 0", color:T.muted2 }}>
            <div style={{ fontSize:32, marginBottom:12 }}>🔍</div>
            <div>No results for "<span style={{ color:T.text }}>{search}</span>"</div>
          </div>
        ) : (
          filtered.map((sheet, i) => <SheetCard key={i} sheet={sheet}/>)
        )}

      </div>
    </div>
  );
}
