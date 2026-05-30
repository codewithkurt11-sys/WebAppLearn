import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question, Def, TryIt } from "../../shared";

const TABS: Tab[] = [
  { id:"intro",    label:"What is JS?" },
  { id:"vars",     label:"Variables"   },
  { id:"funcs",    label:"Functions"   },
  { id:"dom",      label:"DOM"         },
  { id:"events",   label:"Events"      },
  { id:"arrays",   label:"Arrays"      },
  { id:"objects",  label:"Objects"     },
  { id:"fetch",    label:"fetch & API" },
  { id:"async",    label:"Async/Await" },
  { id:"quiz",     label:"Quiz 🎯"     },
];

const QUIZ: Question[] = [
  { q:"What is the difference between == and === in JavaScript?", opts:["No difference","=== checks value only","=== checks value AND type","== checks type only"], ans:2, exp:"=== (strict equality) checks both value and type. Always prefer === over == to avoid unexpected type coercion." },
  { q:"Which keyword creates a block-scoped variable that CAN be reassigned?", opts:["var","const","let","def"], ans:2, exp:"let is block-scoped and can be reassigned. const cannot be reassigned. var is function-scoped (older)." },
  { q:"What does document.querySelector('#btn') return?", opts:["All elements with id btn","The first element with id btn","A new element","An array"], ans:1, exp:"querySelector returns the FIRST matching element. Use querySelectorAll to get all matches as a NodeList." },
  { q:"Which array method transforms every element?", opts:[".filter()",".find()",".map()",".reduce()"], ans:2, exp:".map() creates a new array by applying a function to every element. .filter() keeps only matching elements." },
  { q:"What does async/await do?", opts:["Makes code run faster","Handles promises with cleaner syntax","Creates parallel threads","Blocks the page"], ans:1, exp:"async/await is syntactic sugar over Promises — it lets you write asynchronous code that reads like synchronous code." },
  { q:"How do you add an event listener to a button?", opts:["btn.onClick = fn","btn.on('click', fn)","btn.addEventListener('click', fn)","btn.listen('click', fn)"], ans:2, exp:"addEventListener is the standard DOM method. The first arg is the event name, second is the callback function." },
  { q:"What does JSON.parse() do?", opts:["Converts object to string","Converts JSON string to JS object","Validates JSON","Sends JSON to server"], ans:1, exp:"JSON.parse() turns a JSON string into a JavaScript object. JSON.stringify() does the reverse." },
  { q:"In a template literal, how do you embed a variable?", opts:["$(variable)","{{variable}}","${variable}","<variable>"], ans:2, exp:"Template literals use backticks and ${} for expressions: `Hello ${name}` — just like Python f-strings." },
  { q:"What is the difference between null and undefined?", opts:["They're identical","null = intentionally empty, undefined = not yet assigned","undefined = intentionally empty, null = not yet assigned","Both mean the variable doesn't exist"], ans:1, exp:"undefined means a variable was declared but never given a value. null means the developer intentionally set it to 'no value'. They're different types: typeof null === 'object' (a famous JS bug)." },
  { q:"What does Array.filter() return?", opts:["The first matching element","A boolean","A new array with only the elements that pass the test","It modifies the original array"], ans:2, exp:"filter() returns a new array containing only the elements for which the callback returns true. It never modifies the original array." },
];

