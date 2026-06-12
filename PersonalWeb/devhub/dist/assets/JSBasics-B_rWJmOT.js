import{r as h,j as e,T as s}from"./index-CNTZnqQQ.js";import{P as p,T as m,a as n,b as r,Q as y,D as a,c as t,C as o,e as i,I as c}from"./shared-Cgke19x4.js";const f=[{id:"intro",label:"What is JS?"},{id:"vars",label:"Variables"},{id:"funcs",label:"Functions"},{id:"dom",label:"DOM"},{id:"events",label:"Events"},{id:"arrays",label:"Arrays"},{id:"objects",label:"Objects"},{id:"fetch",label:"fetch & API"},{id:"async",label:"Async/Await"},{id:"quiz",label:"Quiz 🎯"}],g=[{q:"What is the difference between == and === in JavaScript?",opts:["No difference","=== checks value only","=== checks value AND type","== checks type only"],ans:2,exp:"=== (strict equality) checks both value and type. Always prefer === over == to avoid unexpected type coercion."},{q:"Which keyword creates a block-scoped variable that CAN be reassigned?",opts:["var","const","let","def"],ans:2,exp:"let is block-scoped and can be reassigned. const cannot be reassigned. var is function-scoped (older)."},{q:"What does document.querySelector('#btn') return?",opts:["All elements with id btn","The first element with id btn","A new element","An array"],ans:1,exp:"querySelector returns the FIRST matching element. Use querySelectorAll to get all matches as a NodeList."},{q:"Which array method transforms every element?",opts:[".filter()",".find()",".map()",".reduce()"],ans:2,exp:".map() creates a new array by applying a function to every element. .filter() keeps only matching elements."},{q:"What does async/await do?",opts:["Makes code run faster","Handles promises with cleaner syntax","Creates parallel threads","Blocks the page"],ans:1,exp:"async/await is syntactic sugar over Promises — it lets you write asynchronous code that reads like synchronous code."},{q:"How do you add an event listener to a button?",opts:["btn.onClick = fn","btn.on('click', fn)","btn.addEventListener('click', fn)","btn.listen('click', fn)"],ans:2,exp:"addEventListener is the standard DOM method. The first arg is the event name, second is the callback function."},{q:"What does JSON.parse() do?",opts:["Converts object to string","Converts JSON string to JS object","Validates JSON","Sends JSON to server"],ans:1,exp:"JSON.parse() turns a JSON string into a JavaScript object. JSON.stringify() does the reverse."},{q:"In a template literal, how do you embed a variable?",opts:["$(variable)","{{variable}}","${variable}","<variable>"],ans:2,exp:"Template literals use backticks and ${} for expressions: `Hello ${name}` — just like Python f-strings."},{q:"What is the difference between null and undefined?",opts:["They're identical","null = intentionally empty, undefined = not yet assigned","undefined = intentionally empty, null = not yet assigned","Both mean the variable doesn't exist"],ans:1,exp:"undefined means a variable was declared but never given a value. null means the developer intentionally set it to 'no value'. They're different types: typeof null === 'object' (a famous JS bug)."},{q:"What does Array.filter() return?",opts:["The first matching element","A boolean","A new array with only the elements that pass the test","It modifies the original array"],ans:2,exp:"filter() returns a new array containing only the elements for which the callback returns true. It never modifies the original array."}];function b(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"⚡ What is JavaScript?"}),e.jsx(a,{term:"JavaScript",children:"The only language that runs directly in every browser — no installation, no compile step. It makes HTML pages interactive: responding to clicks, loading data, animating elements, and updating the page without a full reload."}),e.jsxs("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:["JavaScript is genuinely weird in ways that confuse even experienced developers. ",e.jsx(t,{children:'typeof null === "object"'}),"? That's a 25-year-old bug that can't be fixed without breaking the web. Knowing the quirks up front makes them funny instead of infuriating."]}),e.jsxs("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10},children:["While HTML structures the page and CSS styles it, JavaScript makes it ",e.jsx("strong",{style:{color:s.text},children:"interactive"})," — responding to clicks, loading data, animating elements, and updating the page without a full reload."]}),e.jsx(c,{type:"info",children:"When you build Flask apps, you use Python for the server side. JavaScript runs in the browser — on the client side. They work together."})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"How to include JavaScript"}),e.jsx(o,{lang:"html",code:`<!-- Inline — in the HTML file itself -->
<script>
  console.log("Hello from JS!");
  alert("Welcome!");
<\/script>

<!-- External file — best practice -->
<script src="script.js"><\/script>

<!-- At bottom of body (loads after HTML) -->
<body>
  <h1>My Page</h1>
  <script src="script.js"><\/script>
</body>`}),e.jsxs(c,{type:"tip",children:["Put ",e.jsx(t,{children:"<script>"})," at the bottom of ",e.jsx(t,{children:"<body>"})," so the HTML loads before your JS runs. Or use ",e.jsx(t,{children:"defer"}),": ",e.jsx(t,{children:'<script defer src="app.js">'})]})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Python vs JavaScript — Quick Compare"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,color:s.accent,fontFamily:"'Fira Code',monospace",marginBottom:6,letterSpacing:"1px"},children:"PYTHON"}),e.jsx(o,{lang:"py",code:`name = "Alice"
print(f"Hello {name}")
if age >= 18:
    print("Adult")
