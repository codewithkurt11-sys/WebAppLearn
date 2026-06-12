import{d as m,r as d,T as e,j as t}from"./index-CNTZnqQQ.js";import{P as u,C as f}from"./shared-Cgke19x4.js";const h=[{title:"Python · Variables & Types",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Variable assignment",code:`name = "Alice"
age = 25
height = 1.75
active = True
empty = None`},{label:"Type conversion",code:`int("42")       # → 42
str(99)         # → "99"
float("3.14")   # → 3.14
bool(0)         # → False
bool("hi")      # → True`},{label:"Check type",code:`type(42)        # <class 'int'>
type("hi")      # <class 'str'>
isinstance(42, int)  # True`},{label:"Multiple assignment",code:`x = y = z = 0
a, b, c = 1, 2, 3
first, *rest = [1,2,3,4]  # first=1, rest=[2,3,4]`}]},{title:"Python · Strings",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"String methods",code:`s = "Hello, World!"
s.upper()         # "HELLO, WORLD!"
s.lower()         # "hello, world!"
s.title()         # "Hello, World!"
s.strip()         # remove whitespace
s.replace("o","0")  # "Hell0, W0rld!"
s.split(", ")     # ["Hello", "World!"]
s.startswith("He")  # True
s.endswith("!")     # True
len(s)            # 13`},{label:"Slicing",code:`s = "Python"
s[0]        # 'P'
s[-1]       # 'n'
s[1:4]      # 'yth'
s[:3]       # 'Pyt'
s[3:]       # 'hon'
s[::-1]     # 'nohtyP'  (reversed)`},{label:"f-strings",code:`name = "Alice"
age = 25
f"Hello {name}"           # Hello Alice
f"Age: {age}"             # Age: 25
f"Double: {age*2}"        # Double: 50
f"Pi: {3.14159:.2f}"      # Pi: 3.14
f"{name.upper()}"         # ALICE`}]},{title:"Python · Lists",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"List methods",code:`lst = [3, 1, 4, 1, 5, 9]
lst.append(2)      # add to end
lst.insert(0, 0)   # add at index 0
lst.remove(1)      # remove first 1
lst.pop()          # remove & return last
lst.pop(0)         # remove & return first
lst.sort()         # sort in place
lst.reverse()      # reverse in place
lst.count(1)       # count occurrences
lst.index(4)       # index of first 4
lst.copy()         # shallow copy
len(lst)           # length`},{label:"Slicing & copying",code:`lst = [0,1,2,3,4,5]
lst[1:4]    # [1,2,3]
lst[::2]    # [0,2,4] (every 2nd)
lst[::-1]   # reversed
copy = lst[:]  # full copy`},{label:"List comprehension",code:`squares = [x**2 for x in range(1,6)]
# [1, 4, 9, 16, 25]

evens = [x for x in range(10) if x%2==0]
# [0, 2, 4, 6, 8]

upper = [w.upper() for w in ["hi","bye"]]
# ["HI", "BYE"]`}]},{title:"Python · Dictionaries",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Dict operations",code:`d = {"name":"Alice", "age":25, "city":"NYC"}
d["name"]              # "Alice"
d.get("email","N/A")   # "N/A" (safe)
d["score"] = 95        # add/update
del d["age"]           # delete key
"name" in d            # True
len(d)                 # 2
d.keys()               # dict_keys([...])
d.values()             # dict_values([...])
d.items()              # dict_items([...])`},{label:"Looping",code:`for k in d:              # keys
for v in d.values():     # values
for k, v in d.items():   # both
    print(f"{k}: {v}")`},{label:"Dict comprehension",code:`scores = {"Alice":90,"Bob":75,"Eve":88}
passed = {k:v for k,v in scores.items() if v>=80}
# {"Alice":90, "Eve":88}`}]},{title:"Python · Functions",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Function syntax",code:`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet(greeting="Hey", name="Eve")  # keyword args`},{label:"*args and **kwargs",code:`def total(*nums):          # variable positional
    return sum(nums)
total(1, 2, 3)             # 6

def info(**data):           # variable keyword
    for k,v in data.items():
        print(f"{k}: {v}")
info(name="Alice", age=25)`},{label:"Lambda (anonymous)",code:`square = lambda x: x**2
print(square(5))           # 25

# Common use: sorted with key
names = ["Bob","Alice","Eve"]
sorted(names, key=lambda x: x.lower())`}]},{title:"Python · Control Flow",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"If / elif / else",code:`score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# One-liner (ternary)
result = "pass" if score >= 60 else "fail"`},{label:"For loops",code:`for i in range(5):          # 0–4
for i in range(1,6):        # 1–5
for i in range(0,10,2):     # 0,2,4,6,8
for item in my_list:        # each item
for i,item in enumerate(lst): # index + item
for k,v in my_dict.items(): # dict key+value`},{label:"While + break/continue",code:`i = 0
while i < 5:
    i += 1
    if i == 3: continue  # skip 3
    if i == 5: break     # stop at 5
    print(i)             # 1 2 4`}]},{title:"Python · Classes & OOP",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Class definition",code:`class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}"

    def __str__(self):          # string representation
        return f"Animal({self.name})"

dog = Animal("Rex", "Woof")
print(dog.speak())             # Rex says Woof
print(dog.name)                # Rex`},{label:"Inheritance",code:`class Dog(Animal):             # inherits Animal
    def fetch(self):
        return f"{self.name} fetches!"

dog = Dog("Rex", "Woof")
dog.speak()                    # from Animal
dog.fetch()                    # from Dog`}]},{title:"Python · Exceptions",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Try / except",code:`try:
    result = 10 / int(input("num: "))
except ValueError:
    print("Not a number")
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print(f"Result: {result}")  # runs if no error
finally:
    print("Always runs")       # cleanup`},{label:"Common exceptions",code:`ValueError         # wrong value type
TypeError          # wrong type in op
KeyError           # dict key missing
IndexError         # list index OOB
FileNotFoundError  # file missing
ZeroDivisionError  # divide by 0
AttributeError     # no such attribute`}]},{title:"Python · Modules & stdlib",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"random",code:`import random

random.random()              # 0.0–1.0 float
random.randint(1, 6)         # 1–6 int (dice)
random.choice(["a","b","c"]) # random pick
random.shuffle(my_list)      # shuffle in place`},{label:"math",code:`import math

math.sqrt(16)    # 4.0
math.pi          # 3.14159…
math.ceil(3.2)   # 4
math.floor(3.9)  # 3
math.pow(2, 8)   # 256.0
math.log(100,10) # 2.0`},{label:"pathlib (files)",code:`from pathlib import Path

path = Path("data.txt")
path.read_text()           # read entire file
path.write_text("hello")   # write to file
path.exists()              # True/False
path.suffix                # ".txt"
path.stem                  # "data"`}]},{title:"JavaScript · Variables & Types",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"var / let / const",langCode:"js",code:`var   name = "Alice";  // function-scoped, can reassign
let   age = 25;        // block-scoped, can reassign
const PI = 3.14;       // block-scoped, cannot reassign

// Best practice: always prefer const, use let when needed`},{label:"Data types",langCode:"js",code:`const num    = 42;           // Number
const str    = "Hello";      // String
const flag   = true;         // Boolean
const empty  = null;         // Null
let  nothing;                // undefined
const obj    = {a: 1};       // Object
const arr    = [1,2,3];      // Array

typeof 42          // "number"
typeof "hi"        // "string"
typeof true        // "boolean"`},{label:"Template literals",langCode:"js",code:'const name = "Alice";\nconst age  = 25;\n\n// Template literal (backtick) — like Python f-strings\nconst msg = `Hello ${name}, you are ${age}`;\nconsole.log(msg);           // Hello Alice, you are 25\nconsole.log(`${2 + 2}`);  // 4'}]},{title:"JavaScript · Arrays",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Array methods",langCode:"js",code:`const arr = [1, 2, 3, 4, 5];
arr.push(6);         // add to end
arr.pop();           // remove from end
arr.shift();         // remove from front
arr.unshift(0);      // add to front
arr.indexOf(3);      // 2 (position)
arr.includes(4);     // true
arr.length;          // count
arr.reverse();       // reverse in place
arr.sort();          // sort (alphabetical by default)`},{label:"map / filter / reduce",langCode:"js",code:`const nums = [1,2,3,4,5];

// map — transform each element
const doubled = nums.map(x => x * 2);
// [2,4,6,8,10]

// filter — keep matching elements
const evens = nums.filter(x => x % 2 === 0);
// [2,4]

// reduce — combine into single value
const total = nums.reduce((acc, x) => acc + x, 0);
// 15`},{label:"Spread & destructuring",langCode:"js",code:`// Spread
const a = [1,2];
const b = [3,4];
const combined = [...a, ...b]; // [1,2,3,4]

// Destructuring
const [first, second, ...rest] = [1,2,3,4,5];
// first=1, second=2, rest=[3,4,5]`}]},{title:"JavaScript · Operators",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Comparison operators",langCode:"js",code:`5 == "5"    // true  (loose — type coercion)
5 === "5"   // false (strict — NO coercion) ✅ use this
5 != "5"    // false
5 !== "5"   // true  ✅ use this
5 > 3       // true
5 >= 5      // true`},{label:"Logical operators",langCode:"js",code:`true && false  // false (AND)
true || false  // true  (OR)
!true          // false (NOT)

// Nullish coalescing — default if null/undefined
const val = null ?? "default";  // "default"

// Optional chaining — safe property access
const name = user?.profile?.name;  // undefined if missing`},{label:"Ternary & spread",langCode:"js",code:`// Ternary (one-liner if/else)
const label = age >= 18 ? "Adult" : "Minor";

// Spread (copy / merge objects)
const obj1 = {a: 1};
const obj2 = {b: 2};
const merged = {...obj1, ...obj2}; // {a:1, b:2}`}]},{title:"JavaScript · Functions",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Function styles",langCode:"js",code:`// Function declaration
function add(a, b) {
  return a + b;
}

// Arrow function (modern — preferred)
const add = (a, b) => a + b;

// Default parameters
const greet = (name = "World") => \`Hello \${name}!\`;

// Shorter: if single expression, no braces/return needed
const square = x => x * x;`},{label:"Async / Await",langCode:"js",code:`// Fetch data from an API
const loadUser = async (id) => {
  try {
    const res  = await fetch(\`/api/users/\${id}\`);
    const data = await res.json();
    console.log(data.name);
  } catch (err) {
    console.error("Failed:", err);
  }
};

loadUser(1);`}]},{title:"JavaScript · DOM & Events",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Selecting elements",langCode:"js",code:`document.getElementById("myId")
document.querySelector(".myClass")   // first match
document.querySelectorAll("p")        // all <p> tags
document.querySelector("[data-id]")   // attribute`},{label:"Manipulating DOM",langCode:"js",code:`const el = document.querySelector("#box");

el.textContent = "Hello!";           // change text
el.innerHTML   = "<b>Bold</b>";      // change HTML
el.style.color = "red";              // change style
el.classList.add("active");          // add class
el.classList.remove("hidden");       // remove class
el.classList.toggle("open");         // toggle class
el.setAttribute("data-id", "42");    // set attribute`},{label:"Events",langCode:"js",code:`const btn = document.querySelector("#btn");

btn.addEventListener("click", (e) => {
  console.log("Clicked!", e.target);
});

// Common events:
// click, dblclick, mouseover, mouseout
// keydown, keyup, keypress
// submit, change, input, focus, blur
// load, resize, scroll`}]},{title:"JavaScript · Loops & Strings",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Loops",langCode:"js",code:`// for
for (let i = 0; i < 5; i++) { console.log(i); }

// for...of (arrays)
for (const item of myArray) { console.log(item); }

// for...in (object keys)
for (const key in myObj) { console.log(key, myObj[key]); }

// while
let i = 0;
while (i < 5) { i++; }`},{label:"String methods",langCode:"js",code:`const s = "Hello, World!";
s.length            // 13
s.toUpperCase()     // "HELLO, WORLD!"
s.toLowerCase()     // "hello, world!"
s.includes("World") // true
s.startsWith("He")  // true
s.indexOf("o")      // 4
s.slice(0, 5)       // "Hello"
s.replace("l","L")  // "HeLlo, World!"
s.split(", ")       // ["Hello","World!"
s.trim()            // strip whitespace`}]},{title:"JavaScript · Objects",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Object syntax",langCode:"js",code:`const person = {
  firstName: "John",
  lastName:  "Doe",
  age:       25,
  greet() {                          // method
    return \`Hi, I'm \${this.firstName}\`;
  }
};

person.firstName     // "John"
person["lastName"]   // "Doe"
person.greet()       // "Hi, I'm John"

// Destructuring
const { firstName, age } = person;`},{label:"JSON",langCode:"js",code:`// Object → JSON string
const json = JSON.stringify({ name:"Alice", age:25 });
// '{"name":"Alice","age":25}'

// JSON string → Object
const obj = JSON.parse(json);
// { name: "Alice", age: 25 }

// Pretty print
JSON.stringify(obj, null, 2);`}]},{title:"Flask · Routes & Requests",icon:"🌶",lang:"flask",color:e.green,tag:"flask",items:[{label:"Basic app structure",code:`from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, World!"

if __name__ == "__main__":
    app.run(debug=True)`},{label:"Route methods",code:`@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        name = request.form.get("name")
        return f"Welcome, {name}!"
    return "Show login form"`},{label:"URL parameters",code:`@app.route("/user/<name>")        # string
def user(name):
    return f"Hello, {name}"

@app.route("/post/<int:id>")       # typed
def post(id):
    return f"Post #{id}"

# Query string: /search?q=flask
q = request.args.get("q", "")`}]},{title:"Flask · JSON API",icon:"🌶",lang:"flask",color:e.green,tag:"flask",items:[{label:"Return JSON",code:`from flask import jsonify

@app.route("/api/user")
def api_user():
    user = {
        "id":   1,
        "name": "Alice",
        "role": "admin"
    }
    return jsonify(user)    # sets Content-Type automatically`},{label:"Receive JSON",code:`@app.route("/api/create", methods=["POST"])
def create():
    data = request.get_json()   # parse request body
    name = data.get("name", "")
    return jsonify({"ok": True, "name": name}), 201`},{label:"Error responses",code:`from flask import abort

@app.route("/api/item/<int:id>")
def item(id):
    if id > 100:
        abort(404)              # triggers 404 response
    return jsonify({"id": id})

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "not found"}), 404`}]},{title:"Flask · Jinja2 Templates",icon:"🌶",lang:"flask",color:e.green,tag:"flask",items:[{label:"Template syntax",code:`{# Comment #}
{{ variable }}            {# output variable #}
{{ user.name }}           {# attribute #}
{{ items[0] }}            {# index #}

{% if user.admin %}
  <p>Admin panel</p>
{% elif user.active %}
  <p>Active user</p>
{% else %}
  <p>Inactive</p>
{% endif %}

{% for item in items %}
  <li>{{ loop.index }}: {{ item }}</li>
{% endfor %}`},{label:"Template inheritance",code:`{# base.html #}
<!DOCTYPE html>
<html>
<head><title>{% block title %}Site{% endblock %}</title></head>
<body>
  {% block content %}{% endblock %}
</body>
</html>

{# page.html #}
{% extends "base.html" %}
{% block title %}Home{% endblock %}
{% block content %}
  <h1>Welcome!</h1>
{% endblock %}`},{label:"render_template & url_for",code:`from flask import render_template, url_for

@app.route("/")
def index():
    return render_template("index.html",
        title="Home",
        items=["a","b","c"])

# In template:
# <a href="{{ url_for('index') }}">Home</a>
# <img src="{{ url_for('static', filename='logo.png') }}">`}]},{title:"Flask · Sessions & Flash",icon:"🌶",lang:"flask",color:e.green,tag:"flask",items:[{label:"Sessions",code:`from flask import session

app.secret_key = "your-secret-key"  # required!

# Store data
session["username"] = "Alice"
session["cart"] = ["item1", "item2"]

# Read data
name = session.get("username", "guest")

# Clear one key
session.pop("username", None)

# Clear all
session.clear()`},{label:"Flash messages",code:`from flask import flash, get_flashed_messages

@app.route("/login", methods=["POST"])
def login():
    if valid:
        flash("Login successful!", "success")
        return redirect(url_for("dashboard"))
    flash("Wrong password", "error")
    return redirect(url_for("login"))

{# In template: #}
{% for cat, msg in get_flashed_messages(with_categories=True) %}
  <div class="alert {{ cat }}">{{ msg }}</div>
{% endfor %}`},{label:"Login guard",code:`from functools import wraps
from flask import session, redirect, url_for

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "username" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated

@app.route("/dashboard")
@login_required
def dashboard():
    return f"Hello {session['username']}"`}]},{title:"Python · File I/O",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Reading files",code:`# Read entire file as string
with open("data.txt", "r") as f:
    content = f.read()

# Read lines as list
with open("data.txt") as f:
    lines = f.readlines()     # includes \\n
    lines = f.read().splitlines()  # no \\n

# Read line by line (memory efficient)
with open("big_file.txt") as f:
    for line in f:
        print(line.strip())`},{label:"Writing files",code:`# Write (overwrites existing file)
with open("out.txt", "w") as f:
    f.write("Hello\\n")
    f.write("World\\n")

# Append (add to end of file)
with open("log.txt", "a") as f:
    f.write("New entry\\n")

# Write multiple lines at once
lines = ["line1\\n", "line2\\n", "line3\\n"]
with open("out.txt", "w") as f:
    f.writelines(lines)`},{label:"JSON & CSV files",code:`import json, csv

# JSON read/write
with open("data.json") as f:
    data = json.load(f)        # dict/list

with open("out.json","w") as f:
    json.dump(data, f, indent=2)

# CSV read
with open("data.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# CSV write
with open("out.csv","w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["name","age"])
    w.writeheader()
    w.writerow({"name":"Alice","age":25})`}]},{title:"Python · Async / Asyncio",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"async def & await",code:`import asyncio

async def fetch_data(url: str) -> str:
    await asyncio.sleep(1)     # simulate network I/O
    return f"data from {url}"

async def main():
    result = await fetch_data("https://example.com")
    print(result)

asyncio.run(main())  # entry point`},{label:"Run tasks concurrently",code:`import asyncio

async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"{name} done")
    return name

async def main():
    # gather runs all tasks concurrently
    results = await asyncio.gather(
        task("A", 2),
        task("B", 1),
        task("C", 3),
    )
    print(results)  # ['A','B','C']

asyncio.run(main())  # total time: ~3s, not 6s`},{label:"async with aiohttp",code:`import aiohttp, asyncio

async def get_json(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()

async def main():
    data = await get_json("https://api.example.com/data")
    print(data)

asyncio.run(main())`}]},{title:"Python · Sets & Tuples",icon:"🐍",lang:"python",color:e.accent,tag:"python",items:[{label:"Set operations",code:`a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # union:        {1,2,3,4,5,6}
a & b   # intersection: {3,4}
a - b   # difference:   {1,2}
a ^ b   # symmetric diff:{1,2,5,6}

a.add(10)       # add element
a.discard(99)   # remove safely (no error)
3 in a          # True
len(a)          # 4`},{label:"Tuple basics",code:`# Tuples are immutable — can't change after creation
point = (3, 7)
x, y = point         # unpack

coords = (1, 2, 3)
coords[0]            # 1 (read-only)

# Named tuple (like a lightweight class)
from collections import namedtuple
Point = namedtuple("Point", ["x","y"])
p = Point(3, 7)
print(p.x, p.y)      # 3 7`},{label:"collections.Counter & defaultdict",code:`from collections import Counter, defaultdict

# Counter — count occurrences
words = ["cat","dog","cat","fish","cat","dog"]
c = Counter(words)
# Counter({'cat':3, 'dog':2, 'fish':1})
c.most_common(2)   # [('cat',3), ('dog',2)]

# defaultdict — no KeyError for missing keys
dd = defaultdict(list)
dd["fruits"].append("apple")
dd["fruits"].append("banana")
# {"fruits": ["apple", "banana"]}`}]},{title:"JavaScript · Promises & Async",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Promise basics",langCode:"js",code:`// Creating a Promise
const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

// Chaining
fetch("/api/user")
  .then(res => res.json())
  .then(data => console.log(data.name))
  .catch(err => console.error(err))
  .finally(() => setLoading(false));`},{label:"Promise.all & allSettled",langCode:"js",code:`// all() — fails fast if any reject
try {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
} catch (err) { /* one failed */ }

// allSettled() — always gets all results
const results = await Promise.allSettled([
  fetch("/api/a").then(r => r.json()),
  fetch("/api/b").then(r => r.json()),
]);
results.forEach(r => {
  if (r.status === "fulfilled") console.log(r.value);
  else console.error(r.reason);
});`},{label:"async/await patterns",langCode:"js",code:`// Basic async function
const getUser = async (id) => {
  const res  = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
};

// Error handling
const load = async () => {
  try {
    const user = await getUser(1);
    console.log(user.name);
  } catch (err) {
    console.error("Failed:", err.message);
  }
};

load();`}]},{title:"JavaScript · Error Handling",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"try / catch / finally",langCode:"js",code:`try {
  const data = JSON.parse(badString);  // throws
  console.log(data);
} catch (err) {
  console.error("Parse failed:", err.message);
} finally {
  console.log("Always runs");  // cleanup here
}`},{label:"Custom errors",langCode:"js",code:`class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name   = "ValidationError";
    this.field  = field;
  }
}

function validateAge(age) {
  if (age < 0 || age > 150) {
    throw new ValidationError("age", "Age must be 0–150");
  }
}

try {
  validateAge(-5);
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(\`Field '\${err.field}': \${err.message}\`);
  }
}`},{label:"Guard clauses & safe access",langCode:"js",code:`// Optional chaining — no TypeError on null/undefined
const city = user?.address?.city;       // undefined if missing
const first = arr?.[0];                 // undefined if arr is null
const result = obj?.method?.();         // call if exists

// Nullish coalescing — default only for null/undefined
const name = user.name ?? "Anonymous"; // not "" or 0

// Logical OR — default for any falsy value
const count = value || 0;              // also catches 0, ""`}]},{title:"JavaScript · ES6+ Features",icon:"⚡",lang:"javascript",color:e.amber,tag:"javascript",items:[{label:"Destructuring",langCode:"js",code:`// Object destructuring
const { name, age, city = "Unknown" } = user;
// city gets default if undefined

// Rename on destructure
const { firstName: first, lastName: last } = user;

// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a=1, b=2, rest=[3,4,5]

// Nested
const { address: { city, zip } } = user;

// In function params
const greet = ({ name, age }) => \`\${name} is \${age}\`;`},{label:"Modules (import / export)",langCode:"js",code:`// math.js — named exports
export const add  = (a, b) => a + b;
export const PI   = 3.14159;
export function square(x) { return x * x; }

// utils.js — default export
export default function formatDate(d) {
  return d.toLocaleDateString();
}

// main.js — importing
import formatDate from "./utils.js";          // default
import { add, PI } from "./math.js";          // named
import { add as sum } from "./math.js";       // rename
import * as Math from "./math.js";            // all named`},{label:"Classes & private fields",langCode:"js",code:`class BankAccount {
  #balance = 0;          // private field (ES2022)

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  get balance() {        // getter
    return this.#balance;
  }
}

const acc = new BankAccount("Alice");
acc.deposit(100);
console.log(acc.balance);   // 100
console.log(acc.#balance);  // SyntaxError — private!`}]},{title:"HTML · Document Structure",icon:"🌐",lang:"html",color:"#f59e0b",tag:"html",items:[{label:"Page boilerplate",langCode:"html",code:`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Page</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <h1>Hello World</h1>

  <script src="app.js"><\/script>
</body>
</html>`},{label:"Semantic elements",langCode:"html",code:`<header>   top of page: logo, nav        </header>
<nav>      navigation links               </nav>
<main>     the main unique content        </main>
<article>  a self-contained piece of content</article>
<section>  a thematic group of content    </section>
<aside>    sidebar / related content       </aside>
<footer>   bottom of page: links, copyright</footer>

<!-- Use these instead of <div> where possible -->
<!-- They mean something to search engines and screen readers -->`},{label:"Head meta tags",langCode:"html",code:`<meta charset="UTF-8">                  <!-- character encoding -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description for Google">
<meta name="author"      content="Alice">
<title>Page Title — shown in browser tab</title>

<!-- Open Graph (social sharing previews) -->
<meta property="og:title"       content="My Site">
<meta property="og:description" content="Description">
<meta property="og:image"       content="https://example.com/img.jpg">`}]},{title:"HTML · Common Elements",icon:"🌐",lang:"html",color:"#f59e0b",tag:"html",items:[{label:"Text & headings",langCode:"html",code:`<h1>Most important heading</h1>     <!-- one per page -->
<h2>Section heading</h2>
<h3>Sub-section</h3>                <!-- h1–h6 available -->

<p>A paragraph of text.</p>
<strong>Bold / important</strong>
<em>Italic / emphasis</em>
<br>                                <!-- line break -->
<hr>                                <!-- horizontal rule -->

<blockquote>A quoted passage.</blockquote>
<code>inline code</code>
<pre><code>code block</code></pre>`},{label:"Links & images",langCode:"html",code:`<!-- Links -->
<a href="https://example.com">External link</a>
<a href="/about">Internal link</a>
<a href="#section-id">Jump to section</a>
<a href="mailto:hi@example.com">Email link</a>
<a href="..." target="_blank" rel="noopener">New tab</a>

<!-- Images -->
<img src="photo.jpg" alt="A cat sitting on a desk">
<img src="logo.svg" alt="Company logo" width="200" height="80">
<!-- alt is required — screen readers and broken image fallback -->`},{label:"Lists & tables",langCode:"html",code:`<!-- Unordered list -->
<ul>
  <li>Apples</li>
  <li>Bananas</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>First step</li>
  <li>Second step</li>
</ol>

<!-- Table -->
<table>
  <thead>
    <tr><th>Name</th><th>Score</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>95</td></tr>
    <tr><td>Bob</td><td>82</td></tr>
  </tbody>
</table>`}]},{title:"HTML · Forms",icon:"🌐",lang:"html",color:"#f59e0b",tag:"html",items:[{label:"Form inputs",langCode:"html",code:`<form action="/submit" method="POST">

  <label for="name">Name:</label>
  <input type="text"     id="name"  name="name"  required>

  <label for="email">Email:</label>
  <input type="email"    id="email" name="email" placeholder="you@example.com">

  <label for="age">Age:</label>
  <input type="number"   id="age"   name="age"   min="0" max="120">

  <input type="password" name="pass">
  <input type="checkbox" name="agree" value="yes"> I agree
  <input type="radio"    name="color" value="red"> Red

  <button type="submit">Submit</button>
</form>`},{label:"Select & textarea",langCode:"html",code:`<!-- Dropdown -->
<select name="country">
  <option value="">Choose a country</option>
  <option value="us">United States</option>
  <option value="uk" selected>United Kingdom</option>
</select>

<!-- Multi-line text -->
<textarea name="bio" rows="5" cols="40"
  placeholder="Tell us about yourself...">
</textarea>

<!-- File upload -->
<input type="file" name="avatar" accept="image/*">`}]},{title:"CSS · Selectors & Properties",icon:"🎨",lang:"html",color:"#38bdf8",tag:"css",items:[{label:"Selectors",langCode:"css",code:`/* Element */          p { color: red; }
/* Class */            .card { padding: 16px; }
/* ID */               #header { background: navy; }
/* Descendant */       .card p { font-size: 14px; }
/* Direct child */     ul > li { list-style: none; }
/* Adjacent sibling */ h2 + p { margin-top: 0; }
/* Attribute */        input[type="text"] { border: 1px solid; }
/* Pseudo-class */     a:hover { color: blue; }
/* Pseudo-class */     li:first-child { font-weight: bold; }
/* Pseudo-element */   p::first-line { font-variant: small-caps; }`},{label:"Common properties",langCode:"css",code:`/* Text */
color: #333;
font-size: 16px;
font-family: "Inter", sans-serif;
font-weight: 700;     /* 100–900, or bold/normal */
line-height: 1.6;
text-align: center;   /* left | right | center | justify */
text-decoration: none;  /* underline | none */

/* Spacing */
margin: 16px;          /* outside */
padding: 12px 24px;    /* inside: top/bottom left/right */
margin: 8px 16px 8px 16px; /* top right bottom left */

/* Size */
width: 100%;
max-width: 800px;
height: auto;`},{label:"Colors & backgrounds",langCode:"css",code:`/* Color formats */
color: red;                  /* named */
color: #ff6347;              /* hex */
color: rgb(255, 99, 71);     /* rgb */
color: rgba(255, 99, 71, 0.5); /* rgba — 0.5 opacity */
color: hsl(9, 100%, 64%);    /* hsl */

/* Background */
background-color: #f0f4f8;
background-image: url("bg.jpg");
background-size: cover;        /* or contain, 100% */
background-position: center;
background-repeat: no-repeat;

/* Shorthand */
background: #fff url("bg.png") no-repeat center/cover;`}]},{title:"CSS · Box Model & Layout",icon:"🎨",lang:"html",color:"#38bdf8",tag:"css",items:[{label:"Box model",langCode:"css",code:`/* Every element is a box: content + padding + border + margin */

.box {
  width: 200px;          /* content width */
  padding: 20px;         /* space inside border */
  border: 2px solid #333;
  margin: 16px;          /* space outside border */

  /* box-sizing: border-box makes width include padding+border */
  box-sizing: border-box; /* recommended — add to * {} globally */
}

/* Global reset (always include) */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`},{label:"Display & position",langCode:"css",code:`/* Display */
display: block;      /* full width, stacks vertically */
display: inline;     /* flows with text, no width/height */
display: inline-block; /* inline but accepts width/height */
display: flex;       /* flexbox container */
display: grid;       /* grid container */
display: none;       /* hidden (removed from layout) */

/* Position */
position: static;    /* default — normal flow */
position: relative;  /* offset from where it would be */
position: absolute;  /* relative to nearest positioned parent */
position: fixed;     /* fixed to viewport (stays on scroll) */
position: sticky;    /* scrolls until threshold, then sticks */
top: 0; left: 0; right: 0; bottom: 0;  /* offset props */`},{label:"Border, radius, shadow",langCode:"css",code:`border: 1px solid #ddd;
border-top: 3px solid blue;     /* single side */
border-radius: 8px;             /* rounded corners */
border-radius: 50%;             /* circle (on square) */

box-shadow: 0 2px 8px rgba(0,0,0,0.15);
/* x-offset y-offset blur spread color */
box-shadow: 2px 2px 0 0 black;   /* hard shadow */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); /* inward */

opacity: 0.8;      /* 0 = invisible, 1 = fully visible */
visibility: hidden; /* hidden but still takes up space */`}]},{title:"CSS · Flexbox",icon:"🎨",lang:"html",color:"#38bdf8",tag:"css",items:[{label:"Container properties",langCode:"css",code:`/* Apply to the parent container */
.container {
  display: flex;

  flex-direction: row;          /* row | column | row-reverse */
  justify-content: center;      /* main axis alignment */
  /* flex-start | flex-end | center | space-between | space-around */

  align-items: center;          /* cross axis alignment */
  /* stretch | flex-start | flex-end | center | baseline */

  flex-wrap: wrap;              /* nowrap | wrap | wrap-reverse */
  gap: 16px;                    /* space between items */
}`},{label:"Item properties",langCode:"css",code:`/* Apply to individual flex children */
.item {
  flex: 1;           /* grow to fill space (shorthand) */
  flex: 0 0 200px;   /* grow=0 shrink=0 basis=200px (fixed) */

  align-self: flex-end; /* override parent's align-items */

  order: 2;             /* change visual order */

  flex-grow:   1;    /* how much to grow relative to siblings */
  flex-shrink: 0;    /* 0 = don't shrink below flex-basis */
  flex-basis:  auto; /* initial main size */
}`},{label:"Common flex patterns",langCode:"css",code:`/* Center anything */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Navbar: logo left, links right */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Card grid that wraps */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card { flex: 1 1 280px; } /* grow, shrink, min-width */`}]},{title:"CSS · Grid",icon:"🎨",lang:"html",color:"#38bdf8",tag:"css",items:[{label:"Grid basics",langCode:"css",code:`/* Define a grid container */
.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 cols, middle is twice as wide */
  grid-template-rows: auto 1fr auto;  /* header, main, footer */
  gap: 16px;                          /* shorthand for row-gap + column-gap */
}

/* Common patterns */
grid-template-columns: repeat(3, 1fr);         /* 3 equal cols */
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* responsive */
grid-template-columns: 250px 1fr;              /* sidebar + content */`},{label:"Placing items",langCode:"css",code:`/* Span across columns or rows */
.header  { grid-column: 1 / -1; }        /* span all columns */
.sidebar { grid-column: 1 / 2; grid-row: 2 / 4; }
.main    { grid-column: 2 / -1; }

/* Named template areas */
.layout {
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
}
.header  { grid-area: header;  }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main;    }
.footer  { grid-area: footer;  }`}]}];function b({sheet:o}){const s=m()<900,[c,n]=d.useState(!0);return t.jsxs("div",{style:{background:e.surface,border:`1px solid ${e.border}`,borderRadius:14,overflow:"hidden",marginBottom:16},children:[t.jsxs("button",{onClick:()=>n(r=>!r),style:{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"14px 18px",background:"transparent",border:"none",textAlign:"left",cursor:"pointer",color:e.text},children:[t.jsx("span",{style:{fontSize:20},children:o.icon}),t.jsx("span",{style:{flex:1,fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:700,fontSize:13},children:o.title}),t.jsx("span",{style:{fontSize:9,fontFamily:"'Fira Code',monospace",letterSpacing:"1px",textTransform:"uppercase",padding:"2px 7px",borderRadius:4,background:`${o.color}18`,color:o.color},children:o.tag}),t.jsx("span",{style:{color:e.muted,fontSize:12,marginLeft:8},children:c?"▲":"▼"})]}),c&&t.jsx("div",{style:{padding:s?"0 12px 12px":"0 18px 18px",display:"grid",gridTemplateColumns:s?"1fr":"repeat(auto-fill,minmax(320px,1fr))",gap:12},children:o.items.map((r,l)=>t.jsxs("div",{style:{background:e.bg2,border:`1px solid ${e.border2}`,borderRadius:10,padding:"12px 14px"},children:[t.jsx("div",{style:{fontSize:10,fontFamily:"'Fira Code',monospace",color:o.color,letterSpacing:"1px",textTransform:"uppercase",marginBottom:8},children:r.label}),t.jsx(f,{code:r.code,lang:r.langCode||"py"}),r.note&&t.jsx("div",{style:{fontSize:11,color:e.muted2,marginTop:6,lineHeight:1.5},children:r.note})]},l))})]})}const y=[{id:"all",label:"All"},{id:"python",label:"🐍 Python"},{id:"javascript",label:"⚡ JavaScript"},{id:"flask",label:"🌶 Flask"},{id:"html",label:"🌐 HTML/CSS"}];function v(){const o=m()<900,[s,c]=d.useState("all"),[n,r]=d.useState(""),l=h.filter(a=>{const i=s==="all"||a.lang===s,g=n===""||a.title.toLowerCase().includes(n.toLowerCase())||a.items.some(p=>p.label.toLowerCase().includes(n.toLowerCase())||p.code.toLowerCase().includes(n.toLowerCase()));return i&&g});return t.jsxs("div",{children:[t.jsx(u,{eyebrow:"Reference",title:"Cheatsheets",sub:"Quick-reference cards for Python, JavaScript, and Flask — searchable and filterable",color:e.green}),t.jsxs("div",{style:{padding:o?"0 16px 40px":"0 24px 40px"},children:[t.jsx("div",{style:{marginBottom:16},children:t.jsx("input",{value:n,onChange:a=>r(a.target.value),placeholder:"Search cheatsheets…",style:{width:"100%",padding:"10px 14px",background:e.surface,border:`1px solid ${e.border2}`,borderRadius:10,color:e.text,fontFamily:"'Bricolage Grotesque',sans-serif",fontSize:13,outline:"none"},onFocus:a=>a.target.style.borderColor=e.green,onBlur:a=>a.target.style.borderColor=e.border2})}),t.jsx("div",{style:{display:"flex",gap:3,flexWrap:"nowrap",overflowX:"auto",background:e.surface,border:`1px solid ${e.border}`,borderRadius:10,padding:4,marginBottom:24},children:y.map(a=>t.jsx("button",{onClick:()=>c(a.id),style:{flexShrink:0,padding:"8px 14px",border:"none",borderRadius:7,background:s===a.id?e.surface2:"transparent",color:s===a.id?e.text:e.muted2,fontFamily:"'Bricolage Grotesque',sans-serif",fontWeight:600,fontSize:12,transition:"all .15s",whiteSpace:"nowrap",cursor:"pointer"},children:a.label},a.id))}),t.jsxs("div",{style:{fontSize:11,fontFamily:"'Fira Code',monospace",color:e.muted,marginBottom:16},children:["// showing ",l.length," sheet",l.length!==1?"s":""," — ",l.reduce((a,i)=>a+i.items.length,0)," reference cards"]}),l.length===0?t.jsxs("div",{style:{textAlign:"center",padding:"48px 0",color:e.muted2},children:[t.jsx("div",{style:{fontSize:32,marginBottom:12},children:"🔍"}),t.jsxs("div",{children:['No results for "',t.jsx("span",{style:{color:e.text},children:n}),'"']})]}):l.map((a,i)=>t.jsx(b,{sheet:a},i))]})]})}export{v as default};