function TabIntro() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>⚡ What is JavaScript?</CardTitle>
      <Def term="JavaScript">The only language that runs directly in every browser — no installation, no compile step. It makes HTML pages interactive: responding to clicks, loading data, animating elements, and updating the page without a full reload.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10, marginTop:10 }}>
        JavaScript is genuinely weird in ways that confuse even experienced developers. <IC>typeof null === "object"</IC>? That's a 25-year-old bug that can't be fixed without breaking the web. Knowing the quirks up front makes them funny instead of infuriating.
      </p>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        While HTML structures the page and CSS styles it, JavaScript makes it <strong style={{ color:T.text }}>interactive</strong> — responding to clicks, loading data, animating elements, and updating the page without a full reload.
      </p>
      <InfoBox type="info">When you build Flask apps, you use Python for the server side. JavaScript runs in the browser — on the client side. They work together.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>How to include JavaScript</CardTitle>
      <CodeBlock lang="html" code={`<!-- Inline — in the HTML file itself -->\n<script>\n  console.log("Hello from JS!");\n  alert("Welcome!");\n</script>\n\n<!-- External file — best practice -->\n<script src="script.js"></script>\n\n<!-- At bottom of body (loads after HTML) -->\n<body>\n  <h1>My Page</h1>\n  <script src="script.js"></script>\n</body>`}/>
      <InfoBox type="tip">Put <IC>{'<script>'}</IC> at the bottom of <IC>{'<body>'}</IC> so the HTML loads before your JS runs. Or use <IC>defer</IC>: <IC>{'<script defer src="app.js">'}</IC></InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Python vs JavaScript — Quick Compare</CardTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div>
          <div style={{ fontSize:10, color:T.accent, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>PYTHON</div>
          <CodeBlock lang="py" code={`name = "Alice"\nprint(f"Hello {name}")\nif age >= 18:\n    print("Adult")\nfor i in range(5):\n    print(i)`}/>
        </div>
        <div>
          <div style={{ fontSize:10, color:T.amber, fontFamily:"'Fira Code',monospace", marginBottom:6, letterSpacing:"1px" }}>JAVASCRIPT</div>
          <CodeBlock lang="js" code={`const name = "Alice";\nconsole.log(\`Hello \${name}\`);\nif (age >= 18) {\n  console.log("Adult");\n}\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}`}/>
        </div>
      </div>
      <TryIt>Open your browser's DevTools (F12 on Windows / Cmd+Option+J on Mac), go to the <strong>Console</strong> tab, and try typing these one at a time:{"\n"}
        {`• console.log('Hello World!')\n• typeof 42\n• typeof 'hello'\n• document.title`}{"\n"}
        You're running live JavaScript right in your browser!
      </TryIt>
    </Card>
  </>);
}

function TabVars() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>var / let / const</CardTitle>
      <Def term="Variable">A named container in memory that stores a value. In JavaScript: <IC>const</IC> can't be reassigned (use by default), <IC>let</IC> can be reassigned, <IC>var</IC> is the old way — avoid it.</Def>
      <CodeBlock lang="js" showLines code={`// const — cannot be reassigned (use by default)\nconst PI    = 3.14159;\nconst name  = "Alice";\n\n// let — can be reassigned (use when value changes)\nlet score = 0;\nscore = score + 10;   // OK\nscore += 10;          // same thing\n\n// var — old style, avoid in modern code\nvar x = 5;            // function-scoped, hoisted`}/>
      <InfoBox type="tip">Rule: always start with <IC>const</IC>. Only switch to <IC>let</IC> if you need to reassign. Never use <IC>var</IC>.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Data Types</CardTitle>
      <CodeBlock lang="js" showLines code={`// Numbers (no int/float distinction)\nconst age    = 25;\nconst price  = 9.99;\n\n// Strings\nconst name   = "Alice";       // double quotes\nconst city   = 'Nairobi';     // single quotes\nconst msg    = \`Hello \${name}\`;  // template literal\n\n// Booleans\nconst active = true;\nconst done   = false;\n\n// Null and undefined\nconst empty  = null;          // intentionally empty\nlet nothing;                  // undefined (not set yet)\n\n// typeof — check the type\ntypeof 42          // "number"\ntypeof "hi"        // "string"\ntypeof true        // "boolean"\ntypeof undefined   // "undefined"\ntypeof null        // "object" ← JS quirk!`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Operators</CardTitle>
      <CodeBlock lang="js" showLines code={`// Arithmetic\n5 + 3   // 8\n10 - 4  // 6\n3 * 4   // 12\n10 / 3  // 3.333...\n10 % 3  // 1  (modulo)\n2 ** 8  // 256 (power)\n\n// Comparison — ALWAYS use === not ==\n5 === 5    // true  (strict equality)\n5 === "5"  // false (different types)\n5 !== 3    // true\n5 > 3      // true\n5 >= 5     // true\n\n// Logical\ntrue && false  // false (AND)\ntrue || false  // true  (OR)\n!true          // false (NOT)\n\n// Ternary\nconst label = age >= 18 ? "Adult" : "Minor";\n\n// Nullish coalescing — default if null/undefined\nconst val = user?.name ?? "Guest";`}/>
      <TryIt>In the DevTools console:{"\n"}
        {`• const myName = 'YourName'; console.log(myName)\n• let score = 0; score += 10; score += 10; score\n• const fixed = 5; fixed = 10  ← see what error you get!\n• 5 === "5"  vs  5 == "5"  — do they differ?`}
      </TryIt>
    </Card>
  </>);
}