for i in range(5):
    print(i)`})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:10,color:s.amber,fontFamily:"'Fira Code',monospace",marginBottom:6,letterSpacing:"1px"},children:"JAVASCRIPT"}),e.jsx(o,{lang:"js",code:`const name = "Alice";
console.log(\`Hello \${name}\`);
if (age >= 18) {
  console.log("Adult");
}
for (let i = 0; i < 5; i++) {
  console.log(i);
}`})]})]}),e.jsxs(i,{children:["Open your browser's DevTools (F12 on Windows / Cmd+Option+J on Mac), go to the ",e.jsx("strong",{children:"Console"})," tab, and try typing these one at a time:",`
`,`• console.log('Hello World!')
• typeof 42
• typeof 'hello'
• document.title`,`
`,"You're running live JavaScript right in your browser!"]})]})]})}function j(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"var / let / const"}),e.jsxs(a,{term:"Variable",children:["A named container in memory that stores a value. In JavaScript: ",e.jsx(t,{children:"const"})," can't be reassigned (use by default), ",e.jsx(t,{children:"let"})," can be reassigned, ",e.jsx(t,{children:"var"})," is the old way — avoid it."]}),e.jsx(o,{lang:"js",showLines:!0,code:`// const — cannot be reassigned (use by default)
const PI    = 3.14159;
const name  = "Alice";

// let — can be reassigned (use when value changes)
let score = 0;
score = score + 10;   // OK
score += 10;          // same thing

// var — old style, avoid in modern code
var x = 5;            // function-scoped, hoisted`}),e.jsxs(c,{type:"tip",children:["Rule: always start with ",e.jsx(t,{children:"const"}),". Only switch to ",e.jsx(t,{children:"let"})," if you need to reassign. Never use ",e.jsx(t,{children:"var"}),"."]})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Data Types"}),e.jsx(o,{lang:"js",showLines:!0,code:`// Numbers (no int/float distinction)
const age    = 25;
const price  = 9.99;

// Strings
const name   = "Alice";       // double quotes
const city   = 'Nairobi';     // single quotes
const msg    = \`Hello \${name}\`;  // template literal

// Booleans
const active = true;
const done   = false;

// Null and undefined
const empty  = null;          // intentionally empty
let nothing;                  // undefined (not set yet)

// typeof — check the type
typeof 42          // "number"
typeof "hi"        // "string"
typeof true        // "boolean"
typeof undefined   // "undefined"
typeof null        // "object" ← JS quirk!`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Operators"}),e.jsx(o,{lang:"js",showLines:!0,code:`// Arithmetic
5 + 3   // 8
10 - 4  // 6
3 * 4   // 12
10 / 3  // 3.333...
10 % 3  // 1  (modulo)
2 ** 8  // 256 (power)

// Comparison — ALWAYS use === not ==
5 === 5    // true  (strict equality)
5 === "5"  // false (different types)
5 !== 3    // true
5 > 3      // true
5 >= 5     // true

// Logical
true && false  // false (AND)
true || false  // true  (OR)
!true          // false (NOT)

// Ternary
const label = age >= 18 ? "Adult" : "Minor";

