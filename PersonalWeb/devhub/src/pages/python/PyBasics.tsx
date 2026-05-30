import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question, Def, TryIt } from "../../shared";

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
  { q:'What does len("Python") return?', opts:["5","6","7","Error"], ans:1, exp:"P-y-t-h-o-n is 6 characters. len() counts every character including spaces." },
  { q:"What is the result of 10 % 3?", opts:["3","1","0","3.33"], ans:1, exp:"% is modulo — it gives the remainder of division. 10 ÷ 3 = 3 remainder 1, so 10 % 3 = 1." },
  { q:'Which syntax creates a dictionary?', opts:['[1,2,3]','{"a":1}','(1,2)','{1,2}'], ans:1, exp:'Dicts use curly braces with key:value pairs like {"a":1}. Square brackets make lists, round brackets make tuples, and {1,2} makes a set.' },
  { q:'What does "Python"[::-1] return?', opts:["Python","nohtyP","Pyth","Error"], ans:1, exp:"[::-1] reverses the sequence — a step of -1 goes backwards through every character. Python becomes nohtyP." },
  { q:"Which keyword exits a loop immediately?", opts:["exit","stop","break","return"], ans:2, exp:"break immediately exits the current loop. continue skips the rest of the current iteration and jumps to the next one." },
  { q:'What is the default in greet(name="World")?', opts:["None",'"World"',"name","Error"], ans:1, exp:"Default parameter values are used when no argument is passed. greet() uses \"World\", but greet(\"Alice\") uses \"Alice\"." },
  { q:"What does __init__ do in a class?", opts:["Imports a module","Initializes an object","Inherits a class","None of these"], ans:1, exp:"__init__ is the constructor — it runs automatically when you create a new object with MyClass(). It sets up the object's initial state." },
  { q:"Which block catches a ValueError?", opts:["try","finally","except ValueError","if error"], ans:2, exp:"except ValueError: catches that specific error type. You can chain multiple except blocks for different error types." },
  { q:"What is the difference between a list and a tuple?", opts:["Lists are faster","Tuples are mutable, lists are not","Lists are mutable, tuples are not","No difference"], ans:2, exp:"Lists use [] and can be changed after creation (mutable). Tuples use () and cannot be changed (immutable). Use tuples for fixed data like coordinates or RGB colors." },
  { q:"What does the range(1, 10, 2) call produce?", opts:["1,2,3,4,5,6,7,8,9","1,3,5,7,9","2,4,6,8,10","1,3,5,7,9,11"], ans:1, exp:"range(start, stop, step) — starts at 1, goes up to (not including) 10, steps by 2. So: 1, 3, 5, 7, 9." },
];

function PybVars() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📦 Variables & Data Types</CardTitle>
      <Def term="Variable">a named label that stores a value in memory. Python detects the type automatically — you never need to declare it.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Every program stores data. A variable is how you give that data a name so you can use it later. Python has four core data types you'll use constantly: strings (text), integers (whole numbers), floats (decimals), and booleans (True/False).
      </p>
      <CodeBlock lang="py" showLines code={`# Python automatically detects the type
name   = "Alice"    # str   — text, always in quotes
age    = 25          # int   — whole number, no quotes
height = 1.75        # float — decimal number
active = True        # bool  — True or False (capital T/F)
empty  = None        # None  — represents "no value"

# You can check the type with type()
print(type(name))    # <class 'str'>
print(type(age))     # <class 'int'>
print(type(active))  # <class 'bool'>

# Convert between types
print(int("42"))     # "42" → 42  (string to int)
print(str(100))      # 100  → "100" (int to string)
print(float(5))      # 5    → 5.0  (int to float)`}/>
      <InfoBox type="info">Use <IC>type(x)</IC> to check a variable's type at any time. Use <IC>int()</IC>, <IC>str()</IC>, <IC>float()</IC> to convert between types.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🧮 Math Operators</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Python supports all standard math operations. The modulo operator <IC>%</IC> (remainder) is especially useful — it's how you check if a number is even, or cycle through values.
      </p>
      <CodeBlock lang="py" showLines code={`a, b = 10, 3          # assign two variables at once

print(a + b)   # 13   — addition
print(a - b)   # 7    — subtraction
print(a * b)   # 30   — multiplication
print(a / b)   # 3.33 — division (always returns a float)
print(a // b)  # 3    — floor division (whole number only)
print(a % b)   # 1    — modulo: remainder of 10 ÷ 3
print(a ** b)  # 1000 — exponentiation: 10 to the power of 3

# Augmented assignment — shorthand for x = x + something
x = 5
x += 10    # x = x + 10  →  x is now 15
x *= 2     # x = x * 2   →  x is now 30
x -= 5     # x = x - 5   →  x is now 25`}/>
      <InfoBox type="tip"><IC>%</IC> modulo is used constantly — to check even/odd: <IC>x % 2 == 0</IC> means even. To wrap around a list: <IC>index % len(items)</IC>.</InfoBox>
    </Card>
    <TryIt>
      Create three variables: <IC>name</IC> with your name, <IC>birth_year</IC> with the year you were born, and <IC>height</IC> with your height in metres. Then calculate your age (<IC>2025 - birth_year</IC>) and print a sentence like:<br/><br/>
      <IC>f"Hi, I'm Alice. I'm 25 years old and 1.75m tall."</IC>
    </TryIt>
  </>);
}

