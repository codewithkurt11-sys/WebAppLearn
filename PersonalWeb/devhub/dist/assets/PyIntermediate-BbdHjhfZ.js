import{r as p,j as e,T as r}from"./index-CNTZnqQQ.js";import{P as u,T as f,a as n,b as s,Q as m,D as i,c as t,C as a,e as o,I as l}from"./shared-Cgke19x4.js";const x=[{id:"comprehensions",label:"Comprehensions"},{id:"generators",label:"Generators"},{id:"decorators",label:"Decorators"},{id:"fileio",label:"File I/O"},{id:"regex",label:"Regex"},{id:"oop",label:"OOP Deep Dive"},{id:"itertools",label:"itertools"},{id:"quiz",label:"Quiz 🎯"}],g=[{q:"What does a list comprehension [x*2 for x in range(5)] produce?",opts:["[0,2,4,6,8]","[0,1,2,3,4]","[2,4,6,8,10]","[1,2,3,4,5]"],ans:0,exp:"range(5) generates 0,1,2,3,4. Multiplying each by 2 gives [0,2,4,6,8]."},{q:"What keyword makes a function a generator?",opts:["return","async","yield","generate"],ans:2,exp:"yield makes a function a generator. Each call to next() resumes execution until the next yield statement."},{q:"What does a decorator do?",opts:["Runs code faster","Wraps a function to add behavior without modifying it","Adds CSS to Python","Creates a new class"],ans:1,exp:"A decorator is a function that takes another function, wraps it with extra behavior, and returns the wrapped version. @decorator is syntactic sugar for func = decorator(func)."},{q:"Which context manager ensures a file is always closed?",opts:["try/finally","with open()","file.close()","open().close()"],ans:1,exp:"with open() uses Python's context manager protocol. The file is automatically closed when the with block exits, even if an exception occurs."},{q:"What does re.findall() return?",opts:["The first match","A match object","A list of all matches","True/False"],ans:2,exp:"re.findall() returns a list of all non-overlapping matches in the string as strings (or tuples if the pattern has groups)."},{q:"What is @property used for?",opts:["Adding a decorator to all methods","Making a method accessible like an attribute","Caching a method's return value","Making a private attribute"],ans:1,exp:"@property lets you define a method that's accessed like an attribute (no parentheses). Great for computed values and validation."},{q:"What does itertools.chain() do?",opts:["Creates an infinite sequence","Combines multiple iterables into one","Pairs elements from two iterables","Generates permutations"],ans:1,exp:"itertools.chain() takes multiple iterables and yields all their elements one after another, as if they were a single sequence."},{q:"In a dict comprehension {k:v for k,v in items}, what is items?",opts:["A list of keys","A list of values","A list of (key, value) tuples","A dictionary"],ans:2,exp:"Dict comprehensions iterate over (key, value) pairs — typically from dict.items(), zip(), or enumerate()."}];function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"⚡ List Comprehensions"}),e.jsxs(i,{term:"List Comprehension",children:["A concise one-line syntax to build a list from another iterable: ",e.jsx(t,{children:"[expression for item in iterable if condition]"}),". It replaces a for-loop that appends to a list — faster, more readable, and Pythonic."]}),e.jsx(a,{lang:"py",showLines:!0,code:`# Traditional loop
squares = []
for n in range(1, 6):
    squares.append(n * n)
# [1, 4, 9, 16, 25]

# List comprehension — same result, one line
squares = [n * n for n in range(1, 6)]

# With condition filter
evens   = [n for n in range(20) if n % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transformation on strings
words   = ["hello", "world", "python"]
upper   = [w.upper() for w in words]
# ["HELLO", "WORLD", "PYTHON"]

# Nested comprehension (matrix)
matrix  = [[r * c for c in range(1, 4)] for r in range(1, 4)]
# [[1,2,3],[2,4,6],[3,6,9]]`}),e.jsxs(l,{type:"tip",children:['Comprehensions are read left-to-right: "give me ',e.jsx(t,{children:"[expression]"})," for each ",e.jsx(t,{children:"[item]"})," in ",e.jsx(t,{children:"[iterable]"})," where ",e.jsx(t,{children:"[condition]"}),'"']})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"Dict & Set Comprehensions"}),e.jsx(a,{lang:"py",showLines:!0,code:`# Dict comprehension — {key: value for ...}
names  = ["Alice", "Bob", "Charlie"]
lengths = {name: len(name) for name in names}
# {"Alice": 5, "Bob": 3, "Charlie": 7}

# Invert a dict
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: "a", 2: "b", 3: "c"}

# Filter a dict
prices = {"apple": 2.5, "banana": 1.2, "mango": 4.0}
cheap  = {k: v for k, v in prices.items() if v < 3.0}
# {"apple": 2.5, "banana": 1.2}

# Set comprehension — no duplicates
words   = ["hello", "world", "hello", "python", "world"]
unique  = {w.lower() for w in words}
# {"hello", "world", "python"}`}),e.jsxs(o,{children:["Write a list comprehension that generates all squares from 1–20 that are ",e.jsx("strong",{children:"even"}),".",`
`,"Then write a dict comprehension that maps each number 1–5 to its cube.",`
`,"Finally, use a set comprehension to find unique first letters from: ",e.jsx(t,{children:'["apple", "ant", "banana", "bear", "cherry"]'})]})]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🔄 Generators"}),e.jsxs(i,{term:"Generator",children:["A function that uses ",e.jsx(t,{children:"yield"})," to produce values one at a time, on demand. Unlike a list, it doesn't compute all values upfront — it's lazy. Perfect for large datasets or infinite sequences since it uses constant memory."]}),e.jsx(a,{lang:"py",showLines:!0,code:`# A generator function — uses yield instead of return
def count_up(start, stop):
    n = start
    while n <= stop:
        yield n           # produce one value and pause
        n += 1

