import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question, Def, TryIt } from "../../shared";

const TABS: Tab[] = [
  { id:"comprehensions", label:"Comprehensions" },
  { id:"generators",     label:"Generators"     },
  { id:"decorators",     label:"Decorators"     },
  { id:"fileio",         label:"File I/O"       },
  { id:"regex",          label:"Regex"          },
  { id:"oop",            label:"OOP Deep Dive"  },
  { id:"itertools",      label:"itertools"      },
  { id:"quiz",           label:"Quiz 🎯"        },
];

const QUIZ: Question[] = [
  { q:"What does a list comprehension [x*2 for x in range(5)] produce?", opts:["[0,2,4,6,8]","[0,1,2,3,4]","[2,4,6,8,10]","[1,2,3,4,5]"], ans:0, exp:"range(5) generates 0,1,2,3,4. Multiplying each by 2 gives [0,2,4,6,8]." },
  { q:"What keyword makes a function a generator?", opts:["return","async","yield","generate"], ans:2, exp:"yield makes a function a generator. Each call to next() resumes execution until the next yield statement." },
  { q:"What does a decorator do?", opts:["Runs code faster","Wraps a function to add behavior without modifying it","Adds CSS to Python","Creates a new class"], ans:1, exp:"A decorator is a function that takes another function, wraps it with extra behavior, and returns the wrapped version. @decorator is syntactic sugar for func = decorator(func)." },
  { q:"Which context manager ensures a file is always closed?", opts:["try/finally","with open()","file.close()","open().close()"], ans:1, exp:"with open() uses Python's context manager protocol. The file is automatically closed when the with block exits, even if an exception occurs." },
  { q:"What does re.findall() return?", opts:["The first match","A match object","A list of all matches","True/False"], ans:2, exp:"re.findall() returns a list of all non-overlapping matches in the string as strings (or tuples if the pattern has groups)." },
  { q:"What is @property used for?", opts:["Adding a decorator to all methods","Making a method accessible like an attribute","Caching a method's return value","Making a private attribute"], ans:1, exp:"@property lets you define a method that's accessed like an attribute (no parentheses). Great for computed values and validation." },
  { q:"What does itertools.chain() do?", opts:["Creates an infinite sequence","Combines multiple iterables into one","Pairs elements from two iterables","Generates permutations"], ans:1, exp:"itertools.chain() takes multiple iterables and yields all their elements one after another, as if they were a single sequence." },
  { q:"In a dict comprehension {k:v for k,v in items}, what is items?", opts:["A list of keys","A list of values","A list of (key, value) tuples","A dictionary"], ans:2, exp:"Dict comprehensions iterate over (key, value) pairs — typically from dict.items(), zip(), or enumerate()." },
];

function TabComprehensions() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>⚡ List Comprehensions</CardTitle>
      <Def term="List Comprehension">A concise one-line syntax to build a list from another iterable: <IC>[expression for item in iterable if condition]</IC>. It replaces a for-loop that appends to a list — faster, more readable, and Pythonic.</Def>
      <CodeBlock lang="py" showLines code={`# Traditional loop\nsquares = []\nfor n in range(1, 6):\n    squares.append(n * n)\n# [1, 4, 9, 16, 25]\n\n# List comprehension — same result, one line\nsquares = [n * n for n in range(1, 6)]\n\n# With condition filter\nevens   = [n for n in range(20) if n % 2 == 0]\n# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\n# Transformation on strings\nwords   = ["hello", "world", "python"]\nupper   = [w.upper() for w in words]\n# ["HELLO", "WORLD", "PYTHON"]\n\n# Nested comprehension (matrix)\nmatrix  = [[r * c for c in range(1, 4)] for r in range(1, 4)]\n# [[1,2,3],[2,4,6],[3,6,9]]`}/>
      <InfoBox type="tip">Comprehensions are read left-to-right: "give me <IC>[expression]</IC> for each <IC>[item]</IC> in <IC>[iterable]</IC> where <IC>[condition]</IC>"</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Dict & Set Comprehensions</CardTitle>
      <CodeBlock lang="py" showLines code={`# Dict comprehension — {key: value for ...}\nnames  = ["Alice", "Bob", "Charlie"]\nlengths = {name: len(name) for name in names}\n# {"Alice": 5, "Bob": 3, "Charlie": 7}\n\n# Invert a dict\noriginal = {"a": 1, "b": 2, "c": 3}\ninverted = {v: k for k, v in original.items()}\n# {1: "a", 2: "b", 3: "c"}\n\n# Filter a dict\nprices = {"apple": 2.5, "banana": 1.2, "mango": 4.0}\ncheap  = {k: v for k, v in prices.items() if v < 3.0}\n# {"apple": 2.5, "banana": 1.2}\n\n# Set comprehension — no duplicates\nwords   = ["hello", "world", "hello", "python", "world"]\nunique  = {w.lower() for w in words}\n# {"hello", "world", "python"}`}/>
      <TryIt>Write a list comprehension that generates all squares from 1–20 that are <strong>even</strong>.{"\n"}
        Then write a dict comprehension that maps each number 1–5 to its cube.{"\n"}
        Finally, use a set comprehension to find unique first letters from: <IC>["apple", "ant", "banana", "bear", "cherry"]</IC>
      </TryIt>
    </Card>
  </>);
}

