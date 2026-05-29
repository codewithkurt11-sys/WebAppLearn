import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"comprehensions", label:"Comprehensions" },
  { id:"generators",     label:"Generators"     },
  { id:"decorators",     label:"Decorators"     },
  { id:"fileio",         label:"File I/O"        },
  { id:"regex",          label:"Regex"           },
  { id:"oop",            label:"OOP Deep Dive"   },
  { id:"itertools",      label:"Itertools"       },
  { id:"quiz",           label:"Quiz 🎯"         },
];

const QUIZ: Question[] = [
  { q:"What does [x**2 for x in range(5)] produce?", opts:["[0,2,4,6,8]","[0,1,4,9,16]","[1,4,9,16,25]","Error"], ans:1, exp:"range(5) gives 0,1,2,3,4 — squaring each gives 0,1,4,9,16." },
  { q:"What keyword creates a generator?", opts:["return","async","yield","generate"], ans:2, exp:"yield pauses a function and returns a value, making it a generator. Values are produced lazily." },
  { q:"What does a decorator do?", opts:["Renames a function","Wraps a function to extend its behavior","Deletes a function","Imports a module"], ans:1, exp:"A decorator wraps a function — it runs before/after it, modifying behavior without changing the original function's code." },
  { q:"Which mode opens a file for writing (overwriting)?", opts:["r","a","w","x"], ans:2, exp:"'w' opens for writing and overwrites the file. 'a' appends. 'r' reads. 'x' creates new, fails if exists." },
  { q:"Which regex function returns all matches in a string?", opts:["re.match()","re.search()","re.findall()","re.fullmatch()"], ans:2, exp:"re.findall() returns a list of all non-overlapping matches. re.match() only checks the beginning." },
  { q:"What is __str__ used for in a class?", opts:["Constructor","String representation (print/str())","Destructor","Comparison"], ans:1, exp:"__str__ defines what print(obj) shows. __repr__ defines the developer representation." },
  { q:"What does @property do?", opts:["Makes a method private","Lets you access a method like an attribute","Caches the result","Deletes an attribute"], ans:1, exp:"@property turns a method into a readable attribute. You can then use obj.name instead of obj.name()." },
  { q:"What does itertools.chain() do?", opts:["Creates infinite numbers","Combines multiple iterables into one","Filters elements","Zips iterables"], ans:1, exp:"itertools.chain(*iterables) combines multiple iterables into a single continuous iterator." },
  { q:"What does zip() do with two lists of different lengths?", opts:["Raises an error","Pads the shorter list with None","Stops at the shorter list","Repeats the shorter list"], ans:2, exp:"zip() stops when the shortest iterable is exhausted. Use itertools.zip_longest() if you want to continue to the end of the longer list." },
  { q:"What is the difference between copy() and deepcopy()?", opts:["No difference","copy() copies nested objects, deepcopy() doesn't","deepcopy() copies nested objects recursively, copy() only copies the top level","deepcopy() is faster"], ans:2, exp:"copy.copy() creates a shallow copy — nested objects are still shared. copy.deepcopy() recursively copies everything, so nested objects are independent." },
];