function PybStrings() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📝 Strings & String Methods</CardTitle>
      <Def term="String">a sequence of characters enclosed in quotes. Strings are immutable — methods return a new string rather than modifying the original.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Strings come with dozens of built-in methods. The most important ones let you search, transform, split, and join text. You'll use these every day — cleaning user input, building URLs, parsing data.
      </p>
      <CodeBlock lang="py" showLines code={`s = "Python for Beginners"

# Length and case
print(len(s))                    # 22 — number of characters
print(s.upper())                 # "PYTHON FOR BEGINNERS"
print(s.lower())                 # "python for beginners"
print(s.title())                 # "Python For Beginners"

# Search and replace
print(s.find("for"))             # 7  — position where "for" starts
print(s.replace("Python", "JS")) # "JS for Beginners"
print("Python" in s)             # True — membership test

# Whitespace and splitting
print("  hello  ".strip())       # "hello" — removes leading/trailing spaces
print(s.split(" "))              # ['Python', 'for', 'Beginners']
print("-".join(["a","b","c"]))   # "a-b-c" — opposite of split

# Slicing — extract a portion of the string
print(s[0])                      # "P"  — index 0 is the first char
print(s[-1])                     # "s"  — index -1 is the last char
print(s[0:6])                    # "Python" — chars 0 up to (not including) 6
print(s[::-1])                   # reversed: "srennigeBrofnohtyP"`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>✨ f-Strings — The Modern Way</CardTitle>
      <Def term="f-string">a formatted string literal that embeds variables and expressions directly inside curly braces, prefixed with f.</Def>
      <CodeBlock lang="py" showLines code={`name  = "Alice"
age   = 25
score = 94.7

# f-string — prefix the string with f, put variables in {}
greeting = f"Hello {name}, you are {age} years old."
print(greeting)                     # Hello Alice, you are 25 years old.

# Expressions inside {} — Python evaluates them
print(f"Next year you'll be {age + 1}")  # Next year you'll be 26
print(f"Name uppercase: {name.upper()}")  # Name uppercase: ALICE

# Formatting numbers — control decimal places
print(f"Score: {score:.1f}%")      # Score: 94.7%
print(f"Pi is {3.14159:.2f}")      # Pi is 3.14
print(f"Big: {1_000_000:,}")       # Big: 1,000,000 (with commas)`}/>
      <InfoBox type="tip">f-strings replaced the older <IC>.format()</IC> method. Always use f-strings — they're faster and easier to read.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>🔤 Escape Characters</CardTitle>
      <CodeBlock lang="py" showLines code={`# Use backslash \ to include special characters
print("He said \"hello\"")   # He said "hello"
print('It\'s great')          # It's great
print("Line 1\nLine 2")       # \n = newline
print("A\tB\tC")              # \t = tab
print("Back\\slash")          # \\\\ = one backslash

# Raw strings — ignore escape sequences (great for regex/paths)
path = r"C:\Users\Alice\Documents"  # r prefix = raw string
print(path)                          # C:\Users\Alice\Documents`}/>
    </Card>
    <TryIt>
      Store your full name in a variable. Then:<br/>
      1. Print how many characters it has using <IC>len()</IC><br/>
      2. Print it in uppercase and in title case<br/>
      3. Use an f-string to print: <IC>"My name has 5 letters and in CAPS it's: ALICE"</IC>
    </TryIt>
  </>);
}

