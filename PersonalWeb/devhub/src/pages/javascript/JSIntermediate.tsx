import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"promises",     label:"Promises"       },
  { id:"asyncawait",   label:"Async/Await"    },
  { id:"destructuring",label:"Destructuring"  },
  { id:"storage",      label:"LocalStorage"   },
  { id:"regex",        label:"Regex"          },
  { id:"patterns",     label:"Array Patterns" },
  { id:"quiz",         label:"Quiz 🎯"        },
];

const QUIZ: Question[] = [
  { q:"What does Promise.all([p1, p2, p3]) do?", opts:["Runs promises one by one","Resolves when the fastest promise resolves","Resolves when ALL promises resolve, rejects if ANY rejects","Always resolves"], ans:2, exp:"Promise.all() runs all promises concurrently and gives you all results when done. If any one rejects, the whole thing rejects. Use Promise.allSettled() if you want all results regardless." },
  { q:"What does the await keyword do?", opts:["Makes code synchronous","Pauses the async function until a Promise resolves","Creates a new Promise","Runs code in parallel"], ans:1, exp:"await pauses execution of the async function until the Promise resolves, then returns the resolved value. Other code in the event loop can run while it waits." },
  { q:"What does const { name, age } = user; do?", opts:["Copies the user object","Creates name and age from user's properties","Deletes name and age from user","Converts user to an array"], ans:1, exp:"Destructuring extracts properties from an object into variables. It's shorthand for const name = user.name; const age = user.age;" },
  { q:"Which localStorage method reads a value?", opts:["localStorage.get()","localStorage.read()","localStorage.getItem()","localStorage.fetch()"], ans:2, exp:"localStorage.getItem('key') returns the string value, or null if not found. localStorage.setItem('key', value) stores it." },
  { q:"What does the regex /^\\d+$/ match?", opts:["Any string containing digits","Strings that start and end with digits","Strings made entirely of digits","Strings with exactly one digit"], ans:2, exp:"^ anchors to start, $ anchors to end, \\d+ means one or more digits. Together: a string that is ONLY digits from start to end." },
  { q:"What does Array.reduce() do?", opts:["Removes falsy values","Flattens nested arrays","Accumulates all elements into a single value","Filters elements by condition"], ans:2, exp:"reduce((accumulator, current) => ..., initialValue) folds all elements into one value. Classic use: summing numbers, building an object from an array." },
  { q:"What is the spread operator used for?", opts:["Only spreading arrays","Spreading arrays/objects or collecting rest parameters","Only for function arguments","Copying class instances"], ans:1, exp:"The ... spread operator expands arrays/objects in-place. It's also used as a rest parameter to collect extra arguments: function fn(a, b, ...rest) {}." },
  { q:"What does Array.flatMap() do?", opts:["Sorts and flattens","Maps then flattens one level deep","Filters then flattens","Only flattens nested arrays"], ans:1, exp:"flatMap(fn) is equivalent to .map(fn).flat(1) — maps each element and flattens one level. Great for cases where your map function returns arrays." },
  { q:"What is the difference between Promise.all() and Promise.allSettled()?", opts:["They're identical","Promise.all() rejects if any promise rejects; Promise.allSettled() always resolves with all results","Promise.allSettled() is faster","Promise.all() works with async/await, Promise.allSettled() doesn't"], ans:1, exp:"Promise.all() short-circuits on the first rejection. Promise.allSettled() waits for every promise and gives you an array of {status: 'fulfilled'|'rejected', value|reason} — use it when you want all results regardless of failures." },
  { q:"What does optional chaining (?.) do?", opts:["Makes a property required","Returns undefined instead of throwing if a property doesn't exist on null/undefined","Checks if a value is null","Creates optional function parameters"], ans:1, exp:"user?.address?.city returns undefined instead of throwing TypeError if user or address is null/undefined. It's shorthand for: user && user.address && user.address.city." },
];