// Nullish coalescing — default if null/undefined
const val = user?.name ?? "Guest";`}),e.jsxs(i,{children:["In the DevTools console:",`
`,`• const myName = 'YourName'; console.log(myName)
• let score = 0; score += 10; score += 10; score
• const fixed = 5; fixed = 10  ← see what error you get!
• 5 === "5"  vs  5 == "5"  — do they differ?`]})]})]})}function x(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Function Styles"}),e.jsxs(a,{term:"Function",children:["A reusable block of code that runs when called. Arrow functions ",e.jsx(t,{children:"(params) => expression"})," are the modern shorthand — they're concise and don't have their own ",e.jsx(t,{children:"this"}),"."]}),e.jsx(o,{lang:"js",showLines:!0,code:`// 1. Function declaration (hoisted — can call before definition)
function add(a, b) {
  return a + b;
}

// 2. Function expression
const add = function(a, b) {
  return a + b;
};

// 3. Arrow function — modern, preferred
const add = (a, b) => a + b;      // implicit return
const square = x => x * x;        // single param, no parens
const greet = () => "Hello!";     // no params

// Multi-line arrow function
const greetUser = (name, age) => {
  const msg = \`Hello \${name}, age \${age}\`;
  return msg;
};

// Default parameters
const greet = (name = "World") => \`Hello \${name}!\`;
greet();          // "Hello World!"
greet("Alice");   // "Hello Alice!"`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Scope & Closures"}),e.jsx(o,{lang:"js",showLines:!0,code:`// Block scope with let/const
if (true) {
  const x = 10;
  let y = 20;
}
// x and y not accessible here

// Functions create their own scope
function outer() {
  const secret = "hidden";

  function inner() {
    console.log(secret);   // inner can access outer's vars
  }
  inner();
}

// Callback functions — passed as arguments
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);  // [2,4,6,8,10]
const evens   = nums.filter(n => n % 2 === 0); // [2,4]`}),e.jsxs(i,{children:["Write an arrow function ",e.jsxs(t,{children:["const cToF = c =",">"," c * 9/5 + 32"]})," in the console.",`
`,"Test with: ",e.jsx(t,{children:"cToF(0)"})," → 32°F, ",e.jsx(t,{children:"cToF(100)"})," → 212°F, ",e.jsx(t,{children:"cToF(37)"})," → 98.6°F (body temp)",`
`,"Then write the reverse: ",e.jsxs(t,{children:["const fToC = f =",">"," (f - 32) * 5/9"]})]})]})]})}function v(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Selecting Elements"}),e.jsx(a,{term:"DOM (Document Object Model)",children:"The browser's live tree of your HTML. Every tag becomes a node you can select, read, and modify with JavaScript — changing text, styles, attributes, or structure without reloading the page."}),e.jsx(o,{lang:"js",showLines:!0,code:`// By ID — fastest
const el = document.getElementById("myId");

// CSS selector — most flexible
const btn    = document.querySelector("#submit");     // #id
const input  = document.querySelector(".search");    // .class
const first  = document.querySelector("p");          // first <p>
const attr   = document.querySelector("[data-id]");  // attribute

// All matching elements → NodeList
const allBtns = document.querySelectorAll("button");
const allPs   = document.querySelectorAll("p");
allBtns.forEach(btn => console.log(btn.textContent));`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Modifying Elements"}),e.jsx(o,{lang:"js",showLines:!0,code:`const el = document.querySelector("#box");

// Content
el.textContent = "Hello!";          // safe — no HTML parsing
el.innerHTML   = "<b>Bold!</b>";    // parses HTML

// Styles
el.style.color       = "red";
el.style.background  = "#111";
el.style.display     = "none";      // hide
el.style.display     = "block";     // show

// CSS classes
el.classList.add("active");         // add class
el.classList.remove("hidden");      // remove class
el.classList.toggle("open");        // toggle
el.classList.contains("active");    // true/false

// Attributes
el.setAttribute("data-id", "42");
el.getAttribute("data-id");         // "42"
el.removeAttribute("disabled");

// Creating & inserting elements
const p = document.createElement("p");
p.textContent = "New paragraph";
document.body.appendChild(p);`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Forms"}),e.jsx(o,{lang:"js",showLines:!0,code:`const form  = document.querySelector("#myForm");
const input = document.querySelector("#nameInput");

// Read input value
console.log(input.value);       // current text