function TabGenerators() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔄 Generators</CardTitle>
      <Def term="Generator">A function that uses <IC>yield</IC> to produce values one at a time, on demand. Unlike a list, it doesn't compute all values upfront — it's lazy. Perfect for large datasets or infinite sequences since it uses constant memory.</Def>
      <CodeBlock lang="py" showLines code={`# A generator function — uses yield instead of return\ndef count_up(start, stop):\n    n = start\n    while n <= stop:\n        yield n           # produce one value and pause\n        n += 1\n\n# Create a generator object\ngen = count_up(1, 5)\n\nnext(gen)   # 1\nnext(gen)   # 2\nnext(gen)   # 3\n\n# Iterate with for loop\nfor n in count_up(1, 5):\n    print(n)   # 1, 2, 3, 4, 5\n\n# Infinite generator\ndef infinite_counter(start=0):\n    n = start\n    while True:\n        yield n\n        n += 1\n\ncounter = infinite_counter()\nnext(counter)  # 0\nnext(counter)  # 1  — never runs out!`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Generator Expressions</CardTitle>
      <CodeBlock lang="py" showLines code={`# Generator expression — like list comp but with ()\ngen  = (n * n for n in range(1000000))  # creates nothing yet\nfirst = next(gen)                        # 0 — computed on demand\n\n# Memory comparison:\nimport sys\nbig_list = [n for n in range(100000)]         # ~800KB in memory\nbig_gen  = (n for n in range(100000))         # ~200 bytes!\n\n# Use generators with functions that accept iterables\ntotal = sum(n * n for n in range(100))     # no list created!\nmaval = max(len(s) for s in ["hi", "hello", "hey"])\n\n# yield from — delegate to another generator\ndef chain(*iterables):\n    for iterable in iterables:\n        yield from iterable\n\nresult = list(chain([1,2], [3,4], [5,6]))\n# [1, 2, 3, 4, 5, 6]`}/>
      <TryIt>Create a generator function <IC>fibonacci()</IC> that yields Fibonacci numbers infinitely (0, 1, 1, 2, 3, 5, 8, ...).{"\n"}
        Use <IC>from itertools import islice</IC> and <IC>list(islice(fibonacci(), 10))</IC> to print the first 10 numbers.{"\n"}
        Compare the memory of a list vs generator with <IC>import sys; sys.getsizeof(...)</IC>
      </TryIt>
    </Card>
  </>);
}

function TabDecorators() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🎀 What is a Decorator?</CardTitle>
      <Def term="Decorator">A function that wraps another function to add behavior — without modifying the original code. The <IC>@decorator</IC> syntax is shorthand for <IC>func = decorator(func)</IC>. Flask's <IC>@app.route()</IC> is a decorator.</Def>
      <CodeBlock lang="py" showLines code={`# A decorator is just a function that returns a function\ndef my_decorator(func):\n    def wrapper(*args, **kwargs):\n        print("Before the function")\n        result = func(*args, **kwargs)  # call original\n        print("After the function")\n        return result\n    return wrapper\n\n# Apply with @\n@my_decorator\ndef greet(name):\n    print(f"Hello, {name}!")\n    return f"Hi {name}"\n\n# This is EXACTLY the same as:\n# greet = my_decorator(greet)\n\ngreet("Alice")\n# Before the function\n# Hello, Alice!\n# After the function`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Real-World Decorators</CardTitle>
      <CodeBlock lang="py" showLines code={`import time\nfrom functools import wraps\n\n# Timing decorator\ndef timer(func):\n    @wraps(func)          # preserves func name/docstring\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nslow_sum(1_000_000)  # "slow_sum took 0.0314s"\n\n# Decorator with arguments\ndef repeat(times):\n    def decorator(func):\n        @wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef hello():\n    print("Hello!")\n\nhello()  # prints Hello! three times`}/>
      <InfoBox type="info">Always use <IC>@functools.wraps(func)</IC> inside your decorator — it preserves the original function's name and docstring, which matters for debugging and documentation.</InfoBox>
      <TryIt>Write a <IC>@validate_positive</IC> decorator that raises a <IC>ValueError</IC> if any argument is negative.{"\n"}
        Apply it to a <IC>square_root(n)</IC> function. Test with positive and negative numbers.
      </TryIt>
    </Card>
  </>);
}

