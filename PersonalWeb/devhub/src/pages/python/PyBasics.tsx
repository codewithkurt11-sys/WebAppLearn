import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const PYB_TABS: Tab[] = [
  { id:"vars",    label:"Variables"  },
  { id:"strings", label:"Strings"   },
  { id:"lists",   label:"Lists"     },
  { id:"dicts",   label:"Dicts"     },
  { id:"ifs",     label:"If / Else" },
  { id:"loops",   label:"Loops"     },
  { id:"funcs",   label:"Functions" },
  { id:"classes", label:"Classes"   },
  { id:"errors",  label:"Errors"    },
  { id:"modules", label:"Modules"   },
  { id:"quiz",    label:"Quiz 🎯"   },
];

const PYB_QUIZ: Question[] = [
  { q:'What does len("Python") return?', opts:["5","6","7","Error"], ans:1, exp:"P-y-t-h-o-n is 6 characters. len() counts every character." },
  { q:"What is the result of 10 % 3?", opts:["3","1","0","3.33"], ans:1, exp:"% is modulo — the remainder of 10÷3 is 1." },
  { q:'Which syntax creates a dictionary?', opts:['[1,2,3]','{"a":1}','(1,2)','{1,2}'], ans:1, exp:'Dicts use curly braces with key:value pairs like {"a":1}.' },
  { q:'What does "Python"[::-1] return?', opts:["Python","nohtyP","Pyth","Error"], ans:1, exp:"[::-1] reverses the sequence — Python becomes nohtyP." },
  { q:"Which keyword exits a loop immediately?", opts:["exit","stop","break","return"], ans:2, exp:"break exits the current loop. continue skips to the next iteration." },
  { q:'What is the default in greet(name="World")?', opts:["None",'"World"',"name","Error"], ans:1, exp:"Default parameter values are used when no argument is passed." },
  { q:"What does __init__ do in a class?", opts:["Imports a module","Initializes an object","Inherits a class","None of these"], ans:1, exp:"__init__ is the constructor — it runs automatically when you create a new object." },
  { q:"Which block catches a ValueError?", opts:["try","finally","except ValueError","if error"], ans:2, exp:"except ValueError: catches the specific error type. You can chain multiple except blocks." },
  { q:"What is the difference between a list and a tuple?", opts:["Lists are faster","Tuples are mutable, lists are not","Lists are mutable, tuples are not","No difference"], ans:2, exp:"Lists use [] and can be changed after creation (mutable). Tuples use () and cannot be changed (immutable). Use tuples for fixed data like coordinates." },
  { q:"What does the range(1, 10, 2) call produce?", opts:["1,2,3,4,5,6,7,8,9","1,3,5,7,9","2,4,6,8,10","1,3,5,7,9,11"], ans:1, exp:"range(start, stop, step) — starts at 1, goes up to (not including) 10, steps by 2. So: 1, 3, 5, 7, 9." },
];

function PybVars() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📦 Variables & Data Types</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A variable stores a value in memory. Python detects the type automatically.</p>
      <CodeBlock lang="py" showLines code={`name   = "Alice"   # str  — text in quotes\nage    = 25         # int  — whole number\nheight = 1.75       # float — decimal number\nactive = True       # bool — True or False\nempty  = None       # None — represents no value\n\nprint(type(age))    # <class 'int'>\nprint(type(name))   # <class 'str'>`}/>
      <InfoBox type="info">Use <IC>type(x)</IC> to check the type at runtime. Use <IC>int()</IC>, <IC>str()</IC>, <IC>float()</IC>, <IC>bool()</IC> to convert between types.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🧮 Math Operators</CardTitle>
      <CodeBlock lang="py" showLines code={`a, b = 10, 3\nprint(a + b)   # 13   addition\nprint(a - b)   # 7    subtraction\nprint(a * b)   # 30   multiply\nprint(a / b)   # 3.33 divide (always float)\nprint(a // b)  # 3    floor divide (int)\nprint(a % b)   # 1    remainder (modulo)\nprint(a ** b)  # 1000 power — 10³\n\n# Augmented assignment\nx = 5\nx += 10   # x = x + 10 → 15\nx *= 2    # x = x * 2  → 30`}/>
      <InfoBox type="tip"><IC>%</IC> modulo is used constantly — even/odd check: <IC>x % 2 == 0</IC></InfoBox>
    </Card>
  </>);
}