function TabComprehensions() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📋 List Comprehensions</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Create lists in one line — faster and more Pythonic than a for loop with .append().</p>
      <CodeBlock lang="py" showLines code={`# Basic: [expression for item in iterable]\nsquares = [x**2 for x in range(1, 11)]\n# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# With filter: [expression for item in iterable if condition]\nevens  = [x for x in range(20) if x % 2 == 0]\n# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\npassed = [s for s in scores if s >= 60]\n\n# Transform a list\nwords = ["hello", "world", "python"]\nupper = [w.upper() for w in words]\ncaps  = [w.capitalize() for w in words if len(w) > 4]\n\n# Nested\nmatrix = [[i*j for j in range(1,4)] for i in range(1,4)]\n# [[1,2,3],[2,4,6],[3,6,9]]`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🗂 Dict & Set Comprehensions</CardTitle>
      <CodeBlock lang="py" showLines code={`# Dict comprehension\nscores = {"Alice":85, "Bob":72, "Eve":91, "Dan":55}\n\n# Swap keys and values\nswapped = {v: k for k, v in scores.items()}\n# {85:"Alice", 72:"Bob", ...}\n\n# Filter dict\npassed = {k: v for k, v in scores.items() if v >= 60}\n# {"Alice":85, "Bob":72, "Eve":91}\n\n# Transform values\nletters = {k: "A" if v>=90 else "B" if v>=80 else "C"\n           for k, v in scores.items()}\n\n# Set comprehension — no duplicates\nwords = ["cat","dog","cat","bird","dog"]\nunique_lengths = {len(w) for w in words}\n# {3, 4}  (sets are unordered, no duplicates)`}/>
      <InfoBox type="info">Dict comprehensions replace clunky patterns like <IC>d = {}; for k,v in ...: d[k]=v</IC> with a single elegant line.</InfoBox>
    </Card>
  </>);
}

function TabGenerators() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>⚡ Generator Functions (yield)</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        A generator produces values <strong style={{ color:T.text }}>one at a time</strong> — it doesn't build the entire list in memory. Perfect for large datasets.
      </p>
      <CodeBlock lang="py" showLines code={`# Regular function — builds entire list in memory\ndef squares_list(n):\n    return [x**2 for x in range(n)]\n\n# Generator — yields one at a time\ndef squares_gen(n):\n    for x in range(n):\n        yield x**2          # pauses here, returns value\n\n# Using the generator\ngen = squares_gen(5)\nprint(next(gen))    # 0  — resume from yield\nprint(next(gen))    # 1\nprint(next(gen))    # 4\n\n# Or loop through it\nfor sq in squares_gen(10):\n    print(sq)\n\n# Generator expression (like list comprehension but lazy)\ngen = (x**2 for x in range(1_000_000))  # uses almost no memory\nnext(gen)  # 0 — computed on demand`}/>
      <InfoBox type="tip">Use generators when processing files line by line, streaming large datasets, or creating infinite sequences. Python's <IC>range()</IC> is itself a generator-like object.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>∞ Infinite Generators</CardTitle>
      <CodeBlock lang="py" showLines code={`# Count forever (like range but infinite)\ndef counter(start=0, step=1):\n    n = start\n    while True:\n        yield n\n        n += step\n\n# Fibonacci sequence — infinite\ndef fibonacci():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\n\n# Use with islice to take only first N values\nfrom itertools import islice\nfirst_10 = list(islice(fibonacci(), 10))\n# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`}/>
    </Card>
  </>);
}

function TabDecorators() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🎁 Decorators</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        A decorator is a function that <strong style={{ color:T.text }}>wraps another function</strong> — adding behavior before/after it without modifying the original. Flask's <IC>@app.route()</IC> is a decorator.
      </p>
      <CodeBlock lang="py" showLines code={`# A decorator is just a function that takes a function\ndef my_decorator(func):\n    def wrapper(*args, **kwargs):\n        print("Before the function")    # before\n        result = func(*args, **kwargs)  # call original\n        print("After the function")     # after\n        return result\n    return wrapper\n\n# Apply with @ syntax\n@my_decorator\ndef say_hello():\n    print("Hello!")\n\nsay_hello()\n# Before the function\n# Hello!\n# After the function`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>⏱ Practical: Timer Decorator</CardTitle>
      <CodeBlock lang="py" showLines code={`import time\nimport functools\n\ndef timer(func):\n    @functools.wraps(func)   # preserves function metadata\n    def wrapper(*args, **kwargs):\n        start  = time.perf_counter()\n        result = func(*args, **kwargs)\n        end    = time.perf_counter()\n        print(f"{func.__name__} took {end-start:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef slow_sum(n):\n    return sum(range(n))\n\nslow_sum(1_000_000)  # slow_sum took 0.0231s\n\n# Stacking decorators\n@timer\n@my_decorator\ndef greet(name):\n    print(f"Hello, {name}!")`}/>
      <InfoBox type="note">Flask uses decorators for routes (<IC>@app.route</IC>), login required (<IC>@login_required</IC>), and caching. Understanding them unlocks Flask's full power.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🏭 Decorator Factories (with arguments)</CardTitle>
      <CodeBlock lang="py" showLines code={`# A decorator that takes arguments needs an extra layer\ndef repeat(times):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(times):\n                func(*args, **kwargs)\n        return wrapper\n    return decorator\n\n@repeat(3)\ndef shout(msg):\n    print(msg.upper())\n\nshout("hello")   # HELLO printed 3 times`}/>
    </Card>
  </>);
}