function TabPromises() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>What is a Promise?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        A Promise represents a value that will be available <strong style={{ color:T.text }}>in the future</strong>. It's JavaScript's way of handling async operations without blocking.
      </p>
      <CodeBlock lang="js" code={`// Creating a promise
const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) {
      resolve({ id, name: "Alice" });   // success
    } else {
      reject(new Error("Invalid ID")); // failure
    }
  }, 1000);
});

// Consuming with .then() / .catch()
fetchUser(1)
  .then(user  => console.log("Got:", user.name))
  .catch(err  => console.error("Error:", err.message))
  .finally(()  => console.log("Done either way"));`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Promise.all — Run in Parallel</CardTitle>
      <CodeBlock lang="js" code={`// These run CONCURRENTLY — total time = slowest one
const p1 = fetch("/api/user");
const p2 = fetch("/api/posts");
const p3 = fetch("/api/comments");

Promise.all([p1, p2, p3])
  .then(([userRes, postsRes, commentsRes]) => {
    return Promise.all([userRes.json(), postsRes.json(), commentsRes.json()]);
  })
  .then(([user, posts, comments]) => {
  });

// Promise.allSettled — get ALL results, even if some fail
Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(r => {
    if (r.status === "fulfilled") console.log("OK:", r.value);
    else console.log("Failed:", r.reason);
  });
});`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Promise.race — First Wins</CardTitle>
      <CodeBlock lang="js" code={`// Timeout pattern — reject if response takes too long
const timeout = (ms) => new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout!")), ms)
);

Promise.race([fetch("/api/data"), timeout(3000)])
  .then(res  => res.json())
  .then(data => console.log("Got data:", data))
  .catch(err => console.error(err.message));  // "Timeout!" if slow`}/>
    </Card>
  </>);
}

function TabAsyncAwait() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>async / await Syntax</CardTitle>
      <CodeBlock lang="js" code={`// Every async function returns a Promise
async function getUser(id) {
  const res  = await fetch(\`/api/users/\${id}\`);
  const user = await res.json();
  return user;   // wrapped in a resolved Promise
}

// Call it like any async code
getUser(1).then(u => console.log(u.name));

// Or inside another async function
async function showProfile() {
  const user  = await getUser(1);
  const posts = await fetch(\`/api/posts?author=\${user.id}\`).then(r => r.json());
}`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Error Handling</CardTitle>
      <CodeBlock lang="js" code={`async function loadData(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(\`HTTP \${res.status}: \${res.statusText}\`);
    }

    const data = await res.json();
    return data;

  } catch (err) {
    if (err.name === "TypeError") {
      console.error("Network error — are you offline?");
    } else {
      console.error("Failed to load data:", err.message);
    }
    return null;
  }
}`}/>
      <InfoBox type="tip">Always wrap <IC>await</IC> calls in try/catch. A rejected Promise inside an async function throws — and without try/catch it becomes an unhandled rejection.</InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Parallel vs Sequential</CardTitle>
      <CodeBlock lang="js" code={`// SEQUENTIAL — one after another (total: 3s)
async function sequential() {
  const a = await delay(1000);  // wait 1s
  const b = await delay(2000);  // then wait 2s
  return [a, b];
}

// PARALLEL — both at once (total: 2s)
async function parallel() {
  const [a, b] = await Promise.all([
    delay(1000),
    delay(2000),
  ]);
  return [a, b];
}

const delay = (ms) => new Promise(res => setTimeout(() => res(ms), ms));`}/>
    </Card>
  </>);
}

function TabDestructuring() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Object Destructuring</CardTitle>
      <CodeBlock lang="js" code={`const user = { name: "Alice", age: 28, role: "admin", city: "Nairobi" };

// Basic
const { name, age } = user;
console.log(name, age);  // Alice 28

// Rename while destructuring
const { name: userName, role: userRole } = user;
console.log(userName, userRole);  // Alice admin

// Default values
const { name: n, country = "Unknown" } = user;
console.log(n, country);  // Alice Unknown

// Nested
const config = { db: { host: "localhost", port: 5432 } };
const { db: { host, port } } = config;
console.log(host, port);  // localhost 5432

// In function parameters
function greet({ name, role = "user" }) {
}
greet(user);  // Hi Alice, you are a admin`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Array Destructuring & Spread</CardTitle>
      <CodeBlock lang="js" code={`const scores = [98, 87, 73, 65, 51];

// Array destructuring
const [first, second, ...rest] = scores;
console.log(first);   // 98
console.log(second);  // 87
console.log(rest);    // [73, 65, 51]

// Swap variables without temp
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b);    // 2 1

// Spread — copy/merge
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const merged = [...arr1, ...arr2];     // [1,2,3,4,5,6]

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 99, c: 3 };
const combined = { ...obj1, ...obj2 }; // { a:1, b:99, c:3 }
console.log(combined);`}/>
    </Card>
  </>);
}