function PybStrings() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📝 String Methods</CardTitle>
      <CodeBlock lang="py" showLines code={`s = "Python for Beginners"\n\nprint(len(s))                    # 22\nprint(s.upper())                 # PYTHON FOR BEGINNERS\nprint(s.lower())                 # python for beginners\nprint(s.title())                 # Python For Beginners\nprint(s.replace("Python","JS"))  # JS for Beginners\nprint(s.find("for"))             # 7 (index position)\nprint(s.strip())                 # removes whitespace\nprint(s.split(" "))              # ['Python','for','Beginners']\nprint("Python" in s)             # True\nprint(s[0])                      # P  (index from 0)\nprint(s[-1])                     # s  (last character)\nprint(s[0:6])                    # Python (slice)\nprint(s[::-1])                   # reversed string`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>✨ f-Strings</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>f-strings embed variables and expressions directly into text. The modern standard.</p>
      <CodeBlock lang="py" showLines code={`name = "Alice"\nage  = 25\n\n# f-string — clean and readable\nmsg = f"Hello {name}, you are {age} years old."\nprint(msg)\n\n# Expressions inside braces work too\nprint(f"Double: {age * 2}")    # Double: 50\nprint(f"Upper: {name.upper()}")  # Upper: ALICE\nprint(f"Pi: {3.14159:.2f}")    # Pi: 3.14`}/>
      <InfoBox type="tip">Flask routes return f-strings: <IC>{'return f"Hello, {name}!"'}</IC></InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🔤 Escape Characters</CardTitle>
      <CodeBlock lang="py" showLines code={`print("He said \\"hello\\"")  # He said "hello"\nprint('It\\'s great')        # It's great\nprint("Line 1\\nLine 2")     # newline\nprint("Tab\\there")          # tab\nprint("Back\\\\slash")       # back\\slash`}/>
    </Card>
  </>);
}

function PybLists() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📋 Lists</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A list holds multiple items in order. Items can be any type and can be changed.</p>
      <CodeBlock lang="py" showLines code={`fruits = ["apple", "banana", "mango"]\n\nfruits[0]                # "apple"  (first)\nfruits[-1]               # "mango"  (last)\nfruits[0:2]              # ["apple", "banana"] (slice)\nfruits[:]                # copy of entire list\n\nfruits.append("grape")   # add to end\nfruits.insert(0, "kiwi") # add at position 0\nfruits.remove("banana")  # remove by value\nfruits.pop()             # remove & return last\nfruits.pop(0)            # remove & return first\nfruits.sort()            # sort alphabetically\nfruits.reverse()         # reverse order\nfruits.clear()           # remove all items\nlen(fruits)              # count of items\n"mango" in fruits        # True/False check`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>⚡ List Comprehensions</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A concise way to build lists — one line instead of a for loop.</p>
      <CodeBlock lang="py" showLines code={`# Squares of 1 to 10\nsquares = [x**2 for x in range(1, 11)]\n# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n\n# Filter: only even numbers\nevens = [x for x in range(20) if x % 2 == 0]\n# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]\n\n# Transform a list of strings\nwords = ["hello", "world"]\nupper = [w.upper() for w in words]\n# ["HELLO", "WORLD"]`}/>
      <InfoBox type="info">List comprehensions are faster than for loops and very Pythonic — you'll see them everywhere.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📦 Tuples</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Tuples are like read-only lists — once created, items can't be changed.</p>
      <CodeBlock lang="py" showLines code={`coords = (10, 20)          # create tuple\nx, y = coords              # unpack into variables\nprint(x, y)                # 10  20\n\ndimensions = (1920, 1080)\nresolutions = ('720p', '1080p', '4K')\n\n# Tuples as function return values\ndef min_max(nums):\n    return min(nums), max(nums)   # returns a tuple\n\nlo, hi = min_max([3, 1, 7])\nprint(lo, hi)              # 1  7`}/>
    </Card>
  </>);
}