function PybLists() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>📋 Lists</CardTitle>
      <Def term="List">an ordered, mutable collection of items enclosed in square brackets. Items can be any type, duplicates are allowed, and the order is preserved.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Lists are Python's most used data structure. Whenever you need to store multiple items — a shopping cart, a list of users, quiz questions — use a list.
      </p>
      <CodeBlock lang="py" showLines code={`fruits = ["apple", "banana", "mango"]

# Access by index (0 = first, -1 = last)
print(fruits[0])                # "apple"
print(fruits[-1])               # "mango"
print(fruits[0:2])              # ["apple", "banana"] — slice

# Add items
fruits.append("grape")          # add one item to the end
fruits.insert(0, "kiwi")        # insert at a specific position
fruits.extend(["lime", "pear"]) # add multiple items at once

# Remove items
fruits.remove("banana")         # remove by value (first match)
popped = fruits.pop()           # remove and return the last item
fruits.pop(0)                   # remove and return at index 0

# Search and info
print(len(fruits))              # number of items
print("mango" in fruits)        # True/False — membership check
print(fruits.index("mango"))    # position of first occurrence

# Sort and transform
fruits.sort()                   # sort alphabetically (in-place)
fruits.sort(reverse=True)       # sort descending
fruits.reverse()                # reverse the order
copy = fruits.copy()            # create an independent copy
fruits.clear()                  # remove all items`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>⚡ List Comprehensions</CardTitle>
      <Def term="List comprehension">a concise one-line syntax to build a list by looping over an iterable, with an optional filter condition.</Def>
      <CodeBlock lang="py" showLines code={`# Pattern: [expression for item in iterable if condition]

# Squares of 1 to 10
squares = [x**2 for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# Filter: only even numbers 0 to 18
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transform a list of strings
words = ["hello", "world", "python"]
upper = [w.upper() for w in words]
# ["HELLO", "WORLD", "PYTHON"]

# Filter + transform — only long words, title-cased
long = [w.title() for w in words if len(w) > 4]
# ["Hello", "World", "Python"]`}/>
      <InfoBox type="info">List comprehensions are faster than building a list with a loop and <IC>.append()</IC>. You'll see them constantly in real Python code.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📦 Tuples — Read-Only Lists</CardTitle>
      <Def term="Tuple">an ordered, immutable collection enclosed in parentheses. Like a list, but its values cannot change after creation.</Def>
      <CodeBlock lang="py" showLines code={`# Tuples — use when data should never change
coords  = (10, 20)           # a 2D point
rgb     = (255, 128, 0)      # an orange color
size    = (1920, 1080)       # screen resolution

# Unpack a tuple into separate variables
x, y = coords
print(x, y)                  # 10  20

# Tuples as function return values — very common
def min_max(nums):
    return min(nums), max(nums)   # returns a tuple

lo, hi = min_max([3, 1, 7, 2, 9])
print(lo, hi)                # 1  9`}/>
    </Card>
    <TryIt>
      Create a list of 5 of your favourite movies. Then:<br/>
      1. Print the first and last movie<br/>
      2. Add a new movie to the end with <IC>.append()</IC><br/>
      3. Use a list comprehension to make a new list of all movie names in uppercase
    </TryIt>
  </>);
}