function TabFileIO() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📁 File Reading & Writing</CardTitle>
      <Def term="File I/O">Reading from and writing to files on disk. Python's <IC>with open(...) as f:</IC> pattern (context manager) ensures files are automatically closed after use — even if an error occurs.</Def>
      <CodeBlock lang="py" showLines code={`# Modern approach — pathlib (Python 3.4+)\nfrom pathlib import Path\n\npath = Path("data.txt")\n\n# Write\npath.write_text("Hello, File!\\nLine 2\\nLine 3")\n\n# Read entire file as string\ncontent = path.read_text()\n\n# Read as list of lines\nlines = content.splitlines()\nfor line in lines:\n    print(line)\n\n# Check if file exists\nif path.exists():\n    print("File found!")\n\n# File info\npath.stem      # "data"  (name without extension)\npath.suffix    # ".txt"\npath.parent    # directory it's in`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>📂 Using open() with Context Manager</CardTitle>
      <CodeBlock lang="py" showLines code={`# open() — traditional approach\n# Modes: 'r'=read, 'w'=write, 'a'=append, 'x'=create new\n\n# Reading\nwith open("data.txt", "r") as f:\n    content = f.read()        # entire file\n    # or\n    for line in f:            # line by line (memory efficient)\n        print(line.strip())\n\n# Writing (overwrites)\nwith open("output.txt", "w") as f:\n    f.write("Hello!\\n")\n    f.writelines(["Line 1\\n","Line 2\\n"])\n\n# Appending\nwith open("log.txt", "a") as f:\n    f.write(f"New entry\\n")\n\n# The 'with' statement auto-closes the file\n# — even if an error occurs`}/>
      <InfoBox type="tip">Always use <IC>with open(...)</IC> — it automatically closes the file when done, even if an exception occurs.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🗄 JSON & CSV Files</CardTitle>
      <CodeBlock lang="py" showLines code={`import json\nimport csv\n\n# JSON — read\nwith open("users.json") as f:\n    users = json.load(f)      # list/dict from file\n\n# JSON — write\ndata = {"name": "Alice", "score": 95}\nwith open("out.json", "w") as f:\n    json.dump(data, f, indent=2)\n\n# CSV — read\nwith open("scores.csv") as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row["name"], row["score"])\n\n# CSV — write\nwith open("out.csv", "w", newline="") as f:\n    writer = csv.DictWriter(f, fieldnames=["name","score"])\n    writer.writeheader()\n    writer.writerow({"name":"Alice","score":95})`}/>
      <TryIt>Write a Python script that:{"\n"}
        {`1. Creates a list of 5 student dicts with name + score\n2. Saves them to students.json with json.dump()\n3. Reads them back and prints only students with score >= 80\n4. Saves the filtered list to top_students.json`}
      </TryIt>
    </Card>
  </>);
}