function PybDicts() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🗂 Dictionaries</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Dicts store <strong style={{ color:T.text }}>key → value</strong> pairs. JSON from APIs is always a dict.</p>
      <CodeBlock lang="py" showLines code={`user = {\n    "name": "Alice",\n    "age":  25,\n    "city": "Nairobi",\n    "active": True\n}\n\nuser["name"]               # "Alice"\nuser.get("email", "N/A")   # "N/A" — safe default\nuser["city"] = "Mombasa"   # update value\nuser["email"] = "a@b.com"  # add new key\ndel user["age"]            # delete key\n"name" in user             # True\n\nuser.keys()    # all keys\nuser.values()  # all values\nuser.items()   # all key-value pairs`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔁 Looping Dictionaries</CardTitle>
      <CodeBlock lang="py" showLines code={`scores = {"Alice": 95, "Bob": 82, "Eve": 78}\n\n# Loop over keys\nfor name in scores:\n    print(name)\n\n# Loop over values\nfor score in scores.values():\n    print(score)\n\n# Loop over key-value pairs (most common)\nfor name, score in scores.items():\n    print(f"{name}: {score}")\n\n# Dict comprehension\npassed = {k: v for k, v in scores.items() if v >= 80}\n# {"Alice": 95, "Bob": 82}`}/>
      <InfoBox type="info">In Flask, <IC>request.args</IC>, <IC>request.form</IC>, and <IC>jsonify()</IC> input are all dicts.</InfoBox>
    </Card>
  </>);
}

function PybIfs() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔀 If / Elif / Else</CardTitle>
      <CodeBlock lang="py" showLines code={`age = 20\n\nif age >= 18:\n    print("Adult")\nelif age >= 13:\n    print("Teen")\nelse:\n    print("Child")\n\n# Inline (ternary) — one-liner\nlabel = "Adult" if age >= 18 else "Minor"`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔣 Comparison & Logic Operators</CardTitle>
      <CodeBlock lang="py" showLines code={`# Comparison operators\nx == y    # equal to\nx != y    # not equal\nx >  y    # greater than\nx <  y    # less than\nx >= y    # greater or equal\nx <= y    # less or equal\n\n# Logical operators\nx and y   # both must be True\nx or  y   # at least one True\nnot x     # flip True/False\n\n# Membership & identity\n"a" in "cat"      # True\n5 in [1,2,5]      # True\nx is None         # identity check`}/>
      <InfoBox type="tip">In Flask: <IC>{'if request.method == "POST":'}</IC> is the most common if-check you'll write.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>✅ Boolean values</CardTitle>
      <CodeBlock lang="py" showLines code={`# Falsy values in Python — evaluate to False\nFalse, None, 0, 0.0, "", [], {}, ()\n\n# Everything else is Truthy\nif user:          # True if user is not None / empty\n    print("has user")\n\ngame_active = True\ncan_edit = False\nis_night = not True   # False`}/>
    </Card>
  </>);
}

function PybLoops() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔁 For Loops</CardTitle>
      <CodeBlock lang="py" showLines code={`# range() — most common\nfor i in range(5):          # 0 1 2 3 4\n    print(i)\n\nfor i in range(1, 6):       # 1 2 3 4 5\n    print(i)\n\nfor i in range(1, 10, 2):   # 1 3 5 7 9\n    print(i)\n\n# Loop over a list\nfruits = ["apple", "banana", "mango"]\nfor fruit in fruits:\n    print(fruit)\n\n# enumerate — get index AND value\nfor i, fruit in enumerate(fruits):\n    print(f"{i}: {fruit}")    # 0: apple …\n\n# Loop over dict items\nuser = {"name": "Alice", "age": 25}\nfor key, val in user.items():\n    print(f"{key}: {val}")`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔂 While, break, continue</CardTitle>
      <CodeBlock lang="py" showLines code={`count = 0\nwhile count < 5:\n    print(count)\n    count += 1\n\n# break — exit loop immediately\nfor i in range(10):\n    if i == 3:\n        break\n    print(i)         # prints 0 1 2\n\n# continue — skip this iteration\nfor i in range(5):\n    if i == 2:\n        continue\n    print(i)         # prints 0 1 3 4\n\n# while with user input\nmsg = ""\nwhile msg != "quit":\n    msg = input("Enter message: ")\n    if msg != "quit":\n        print(msg)`}/>
      <InfoBox type="warn">Always ensure a <IC>while</IC> loop has a way to exit — an infinite loop will freeze your program.</InfoBox>
    </Card>
  </>);
}