function PybDicts() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🗂 Dictionaries</CardTitle>
      <Def term="Dictionary">an unordered collection of key-value pairs enclosed in curly braces. Keys must be unique; values can be any type.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Dicts are perfect for structured data — think of them as a labelled container. JSON responses from APIs are always dictionaries in Python. If you've seen <IC>{"{ \"name\": \"Alice\", \"age\": 25 }"}</IC> in an API response, that becomes a dict.
      </p>
      <CodeBlock lang="py" showLines code={`user = {
    "name":   "Alice",
    "age":    25,
    "city":   "Nairobi",
    "active": True
}

# Read a value
print(user["name"])               # "Alice"
print(user.get("email", "N/A"))   # "N/A" — safe: no KeyError

# Add or update a key
user["email"] = "alice@example.com"   # add new key
user["city"]  = "Mombasa"             # update existing key

# Remove a key
del user["active"]                # removes the key entirely
removed = user.pop("age", None)   # removes and returns value

# Check if a key exists
print("name" in user)             # True
print("phone" in user)            # False

# Get all keys, values, or pairs
print(list(user.keys()))          # ["name", "city", "email"]
print(list(user.values()))        # ["Alice", "Mombasa", "alice@…"]
print(list(user.items()))         # [("name","Alice"), …]`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔁 Looping & Dict Comprehensions</CardTitle>
      <CodeBlock lang="py" showLines code={`scores = {"Alice": 95, "Bob": 72, "Eve": 88, "Dan": 55}

# Loop over key-value pairs (most common pattern)
for name, score in scores.items():
    print(f"{name}: {score}")
# Alice: 95 / Bob: 72 / Eve: 88 / Dan: 55

# Dict comprehension — build a dict in one line
# Pattern: {key: value for key, value in iterable if condition}

# Keep only students who passed
passed = {k: v for k, v in scores.items() if v >= 60}
# {"Alice": 95, "Bob": 72, "Eve": 88}

# Transform values to letter grades
grades = {k: "A" if v >= 90 else "B" if v >= 75 else "C"
          for k, v in scores.items()}
# {"Alice": "A", "Bob": "C", "Eve": "B", "Dan": "C"}`}/>
      <InfoBox type="info">In Flask, <IC>request.form</IC> and <IC>request.args</IC> are dict-like objects. The JSON you send back with <IC>jsonify()</IC> is built from a dict.</InfoBox>
    </Card>
    <TryIt>
      Create a dict representing a book with keys: <IC>title</IC>, <IC>author</IC>, <IC>year</IC>, <IC>pages</IC>.<br/>
      Then loop over <IC>.items()</IC> and print each key and value on its own line, like:<br/>
      <IC>title: The Alchemist</IC>
    </TryIt>
  </>);
}