function TabFuncs() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Function Styles</CardTitle>
      <Def term="Function">A reusable block of code that runs when called. Arrow functions <IC>{`(params) => expression`}</IC> are the modern shorthand — they're concise and don't have their own <IC>this</IC>.</Def>
      <CodeBlock lang="js" showLines code={`// 1. Function declaration (hoisted — can call before definition)\nfunction add(a, b) {\n  return a + b;\n}\n\n// 2. Function expression\nconst add = function(a, b) {\n  return a + b;\n};\n\n// 3. Arrow function — modern, preferred\nconst add = (a, b) => a + b;      // implicit return\nconst square = x => x * x;        // single param, no parens\nconst greet = () => "Hello!";     // no params\n\n// Multi-line arrow function\nconst greetUser = (name, age) => {\n  const msg = \`Hello \${name}, age \${age}\`;\n  return msg;\n};\n\n// Default parameters\nconst greet = (name = "World") => \`Hello \${name}!\`;\ngreet();          // "Hello World!"\ngreet("Alice");   // "Hello Alice!"`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Scope & Closures</CardTitle>
      <CodeBlock lang="js" showLines code={`// Block scope with let/const\nif (true) {\n  const x = 10;\n  let y = 20;\n}\n// x and y not accessible here\n\n// Functions create their own scope\nfunction outer() {\n  const secret = "hidden";\n\n  function inner() {\n    console.log(secret);   // inner can access outer's vars\n  }\n  inner();\n}\n\n// Callback functions — passed as arguments\nconst nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);  // [2,4,6,8,10]\nconst evens   = nums.filter(n => n % 2 === 0); // [2,4]`}/>
      <TryIt>Write an arrow function <IC>const cToF = c ={">"} c * 9/5 + 32</IC> in the console.{"\n"}
        Test with: <IC>cToF(0)</IC> → 32°F, <IC>cToF(100)</IC> → 212°F, <IC>cToF(37)</IC> → 98.6°F (body temp){"\n"}
        Then write the reverse: <IC>const fToC = f ={">"} (f - 32) * 5/9</IC>
      </TryIt>
    </Card>
  </>);
}

function TabDOM() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Selecting Elements</CardTitle>
      <Def term="DOM (Document Object Model)">The browser's live tree of your HTML. Every tag becomes a node you can select, read, and modify with JavaScript — changing text, styles, attributes, or structure without reloading the page.</Def>
      <CodeBlock lang="js" showLines code={`// By ID — fastest\nconst el = document.getElementById("myId");\n\n// CSS selector — most flexible\nconst btn    = document.querySelector("#submit");     // #id\nconst input  = document.querySelector(".search");    // .class\nconst first  = document.querySelector("p");          // first <p>\nconst attr   = document.querySelector("[data-id]");  // attribute\n\n// All matching elements → NodeList\nconst allBtns = document.querySelectorAll("button");\nconst allPs   = document.querySelectorAll("p");\nallBtns.forEach(btn => console.log(btn.textContent));`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Modifying Elements</CardTitle>
      <CodeBlock lang="js" showLines code={`const el = document.querySelector("#box");\n\n// Content\nel.textContent = "Hello!";          // safe — no HTML parsing\nel.innerHTML   = "<b>Bold!</b>";    // parses HTML\n\n// Styles\nel.style.color       = "red";\nel.style.background  = "#111";\nel.style.display     = "none";      // hide\nel.style.display     = "block";     // show\n\n// CSS classes\nel.classList.add("active");         // add class\nel.classList.remove("hidden");      // remove class\nel.classList.toggle("open");        // toggle\nel.classList.contains("active");    // true/false\n\n// Attributes\nel.setAttribute("data-id", "42");\nel.getAttribute("data-id");         // "42"\nel.removeAttribute("disabled");\n\n// Creating & inserting elements\nconst p = document.createElement("p");\np.textContent = "New paragraph";\ndocument.body.appendChild(p);`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Forms</CardTitle>
      <CodeBlock lang="js" showLines code={`const form  = document.querySelector("#myForm");\nconst input = document.querySelector("#nameInput");\n\n// Read input value\nconsole.log(input.value);       // current text\n\n// Set input value\ninput.value = "Alice";\n\n// Handle form submission\nform.addEventListener("submit", (e) => {\n  e.preventDefault();            // stop page reload!\n  const name = input.value.trim();\n  if (!name) {\n    alert("Name is required");\n    return;\n  }\n  console.log("Submitted:", name);\n});`}/>
      <TryIt>Open DevTools Console on <strong>any webpage</strong>:{"\n"}
        {`• document.querySelector('h1').textContent  ← read the heading\n• document.querySelector('h1').style.color = 'hotpink'  ← change it!\n• document.body.style.fontFamily = 'monospace'\n• document.title = 'My Page'`}{"\n"}
        Refresh the page to restore everything.
      </TryIt>
    </Card>
  </>);
}