function PybFuncs() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>⚙️ Defining Functions</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Functions let you reuse code. Flask route handlers are just Python functions with a decorator.</p>
      <CodeBlock lang="py" showLines code={`# Basic function\ndef greet(name="World"):       # default parameter\n    return f"Hello, {name}!"\n\nprint(greet())                 # Hello, World!\nprint(greet("Alice"))          # Hello, Alice!\n\n# Positional vs keyword arguments\ndef calc(price, tax=0.1, discount=0):\n    return price * (1 + tax) - discount\n\ncalc(100)                   # positional: price=100\ncalc(100, discount=10)      # keyword: skip tax\n\n# Multiple return values (as tuple)\ndef stats(nums):\n    return min(nums), max(nums), sum(nums)/len(nums)\n\nlo, hi, avg = stats([3, 1, 7, 2, 9])\nprint(lo, hi, avg)           # 1  9  4.4`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔗 Functions → Flask Route</CardTitle>
      <CodeBlock lang="py" showLines code={`from flask import Flask, request\napp = Flask(__name__)\n\n# A regular Python function with @app.route decorator\n@app.route("/greet")\ndef greet():                   # ← regular function\n    name = request.args.get("name", "World")\n    return f"Hello, {name}!"   # ← return = HTTP response\n\n# /greet?name=Alice → "Hello, Alice!"`}/>
      <InfoBox type="info">Everything you know about Python functions directly applies to Flask. The <IC>return</IC> value becomes what the browser sees.</InfoBox>
    </Card>
  </>);
}

function PybClasses() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🏗 Classes & Objects</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A class is a blueprint. An object is an instance created from that blueprint.</p>
      <CodeBlock lang="py" showLines code={`class Dog:\n    """Represents a dog."""\n\n    def __init__(self, name, breed):\n        """Constructor — runs when you create a Dog."""\n        self.name  = name    # instance attribute\n        self.breed = breed\n\n    def bark(self):\n        return f"{self.name} says: Woof!"\n\n    def info(self):\n        return f"{self.name} is a {self.breed}"\n\n# Create objects (instances)\ndog1 = Dog("Rex", "Labrador")\ndog2 = Dog("Bella", "Poodle")\n\nprint(dog1.bark())   # Rex says: Woof!\nprint(dog2.info())   # Bella is a Poodle\nprint(dog1.name)     # Rex`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🧬 Inheritance</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A child class inherits all methods from the parent — no duplication needed.</p>
      <CodeBlock lang="py" showLines code={`class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def walk(self):\n        return f"{self.name} is walking"\n\nclass Dog(Animal):          # Dog inherits Animal\n    def bark(self):\n        return f"{self.name} says: Woof!"\n\nclass Cat(Animal):          # Cat inherits Animal\n    def meow(self):\n        return f"{self.name} says: Meow!"\n\ndog = Dog("Rex")\nprint(dog.walk())           # Rex is walking (from Animal)\nprint(dog.bark())           # Rex says: Woof!\n\ncat = Cat("Luna")\nprint(cat.walk())           # Luna is walking\nprint(cat.meow())           # Luna says: Meow!`}/>
      <InfoBox type="note">Inheritance removes code duplication. Flask's <IC>db.Model</IC> uses this — your models inherit from it.</InfoBox>
    </Card>
  </>);
}