function TabRegex() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔍 Regular Expressions</CardTitle>
      <Def term="Regular Expression (Regex)">A pattern string that matches text. Used for validation (is this a valid email?), extraction (find all phone numbers), and transformation (replace all digits). Python's <IC>re</IC> module provides all regex functions.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10, marginTop:10 }}>Regex lets you search, validate, and extract patterns from strings. Used heavily in web scraping and form validation.</p>
      <CodeBlock lang="py" showLines code={`import re\n\ntext = "Contact us at info@example.com or support@site.org"\n\n# re.search() — find first match anywhere in string\nmatch = re.search(r"\\w+@\\w+\\.\\w+", text)\nif match:\n    print(match.group())    # info@example.com\n\n# re.findall() — all matches as list\nemails = re.findall(r"[\\w.]+@[\\w.]+\\.\\w+", text)\n# ["info@example.com", "support@site.org"]\n\n# re.match() — only matches at the START of string\nre.match(r"Contact", text)   # match\nre.match(r"info", text)      # None\n\n# re.fullmatch() — must match ENTIRE string\nre.fullmatch(r"\\d{4}", "2024")    # match\nre.fullmatch(r"\\d{4}", "20240")   # None`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔤 Common Patterns</CardTitle>
      <CodeBlock lang="py" showLines code={`# Pattern reference\n# .     any character (except newline)\n# \\d    digit [0-9]\n# \\D    non-digit\n# \\w    word char [a-zA-Z0-9_]\n# \\W    non-word\n# \\s    whitespace\n# \\S    non-whitespace\n# ^     start of string\n# $     end of string\n# *     0 or more\n# +     1 or more\n# ?     0 or 1 (optional)\n# {n}   exactly n times\n# {n,m} between n and m times\n# [abc] any of a, b, c\n# (a|b) a or b\n\n# Practical examples\nphone   = re.findall(r"\\d{3}[-.]\\d{3}[-.]\\d{4}", text)\nzipcode = re.match(r"^\\d{5}(-\\d{4})?$", "12345")\nurl     = re.search(r"https?://[\\w./-]+", text)\n\n# Validate email\ndef valid_email(email):\n    return bool(re.fullmatch(r"[\\w.]+@[\\w.]+\\.\\w{2,}", email))`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Replace & Groups</CardTitle>
      <CodeBlock lang="py" showLines code={`# re.sub() — find and replace\nclean = re.sub(r"\\s+", " ", "too   many    spaces")\n# "too many spaces"\n\nmasked = re.sub(r"\\d", "*", "Phone: 123-456-7890")\n# "Phone: ***-***-****"\n\n# Groups — extract parts of a match\ndate_str = "Today is 2024-05-28"\nmatch = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", date_str)\nif match:\n    year, month, day = match.groups()\n    print(year, month, day)   # 2024 05 28\n\n# Named groups\nmatch = re.search(\n    r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})",\n    date_str\n)\nif match:\n    print(match.group("year"))   # 2024`}/>
      <TryIt>Write a function <IC>extract_info(text)</IC> that uses regex to find all email addresses and all phone numbers (format: XXX-XXX-XXXX) in a string.{"\n"}
        Test with: <IC>"Call 555-123-4567 or email me at alice@example.com and bob@test.org"</IC>
      </TryIt>
    </Card>
  </>);
}

function TabOOP() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🏗 OOP Deep Dive</CardTitle>
      <Def term="Class">A blueprint for creating objects. It defines attributes (data) and methods (behavior). <IC>__init__</IC> is the constructor. <IC>self</IC> refers to the current instance. Class variables are shared; instance variables are per-object.</Def>
      <CodeBlock lang="py" showLines code={`class BankAccount:\n    # Class variable (shared by all instances)\n    bank_name = "PyBank"\n    total_accounts = 0\n\n    def __init__(self, owner, balance=0):\n        self.owner   = owner        # instance variable\n        self.balance = balance\n        BankAccount.total_accounts += 1\n\n    # Instance method\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError("Insufficient funds")\n        self.balance -= amount\n        return self.balance\n\n    # String representation\n    def __str__(self):\n        return f"Account({self.owner}: \${self.balance})"\n\n    def __repr__(self):\n        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"\n\n    # Comparison magic methods\n    def __eq__(self, other):\n        return self.balance == other.balance\n\n    def __lt__(self, other):\n        return self.balance < other.balance\n\nacc = BankAccount("Alice", 1000)\nacc.deposit(500)\nprint(acc)            # Account(Alice: $1500)\nprint(repr(acc))      # BankAccount(owner='Alice', balance=1500)`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>@property & @classmethod</CardTitle>
      <CodeBlock lang="py" showLines code={`class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    # @property — access like attribute, not method\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Below absolute zero!")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\n    # @classmethod — alternative constructor\n    @classmethod\n    def from_fahrenheit(cls, fahrenheit):\n        return cls((fahrenheit - 32) * 5/9)\n\n    # @staticmethod — utility, no self/cls\n    @staticmethod\n    def is_valid(value):\n        return value >= -273.15\n\nt = Temperature(100)\nprint(t.celsius)      # 100  (property, no ())\nprint(t.fahrenheit)   # 212.0\n\nt2 = Temperature.from_fahrenheit(32)  # classmethod\nprint(t2.celsius)     # 0.0`}/>
      <InfoBox type="info"><IC>@property</IC> makes methods look like attributes — clean API for computed values. Flask-SQLAlchemy uses this pattern extensively.</InfoBox>
      <TryIt>Extend <IC>BankAccount</IC> with:{"\n"}
        {`• A @property 'status' that returns "rich" if balance > 10000, "normal" otherwise\n• A @classmethod 'open_joint_account(owner1, owner2)' that creates an account with a combined name\n• __len__ that returns the balance as an integer`}
      </TryIt>
    </Card>
  </>);
}