function TabEvents() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>addEventListener</CardTitle>
      <Def term="Event Listener">Code that waits for something to happen (a click, keypress, form submit) and then runs a callback function in response. Attach them with <IC>element.addEventListener(eventName, callback)</IC>.</Def>
      <CodeBlock lang="js" showLines code={`const btn = document.querySelector("#myBtn");\n\n// Basic click\nbtn.addEventListener("click", () => {\n  console.log("Clicked!");\n});\n\n// Event object — info about the event\nbtn.addEventListener("click", (event) => {\n  console.log(event.target);      // element that was clicked\n  console.log(event.type);        // "click"\n  event.preventDefault();         // stop default action\n  event.stopPropagation();        // stop bubbling up\n});\n\n// Common events:\n// "click"      — mouse click\n// "dblclick"   — double click\n// "mouseover"  — hover start\n// "mouseout"   — hover end\n// "keydown"    — key pressed\n// "keyup"      — key released\n// "input"      — input value changes\n// "change"     — select/checkbox changed\n// "submit"     — form submitted\n// "load"       — page/image loaded\n// "resize"     — window resized\n// "scroll"     — page scrolled`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Keyboard Events</CardTitle>
      <CodeBlock lang="js" showLines code={`const input = document.querySelector("#search");\n\n// Detect what key was pressed\ninput.addEventListener("keydown", (e) => {\n  console.log(e.key);          // "Enter", "a", "Backspace"…\n  console.log(e.code);         // "KeyA", "Enter", "Space"\n  console.log(e.ctrlKey);      // true if Ctrl held\n  console.log(e.shiftKey);     // true if Shift held\n\n  if (e.key === "Enter") {\n    doSearch(input.value);\n  }\n  if (e.key === "Escape") {\n    input.value = "";          // clear on Escape\n  }\n});\n\n// Live search as user types\ninput.addEventListener("input", (e) => {\n  const query = e.target.value;\n  filterResults(query);        // update UI\n});`}/>
      <TryIt>Create an HTML file with this:{"\n"}
        {`<button id="btn">Click me</button>\n<p id="count">Clicks: 0</p>\n<script>\n  let clicks = 0;\n  document.getElementById('btn').addEventListener('click', () => {\n    clicks++;\n    document.getElementById('count').textContent = 'Clicks: ' + clicks;\n  });\n</script>`}{"\n"}
        Open it in your browser and click the button!
      </TryIt>
    </Card>
  </>);
}

function TabArrays() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Array Methods</CardTitle>
      <Def term="Array">An ordered list of values — like a Python list. JavaScript arrays have powerful built-in methods: <IC>.map()</IC> transforms every item, <IC>.filter()</IC> keeps matching items, <IC>.reduce()</IC> collapses to a single value. All three return new arrays without modifying the original.</Def>
      <CodeBlock lang="js" showLines code={`const fruits = ["apple", "banana", "mango", "grape"];\n\n// Add / Remove\nfruits.push("kiwi");         // add to end\nfruits.pop();                // remove from end\nfruits.unshift("berry");     // add to start\nfruits.shift();              // remove from start\nfruits.splice(1, 1);         // remove 1 item at index 1\n\n// Search\nfruits.indexOf("mango");     // 2 (position)\nfruits.includes("apple");    // true\nfruits.find(f => f.startsWith("m")); // "mango"\nfruits.findIndex(f => f === "banana"); // 1\n\n// Transform (return NEW array)\nconst upper = fruits.map(f => f.toUpperCase());\nconst m     = fruits.filter(f => f.includes("a"));\nconst total = [1,2,3,4].reduce((sum, n) => sum + n, 0); // 10\n\n// Sort\n["b","a","c"].sort();              // ["a","b","c"]\n[3,1,2].sort((a,b) => a - b);     // [1,2,3] numerically\n\n// Flatten\nconst nested = [[1,2],[3,4]];\nnested.flat();                     // [1,2,3,4]\n\n// Spread\nconst all = [...fruits, "coconut"];`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>map / filter / reduce</CardTitle>
      <CodeBlock lang="js" showLines code={`const products = [\n  { name: "Pen",   price: 2,  inStock: true  },\n  { name: "Book",  price: 15, inStock: false },\n  { name: "Ruler", price: 5,  inStock: true  },\n];\n\n// map — get just the names\nconst names = products.map(p => p.name);\n// ["Pen", "Book", "Ruler"]\n\n// filter — only in-stock items\nconst available = products.filter(p => p.inStock);\n// [{name:"Pen",...}, {name:"Ruler",...}]\n\n// reduce — total price\nconst total = products.reduce((sum, p) => sum + p.price, 0);\n// 22\n\n// Chaining\nconst availableTotal = products\n  .filter(p => p.inStock)\n  .reduce((sum, p) => sum + p.price, 0);\n// 7 (Pen + Ruler)`}/>
      <TryIt>Start with: <IC>{`const scores = [88, 72, 95, 60, 81, 77]`}</IC>{"\n"}
        {`1. Filter to keep only scores above 75\n2. Map to add 5 bonus points to each\n3. Reduce to get the total`}{"\n"}
        Chain all three in a single expression. What's the final total?
      </TryIt>
    </Card>
  </>);
}