function TabFileIO() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📁 File Reading & Writing</CardTitle>
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
    </Card>
  </>);
}

function TabRegex() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔍 Regular Expressions</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Regex lets you search, validate, and extract patterns from strings. Used heavily in web scraping and form validation.</p>
      <CodeBlock lang="py" showLines code={`import re\n\ntext = "Contact us at info@example.com or support@site.org"\n\n# re.search() — find first match anywhere in string\nmatch = re.search(r"\\w+@\\w+\\.\\w+", text)\nif match:\n    print(match.group())    # info@example.com\n\n# re.findall() — all matches as list\nemails = re.findall(r"[\\w.]+@[\\w.]+\\.\\w+", text)\n# ["info@example.com", "support@site.org"]\n\n# re.match() — only matches at the START of string\nre.match(r"Contact", text)   # match\nre.match(r"info", text)      # None\n\n# re.fullmatch() — must match ENTIRE string\nre.fullmatch(r"\\d{4}", "2024")    # match\nre.fullmatch(r"\\d{4}", "20240")   # None`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔤 Common Patterns</CardTitle>
      <CodeBlock lang="py" showLines code={`# Pattern reference\n# .     any character (except newline)\n# \\d    digit [0-9]\n# \\D    non-digit\n# \\w    word char [a-zA-Z0-9_]\n# \\W    non-word\n# \\s    whitespace\n# \\S    non-whitespace\n# ^     start of string\n# $     end of string\n# *     0 or more\n# +     1 or more\n# ?     0 or 1 (optional)\n# {n}   exactly n times\n# {n,m} between n and m times\n# [abc] any of a, b, c\n# (a|b) a or b\n\n# Practical examples\nphone   = re.findall(r"\\d{3}[-.]\\d{3}[-.]\\d{4}", text)\nzipcode = re.match(r"^\\d{5}(-\\d{4})?$", "12345")\nurl     = re.search(r"https?://[\\w./-]+", text)\n\n# Validate email\ndef valid_email(email):\n    return bool(re.fullmatch(r"[\\w.]+@[\\w.]+\\.\\w{2,}", email))`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Replace & Groups</CardTitle>
      <CodeBlock lang="py" showLines code={`# re.sub() — find and replace\nclean = re.sub(r"\\s+", " ", "too   many    spaces")\n# "too many spaces"\n\nmasked = re.sub(r"\\d", "*", "Phone: 123-456-7890")\n# "Phone: ***-***-****"\n\n# Groups — extract parts of a match\ndate_str = "Today is 2024-05-28"\nmatch = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", date_str)\nif match:\n    year, month, day = match.groups()\n    print(year, month, day)   # 2024 05 28\n\n# Named groups\nmatch = re.search(\n    r"(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})",\n    date_str\n)\nif match:\n    print(match.group("year"))   # 2024`}/>
    </Card>
  </>);
}