# Create a generator object
gen = count_up(1, 5)

next(gen)   # 1
next(gen)   # 2
next(gen)   # 3

# Iterate with for loop
for n in count_up(1, 5):
    print(n)   # 1, 2, 3, 4, 5

# Infinite generator
def infinite_counter(start=0):
    n = start
    while True:
        yield n
        n += 1

counter = infinite_counter()
next(counter)  # 0
next(counter)  # 1  — never runs out!`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"Generator Expressions"}),e.jsx(a,{lang:"py",showLines:!0,code:`# Generator expression — like list comp but with ()
gen  = (n * n for n in range(1000000))  # creates nothing yet
first = next(gen)                        # 0 — computed on demand

# Memory comparison:
import sys
big_list = [n for n in range(100000)]         # ~800KB in memory
big_gen  = (n for n in range(100000))         # ~200 bytes!

# Use generators with functions that accept iterables
total = sum(n * n for n in range(100))     # no list created!
maval = max(len(s) for s in ["hi", "hello", "hey"])

# yield from — delegate to another generator
def chain(*iterables):
    for iterable in iterables:
        yield from iterable

result = list(chain([1,2], [3,4], [5,6]))
# [1, 2, 3, 4, 5, 6]`}),e.jsxs(o,{children:["Create a generator function ",e.jsx(t,{children:"fibonacci()"})," that yields Fibonacci numbers infinitely (0, 1, 1, 2, 3, 5, 8, ...).",`
`,"Use ",e.jsx(t,{children:"from itertools import islice"})," and ",e.jsx(t,{children:"list(islice(fibonacci(), 10))"})," to print the first 10 numbers.",`
`,"Compare the memory of a list vs generator with ",e.jsx(t,{children:"import sys; sys.getsizeof(...)"})]})]})]})}function b(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🎀 What is a Decorator?"}),e.jsxs(i,{term:"Decorator",children:["A function that wraps another function to add behavior — without modifying the original code. The ",e.jsx(t,{children:"@decorator"})," syntax is shorthand for ",e.jsx(t,{children:"func = decorator(func)"}),". Flask's ",e.jsx(t,{children:"@app.route()"})," is a decorator."]}),e.jsx(a,{lang:"py",showLines:!0,code:`# A decorator is just a function that returns a function
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before the function")
        result = func(*args, **kwargs)  # call original
        print("After the function")
        return result
    return wrapper

# Apply with @
@my_decorator
def greet(name):
    print(f"Hello, {name}!")
    return f"Hi {name}"

# This is EXACTLY the same as:
# greet = my_decorator(greet)