function TabStorage() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>localStorage Basics</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        localStorage stores data in the browser that <strong style={{ color:T.text }}>persists across sessions</strong>. It's synchronous, has a ~5MB limit, and stores strings only.
      </p>
      <CodeBlock lang="js" code={`// Store — values are always converted to strings
localStorage.setItem("theme", "dark");
localStorage.setItem("fontSize", "14");

// Retrieve
const theme    = localStorage.getItem("theme");     // "dark"
const missing  = localStorage.getItem("nope");      // null

// Remove
localStorage.removeItem("theme");

// Clear everything
localStorage.clear();

// Store objects — must JSON serialize
const user = { name: "Alice", role: "admin" };
localStorage.setItem("user", JSON.stringify(user));

// Read back
const stored = localStorage.getItem("user");
const parsed = stored ? JSON.parse(stored) : null;
console.log(parsed?.name);  // "Alice"`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Practical Pattern — Settings Store</CardTitle>
      <CodeBlock lang="js" code={`// A reusable settings helper
const settings = {
  get(key, defaultVal = null) {
    const val = localStorage.getItem(key);
    if (val === null) return defaultVal;
    try { return JSON.parse(val); } catch { return val; }
  },

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key) {
    localStorage.removeItem(key);
  }
};

// Usage
settings.set("prefs", { theme: "dark", lang: "en" });
console.log(settings.get("prefs"));           // { theme: "dark", lang: "en" }
console.log(settings.get("missing", "n/a"));  // "n/a"`}/>
      <InfoBox type="warn"><IC>sessionStorage</IC> works the same way but is cleared when the tab closes. <IC>localStorage</IC> persists until explicitly cleared.</InfoBox>
    </Card>
  </>);
}

function TabRegex() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>Regex Basics</CardTitle>
      <CodeBlock lang="js" code={`// Creating a regex
const re1 = /hello/;          // literal
const re2 = new RegExp("hello"); // dynamic

// Flags
const re3 = /hello/i;         // i = case-insensitive
const re4 = /hello/g;         // g = global (find all)
const re5 = /hello/gi;        // both

// test() — returns true/false
/^\\d{5}$/.test("12345");      // true — 5-digit zip code
/^\\d{5}$/.test("1234");       // false

// match() — returns matches
"hello world hello".match(/hello/g);  // ["hello", "hello"]

// replace()
"foo BAR foo".replace(/foo/gi, "baz");  // "baz BAR baz"

// split()
"one,two, three".split(/,\\s*/);  // ["one", "two", "three"]`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Common Patterns</CardTitle>
      <CodeBlock lang="js" code={`const patterns = {
  email:    /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
  phone:    /^\\+?[\\d\\s\\-]{7,15}$/,
  url:      /^https?:\\/\\/[^\\s]+/,
  zipCode:  /^\\d{5}(-\\d{4})?$/,
  hex:      /^#?([a-f\\d]{3}|[a-f\\d]{6})$/i,
  alphaNum: /^[a-z0-9]+$/i,
};

function validate(value, type) {
  return patterns[type]?.test(value) ?? false;
}

console.log(validate("alice@example.com", "email")); // true
console.log(validate("not-an-email", "email"));      // false
console.log(validate("#ff5500", "hex"));             // true`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Capture Groups</CardTitle>
      <CodeBlock lang="js" code={`// Named capture groups
const dateRe = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const match  = "2025-06-15".match(dateRe);

console.log(match.groups.year);   // 2025
console.log(match.groups.month);  // 06
console.log(match.groups.day);    // 15

// Replace with groups
const swapped = "2025-06-15".replace(
  /(?<y>\\d{4})-(?<m>\\d{2})-(?<d>\\d{2})/,
  "$<d>/$<m>/$<y>"   // DD/MM/YYYY
);
console.log(swapped);  // 15/06/2025`}/>
    </Card>
  </>);
}