function TabOOP() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🏗 OOP Deep Dive</CardTitle>
      <CodeBlock lang="py" showLines code={`class BankAccount:\n    # Class variable (shared by all instances)\n    bank_name = "PyBank"\n    total_accounts = 0\n\n    def __init__(self, owner, balance=0):\n        self.owner   = owner        # instance variable\n        self.balance = balance\n        BankAccount.total_accounts += 1\n\n    # Instance method\n    def deposit(self, amount):\n        if amount <= 0:\n            raise ValueError("Amount must be positive")\n        self.balance += amount\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            raise ValueError("Insufficient funds")\n        self.balance -= amount\n        return self.balance\n\n    # String representation\n    def __str__(self):\n        return f"Account({self.owner}: \${self.balance})"\n\n    def __repr__(self):\n        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"\n\n    # Comparison magic methods\n    def __eq__(self, other):\n        return self.balance == other.balance\n\n    def __lt__(self, other):\n        return self.balance < other.balance\n\nacc = BankAccount("Alice", 1000)\nacc.deposit(500)\nprint(acc)            # Account(Alice: $1500)\nprint(repr(acc))      # BankAccount(owner='Alice', balance=1500)`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>@property & @classmethod</CardTitle>
      <CodeBlock lang="py" showLines code={`class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius\n\n    # @property — access like attribute, not method\n    @property\n    def celsius(self):\n        return self._celsius\n\n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError("Below absolute zero!")\n        self._celsius = value\n\n    @property\n    def fahrenheit(self):\n        return self._celsius * 9/5 + 32\n\n    # @classmethod — alternative constructor\n    @classmethod\n    def from_fahrenheit(cls, fahrenheit):\n        return cls((fahrenheit - 32) * 5/9)\n\n    # @staticmethod — utility, no self/cls\n    @staticmethod\n    def is_valid(value):\n        return value >= -273.15\n\nt = Temperature(100)\nprint(t.celsius)      # 100  (property, no ())\nprint(t.fahrenheit)   # 212.0\n\nt2 = Temperature.from_fahrenheit(32)  # classmethod\nprint(t2.celsius)     # 0.0`}/>
      <InfoBox type="info"><IC>@property</IC> makes methods look like attributes — clean API for computed values. Flask-SQLAlchemy uses this pattern extensively.</InfoBox>
    </Card>
  </>);
}

function TabItertools() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔧 itertools</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Python's <IC>itertools</IC> module provides powerful functions for working with iterables — all memory-efficient.</p>
      <CodeBlock lang="py" showLines code={`from itertools import (\n    chain, islice, cycle, repeat,\n    groupby, combinations, permutations,\n    count, takewhile, dropwhile\n)\n\n# chain — combine iterables\nall_items = list(chain([1,2], [3,4], [5,6]))\n# [1, 2, 3, 4, 5, 6]\n\n# islice — take first N from any iterable (incl. infinite)\nfirst_5 = list(islice(range(1000), 5))\n# [0, 1, 2, 3, 4]\n\n# cycle — repeat a sequence infinitely\ncolors = cycle(["red","green","blue"])\nnext(colors)  # "red"\nnext(colors)  # "green"\nnext(colors)  # "blue"\nnext(colors)  # "red"  ...\n\n# count — infinite counter\nfor i in islice(count(10, 2), 5):  # start=10, step=2\n    print(i)   # 10 12 14 16 18`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>Combinations & Groupby</CardTitle>
      <CodeBlock lang="py" showLines code={`# combinations — all C(n,r) combos\nfrom itertools import combinations, permutations\n\nitems = ["A","B","C"]\nlist(combinations(items, 2))\n# [("A","B"),("A","C"),("B","C")]\n\nlist(permutations(items, 2))\n# [("A","B"),("A","C"),("B","A"),("B","C"),("C","A"),("C","B")]\n\n# groupby — group consecutive elements\nfrom itertools import groupby\n\ndata = [\n    {"dept":"Eng","name":"Alice"},\n    {"dept":"Eng","name":"Bob"},\n    {"dept":"HR","name":"Eve"},\n]\n\n# Must be sorted by the key first!\ndata.sort(key=lambda x: x["dept"])\nfor dept, members in groupby(data, key=lambda x: x["dept"]):\n    print(dept, list(members))`}/>
    </Card>
  </>);
}

export default function PyIntermediate() {
  const [tab, setTab] = useState("comprehensions");
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
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.accent}>🎯 Python Intermediate Quiz</CardTitle><Quiz questions={QUIZ}/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