function PybIfs() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔀 If / Elif / Else</CardTitle>
      <Def term="Conditional statement">a block of code that only executes when a specific condition is True. Python uses if, elif, and else to branch logic.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Conditionals let your program make decisions. Every real program needs them — validating input, checking permissions, handling different states. The indentation (4 spaces) is what Python uses to define the block; no curly braces needed.
      </p>
      <CodeBlock lang="py" showLines code={`age = 20

if age >= 18:
    print("Adult — can vote and drive")
elif age >= 13:
    print("Teen — can get a job at 16")
else:
    print("Child")

# Python evaluates top to bottom and stops at the first match

# One-liner (ternary / conditional expression)
label = "Adult" if age >= 18 else "Minor"
print(label)   # "Adult"

# Nested conditions
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"
print(f"Score {score} → Grade {grade}")   # Score 85 → Grade B`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔣 Comparison & Logical Operators</CardTitle>
      <CodeBlock lang="py" showLines code={`# Comparison operators — always return True or False
x, y = 10, 5
x == y     # False — equal to
x != y     # True  — not equal to
x >  y     # True  — greater than
x <  y     # False — less than
x >= y     # True  — greater than or equal to
x <= y     # False — less than or equal to

# Logical operators — combine conditions
age = 25
has_id = True
if age >= 18 and has_id:        # BOTH must be True
    print("Welcome!")
if age < 13 or age > 65:        # AT LEAST ONE must be True
    print("Special discount!")
if not has_id:                  # flip True → False
    print("ID required")

# Membership — check if value is IN a collection
"a" in "cat"           # True
5 in [1, 2, 5]         # True
"name" in my_dict      # True if key exists

# Identity — check if it's the same object (for None always use is)
x is None              # True/False
x is not None          # True/False`}/>
      <InfoBox type="tip">In Flask: <IC>{'if request.method == "POST":'}</IC> is the most common condition you'll write. Always use <IC>==</IC> for comparison, never <IC>=</IC>.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.green}>✅ Truthy & Falsy Values</CardTitle>
      <CodeBlock lang="py" showLines code={`# These values are Falsy — they evaluate to False in an if check
False, None, 0, 0.0, "", [], {}, ()

# Everything else is Truthy
name = "Alice"
if name:                   # True — non-empty string is truthy
    print("Name is set")

items = []
if not items:              # True — empty list is falsy
    print("No items in cart")

user = None
if user is None:           # Explicit None check — preferred style
    print("Not logged in")`}/>
    </Card>
    <TryIt>
      Write a function that takes a <IC>score</IC> (0–100) and returns a letter grade:<br/>
      90+ → <IC>"A"</IC>, 80+ → <IC>"B"</IC>, 70+ → <IC>"C"</IC>, 60+ → <IC>"D"</IC>, below 60 → <IC>"F"</IC>.<br/>
      Test it with: <IC>print(grade(95))</IC>, <IC>print(grade(72))</IC>, <IC>print(grade(50))</IC>
    </TryIt>
  </>);
}

function PybLoops() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🔁 For Loops</CardTitle>
      <Def term="For loop">a control structure that repeats a block of code once for each item in a sequence (list, string, range, dict, etc.).</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        For loops are how you process collections — iterate over every user, every line in a file, every item in a cart. The built-in <IC>range()</IC>, <IC>enumerate()</IC>, and <IC>zip()</IC> functions make them even more powerful.
      </p>
      <CodeBlock lang="py" showLines code={`# range(stop) — count from 0
for i in range(5):
    print(i)              # 0 1 2 3 4

# range(start, stop) — count from start
for i in range(1, 6):
    print(i)              # 1 2 3 4 5

# range(start, stop, step) — count with a step
for i in range(0, 20, 5):
    print(i)              # 0 5 10 15

# Loop over a list
fruits = ["apple", "banana", "mango"]
for fruit in fruits:
    print(fruit.upper())  # APPLE / BANANA / MANGO

# enumerate() — get index AND value at the same time
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")   # 1. apple / 2. banana / 3. mango

# Loop over two lists simultaneously with zip()
names  = ["Alice", "Bob", "Eve"]
scores = [95, 82, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")  # Alice: 95 / Bob: 82 / Eve: 78`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔂 While Loops, break & continue</CardTitle>
      <Def term="While loop">a control structure that repeats a block of code as long as a condition remains True. Use when you don't know in advance how many iterations you need.</Def>
      <CodeBlock lang="py" showLines code={`# while — repeat until condition becomes False
count = 0
while count < 5:
    print(count)
    count += 1          # 0 1 2 3 4

# break — exit the loop immediately (even if condition is still True)
for i in range(10):
    if i == 5:
        break           # stops here
    print(i)            # 0 1 2 3 4

# continue — skip the rest of this iteration, go to the next
for i in range(8):
    if i % 2 == 0:
        continue        # skip even numbers
    print(i)            # 1 3 5 7

# Common pattern: loop until user gives valid input
while True:
    age = input("Enter your age: ")
    if age.isdigit():
        break           # valid input — exit the loop
    print("Please enter a number")`}/>
      <InfoBox type="warn">Always ensure a <IC>while</IC> loop has a way to exit. A loop that never terminates will freeze your program.</InfoBox>
    </Card>
    <TryIt>
      Use a <IC>for</IC> loop with <IC>enumerate()</IC> to print a numbered grocery list from a list of 5 items. Then use a list comprehension to create a new list of only the items with more than 4 characters.
    </TryIt>
  </>);
}