function TabPatterns() {
  return (<>
    <Card>
      <CardTitle color={T.amber}>reduce — The Swiss Army Knife</CardTitle>
      <CodeBlock lang="js" code={`const orders = [
  { product: "hat",  price: 25, qty: 2 },
  { product: "bag",  price: 60, qty: 1 },
  { product: "shoe", price: 80, qty: 3 },
];

// Sum total
const total = orders.reduce((sum, o) => sum + o.price * o.qty, 0);
console.log(total);  // 350

// Group by first letter
const words = ["apple","avocado","banana","blueberry","cherry"];
const grouped = words.reduce((acc, word) => {
  const key = word[0];
  acc[key] = [...(acc[key] || []), word];
  return acc;
}, {});
// { a: ["apple","avocado"], b: ["banana","blueberry"], c: ["cherry"] }

// Count occurrences
const langs = ["js","py","js","ts","py","js"];
const counts = langs.reduce((acc, lang) => {
  acc[lang] = (acc[lang] || 0) + 1;
  return acc;
}, {});
console.log(counts);  // { js: 3, py: 2, ts: 1 }`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>flatMap, at(), findIndex()</CardTitle>
      <CodeBlock lang="js" code={`// flatMap — map + flatten 1 level
const sentences = ["hello world", "foo bar baz"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words);  // ["hello","world","foo","bar","baz"]

// at() — negative indexing (ES2022)
const arr = [10, 20, 30, 40, 50];
console.log(arr.at(-1));   // 50 (last)
console.log(arr.at(-2));   // 40 (second to last)

// findIndex
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Carol" },
];
const idx = users.findIndex(u => u.id === 2);
console.log(idx);                    // 1
console.log(users[idx].name);       // Bob

// structuredClone — deep copy (ES2022)
const original = { a: { b: { c: 42 } } };
const copy = structuredClone(original);
copy.a.b.c = 99;
console.log(original.a.b.c);  // 42 (unchanged)`}/>
    </Card>
    <Card>
      <CardTitle color={T.amber}>Object.entries / fromEntries</CardTitle>
      <CodeBlock lang="js" code={`const prices = { apple: 1.2, banana: 0.5, cherry: 3.0 };

// Transform all values
const discounted = Object.fromEntries(
  Object.entries(prices).map(([k, v]) => [k, v * 0.9])
);
// { apple: 1.08, banana: 0.45, cherry: 2.7 }

// Filter object keys
const expensive = Object.fromEntries(
  Object.entries(prices).filter(([, v]) => v > 1)
);
console.log(expensive);  // { apple: 1.2, cherry: 3.0 }`}/>
    </Card>
  </>);
}

export default function JSIntermediate() {
  const [tab, setTab] = useState("promises");
  return (
    <div style={{ padding:"0 0 40px" }}>
      <PageHeader eyebrow="JavaScript • Intermediate" title="JavaScript Intermediate" sub="Promises, async/await, destructuring, localStorage, regex, and advanced array patterns." color={T.amber}/>
      <div style={{ padding:"0 16px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Async/await and destructuring are in literally every modern JavaScript codebase. If you work on any web app after 2018, you'll encounter Promises within the first hour. These aren't advanced topics — they're the standard everyday tools of frontend and Node.js development.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab === "promises"      && <TabPromises/>}
        {tab === "asyncawait"    && <TabAsyncAwait/>}
        {tab === "destructuring" && <TabDestructuring/>}
        {tab === "storage"       && <TabStorage/>}
        {tab === "regex"         && <TabRegex/>}
        {tab === "patterns"      && <TabPatterns/>}
        {tab === "quiz"          && <Card><CardTitle color={T.amber}>Quiz — JavaScript Intermediate</CardTitle><Quiz questions={QUIZ} trackId="js-inter"/></Card>}
      </div>
    </div>
  );
}