// Set input value
input.value = "Alice";

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();            // stop page reload!
  const name = input.value.trim();
  if (!name) {
    alert("Name is required");
    return;
  }
  console.log("Submitted:", name);
});`}),e.jsxs(i,{children:["Open DevTools Console on ",e.jsx("strong",{children:"any webpage"}),":",`
`,`• document.querySelector('h1').textContent  ← read the heading
• document.querySelector('h1').style.color = 'hotpink'  ← change it!
• document.body.style.fontFamily = 'monospace'
• document.title = 'My Page'`,`
`,"Refresh the page to restore everything."]})]})]})}function w(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"addEventListener"}),e.jsxs(a,{term:"Event Listener",children:["Code that waits for something to happen (a click, keypress, form submit) and then runs a callback function in response. Attach them with ",e.jsx(t,{children:"element.addEventListener(eventName, callback)"}),"."]}),e.jsx(o,{lang:"js",showLines:!0,code:`const btn = document.querySelector("#myBtn");

// Basic click
btn.addEventListener("click", () => {
  console.log("Clicked!");
});

// Event object — info about the event
btn.addEventListener("click", (event) => {
  console.log(event.target);      // element that was clicked
  console.log(event.type);        // "click"
  event.preventDefault();         // stop default action
  event.stopPropagation();        // stop bubbling up
});

// Common events:
// "click"      — mouse click
// "dblclick"   — double click
// "mouseover"  — hover start
// "mouseout"   — hover end
// "keydown"    — key pressed
// "keyup"      — key released
// "input"      — input value changes
// "change"     — select/checkbox changed
// "submit"     — form submitted
// "load"       — page/image loaded
// "resize"     — window resized
// "scroll"     — page scrolled`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Keyboard Events"}),e.jsx(o,{lang:"js",showLines:!0,code:`const input = document.querySelector("#search");

// Detect what key was pressed
input.addEventListener("keydown", (e) => {
  console.log(e.key);          // "Enter", "a", "Backspace"…
  console.log(e.code);         // "KeyA", "Enter", "Space"
  console.log(e.ctrlKey);      // true if Ctrl held
  console.log(e.shiftKey);     // true if Shift held

  if (e.key === "Enter") {
    doSearch(input.value);
  }
  if (e.key === "Escape") {
    input.value = "";          // clear on Escape
  }
});

// Live search as user types
input.addEventListener("input", (e) => {
  const query = e.target.value;
  filterResults(query);        // update UI
});`}),e.jsxs(i,{children:["Create an HTML file with this:",`
`,`<button id="btn">Click me</button>
<p id="count">Clicks: 0</p>
<script>
  let clicks = 0;
  document.getElementById('btn').addEventListener('click', () => {
    clicks++;
    document.getElementById('count').textContent = 'Clicks: ' + clicks;
  });
<\/script>`,`
`,"Open it in your browser and click the button!"]})]})]})}function k(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Array Methods"}),e.jsxs(a,{term:"Array",children:["An ordered list of values — like a Python list. JavaScript arrays have powerful built-in methods: ",e.jsx(t,{children:".map()"})," transforms every item, ",e.jsx(t,{children:".filter()"})," keeps matching items, ",e.jsx(t,{children:".reduce()"})," collapses to a single value. All three return new arrays without modifying the original."]}),e.jsx(o,{lang:"js",showLines:!0,code:`const fruits = ["apple", "banana", "mango", "grape"];

// Add / Remove
fruits.push("kiwi");         // add to end
fruits.pop();                // remove from end
fruits.unshift("berry");     // add to start
fruits.shift();              // remove from start
fruits.splice(1, 1);         // remove 1 item at index 1

// Search
fruits.indexOf("mango");     // 2 (position)
fruits.includes("apple");    // true
fruits.find(f => f.startsWith("m")); // "mango"
fruits.findIndex(f => f === "banana"); // 1

// Transform (return NEW array)
const upper = fruits.map(f => f.toUpperCase());
const m     = fruits.filter(f => f.includes("a"));
const total = [1,2,3,4].reduce((sum, n) => sum + n, 0); // 10

// Sort
["b","a","c"].sort();              // ["a","b","c"]
[3,1,2].sort((a,b) => a - b);     // [1,2,3] numerically

// Flatten
const nested = [[1,2],[3,4]];
nested.flat();                     // [1,2,3,4]

// Spread
const all = [...fruits, "coconut"];`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"map / filter / reduce"}),e.jsx(o,{lang:"js",showLines:!0,code:`const products = [
  { name: "Pen",   price: 2,  inStock: true  },
  { name: "Book",  price: 15, inStock: false },
  { name: "Ruler", price: 5,  inStock: true  },
];

