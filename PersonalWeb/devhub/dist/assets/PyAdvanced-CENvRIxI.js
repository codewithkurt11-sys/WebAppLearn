import{r as c,j as e,T as t}from"./index-CNTZnqQQ.js";import{P as d,T as p,a as s,b as a,Q as u,c as o,C as n,I as i}from"./shared-Cgke19x4.js";const h=[{id:"decorators",label:"Decorators"},{id:"generators",label:"Generators"},{id:"async",label:"Async/Await"},{id:"typehints",label:"Type Hints"},{id:"context",label:"Context Managers"},{id:"meta",label:"Metaclasses"},{id:"quiz",label:"Quiz 🎯"}],f=[{q:"What does @functools.wraps(func) do inside a decorator?",opts:["Makes the decorator async","Preserves the original function's name and docstring","Runs the function twice","Caches the return value"],ans:1,exp:"@functools.wraps(func) copies metadata (name, docstring, etc.) from the wrapped function, so it doesn't disappear after decoration."},{q:"What keyword turns a function into a generator?",opts:["return","async","yield","generate"],ans:2,exp:"yield turns a function into a generator. Each call to next() resumes execution from the last yield statement."},{q:"What does asyncio.gather() do?",opts:["Runs tasks one after another","Collects list items","Runs multiple coroutines concurrently","Creates a new event loop"],ans:2,exp:"asyncio.gather() runs multiple coroutines concurrently and returns all results as a list when all are done."},{q:"Which type hint means 'a list of strings'?",opts:["List[str]","[str]","list(str)","Array<str>"],ans:0,exp:"List[str] from the typing module (or list[str] in Python 3.9+) means a list where every element is a string."},{q:"What are the two methods needed for a context manager class?",opts:["__init__ and __del__","__enter__ and __exit__","__open__ and __close__","__start__ and __stop__"],ans:1,exp:"__enter__ runs when entering the 'with' block and __exit__ runs when leaving it (even on error)."},{q:"What is a metaclass?",opts:["A class that can't be instantiated","A class whose instances are classes","A built-in abstract class","A decorator for classes"],ans:1,exp:"A metaclass is 'the class of a class'. Just as a class defines how instances behave, a metaclass defines how classes behave. type is the default metaclass."},{q:"What does the walrus operator := do?",opts:["Deep copy assignment","Assign and return a value in an expression","Compare two values","Unpack a list"],ans:1,exp:"The walrus operator := (Python 3.8+) assigns a value to a variable as part of an expression — useful in while loops and comprehensions."},{q:"Which is the correct way to define a generator expression?",opts:["[x*2 for x in range(10)]","(x*2 for x in range(10))","gen(x*2 for x in range(10))","yield [x*2 for x in range(10)]"],ans:1,exp:"A generator expression uses () instead of []. It's lazy — values are computed on demand, saving memory."},{q:"What does @classmethod do, and what is its first argument?",opts:["Makes a method private; self","Creates a static method; no arguments","Creates a method that receives the class instead of the instance; cls","Creates an abstract method; abstract"],ans:2,exp:"@classmethod makes a method that receives the class (cls) instead of the instance (self). Used for factory methods and alternative constructors like MyClass.from_string(s)."},{q:"What is Protocol from typing used for?",opts:["Defining network protocols","Structural subtyping — any class with the right methods satisfies it, no inheritance needed","Creating abstract base classes","Defining async interfaces"],ans:1,exp:"Protocol defines a structural interface. A class doesn't need to inherit from Protocol to satisfy it — it just needs to have the right methods/attributes. This is Python's version of duck typing with type checking support."}];function m(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"What is a Decorator?"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["A decorator is a function that ",e.jsx("strong",{style:{color:t.text},children:"wraps another function"})," to add behaviour without modifying the original code. They use the ",e.jsx(o,{children:"@"})," syntax."]}),e.jsx(n,{lang:"py",runnable:!0,code:`def shout(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@shout
def greet(name):
    return f"hello, {name}"

print(greet("alice"))  # HELLO, ALICE`}),e.jsxs(i,{type:"info",children:[e.jsx(o,{children:"@shout"})," is shorthand for ",e.jsx(o,{children:"greet = shout(greet)"}),". The decorator replaces the function with the wrapper."]})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Preserving Metadata with functools.wraps"}),e.jsx(n,{lang:"py",runnable:!0,code:`import functools

def timer(func):
    @functools.wraps(func)  # preserves __name__, __doc__
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

@timer
def slow_add(a, b):
    """Adds two numbers."""
    return a + b

print(slow_add(3, 4))
print(slow_add.__name__)  # 'slow_add' not 'wrapper'`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Decorator with Arguments"}),e.jsx(n,{lang:"py",runnable:!0,code:`import functools

def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say(msg):
    print(msg)

say("hello!")  # prints 3 times`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Common Built-in Decorators"}),e.jsx(n,{lang:"py",runnable:!0,code:`class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        import math
        return math.pi * self.radius ** 2

    @staticmethod
    def info():
        return "A circle is a round shape."

    @classmethod
    def unit(cls):
        return cls(1)