function PybFuncs() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>⚙️ Defining Functions</CardTitle>
      <Def term="Function">a reusable, named block of code that performs a specific task. It can accept inputs (parameters) and return an output (return value).</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Functions are the backbone of clean code. Instead of repeating the same logic in multiple places, you define it once and call it by name. Flask route handlers are just regular Python functions with a decorator — if you understand functions, you understand Flask routes.
      </p>
      <CodeBlock lang="py" showLines code={`# Define a function with def
def greet(name="World"):      # "World" is the default parameter
    """Return a greeting string."""
    return f"Hello, {name}!"  # return sends back a value

# Call the function
print(greet())                # Hello, World!  (uses default)
print(greet("Alice"))         # Hello, Alice!  (overrides default)

# Positional vs keyword arguments
def calc(price, tax=0.1, discount=0):
    total = price * (1 + tax) - discount
    return round(total, 2)

calc(100)                     # price=100, tax=0.1, discount=0
calc(100, discount=15)        # skip tax, jump to discount
calc(100, 0.15, 5)            # positional: price, tax, discount

# Return multiple values (as a tuple)
def stats(nums):
    return min(nums), max(nums), sum(nums) / len(nums)

lo, hi, avg = stats([3, 1, 7, 2, 9])
print(f"Min: {lo}, Max: {hi}, Avg: {avg:.1f}")  # Min: 1, Max: 9, Avg: 4.4`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🔗 Lambda & Higher-Order Functions</CardTitle>
      <CodeBlock lang="py" showLines code={`# Lambda — anonymous one-line function
square = lambda x: x ** 2
print(square(5))              # 25

# Useful with sorted(), map(), filter()
names = ["Charlie", "Alice", "Bob", "Dave"]
sorted_names = sorted(names, key=lambda n: len(n))
# Sorted by length: ['Bob', 'Dave', 'Alice', 'Charlie']

# map() — apply function to every item
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda n: n * 2, numbers))
# [2, 4, 6, 8, 10]

# filter() — keep items where function returns True
evens = list(filter(lambda n: n % 2 == 0, numbers))
# [2, 4]`}/>
      <InfoBox type="info">Flask route handlers are functions. <IC>return f"Hello, {name}!"</IC> in a route is exactly the same as returning from any function — the return value becomes the HTTP response.</InfoBox>
    </Card>
    <TryIt>
      Write a function called <IC>bmi(weight_kg, height_m)</IC> that calculates BMI (<IC>weight / height²</IC>) and returns the category:<br/>
      Below 18.5 → <IC>"Underweight"</IC>, 18.5–25 → <IC>"Normal"</IC>, 25–30 → <IC>"Overweight"</IC>, 30+ → <IC>"Obese"</IC>.<br/>
      Print the result for a few different values.
    </TryIt>
  </>);
}