function TabObjects() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Objects</CardTitle>
      <Def term="Object">A collection of key-value pairs — like a Python dictionary, but objects can also have methods (functions as values). Access properties with dot notation <IC>obj.key</IC> or bracket notation <IC>obj["key"]</IC>.</Def>
      <CodeBlock lang="js" showLines code={`const user = {\n  name:    "Alice",\n  age:     25,\n  active:  true,\n  address: { city: "Nairobi", country: "Kenya" },\n  greet() {\n    return \`Hi, I'm \${this.name}\`;\n  }\n};\n\n// Access\nuser.name           // "Alice"\nuser["age"]         // 25 (bracket notation)\nuser.address.city   // "Nairobi"\nuser.greet()        // "Hi, I'm Alice"\n\n// Add / update / delete\nuser.email = "a@b.com";    // add\nuser.age   = 26;           // update\ndelete user.active;        // delete\n\n// Check if key exists\n"name" in user             // true\nuser.hasOwnProperty("name") // true`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Destructuring & Spread</CardTitle>
      <CodeBlock lang="js" showLines code={`const user = { name: "Alice", age: 25, city: "NYC" };\n\n// Destructuring — extract into variables\nconst { name, age } = user;\nconsole.log(name);   // "Alice"\n\n// Rename during destructuring\nconst { name: userName, age: userAge } = user;\n\n// Default values\nconst { name, email = "none" } = user; // email = "none"\n\n// Spread — copy / merge objects\nconst updated = { ...user, age: 26 };  // clone + update\nconst merged  = { ...user, role: "admin" };\n\n// Array destructuring\nconst [first, second, ...rest] = [1, 2, 3, 4, 5];\n// first=1, second=2, rest=[3,4,5]`}/>
      <TryIt>Create a <IC>movie</IC> object with keys: <IC>title</IC>, <IC>director</IC>, <IC>year</IC>, <IC>rating</IC>.{"\n"}
        Then: destructure it into separate variables, spread-copy it adding a <IC>genre</IC> key, and log both. Did the original object change?
      </TryIt>
    </Card>
  </>);
}

function TabFetch() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>fetch API — Load Data</CardTitle>
      <Def term="fetch()">The browser's built-in function for making HTTP requests — like calling your Flask API or any public API. It returns a Promise that resolves with the response. Call <IC>.json()</IC> on the response to parse the body.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10, marginTop:10 }}>
        <IC>fetch()</IC> lets your JavaScript load data from a server (like your Flask API) without reloading the page.
      </p>
      <CodeBlock lang="js" showLines code={`// Basic GET request\nfetch("/api/user")\n  .then(res  => res.json())      // parse JSON\n  .then(data => {\n    console.log(data.name);      // use the data\n  })\n  .catch(err => console.error("Error:", err));\n\n// POST request — send data to Flask\nfetch("/api/login", {\n  method:  "POST",\n  headers: { "Content-Type": "application/json" },\n  body:    JSON.stringify({ username: "Alice", password: "123" }),\n})\n  .then(res  => res.json())\n  .then(data => console.log(data));`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Updating the Page with Data</CardTitle>
      <CodeBlock lang="js" showLines code={`// Load users from Flask API and display in the DOM\nasync function loadUsers() {\n  const res   = await fetch("/api/users");\n  const users = await res.json();\n\n  const list = document.querySelector("#userList");\n  list.innerHTML = "";             // clear existing\n\n  users.forEach(user => {\n    const li = document.createElement("li");\n    li.textContent = \`\${user.name} — \${user.email}\`;\n    list.appendChild(li);\n  });\n}\n\n// Call on page load\nloadUsers();\n\n// HTML:\n// <ul id="userList"></ul>`}/>
      <InfoBox type="tip">This is how modern web apps work — Flask serves the API, JavaScript fetches and displays it. No page reload needed.</InfoBox>
      <TryIt>In your browser DevTools console, call a real public API:{"\n"}
        <IC>{`fetch('https://api.github.com/users/octocat').then(r => r.json()).then(d => console.log(d.name, d.public_repos))`}</IC>{"\n"}
        You should see the GitHub username and number of public repos!
      </TryIt>
    </Card>
  </>);
}