c = Circle(5)
print(c.area)          # no () needed — it's a property
print(Circle.info())   # static — no instance needed
print(Circle.unit().radius)  # classmethod`})]})]})}function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"yield — Creating a Generator"}),e.jsx(n,{lang:"py",runnable:!0,code:`def count_up(limit):
    n = 0
    while n <= limit:
        yield n       # pauses here, returns n
        n += 1        # resumes next time next() is called

gen = count_up(5)
print(next(gen))   # 0
print(next(gen))   # 1

for num in count_up(4):
    print(num)     # 0 1 2 3 4`}),e.jsxs(i,{type:"info",children:["Generators are ",e.jsx("strong",{children:"lazy"})," — they only compute the next value when asked. Perfect for large sequences that would be expensive to hold in memory all at once."]})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Generator Expressions"}),e.jsx(n,{lang:"py",runnable:!0,code:`# List comprehension — builds all values NOW (memory hungry)
squares_list = [x**2 for x in range(1_000_000)]

# Generator expression — lazy, memory efficient
squares_gen  = (x**2 for x in range(1_000_000))

# Both work the same way, but gen uses almost no memory
print(next(squares_gen))   # 0
print(next(squares_gen))   # 1

# Useful pattern: sum of large sequence
total = sum(x**2 for x in range(100))
print(total)`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Infinite Generators"}),e.jsx(n,{lang:"py",runnable:!0,code:`def fibonacci():
    a, b = 0, 1
    while True:       # infinite!
        yield a
        a, b = b, a + b

fib = fibonacci()

# Take only what you need
for _ in range(10):
    print(next(fib), end=" ")
print()`})]})]})}function g(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"async / await Basics"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:[e.jsx("strong",{style:{color:t.text},children:"async/await"})," lets Python do other work while waiting (e.g. for a network request or file). It's single-threaded but ",e.jsx("em",{children:"non-blocking"}),"."]}),e.jsx(n,{lang:"py",code:`import asyncio

async def fetch_data(name, delay):
    print(f"Starting {name}...")
    await asyncio.sleep(delay)   # simulates network wait
    print(f"Done {name}!")
    return f"data from {name}"

async def main():
    # Run both concurrently — total ~2s, not 3s
    results = await asyncio.gather(
        fetch_data("A", 2),
        fetch_data("B", 1),
    )
    print(results)

asyncio.run(main())`}),e.jsxs(i,{type:"warn",children:["Pyodide doesn't support ",e.jsx(o,{children:"asyncio.run()"})," in the browser. The code above shows the pattern — test it in a real Python environment."]})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"async with & async for"}),e.jsx(n,{lang:"py",code:`import asyncio

# Async context manager
async def read_file():
    async with aiofiles.open("data.txt") as f:
        content = await f.read()
    return content

# Async generator
async def fetch_pages(urls):
    for url in urls:
        await asyncio.sleep(0.1)  # simulate request
        yield f"page:{url}"

async def main():
    async for page in fetch_pages(["a", "b", "c"]):
        print(page)`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Tasks — Fire and Forget"}),e.jsx(n,{lang:"py",code:`import asyncio

async def background_job():
    await asyncio.sleep(1)
    print("Background job done!")

async def main():
    # Create a task — it starts running immediately
    task = asyncio.create_task(background_job())

    # Do other work while task runs
    print("Doing other stuff...")
    await asyncio.sleep(0.5)

    # Wait for task to finish
    await task

asyncio.run(main())`})]})]})}function x(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Basic Type Hints"}),e.jsx(n,{lang:"py",runnable:!0,code:`# Type hints are annotations — Python doesn't enforce them at runtime
# but tools like mypy and your editor use them

def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

def add(a: float, b: float) -> float:
    return a + b

# Variables
age: int = 25
scores: list = [95, 87, 91]

print(greet("Alice", 2))
print(add(1.5, 2.5))`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Collection Types"}),e.jsx(n,{lang:"py",runnable:!0,code:`from typing import List, Dict, Tuple, Optional, Union

# Python 3.9+ can use built-in types directly
def average(nums: list[float]) -> float:
    return sum(nums) / len(nums)

def get_user(id: int) -> dict[str, str]:
    return {"name": "Alice", "role": "admin"}

# Optional = value OR None
def find_user(name: str) -> Optional[str]:
    users = {"alice": "admin"}
    return users.get(name)  # returns None if not found

# Union = one of several types
def parse(val: Union[str, int]) -> str:
    return str(val)

print(average([1.0, 2.0, 3.0]))
print(find_user("alice"))
print(find_user("bob"))`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"TypedDict & dataclass"}),e.jsx(n,{lang:"py",runnable:!0,code:`from typing import TypedDict
from dataclasses import dataclass, field

# TypedDict — for dict shapes
class UserDict(TypedDict):
    name: str
    age: int
    active: bool