function PybClasses() {
  return (<>
    <Card>
      <CardTitle color={T.accent}>🏗 Classes & Objects</CardTitle>
      <Def term="Class">a blueprint for creating objects. It defines attributes (data) and methods (functions) that every object of that type will have.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Object-Oriented Programming (OOP) lets you model real-world things as code objects. A <IC>User</IC> class can have a <IC>name</IC>, an <IC>email</IC>, and methods like <IC>login()</IC>. Flask's database models are classes — you define the structure once, then create many user objects from it.
      </p>
      <CodeBlock lang="py" showLines code={`class Dog:
    """Represents a dog — this is the blueprint."""

    # __init__ is the constructor — runs when you create a Dog
    def __init__(self, name, breed, age):
        self.name  = name    # self.x = instance attribute
        self.breed = breed   # every Dog gets its own copy
        self.age   = age

    # Methods — functions that belong to the class
    def bark(self):
        return f"{self.name} says: Woof!"

    def info(self):
        return f"{self.name} is a {self.age}-year-old {self.breed}"

    def have_birthday(self):
        self.age += 1        # modify the object's state
        return f"{self.name} is now {self.age}!"

# Create instances (objects) from the blueprint
dog1 = Dog("Rex", "Labrador", 3)
dog2 = Dog("Bella", "Poodle", 5)

print(dog1.bark())            # Rex says: Woof!
print(dog2.info())            # Bella is a 5-year-old Poodle
print(dog1.have_birthday())   # Rex is now 4!
print(dog1.name)              # Rex  — access attribute directly`}/>
    </Card>
    <Card>
      <CardTitle color={T.accent}>🧬 Inheritance</CardTitle>
      <Def term="Inheritance">when a child class automatically receives all attributes and methods of a parent class, then adds or overrides its own.</Def>
      <CodeBlock lang="py" showLines code={`class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def walk(self):
        return f"{self.name} is walking"

# Dog inherits everything from Animal
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")  # call parent's __init__

    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")

    def purr(self):
        return f"{self.name} purrs..."

dog = Dog("Rex")
cat = Cat("Luna")

print(dog.speak())            # Rex says Woof!  (from Animal)
print(dog.fetch("ball"))      # Rex fetches the ball!
print(cat.walk())             # Luna is walking  (from Animal)
print(cat.purr())             # Luna purrs...`}/>
      <InfoBox type="note">Flask-SQLAlchemy's <IC>db.Model</IC> is a base class. When you write <IC>class User(db.Model):</IC> you're inheriting all the database functionality — just like <IC>Dog(Animal)</IC> here.</InfoBox>
    </Card>
    <TryIt>
      Create a <IC>BankAccount</IC> class with attributes <IC>owner</IC> and <IC>balance</IC>. Add three methods:<br/>
      <IC>deposit(amount)</IC> — adds to balance and returns new balance<br/>
      <IC>withdraw(amount)</IC> — subtracts if enough funds, else returns <IC>"Insufficient funds"</IC><br/>
      <IC>statement()</IC> — prints <IC>"Owner: Alice | Balance: $250"</IC>
    </TryIt>
  </>);
}

function PybErrors() {
  return (<>
    <Card>
      <CardTitle color={T.rose}>⚡ Exceptions — Handling Errors Gracefully</CardTitle>
      <Def term="Exception">an error that occurs during program execution. Without handling, it crashes the program. With try/except, you catch it and respond gracefully.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Real programs deal with unpredictable input — users type text where numbers are expected, files are missing, APIs are down. Exception handling lets your program respond to these problems instead of crashing.
      </p>
      <CodeBlock lang="py" showLines code={`# Without try/except — this crashes if user types "hello"
# age = int(input("Enter age: "))   ← ValueError!

# With try/except — handle the error gracefully
try:
    age = int(input("Enter your age: "))  # might raise ValueError
    print(f"You are {age} years old")
except ValueError:
    print("Please enter a valid number")  # runs if ValueError occurs

# Multiple except blocks — catch different errors
try:
    age    = int(input("Age: "))
    income = 50000
    rate   = income / age             # might raise ZeroDivisionError
    print(f"Monthly: {rate:.2f}")
except ValueError:
    print("Age must be a number")
except ZeroDivisionError:
    print("Age cannot be zero")
except Exception as e:
    print(f"Unexpected error: {e}")   # catch-all fallback
finally:
    print("Done")                     # ALWAYS runs, even after error`}/>
    </Card>
    <Card>
      <CardTitle color={T.rose}>🚀 Raising Custom Exceptions</CardTitle>
      <CodeBlock lang="py" showLines code={`# You can raise your own exceptions with raise
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0 or age > 150:
        raise ValueError(f"Age {age} is not realistic")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(e)   # Age -5 is not realistic

# Common built-in exception types — learn these
# ValueError        — wrong value: int("abc")
# TypeError         — wrong type: "hi" + 5
# KeyError          — dict key missing: d["x"] where "x" not in d
# IndexError        — list index out of range: lst[99]
# FileNotFoundError — file doesn't exist: open("missing.txt")
# ZeroDivisionError — divide by zero
# AttributeError    — object has no that attribute`}/>
      <InfoBox type="warn">Never use a bare <IC>except:</IC> — always catch specific exceptions. A bare except hides bugs and makes debugging nearly impossible.</InfoBox>
    </Card>
    <TryIt>
      Write a function <IC>safe_divide(a, b)</IC> that divides two numbers but handles division by zero with a helpful message. Also handle the case where either argument is not a number using <IC>TypeError</IC>. Test it with both valid and invalid inputs.
    </TryIt>
  </>);
}