function TabAsync() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>async / await</CardTitle>
      <Def term="async/await">JavaScript's syntax for writing asynchronous code that reads like synchronous code. An <IC>async</IC> function always returns a Promise. <IC>await</IC> pauses execution inside the async function until the Promise resolves — without blocking the browser.</Def>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10, marginTop:10 }}>
        <IC>async/await</IC> is the modern way to handle asynchronous operations. It's built on Promises but reads like normal synchronous code.
      </p>
      <CodeBlock lang="js" showLines code={`// async function — always returns a Promise\nasync function getUser(id) {\n  try {\n    const res  = await fetch(\`/api/users/\${id}\`);\n\n    if (!res.ok) {                       // check HTTP status\n      throw new Error(\`HTTP \${res.status}\`);\n    }\n\n    const user = await res.json();       // parse JSON\n    return user;\n\n  } catch (error) {\n    console.error("Failed to load user:", error.message);\n    return null;\n  }\n}\n\n// Use it\nasync function showUser() {\n  const user = await getUser(1);\n  if (user) {\n    document.querySelector("#name").textContent = user.name;\n  }\n}\n\nshowUser();`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Multiple async calls</CardTitle>
      <CodeBlock lang="js" showLines code={`// Sequential — one after another\nasync function sequential() {\n  const user  = await fetch("/api/user").then(r => r.json());\n  const posts = await fetch("/api/posts").then(r => r.json());\n  // posts loads AFTER user\n}\n\n// Parallel — both at the same time (faster!)\nasync function parallel() {\n  const [user, posts] = await Promise.all([\n    fetch("/api/user").then(r  => r.json()),\n    fetch("/api/posts").then(r => r.json()),\n  ]);\n  // both load simultaneously\n  console.log(user, posts);\n}\n\n// Loading state pattern\nasync function loadData() {\n  const spinner = document.querySelector("#spinner");\n  spinner.style.display = "block";\n\n  const data = await fetchSomething();\n  renderData(data);\n\n  spinner.style.display = "none";\n}`}/>
      <TryIt>Rewrite the fetch TryIt from the previous tab using async/await instead of <IC>.then()</IC> chains:{"\n"}
        {`async function getOctocat() {\n  try {\n    const res = await fetch('https://api.github.com/users/octocat');\n    const data = await res.json();\n    console.log(data.name, data.public_repos);\n  } catch (err) {\n    console.error('Error:', err);\n  }\n}\ngetOctocat();`}{"\n"}
        Notice how much cleaner this reads compared to .then() chains!
      </TryIt>
    </Card>
  </>);
}

export default function JSBasics() {
  const [tab, setTab] = useState("intro");
  const content: Record<string, React.ReactNode> = {
    intro:<TabIntro/>, vars:<TabVars/>, funcs:<TabFuncs/>,
    dom:<TabDOM/>, events:<TabEvents/>, arrays:<TabArrays/>,
    objects:<TabObjects/>, fetch:<TabFetch/>, async:<TabAsync/>,
  };
  return (
    <div>
      <PageHeader eyebrow="JavaScript · Beginner" title="JavaScript Basics" sub="Make your web pages interactive — DOM, events, fetch API, ES6+" color={T.amber}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          JavaScript is the only language that runs natively in every browser on the planet. If you want anything on a webpage to move, respond to clicks, load data, or update without reloading — that's JavaScript. Every frontend framework (React, Vue, Angular) is JavaScript under the hood.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.amber}>🎯 JavaScript Basics Quiz</CardTitle><Quiz questions={QUIZ} trackId="js-basics"/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