function PybErrors() {
  return (<>
    <Card>
      <CardTitle color={T.rose}>⚡ Exceptions (Try / Except)</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>Exceptions are errors that would crash your program. Handle them gracefully with try/except.</p>
      <CodeBlock lang="py" showLines code={`# Basic try/except\ntry:\n    age = int(input("Enter age: "))\n    print(f"Age: {age}")\nexcept ValueError:\n    print("That's not a number!")\n\n# Multiple except blocks\ntry:\n    age    = int(input("Age: "))\n    income = 20000\n    risk   = income / age\n    print(risk)\nexcept ValueError:\n    print("Not a valid number")\nexcept ZeroDivisionError:\n    print("Age cannot be 0")\nfinally:\n    print("This always runs")   # cleanup code`}/>
    </Card>
    <Card>
      <CardTitle color={T.rose}>🚀 Raising Exceptions</CardTitle>
      <CodeBlock lang="py" showLines code={`def set_age(age):\n    if age < 0:\n        raise ValueError("Age cannot be negative")\n    return age\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e)   # Age cannot be negative\n\n# Common exception types\n# ValueError      — wrong value type (e.g. int("abc"))\n# TypeError       — wrong type used in operation\n# KeyError        — dict key doesn't exist\n# IndexError      — list index out of range\n# FileNotFoundError — file doesn't exist\n# ZeroDivisionError — divide by zero`}/>
      <InfoBox type="warn">Never use a bare <IC>except:</IC> — always catch specific exceptions so you know what went wrong.</InfoBox>
    </Card>
  </>);
}

function PybModules() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>📦 Importing Modules</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>A module is a Python file. Python's standard library has hundreds of useful modules built in.</p>
      <CodeBlock lang="py" showLines code={`# Import entire module\nimport random\nimport math\nimport os\n\nrandom.random()            # float between 0 and 1\nrandom.randint(1, 6)       # int between 1 and 6\nitems = ["Alice","Bob","Eve"]\nrandom.choice(items)       # random pick\n\nmath.sqrt(16)              # 4.0\nmath.pi                    # 3.14159…\nmath.ceil(3.2)             # 4\nmath.floor(3.9)            # 3\n\nos.getcwd()                # current directory\nos.listdir(".")            # files in directory`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📁 Selective Imports & Packages</CardTitle>
      <CodeBlock lang="py" showLines code={`# Import specific items\nfrom math import pi, sqrt\nfrom random import choice, randint\nfrom pathlib import Path\n\nprint(pi)                     # no math. prefix needed\n\n# Read a file\npath = Path("data.txt")\ncontent = path.read_text()    # entire file as string\nlines   = content.splitlines() # list of lines\n\n# Write a file\npath.write_text("Hello, File!")\n\n# pip — install third-party packages\n# pip install flask\n# pip install requests\n# pip install openpyxl`}/>
      <InfoBox type="tip">Flask itself is a package installed with <IC>pip install flask</IC> (or <IC>apk add py3-flask</IC> on Alpine).</InfoBox>
    </Card>
  </>);
}

export default function PyBasics() {
  const [tab, setTab] = useState("vars");
  const content: Record<string, React.ReactNode> = {
    vars:<PybVars/>, strings:<PybStrings/>, lists:<PybLists/>, dicts:<PybDicts/>,
    ifs:<PybIfs/>, loops:<PybLoops/>, funcs:<PybFuncs/>, classes:<PybClasses/>,
    errors:<PybErrors/>, modules:<PybModules/>,
  };
  return (
    <div>
      <PageHeader eyebrow="Python · Beginner" title="Python Basics" sub="Variables, control flow, functions, OOP, modules — everything you need" color={T.accent}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Python shows up in job listings more than almost any other language — data science, AI, backend web, automation, scripting. The concepts here aren't beginner stuff you'll throw away: variables, loops, functions, and error handling are the exact same patterns you'll write in real projects at a real job.
        </p>
        <TabBar tabs={PYB_TABS} active={tab} onChange={setTab}/>
        {tab === "quiz"
          ? <Card><CardTitle color={T.accent}>🎯 Python Basics Quiz</CardTitle><Quiz questions={PYB_QUIZ}/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