greet("Alice")
# Before the function
# Hello, Alice!
# After the function`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"Real-World Decorators"}),e.jsx(a,{lang:"py",showLines:!0,code:`import time
from functools import wraps

# Timing decorator
def timer(func):
    @wraps(func)          # preserves func name/docstring
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1_000_000)  # "slow_sum took 0.0314s"

# Decorator with arguments
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def hello():
    print("Hello!")

hello()  # prints Hello! three times`}),e.jsxs(l,{type:"info",children:["Always use ",e.jsx(t,{children:"@functools.wraps(func)"})," inside your decorator — it preserves the original function's name and docstring, which matters for debugging and documentation."]}),e.jsxs(o,{children:["Write a ",e.jsx(t,{children:"@validate_positive"})," decorator that raises a ",e.jsx(t,{children:"ValueError"})," if any argument is negative.",`
`,"Apply it to a ",e.jsx(t,{children:"square_root(n)"})," function. Test with positive and negative numbers."]})]})]})}function j(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"📁 File Reading & Writing"}),e.jsxs(i,{term:"File I/O",children:["Reading from and writing to files on disk. Python's ",e.jsx(t,{children:"with open(...) as f:"})," pattern (context manager) ensures files are automatically closed after use — even if an error occurs."]}),e.jsx(a,{lang:"py",showLines:!0,code:`# Modern approach — pathlib (Python 3.4+)
from pathlib import Path

path = Path("data.txt")

# Write
path.write_text("Hello, File!\\nLine 2\\nLine 3")

# Read entire file as string
content = path.read_text()

# Read as list of lines
lines = content.splitlines()
for line in lines:
    print(line)

# Check if file exists
if path.exists():
    print("File found!")

# File info
path.stem      # "data"  (name without extension)
path.suffix    # ".txt"
path.parent    # directory it's in`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"📂 Using open() with Context Manager"}),e.jsx(a,{lang:"py",showLines:!0,code:`# open() — traditional approach
# Modes: 'r'=read, 'w'=write, 'a'=append, 'x'=create new

# Reading
with open("data.txt", "r") as f:
    content = f.read()        # entire file
    # or
    for line in f:            # line by line (memory efficient)
        print(line.strip())

# Writing (overwrites)
with open("output.txt", "w") as f:
    f.write("Hello!\\n")
    f.writelines(["Line 1\\n","Line 2\\n"])

# Appending
with open("log.txt", "a") as f:
    f.write(f"New entry\\n")

# The 'with' statement auto-closes the file
# — even if an error occurs`}),e.jsxs(l,{type:"tip",children:["Always use ",e.jsx(t,{children:"with open(...)"})," — it automatically closes the file when done, even if an exception occurs."]})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🗄 JSON & CSV Files"}),e.jsx(a,{lang:"py",showLines:!0,code:`import json
import csv

# JSON — read
with open("users.json") as f:
    users = json.load(f)      # list/dict from file

# JSON — write
data = {"name": "Alice", "score": 95}
with open("out.json", "w") as f:
    json.dump(data, f, indent=2)