function PybModules() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>📦 Importing Built-in Modules</CardTitle>
      <Def term="Module">a Python file containing reusable code (functions, classes, constants). Python's standard library ships hundreds of modules — no installation needed.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Python's standard library is massive — it handles dates, files, random numbers, math, HTTP, JSON, regular expressions, and much more. Third-party packages (Flask, requests, pandas) extend this further via <IC>pip</IC>.
      </p>
      <CodeBlock lang="py" showLines code={`import random
import math
import os
import datetime

# random — generate random numbers and make random choices
print(random.random())             # float between 0.0 and 1.0
print(random.randint(1, 6))        # int between 1 and 6 (dice roll)
items = ["Alice", "Bob", "Eve"]
print(random.choice(items))        # random item from list
random.shuffle(items)              # shuffle in-place

# math — mathematical functions
print(math.sqrt(16))               # 4.0
print(math.pi)                     # 3.14159...
print(math.ceil(3.2))              # 4  (round up)
print(math.floor(3.9))             # 3  (round down)
print(math.log(100, 10))           # 2.0  (log base 10)

# os — interact with the operating system
print(os.getcwd())                 # current working directory
print(os.listdir("."))             # files in current directory
os.makedirs("new_folder", exist_ok=True)  # create directory

# datetime — work with dates and times
now = datetime.datetime.now()
print(now.strftime("%Y-%m-%d %H:%M"))  # "2025-01-15 14:30"`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📁 Selective Imports & pip Packages</CardTitle>
      <CodeBlock lang="py" showLines code={`# Import specific items — no prefix needed
from math import pi, sqrt, ceil
from random import choice, randint, shuffle
from pathlib import Path           # modern file handling

print(pi)                          # 3.14159... (no math. prefix)
print(sqrt(25))                    # 5.0

# pathlib — the modern way to handle file paths
path = Path("data.txt")
if path.exists():
    content = path.read_text()     # read entire file as string
    lines   = content.splitlines() # split into list of lines

# Write to a file
Path("output.txt").write_text("Hello, File!\nLine 2")

# json — parse and create JSON data
import json
data = {"name": "Alice", "age": 25}
json_str = json.dumps(data)         # dict → JSON string
parsed   = json.loads(json_str)     # JSON string → dict

# pip — install third-party packages (run in terminal)
# pip install flask        ← web framework
# pip install requests     ← HTTP library
# pip install pandas       ← data analysis`}/>
      <InfoBox type="tip">Flask itself is a pip package. Once you <IC>pip install flask</IC>, you can <IC>from flask import Flask</IC> — just like importing any standard module.</InfoBox>
    </Card>
    <TryIt>
      Use the <IC>random</IC> module to simulate rolling two 6-sided dice 10 times. Print the result of each roll and keep track of the total using a loop. At the end, print the average roll.
    </TryIt>
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
      <PageHeader eyebrow="Python · Beginner" title="Python Basics" sub="Variables, data types, control flow, functions, OOP, error handling, modules" color={T.accent}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Python shows up in job listings more than almost any other language — data science, AI, backend web, automation, scripting. The concepts here aren't beginner stuff you'll throw away: variables, loops, functions, and classes are the exact same patterns you'll write in real jobs. Each tab follows the same pattern: definition → explanation → example → practice.
        </p>
        <TabBar tabs={PYB_TABS} active={tab} onChange={setTab}/>
        {tab === "quiz"
          ? <Card><CardTitle color={T.accent}>🎯 Python Basics Quiz</CardTitle><Quiz questions={PYB_QUIZ} trackId="py-basics"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