function TabItertools() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔧 itertools</CardTitle>
      <Def term="itertools">Python's standard library module for efficient iteration. All functions return iterators (lazy), so they use minimal memory. Essential for working with large datasets, combinatorics, and infinite sequences.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10, marginTop:10 }}>Python's <IC>itertools</IC> module provides powerful functions for working with iterables — all memory-efficient.</p>
      <CodeBlock lang="py" showLines code={`from itertools import (\n    chain, islice, cycle, repeat,\n    groupby, combinations, permutations,\n    count, takewhile, dropwhile\n)\n\n# chain — combine iterables\nall_items = list(chain([1,2], [3,4], [5,6]))\n# [1, 2, 3, 4, 5, 6]\n\n# islice — take first N from any iterable (incl. infinite)\nfirst_5 = list(islice(range(1000), 5))\n# [0, 1, 2, 3, 4]\n\n# cycle — repeat a sequence infinitely\ncolors = cycle(["red","green","blue"])\nnext(colors)  # "red"\nnext(colors)  # "green"\nnext(colors)  # "blue"\nnext(colors)  # "red"  ...\n\n# count — infinite counter\nfor i in islice(count(10, 2), 5):  # start=10, step=2\n    print(i)   # 10 12 14 16 18`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Combinations & Groupby</CardTitle>
      <CodeBlock lang="py" showLines code={`# combinations — all C(n,r) combos\nfrom itertools import combinations, permutations\n\nitems = ["A","B","C"]\nlist(combinations(items, 2))\n# [("A","B"),("A","C"),("B","C")]\n\nlist(permutations(items, 2))\n# [("A","B"),("A","C"),("B","A"),("B","C"),("C","A"),("C","B")]\n\n# groupby — group consecutive elements\nfrom itertools import groupby\n\ndata = [\n    {"dept":"Eng","name":"Alice"},\n    {"dept":"Eng","name":"Bob"},\n    {"dept":"HR","name":"Eve"},\n]\n\n# Must be sorted by the key first!\ndata.sort(key=lambda x: x["dept"])\nfor dept, members in groupby(data, key=lambda x: x["dept"]):\n    print(dept, list(members))`}/>
      <TryIt>Use <IC>itertools.combinations()</IC> to find all possible 2-person teams from: <IC>["Alice", "Bob", "Charlie", "Diana"]</IC>.{"\n"}
        How many combinations are there? Then use <IC>permutations()</IC> for the same — how many ordered arrangements?{"\n"}
        Finally, use <IC>groupby</IC> to group <IC>["apple","ant","banana","bear","cherry","carrot"]</IC> by first letter.
      </TryIt>
    </Card>
  </>);
}

export default function PyIntermediate() {
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem("cif_tab_py-inter") ?? "comprehensions"; } catch { return "comprehensions"; }
  });
  const content: Record<string, React.ReactNode> = {
    comprehensions:<TabComprehensions/>, generators:<TabGenerators/>,
    decorators:<TabDecorators/>, fileio:<TabFileIO/>,
    regex:<TabRegex/>, oop:<TabOOP/>, itertools:<TabItertools/>,
  };
  return (
    <div>
      <PageHeader eyebrow="Python · Intermediate" title="Python Intermediate" sub="Comprehensions, generators, decorators, file I/O, regex, OOP deep dive" color={T.accent}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          List comprehensions and proper OOP show up in every serious Python codebase. If you can read a Python file at a real job and understand a decorator, a class with inheritance, and a generator expression on sight — you're in the top tier of Python learners.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab} pageId="py-inter"/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.accent}>🎯 Python Intermediate Quiz</CardTitle><Quiz questions={QUIZ} trackId="py-inter"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