# CSV — read
with open("scores.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["score"])

# CSV — write
with open("out.csv", "w", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=["name","score"])
    writer.writeheader()
    writer.writerow({"name":"Alice","score":95})`}),e.jsxs(o,{children:["Write a Python script that:",`
`,`1. Creates a list of 5 student dicts with name + score
2. Saves them to students.json with json.dump()
3. Reads them back and prints only students with score >= 80
4. Saves the filtered list to top_students.json`]})]})]})}function v(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🔍 Regular Expressions"}),e.jsxs(i,{term:"Regular Expression (Regex)",children:["A pattern string that matches text. Used for validation (is this a valid email?), extraction (find all phone numbers), and transformation (replace all digits). Python's ",e.jsx(t,{children:"re"})," module provides all regex functions."]}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:"Regex lets you search, validate, and extract patterns from strings. Used heavily in web scraping and form validation."}),e.jsx(a,{lang:"py",showLines:!0,code:`import re

text = "Contact us at info@example.com or support@site.org"

# re.search() — find first match anywhere in string
match = re.search(r"\\w+@\\w+\\.\\w+", text)
if match:
    print(match.group())    # info@example.com

# re.findall() — all matches as list
emails = re.findall(r"[\\w.]+@[\\w.]+\\.\\w+", text)
# ["info@example.com", "support@site.org"]

# re.match() — only matches at the START of string
re.match(r"Contact", text)   # match
re.match(r"info", text)      # None

# re.fullmatch() — must match ENTIRE string
re.fullmatch(r"\\d{4}", "2024")    # match
re.fullmatch(r"\\d{4}", "20240")   # None`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🔤 Common Patterns"}),e.jsx(a,{lang:"py",showLines:!0,code:`# Pattern reference
# .     any character (except newline)
# \\d    digit [0-9]
# \\D    non-digit
# \\w    word char [a-zA-Z0-9_]
# \\W    non-word
# \\s    whitespace
# \\S    non-whitespace
# ^     start of string
# $     end of string
# *     0 or more
# +     1 or more
# ?     0 or 1 (optional)
# {n}   exactly n times
# {n,m} between n and m times
# [abc] any of a, b, c
# (a|b) a or b

# Practical examples
phone   = re.findall(r"\\d{3}[-.]\\d{3}[-.]\\d{4}", text)
zipcode = re.match(r"^\\d{5}(-\\d{4})?$", "12345")
url     = re.search(r"https?://[\\w./-]+", text)

# Validate email
def valid_email(email):
    return bool(re.fullmatch(r"[\\w.]+@[\\w.]+\\.\\w{2,}", email))`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"Replace & Groups"}),e.jsx(a,{lang:"py",showLines:!0,code:`# re.sub() — find and replace
clean = re.sub(r"\\s+", " ", "too   many    spaces")
# "too many spaces"

masked = re.sub(r"\\d", "*", "Phone: 123-456-7890")
# "Phone: ***-***-****"

# Groups — extract parts of a match
date_str = "Today is 2024-05-28"
match = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", date_str)
if match:
    year, month, day = match.groups()
    print(year, month, day)   # 2024 05 28

# Named groups
match = re.search(
    r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})",
    date_str
)
if match:
    print(match.group("year"))   # 2024`}),e.jsxs(o,{children:["Write a function ",e.jsx(t,{children:"extract_info(text)"})," that uses regex to find all email addresses and all phone numbers (format: XXX-XXX-XXXX) in a string.",`
`,"Test with: ",e.jsx(t,{children:'"Call 555-123-4567 or email me at alice@example.com and bob@test.org"'})]})]})]})}function _(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🏗 OOP Deep Dive"}),e.jsxs(i,{term:"Class",children:["A blueprint for creating objects. It defines attributes (data) and methods (behavior). ",e.jsx(t,{children:"__init__"})," is the constructor. ",e.jsx(t,{children:"self"})," refers to the current instance. Class variables are shared; instance variables are per-object."]}),e.jsx(a,{lang:"py",showLines:!0,code:`class BankAccount:
    # Class variable (shared by all instances)
    bank_name = "PyBank"
    total_accounts = 0

    def __init__(self, owner, balance=0):
        self.owner   = owner        # instance variable
        self.balance = balance
        BankAccount.total_accounts += 1

    # Instance method
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance -= amount
        return self.balance

    # String representation
    def __str__(self):
        return f"Account({self.owner}: \${self.balance})"

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"

    # Comparison magic methods
    def __eq__(self, other):
        return self.balance == other.balance

    def __lt__(self, other):
        return self.balance < other.balance

acc = BankAccount("Alice", 1000)
acc.deposit(500)
print(acc)            # Account(Alice: $1500)
print(repr(acc))      # BankAccount(owner='Alice', balance=1500)`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"@property & @classmethod"}),e.jsx(a,{lang:"py",showLines:!0,code:`class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    # @property — access like attribute, not method
    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    # @classmethod — alternative constructor
    @classmethod
    def from_fahrenheit(cls, fahrenheit):
        return cls((fahrenheit - 32) * 5/9)

    # @staticmethod — utility, no self/cls
    @staticmethod
    def is_valid(value):
        return value >= -273.15

t = Temperature(100)
print(t.celsius)      # 100  (property, no ())
print(t.fahrenheit)   # 212.0