// map — get just the names
const names = products.map(p => p.name);
// ["Pen", "Book", "Ruler"]

// filter — only in-stock items
const available = products.filter(p => p.inStock);
// [{name:"Pen",...}, {name:"Ruler",...}]

// reduce — total price
const total = products.reduce((sum, p) => sum + p.price, 0);
// 22

// Chaining
const availableTotal = products
  .filter(p => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
// 7 (Pen + Ruler)`}),e.jsxs(i,{children:["Start with: ",e.jsx(t,{children:"const scores = [88, 72, 95, 60, 81, 77]"}),`
`,`1. Filter to keep only scores above 75
2. Map to add 5 bonus points to each
3. Reduce to get the total`,`
`,"Chain all three in a single expression. What's the final total?"]})]})]})}function S(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Objects"}),e.jsxs(a,{term:"Object",children:["A collection of key-value pairs — like a Python dictionary, but objects can also have methods (functions as values). Access properties with dot notation ",e.jsx(t,{children:"obj.key"})," or bracket notation ",e.jsx(t,{children:'obj["key"]'}),"."]}),e.jsx(o,{lang:"js",showLines:!0,code:`const user = {
  name:    "Alice",
  age:     25,
  active:  true,
  address: { city: "Nairobi", country: "Kenya" },
  greet() {
    return \`Hi, I'm \${this.name}\`;
  }
};

// Access
user.name           // "Alice"
user["age"]         // 25 (bracket notation)
user.address.city   // "Nairobi"
user.greet()        // "Hi, I'm Alice"

// Add / update / delete
user.email = "a@b.com";    // add
user.age   = 26;           // update
delete user.active;        // delete

// Check if key exists
"name" in user             // true
user.hasOwnProperty("name") // true`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Destructuring & Spread"}),e.jsx(o,{lang:"js",showLines:!0,code:`const user = { name: "Alice", age: 25, city: "NYC" };

// Destructuring — extract into variables
const { name, age } = user;
console.log(name);   // "Alice"

// Rename during destructuring
const { name: userName, age: userAge } = user;

// Default values
const { name, email = "none" } = user; // email = "none"

// Spread — copy / merge objects
const updated = { ...user, age: 26 };  // clone + update
const merged  = { ...user, role: "admin" };

// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]`}),e.jsxs(i,{children:["Create a ",e.jsx(t,{children:"movie"})," object with keys: ",e.jsx(t,{children:"title"}),", ",e.jsx(t,{children:"director"}),", ",e.jsx(t,{children:"year"}),", ",e.jsx(t,{children:"rating"}),".",`
`,"Then: destructure it into separate variables, spread-copy it adding a ",e.jsx(t,{children:"genre"})," key, and log both. Did the original object change?"]})]})]})}function T(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"fetch API — Load Data"}),e.jsxs(a,{term:"fetch()",children:["The browser's built-in function for making HTTP requests — like calling your Flask API or any public API. It returns a Promise that resolves with the response. Call ",e.jsx(t,{children:".json()"})," on the response to parse the body."]}),e.jsxs("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:[e.jsx(t,{children:"fetch()"})," lets your JavaScript load data from a server (like your Flask API) without reloading the page."]}),e.jsx(o,{lang:"js",showLines:!0,code:`// Basic GET request
fetch("/api/user")
  .then(res  => res.json())      // parse JSON
  .then(data => {
    console.log(data.name);      // use the data
  })
  .catch(err => console.error("Error:", err));

// POST request — send data to Flask
fetch("/api/login", {
  method:  "POST",
  headers: { "Content-Type": "application/json" },
  body:    JSON.stringify({ username: "Alice", password: "123" }),
})
  .then(res  => res.json())
  .then(data => console.log(data));`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Updating the Page with Data"}),e.jsx(o,{lang:"js",showLines:!0,code:`// Load users from Flask API and display in the DOM
async function loadUsers() {
  const res   = await fetch("/api/users");
  const users = await res.json();

  const list = document.querySelector("#userList");
  list.innerHTML = "";             // clear existing

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = \`\${user.name} — \${user.email}\`;
    list.appendChild(li);
  });
}

// Call on page load
loadUsers();

// HTML:
// <ul id="userList"></ul>`}),e.jsx(c,{type:"tip",children:"This is how modern web apps work — Flask serves the API, JavaScript fetches and displays it. No page reload needed."}),e.jsxs(i,{children:["In your browser DevTools console, call a real public API:",`
`,e.jsx(t,{children:"fetch('https://api.github.com/users/octocat').then(r => r.json()).then(d => console.log(d.name, d.public_repos))"}),`
`,"You should see the GitHub username and number of public repos!"]})]})]})}function A(){return e.jsxs(e.Fragment,{children:[e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"async / await"}),e.jsxs(a,{term:"async/await",children:["JavaScript's syntax for writing asynchronous code that reads like synchronous code. An ",e.jsx(t,{children:"async"})," function always returns a Promise. ",e.jsx(t,{children:"await"})," pauses execution inside the async function until the Promise resolves — without blocking the browser."]}),e.jsxs("p",{style:{fontSize:12.5,color:s.muted2,lineHeight:1.65,marginBottom:10,marginTop:10},children:[e.jsx(t,{children:"async/await"})," is the modern way to handle asynchronous operations. It's built on Promises but reads like normal synchronous code."]}),e.jsx(o,{lang:"js",showLines:!0,code:`// async function — always returns a Promise
async function getUser(id) {
  try {
    const res  = await fetch(\`/api/users/\${id}\`);

    if (!res.ok) {                       // check HTTP status
      throw new Error(\`HTTP \${res.status}\`);
    }

    const user = await res.json();       // parse JSON
    return user;

  } catch (error) {
    console.error("Failed to load user:", error.message);
    return null;
  }
}

// Use it
async function showUser() {
  const user = await getUser(1);
  if (user) {
    document.querySelector("#name").textContent = user.name;
  }
}

showUser();`})]}),e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"Multiple async calls"}),e.jsx(o,{lang:"js",showLines:!0,code:`// Sequential — one after another
async function sequential() {
  const user  = await fetch("/api/user").then(r => r.json());
  const posts = await fetch("/api/posts").then(r => r.json());
  // posts loads AFTER user
}

// Parallel — both at the same time (faster!)
async function parallel() {
  const [user, posts] = await Promise.all([
    fetch("/api/user").then(r  => r.json()),
    fetch("/api/posts").then(r => r.json()),
  ]);
  // both load simultaneously
  console.log(user, posts);
}

// Loading state pattern
async function loadData() {
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "block";

  const data = await fetchSomething();
  renderData(data);

  spinner.style.display = "none";
}`}),e.jsxs(i,{children:["Rewrite the fetch TryIt from the previous tab using async/await instead of ",e.jsx(t,{children:".then()"})," chains:",`
`,`async function getOctocat() {
  try {
    const res = await fetch('https://api.github.com/users/octocat');
    const data = await res.json();
    console.log(data.name, data.public_repos);
  } catch (err) {
    console.error('Error:', err);
  }
}
getOctocat();`,`
`,"Notice how much cleaner this reads compared to .then() chains!"]})]})]})}function q(){const[l,d]=h.useState(()=>{try{return localStorage.getItem("cif_tab_js-basics")??"intro"}catch{return"intro"}}),u={intro:e.jsx(b,{}),vars:e.jsx(j,{}),funcs:e.jsx(x,{}),dom:e.jsx(v,{}),events:e.jsx(w,{}),arrays:e.jsx(k,{}),objects:e.jsx(S,{}),fetch:e.jsx(T,{}),async:e.jsx(A,{})};return e.jsxs("div",{children:[e.jsx(p,{eyebrow:"JavaScript · Beginner",title:"JavaScript Basics",sub:"Make your web pages interactive — DOM, events, fetch API, ES6+",color:s.amber}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:s.muted2,lineHeight:1.7,marginBottom:20},children:"JavaScript is the only language that runs natively in every browser on the planet. If you want anything on a webpage to move, respond to clicks, load data, or update without reloading — that's JavaScript. Every frontend framework (React, Vue, Angular) is JavaScript under the hood."}),e.jsx(m,{tabs:f,active:l,onChange:d,pageId:"js-basics"}),l==="quiz"?e.jsxs(n,{children:[e.jsx(r,{color:s.amber,children:"🎯 JavaScript Basics Quiz"}),e.jsx(y,{questions:g,trackId:"js-basics"})]}):u[l]]})]})}export{q as default};
