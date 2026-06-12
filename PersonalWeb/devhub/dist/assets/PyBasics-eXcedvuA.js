import{r as u,j as e,T as r}from"./index-CNTZnqQQ.js";import{P as p,T as m,a as s,b as n,Q as f,D as a,c as t,C as i,I as o,e as l}from"./shared-Cgke19x4.js";const x=[{id:"vars",label:"Variables"},{id:"strings",label:"Strings"},{id:"lists",label:"Lists"},{id:"dicts",label:"Dicts"},{id:"ifs",label:"If / Else"},{id:"loops",label:"Loops"},{id:"funcs",label:"Functions"},{id:"classes",label:"Classes"},{id:"errors",label:"Errors"},{id:"modules",label:"Modules"},{id:"quiz",label:"Quiz 🎯"}],g=[{q:'What does len("Python") return?',opts:["5","6","7","Error"],ans:1,exp:"P-y-t-h-o-n is 6 characters. len() counts every character including spaces."},{q:"What is the result of 10 % 3?",opts:["3","1","0","3.33"],ans:1,exp:"% is modulo — it gives the remainder of division. 10 ÷ 3 = 3 remainder 1, so 10 % 3 = 1."},{q:"Which syntax creates a dictionary?",opts:["[1,2,3]",'{"a":1}',"(1,2)","{1,2}"],ans:1,exp:'Dicts use curly braces with key:value pairs like {"a":1}. Square brackets make lists, round brackets make tuples, and {1,2} makes a set.'},{q:'What does "Python"[::-1] return?',opts:["Python","nohtyP","Pyth","Error"],ans:1,exp:"[::-1] reverses the sequence — a step of -1 goes backwards through every character. Python becomes nohtyP."},{q:"Which keyword exits a loop immediately?",opts:["exit","stop","break","return"],ans:2,exp:"break immediately exits the current loop. continue skips the rest of the current iteration and jumps to the next one."},{q:'What is the default in greet(name="World")?',opts:["None",'"World"',"name","Error"],ans:1,exp:'Default parameter values are used when no argument is passed. greet() uses "World", but greet("Alice") uses "Alice".'},{q:"What does __init__ do in a class?",opts:["Imports a module","Initializes an object","Inherits a class","None of these"],ans:1,exp:"__init__ is the constructor — it runs automatically when you create a new object with MyClass(). It sets up the object's initial state."},{q:"Which block catches a ValueError?",opts:["try","finally","except ValueError","if error"],ans:2,exp:"except ValueError: catches that specific error type. You can chain multiple except blocks for different error types."},{q:"What is the difference between a list and a tuple?",opts:["Lists are faster","Tuples are mutable, lists are not","Lists are mutable, tuples are not","No difference"],ans:2,exp:"Lists use [] and can be changed after creation (mutable). Tuples use () and cannot be changed (immutable). Use tuples for fixed data like coordinates or RGB colors."},{q:"What does the range(1, 10, 2) call produce?",opts:["1,2,3,4,5,6,7,8,9","1,3,5,7,9","2,4,6,8,10","1,3,5,7,9,11"],ans:1,exp:"range(start, stop, step) — starts at 1, goes up to (not including) 10, steps by 2. So: 1, 3, 5, 7, 9."}];function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"📦 Variables & Data Types"}),e.jsx(a,{term:"Variable",children:"a named label that stores a value in memory. Python detects the type automatically — you never need to declare it."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Every program stores data. A variable is how you give that data a name so you can use it later. Python has four core data types you'll use constantly: strings (text), integers (whole numbers), floats (decimals), and booleans (True/False)."}),e.jsx(i,{lang:"py",showLines:!0,code:`# Python automatically detects the type
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
print(float(5))      # 5    → 5.0  (int to float)`}),e.jsxs(o,{type:"info",children:["Use ",e.jsx(t,{children:"type(x)"})," to check a variable's type at any time. Use ",e.jsx(t,{children:"int()"}),", ",e.jsx(t,{children:"str()"}),", ",e.jsx(t,{children:"float()"})," to convert between types."]})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🧮 Math Operators"}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:["Python supports all standard math operations. The modulo operator ",e.jsx(t,{children:"%"})," (remainder) is especially useful — it's how you check if a number is even, or cycle through values."]}),e.jsx(i,{lang:"py",showLines:!0,code:`a, b = 10, 3          # assign two variables at once

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
x -= 5     # x = x - 5   →  x is now 25`}),e.jsxs(o,{type:"tip",children:[e.jsx(t,{children:"%"})," modulo is used constantly — to check even/odd: ",e.jsx(t,{children:"x % 2 == 0"})," means even. To wrap around a list: ",e.jsx(t,{children:"index % len(items)"}),"."]})]}),e.jsxs(l,{children:["Create three variables: ",e.jsx(t,{children:"name"})," with your name, ",e.jsx(t,{children:"birth_year"})," with the year you were born, and ",e.jsx(t,{children:"height"})," with your height in metres. Then calculate your age (",e.jsx(t,{children:"2025 - birth_year"}),") and print a sentence like:",e.jsx("br",{}),e.jsx("br",{}),e.jsx(t,{children:`f"Hi, I'm Alice. I'm 25 years old and 1.75m tall."`})]})]})}function b(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"📝 Strings & String Methods"}),e.jsx(a,{term:"String",children:"a sequence of characters enclosed in quotes. Strings are immutable — methods return a new string rather than modifying the original."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Strings come with dozens of built-in methods. The most important ones let you search, transform, split, and join text. You'll use these every day — cleaning user input, building URLs, parsing data."}),e.jsx(i,{lang:"py",showLines:!0,code:`s = "Python for Beginners"

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
print(s[::-1])                   # reversed: "srennigeBrofnohtyP"`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"✨ f-Strings — The Modern Way"}),e.jsx(a,{term:"f-string",children:"a formatted string literal that embeds variables and expressions directly inside curly braces, prefixed with f."}),e.jsx(i,{lang:"py",showLines:!0,code:`name  = "Alice"
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
print(f"Big: {1_000_000:,}")       # Big: 1,000,000 (with commas)`}),e.jsxs(o,{type:"tip",children:["f-strings replaced the older ",e.jsx(t,{children:".format()"})," method. Always use f-strings — they're faster and easier to read."]})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.amber,children:"🔤 Escape Characters"}),e.jsx(i,{lang:"py",showLines:!0,code:`# Use backslash  to include special characters
print("He said "hello"")   # He said "hello"
print('It's great')          # It's great
print("Line 1
Line 2")       # 
 = newline
print("A	B	C")              # 	 = tab
print("Back\\slash")          # \\\\ = one backslash

# Raw strings — ignore escape sequences (great for regex/paths)
path = r"C:UsersAliceDocuments"  # r prefix = raw string
print(path)                          # C:UsersAliceDocuments`})]}),e.jsxs(l,{children:["Store your full name in a variable. Then:",e.jsx("br",{}),"1. Print how many characters it has using ",e.jsx(t,{children:"len()"}),e.jsx("br",{}),"2. Print it in uppercase and in title case",e.jsx("br",{}),"3. Use an f-string to print: ",e.jsx(t,{children:`"My name has 5 letters and in CAPS it's: ALICE"`})]})]})}function j(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"📋 Lists"}),e.jsx(a,{term:"List",children:"an ordered, mutable collection of items enclosed in square brackets. Items can be any type, duplicates are allowed, and the order is preserved."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Lists are Python's most used data structure. Whenever you need to store multiple items — a shopping cart, a list of users, quiz questions — use a list."}),e.jsx(i,{lang:"py",showLines:!0,code:`fruits = ["apple", "banana", "mango"]

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
fruits.clear()                  # remove all items`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"⚡ List Comprehensions"}),e.jsx(a,{term:"List comprehension",children:"a concise one-line syntax to build a list by looping over an iterable, with an optional filter condition."}),e.jsx(i,{lang:"py",showLines:!0,code:`# Pattern: [expression for item in iterable if condition]

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
# ["Hello", "World", "Python"]`}),e.jsxs(o,{type:"info",children:["List comprehensions are faster than building a list with a loop and ",e.jsx(t,{children:".append()"}),". You'll see them constantly in real Python code."]})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.sky,children:"📦 Tuples — Read-Only Lists"}),e.jsx(a,{term:"Tuple",children:"an ordered, immutable collection enclosed in parentheses. Like a list, but its values cannot change after creation."}),e.jsx(i,{lang:"py",showLines:!0,code:`# Tuples — use when data should never change
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
print(lo, hi)                # 1  9`})]}),e.jsxs(l,{children:["Create a list of 5 of your favourite movies. Then:",e.jsx("br",{}),"1. Print the first and last movie",e.jsx("br",{}),"2. Add a new movie to the end with ",e.jsx(t,{children:".append()"}),e.jsx("br",{}),"3. Use a list comprehension to make a new list of all movie names in uppercase"]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🗂 Dictionaries"}),e.jsx(a,{term:"Dictionary",children:"an unordered collection of key-value pairs enclosed in curly braces. Keys must be unique; values can be any type."}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:["Dicts are perfect for structured data — think of them as a labelled container. JSON responses from APIs are always dictionaries in Python. If you've seen ",e.jsx(t,{children:'{ "name": "Alice", "age": 25 }'})," in an API response, that becomes a dict."]}),e.jsx(i,{lang:"py",showLines:!0,code:`user = {
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
print(list(user.items()))         # [("name","Alice"), …]`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔁 Looping & Dict Comprehensions"}),e.jsx(i,{lang:"py",showLines:!0,code:`scores = {"Alice": 95, "Bob": 72, "Eve": 88, "Dan": 55}

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
# {"Alice": "A", "Bob": "C", "Eve": "B", "Dan": "C"}`}),e.jsxs(o,{type:"info",children:["In Flask, ",e.jsx(t,{children:"request.form"})," and ",e.jsx(t,{children:"request.args"})," are dict-like objects. The JSON you send back with ",e.jsx(t,{children:"jsonify()"})," is built from a dict."]})]}),e.jsxs(l,{children:["Create a dict representing a book with keys: ",e.jsx(t,{children:"title"}),", ",e.jsx(t,{children:"author"}),", ",e.jsx(t,{children:"year"}),", ",e.jsx(t,{children:"pages"}),".",e.jsx("br",{}),"Then loop over ",e.jsx(t,{children:".items()"})," and print each key and value on its own line, like:",e.jsx("br",{}),e.jsx(t,{children:"title: The Alchemist"})]})]})}function v(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔀 If / Elif / Else"}),e.jsx(a,{term:"Conditional statement",children:"a block of code that only executes when a specific condition is True. Python uses if, elif, and else to branch logic."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Conditionals let your program make decisions. Every real program needs them — validating input, checking permissions, handling different states. The indentation (4 spaces) is what Python uses to define the block; no curly braces needed."}),e.jsx(i,{lang:"py",showLines:!0,code:`age = 20

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
print(f"Score {score} → Grade {grade}")   # Score 85 → Grade B`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔣 Comparison & Logical Operators"}),e.jsx(i,{lang:"py",showLines:!0,code:`# Comparison operators — always return True or False
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
x is not None          # True/False`}),e.jsxs(o,{type:"tip",children:["In Flask: ",e.jsx(t,{children:'if request.method == "POST":'})," is the most common condition you'll write. Always use ",e.jsx(t,{children:"=="})," for comparison, never ",e.jsx(t,{children:"="}),"."]})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.green,children:"✅ Truthy & Falsy Values"}),e.jsx(i,{lang:"py",showLines:!0,code:`# These values are Falsy — they evaluate to False in an if check
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
    print("Not logged in")`})]}),e.jsxs(l,{children:["Write a function that takes a ",e.jsx(t,{children:"score"})," (0–100) and returns a letter grade:",e.jsx("br",{}),"90+ → ",e.jsx(t,{children:'"A"'}),", 80+ → ",e.jsx(t,{children:'"B"'}),", 70+ → ",e.jsx(t,{children:'"C"'}),", 60+ → ",e.jsx(t,{children:'"D"'}),", below 60 → ",e.jsx(t,{children:'"F"'}),".",e.jsx("br",{}),"Test it with: ",e.jsx(t,{children:"print(grade(95))"}),", ",e.jsx(t,{children:"print(grade(72))"}),", ",e.jsx(t,{children:"print(grade(50))"})]})]})}function k(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔁 For Loops"}),e.jsx(a,{term:"For loop",children:"a control structure that repeats a block of code once for each item in a sequence (list, string, range, dict, etc.)."}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:["For loops are how you process collections — iterate over every user, every line in a file, every item in a cart. The built-in ",e.jsx(t,{children:"range()"}),", ",e.jsx(t,{children:"enumerate()"}),", and ",e.jsx(t,{children:"zip()"})," functions make them even more powerful."]}),e.jsx(i,{lang:"py",showLines:!0,code:`# range(stop) — count from 0
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
    print(f"{name}: {score}")  # Alice: 95 / Bob: 82 / Eve: 78`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔂 While Loops, break & continue"}),e.jsx(a,{term:"While loop",children:"a control structure that repeats a block of code as long as a condition remains True. Use when you don't know in advance how many iterations you need."}),e.jsx(i,{lang:"py",showLines:!0,code:`# while — repeat until condition becomes False
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
    print("Please enter a number")`}),e.jsxs(o,{type:"warn",children:["Always ensure a ",e.jsx(t,{children:"while"})," loop has a way to exit. A loop that never terminates will freeze your program."]})]}),e.jsxs(l,{children:["Use a ",e.jsx(t,{children:"for"})," loop with ",e.jsx(t,{children:"enumerate()"})," to print a numbered grocery list from a list of 5 items. Then use a list comprehension to create a new list of only the items with more than 4 characters."]})]})}function A(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"⚙️ Defining Functions"}),e.jsx(a,{term:"Function",children:"a reusable, named block of code that performs a specific task. It can accept inputs (parameters) and return an output (return value)."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Functions are the backbone of clean code. Instead of repeating the same logic in multiple places, you define it once and call it by name. Flask route handlers are just regular Python functions with a decorator — if you understand functions, you understand Flask routes."}),e.jsx(i,{lang:"py",showLines:!0,code:`# Define a function with def
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
print(f"Min: {lo}, Max: {hi}, Avg: {avg:.1f}")  # Min: 1, Max: 9, Avg: 4.4`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🔗 Lambda & Higher-Order Functions"}),e.jsx(i,{lang:"py",showLines:!0,code:`# Lambda — anonymous one-line function
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
# [2, 4]`}),e.jsxs(o,{type:"info",children:["Flask route handlers are functions. ",e.jsx(t,{children:'return f"Hello, {name}!"'})," in a route is exactly the same as returning from any function — the return value becomes the HTTP response."]})]}),e.jsxs(l,{children:["Write a function called ",e.jsx(t,{children:"bmi(weight_kg, height_m)"})," that calculates BMI (",e.jsx(t,{children:"weight / height²"}),") and returns the category:",e.jsx("br",{}),"Below 18.5 → ",e.jsx(t,{children:'"Underweight"'}),", 18.5–25 → ",e.jsx(t,{children:'"Normal"'}),", 25–30 → ",e.jsx(t,{children:'"Overweight"'}),", 30+ → ",e.jsx(t,{children:'"Obese"'}),".",e.jsx("br",{}),"Print the result for a few different values."]})]})}function P(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🏗 Classes & Objects"}),e.jsx(a,{term:"Class",children:"a blueprint for creating objects. It defines attributes (data) and methods (functions) that every object of that type will have."}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:["Object-Oriented Programming (OOP) lets you model real-world things as code objects. A ",e.jsx(t,{children:"User"})," class can have a ",e.jsx(t,{children:"name"}),", an ",e.jsx(t,{children:"email"}),", and methods like ",e.jsx(t,{children:"login()"}),". Flask's database models are classes — you define the structure once, then create many user objects from it."]}),e.jsx(i,{lang:"py",showLines:!0,code:`class Dog:
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
print(dog1.name)              # Rex  — access attribute directly`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🧬 Inheritance"}),e.jsx(a,{term:"Inheritance",children:"when a child class automatically receives all attributes and methods of a parent class, then adds or overrides its own."}),e.jsx(i,{lang:"py",showLines:!0,code:`class Animal:
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
print(cat.purr())             # Luna purrs...`}),e.jsxs(o,{type:"note",children:["Flask-SQLAlchemy's ",e.jsx(t,{children:"db.Model"})," is a base class. When you write ",e.jsx(t,{children:"class User(db.Model):"})," you're inheriting all the database functionality — just like ",e.jsx(t,{children:"Dog(Animal)"})," here."]})]}),e.jsxs(l,{children:["Create a ",e.jsx(t,{children:"BankAccount"})," class with attributes ",e.jsx(t,{children:"owner"})," and ",e.jsx(t,{children:"balance"}),". Add three methods:",e.jsx("br",{}),e.jsx(t,{children:"deposit(amount)"})," — adds to balance and returns new balance",e.jsx("br",{}),e.jsx(t,{children:"withdraw(amount)"})," — subtracts if enough funds, else returns ",e.jsx(t,{children:'"Insufficient funds"'}),e.jsx("br",{}),e.jsx(t,{children:"statement()"})," — prints ",e.jsx(t,{children:'"Owner: Alice | Balance: $250"'})]})]})}function T(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.rose,children:"⚡ Exceptions — Handling Errors Gracefully"}),e.jsx(a,{term:"Exception",children:"an error that occurs during program execution. Without handling, it crashes the program. With try/except, you catch it and respond gracefully."}),e.jsx("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:"Real programs deal with unpredictable input — users type text where numbers are expected, files are missing, APIs are down. Exception handling lets your program respond to these problems instead of crashing."}),e.jsx(i,{lang:"py",showLines:!0,code:`# Without try/except — this crashes if user types "hello"
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
    print("Done")                     # ALWAYS runs, even after error`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.rose,children:"🚀 Raising Custom Exceptions"}),e.jsx(i,{lang:"py",showLines:!0,code:`# You can raise your own exceptions with raise
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
# AttributeError    — object has no that attribute`}),e.jsxs(o,{type:"warn",children:["Never use a bare ",e.jsx(t,{children:"except:"})," — always catch specific exceptions. A bare except hides bugs and makes debugging nearly impossible."]})]}),e.jsxs(l,{children:["Write a function ",e.jsx(t,{children:"safe_divide(a, b)"})," that divides two numbers but handles division by zero with a helpful message. Also handle the case where either argument is not a number using ",e.jsx(t,{children:"TypeError"}),". Test it with both valid and invalid inputs."]})]})}function _(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(n,{color:r.sky,children:"📦 Importing Built-in Modules"}),e.jsx(a,{term:"Module",children:"a Python file containing reusable code (functions, classes, constants). Python's standard library ships hundreds of modules — no installation needed."}),e.jsxs("p",{style:{fontSize:12.5,color:r.muted2,lineHeight:1.65,marginBottom:10},children:["Python's standard library is massive — it handles dates, files, random numbers, math, HTTP, JSON, regular expressions, and much more. Third-party packages (Flask, requests, pandas) extend this further via ",e.jsx(t,{children:"pip"}),"."]}),e.jsx(i,{lang:"py",showLines:!0,code:`import random
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
print(now.strftime("%Y-%m-%d %H:%M"))  # "2025-01-15 14:30"`})]}),e.jsxs(s,{children:[e.jsx(n,{color:r.sky,children:"📁 Selective Imports & pip Packages"}),e.jsx(i,{lang:"py",showLines:!0,code:`# Import specific items — no prefix needed
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
Path("output.txt").write_text("Hello, File!
Line 2")

# json — parse and create JSON data
import json
data = {"name": "Alice", "age": 25}
json_str = json.dumps(data)         # dict → JSON string
parsed   = json.loads(json_str)     # JSON string → dict

# pip — install third-party packages (run in terminal)
# pip install flask        ← web framework
# pip install requests     ← HTTP library
# pip install pandas       ← data analysis`}),e.jsxs(o,{type:"tip",children:["Flask itself is a pip package. Once you ",e.jsx(t,{children:"pip install flask"}),", you can ",e.jsx(t,{children:"from flask import Flask"})," — just like importing any standard module."]})]}),e.jsxs(l,{children:["Use the ",e.jsx(t,{children:"random"})," module to simulate rolling two 6-sided dice 10 times. Print the result of each roll and keep track of the total using a loop. At the end, print the average roll."]})]})}function B(){const[c,d]=u.useState(()=>{try{return localStorage.getItem("cif_tab_py-basics")??"vars"}catch{return"vars"}}),h={vars:e.jsx(y,{}),strings:e.jsx(b,{}),lists:e.jsx(j,{}),dicts:e.jsx(w,{}),ifs:e.jsx(v,{}),loops:e.jsx(k,{}),funcs:e.jsx(A,{}),classes:e.jsx(P,{}),errors:e.jsx(T,{}),modules:e.jsx(_,{})};return e.jsxs("div",{children:[e.jsx(p,{eyebrow:"Python · Beginner",title:"Python Basics",sub:"Variables, data types, control flow, functions, OOP, error handling, modules",color:r.accent}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:r.muted2,lineHeight:1.7,marginBottom:20},children:"Python shows up in job listings more than almost any other language — data science, AI, backend web, automation, scripting. The concepts here aren't beginner stuff you'll throw away: variables, loops, functions, and classes are the exact same patterns you'll write in real jobs. Each tab follows the same pattern: definition → explanation → example → practice."}),e.jsx(m,{tabs:x,active:c,onChange:d,pageId:"py-basics"}),c==="quiz"?e.jsxs(s,{children:[e.jsx(n,{color:r.accent,children:"🎯 Python Basics Quiz"}),e.jsx(f,{questions:g,trackId:"py-basics"})]}):h[c]]})]})}export{B as default};