t2 = Temperature.from_fahrenheit(32)  # classmethod
print(t2.celsius)     # 0.0`}),e.jsxs(l,{type:"info",children:[e.jsx(t,{children:"@property"})," makes methods look like attributes — clean API for computed values. Flask-SQLAlchemy uses this pattern extensively."]}),e.jsxs(o,{children:["Extend ",e.jsx(t,{children:"BankAccount"})," with:",`
`,`• A @property 'status' that returns "rich" if balance > 10000, "normal" otherwise
• A @classmethod 'open_joint_account(owner1, owner2)' that creates an account with a combined name
• __len__ that returns the balance as an integer`]})]})]})}function A(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🔧 itertools"}),e.jsx(i,{term:"itertools",children:"Python's standard library module for efficient iteration. All functions return iterators (lazy), so they use minimal memory. Essential for working with large datasets, combinatorics, and infinite sequences."}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:["Python's ",e.jsx(t,{children:"itertools"})," module provides powerful functions for working with iterables — all memory-efficient."]}),e.jsx(a,{lang:"py",showLines:!0,code:`from itertools import (
    chain, islice, cycle, repeat,
    groupby, combinations, permutations,
    count, takewhile, dropwhile
)

# chain — combine iterables
all_items = list(chain([1,2], [3,4], [5,6]))
# [1, 2, 3, 4, 5, 6]

# islice — take first N from any iterable (incl. infinite)
first_5 = list(islice(range(1000), 5))
# [0, 1, 2, 3, 4]

# cycle — repeat a sequence infinitely
colors = cycle(["red","green","blue"])
next(colors)  # "red"
next(colors)  # "green"
next(colors)  # "blue"
next(colors)  # "red"  ...

# count — infinite counter
for i in islice(count(10, 2), 5):  # start=10, step=2
    print(i)   # 10 12 14 16 18`})]}),e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"Combinations & Groupby"}),e.jsx(a,{lang:"py",showLines:!0,code:`# combinations — all C(n,r) combos
from itertools import combinations, permutations

items = ["A","B","C"]
list(combinations(items, 2))
# [("A","B"),("A","C"),("B","C")]

list(permutations(items, 2))
# [("A","B"),("A","C"),("B","A"),("B","C"),("C","A"),("C","B")]

# groupby — group consecutive elements
from itertools import groupby

data = [
    {"dept":"Eng","name":"Alice"},
    {"dept":"Eng","name":"Bob"},
    {"dept":"HR","name":"Eve"},
]

# Must be sorted by the key first!
data.sort(key=lambda x: x["dept"])
for dept, members in groupby(data, key=lambda x: x["dept"]):
    print(dept, list(members))`}),e.jsxs(o,{children:["Use ",e.jsx(t,{children:"itertools.combinations()"})," to find all possible 2-person teams from: ",e.jsx(t,{children:'["Alice", "Bob", "Charlie", "Diana"]'}),".",`
`,"How many combinations are there? Then use ",e.jsx(t,{children:"permutations()"})," for the same — how many ordered arrangements?",`
`,"Finally, use ",e.jsx(t,{children:"groupby"})," to group ",e.jsx(t,{children:'["apple","ant","banana","bear","cherry","carrot"]'})," by first letter."]})]})]})}function T(){const[c,d]=p.useState(()=>{try{return localStorage.getItem("cif_tab_py-inter")??"comprehensions"}catch{return"comprehensions"}}),h={comprehensions:e.jsx(y,{}),generators:e.jsx(w,{}),decorators:e.jsx(b,{}),fileio:e.jsx(j,{}),regex:e.jsx(v,{}),oop:e.jsx(_,{}),itertools:e.jsx(A,{})};return e.jsxs("div",{children:[e.jsx(u,{eyebrow:"Python · Intermediate",title:"Python Intermediate",sub:"Comprehensions, generators, decorators, file I/O, regex, OOP deep dive",color:r.accent}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:r.muted2,lineHeight:1.7,marginBottom:20},children:"List comprehensions and proper OOP show up in every serious Python codebase. If you can read a Python file at a real job and understand a decorator, a class with inheritance, and a generator expression on sight — you're in the top tier of Python learners."}),e.jsx(f,{tabs:x,active:c,onChange:d,pageId:"py-inter"}),c==="quiz"?e.jsxs(n,{children:[e.jsx(s,{color:r.accent,children:"🎯 Python Intermediate Quiz"}),e.jsx(m,{questions:g,trackId:"py-inter"})]}):h[c]]})]})}export{T as default};