# dataclass — auto-generates __init__, __repr__, etc.
@dataclass
class Point:
    x: float
    y: float
    label: str = "point"
    tags: list = field(default_factory=list)

    def distance_to_origin(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

p = Point(3.0, 4.0, "A")
print(p)
print(p.distance_to_origin())`})]})]})}function _(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"The with Statement"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"Context managers handle setup and teardown automatically — even if an exception occurs. The most common use is opening files."}),e.jsx(n,{lang:"py",runnable:!0,code:`# Without context manager — easy to forget close()
f = open("data.txt", "w")
f.write("hello")
f.close()   # what if an exception happens before this?

# With context manager — always closes, even on error
with open("data.txt", "w") as f:
    f.write("hello world")
# file is automatically closed here

# Multiple context managers
with open("in.txt") as src, open("out.txt", "w") as dst:
    dst.write(src.read())

print("Done!")`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Building Your Own Context Manager"}),e.jsx(n,{lang:"py",runnable:!0,code:`class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        print("Timer started")
        return self          # bound to 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        elapsed = time.time() - self.start
        print(f"Elapsed: {elapsed:.4f}s")
        return False  # don't suppress exceptions

with Timer() as t:
    total = sum(range(1_000_000))
    print(f"Sum: {total}")`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"contextlib.contextmanager — Easier Way"}),e.jsx(n,{lang:"py",runnable:!0,code:`from contextlib import contextmanager

@contextmanager
def managed_resource(name):
    print(f"Acquiring {name}")
    try:
        yield name.upper()   # what gets bound to 'as' var
    finally:
        print(f"Releasing {name}")

with managed_resource("database") as db:
    print(f"Using: {db}")`}),e.jsxs(i,{type:"tip",children:["The ",e.jsx(o,{children:"@contextmanager"})," decorator lets you write context managers as simple generator functions — much less boilerplate than a full class."]})]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"What is a Metaclass?"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["In Python, ",e.jsx("strong",{style:{color:t.text},children:"everything is an object"})," — including classes. A metaclass is the class of a class. Just as ",e.jsx(o,{children:"int"})," creates integers, ",e.jsx(o,{children:"type"})," creates classes."]}),e.jsx(n,{lang:"py",runnable:!0,code:`# type() can create classes dynamically
Dog = type("Dog", (object,), {
    "sound": "woof",
    "speak": lambda self: print(self.sound)
})

d = Dog()
d.speak()   # woof
print(type(Dog))   # <class 'type'>
print(type(d))     # <class '__main__.Dog'>`})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Custom Metaclass"}),e.jsx(n,{lang:"py",runnable:!0,code:`class UpperAttrMeta(type):
    """Makes all non-dunder attribute names UPPERCASE."""
    def __new__(mcs, name, bases, namespace):
        upper = {}
        for key, val in namespace.items():
            if not key.startswith("__"):
                upper[key.upper()] = val
            else:
                upper[key] = val
        return super().__new__(mcs, name, bases, upper)

class MyClass(metaclass=UpperAttrMeta):
    greeting = "hello"
    count = 42

print(MyClass.GREETING)   # hello
print(MyClass.COUNT)      # 42`}),e.jsxs(i,{type:"warn",children:["Metaclasses are powerful but complex. In most cases, decorators or ",e.jsx(o,{children:"__init_subclass__"})," are a simpler solution. Use metaclasses only when truly needed."]})]}),e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Abstract Base Classes (ABC)"}),e.jsx(n,{lang:"py",runnable:!0,code:`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        ...

    @abstractmethod
    def perimeter(self) -> float:
        ...

    def describe(self):
        print(f"Area={self.area():.2f}, Perimeter={self.perimeter():.2f}")

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):      return self.w * self.h
    def perimeter(self): return 2 * (self.w + self.h)

r = Rectangle(4, 5)
r.describe()`})]})]})}function v(){const[r,l]=c.useState(()=>{try{return localStorage.getItem("cif_tab_py-adv")??"decorators"}catch{return"decorators"}});return e.jsxs("div",{style:{padding:"0 0 40px"},children:[e.jsx(d,{eyebrow:"Python • Advanced",title:"Python Advanced",sub:"Decorators, generators, async/await, type hints, context managers, and metaclasses.",color:t.accent}),e.jsxs("div",{style:{padding:"0 16px"},children:[e.jsx("p",{style:{fontSize:13,color:t.muted2,lineHeight:1.7,marginBottom:20},children:"Decorators, generators, and async/await are what separate someone who knows Python from someone who writes Python professionally. These patterns show up in every web framework, every data pipeline, and every API client. Type hints aren't optional in production code anymore — they're how teams catch bugs before they ship."}),e.jsx(p,{tabs:h,active:r,onChange:l,pageId:"py-adv"}),r==="decorators"&&e.jsx(m,{}),r==="generators"&&e.jsx(y,{}),r==="async"&&e.jsx(g,{}),r==="typehints"&&e.jsx(x,{}),r==="context"&&e.jsx(_,{}),r==="meta"&&e.jsx(w,{}),r==="quiz"&&e.jsxs(s,{children:[e.jsx(a,{color:t.accent,children:"Quiz — Python Advanced"}),e.jsx(u,{questions:f,trackId:"py-adv"})]})]})]})}export{v as default};
