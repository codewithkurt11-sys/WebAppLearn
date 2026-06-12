import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as a}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const o={title:"JavaScript Advanced",subtitle:"Closures, async iteration, generators, proxies, and modern patterns.",tagColor:t.amber,lang:"js",trackKey:"js-adv",pageId:"js-adv",sections:[{id:"intro",label:"Introduction",intro:"Advanced JavaScript is about understanding the language's quirks deeply: closures, the event loop, prototypes, and the modern async ecosystem.",examples:[{title:"The event loop in one example",explanation:"setTimeout(0) and Promise.resolve are both async — but microtasks (Promises) run before macrotasks (timeouts).",code:`console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// 1, 4, 3, 2`},{title:"Modules",explanation:"Use export/import to split code across files. Tree-shaking removes unused exports.",code:`// math.js
export const add = (a,b) => a+b;
export default function mul(a,b){return a*b;}

// main.js
import mul, { add } from "./math.js";`},{title:"Strict mode",explanation:"Modules are always in strict mode. Strict mode catches silent errors and disables sloppy fallbacks.",code:`"use strict";
x = 5;   // ReferenceError instead of silent global`}]},{id:"vars",label:"Variables & Types",intro:"Beyond let/const, advanced JS uses Symbols, WeakMaps, and TypedArrays for special needs.",examples:[{title:"Symbol",explanation:"A Symbol is a unique value — perfect as a property key that won't collide.",code:`const id = Symbol("id");
const u = { [id]: 42, name: "Ana" };
console.log(u[id]);   // 42`},{title:"WeakMap",explanation:"Keys are held weakly — when the key is garbage collected, the entry vanishes. Great for private data.",code:`const priv = new WeakMap();
class User {
  constructor(name) { priv.set(this, { name }); }
  get name() { return priv.get(this).name; }
}`},{title:"TypedArray",explanation:"Int32Array, Uint8Array, etc. give you fixed-size, typed buffers for binary work.",code:`const buf = new Uint8Array(4);
buf[0] = 255;
console.log(buf);   // Uint8Array [255,0,0,0]`}]},{id:"flow",label:"Control Flow",intro:"Generators and async iteration let you pause and resume control flow in powerful ways.",examples:[{title:"Generator",explanation:"function* makes a generator. yield pauses; .next() resumes.",code:`function* counter() {
  let i = 0;
  while (true) yield i++;
}
const g = counter();
console.log(g.next().value);   // 0
console.log(g.next().value);   // 1`},{title:"for-await-of",explanation:"Iterate an async iterable, awaiting each value.",code:`async function* stream() {
  for (let i=0;i<3;i++) { await new Promise(r=>setTimeout(r,100)); yield i; }
}
for await (const n of stream()) console.log(n);`},{title:"AbortController",explanation:"Cancel fetches, timers, and any abortable async work.",code:`const ac = new AbortController();
fetch("/big", { signal: ac.signal });
setTimeout(() => ac.abort(), 1000);`}]},{id:"funcs",label:"Functions",intro:"Closures, currying, and tagged template literals unlock concise, reusable patterns.",examples:[{title:"Closure",explanation:"An inner function remembers the variables of its enclosing scope, even after that scope returns.",code:`function counter() {
  let n = 0;
  return () => ++n;
}
const c = counter();
c(); c(); console.log(c());   // 3`},{title:"Currying",explanation:"Turn a multi-arg function into a chain of single-arg functions for composability.",code:`const add = a => b => a + b;
const add5 = add(5);
console.log(add5(3));   // 8`},{title:"Tagged template",explanation:"A function used as a template literal receives the static strings and dynamic values separately.",code:`function html(strings, ...values) {
  return strings.reduce((acc,s,i) => acc + s + (values[i] ?? ""), "");
}
const name = "Ana";
html\`<p>Hi \${name}</p>\`;`}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Modern classes support private fields, static blocks, and getters/setters.",examples:[{title:"Private fields",explanation:"Prefix with # to make a field truly private — not accessible from outside the class.",code:`class BankAccount {
  #balance = 0;
  deposit(n) { this.#balance += n; }
  get balance() { return this.#balance; }
}`},{title:"Static block",explanation:"A static initialisation block runs once when the class is loaded.",code:`class Config {
  static defaults;
  static {
    Config.defaults = Object.freeze({ port: 3000 });
  }
}`},{title:"Proxy",explanation:"A Proxy intercepts operations on an object — perfect for logging, validation, or virtual properties.",code:`const safe = new Proxy({}, {
  set(t, k, v) {
    if (typeof v !== "number") throw new TypeError("nums only");
    t[k] = v; return true;
  }
});
safe.x = 1;`}]},{id:"arrays",label:"Arrays & Collections",intro:"Beyond map/filter/reduce, the spread, destructuring, and Set/Map types make data manipulation expressive.",examples:[{title:"Map and Set",explanation:"Map keeps insertion order and any key type. Set holds unique values.",code:`const m = new Map([["a",1],["b",2]]);
m.set("c", 3);

const s = new Set([1,2,2,3]);
console.log([...s]);   // [1,2,3]`},{title:"Destructuring with defaults",explanation:"Pull values out of objects/arrays with renaming and defaults in one line.",code:`const { name = "anon", info: { age } = {} } = user;
const [first, ...rest] = items;`},{title:"Array.from with mapper",explanation:"Convert iterables to arrays and transform in a single call.",code:`const squares = Array.from({ length: 5 }, (_, i) => i*i);
// [0,1,4,9,16]`}]},{id:"errors",label:"Error Handling",intro:"Advanced error handling means custom error classes, AggregateError for Promise.any, and graceful async cleanup.",examples:[{title:"Custom error class",explanation:"Extend Error to add fields like status or cause.",code:`class HttpError extends Error {
  constructor(message, status) {
    super(message); this.status = status;
  }
}
throw new HttpError("not found", 404);`},{title:"Promise.allSettled",explanation:"Wait for every promise — even rejected ones — and inspect each result.",code:`const results = await Promise.allSettled([fetchA(), fetchB()]);
for (const r of results)
  console.log(r.status, r.value ?? r.reason);`},{title:"try/finally for cleanup",explanation:"finally runs whether or not an error was thrown — use it to release resources.",code:`const conn = await openDb();
try {
  await conn.query("SELECT 1");
} finally {
  await conn.close();
}`}]},{id:"project",label:"Mini Project",intro:"Build a tiny reactive store using Proxy + subscribers — like a minimal Zustand.",examples:[{title:"Project: reactive store",explanation:"We wrap state in a Proxy. Every assignment notifies subscribers.",code:`function createStore(initial) {
  const subs = new Set();
  const state = new Proxy({ ...initial }, {
    set(t, k, v) {
      t[k] = v;
      subs.forEach(fn => fn(t));
      return true;
    }
  });
  return {
    state,
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
  };
}

const store = createStore({ count: 0 });
store.subscribe(s => console.log("now", s.count));
store.state.count++;   // logs "now 1"
store.state.count++;   // logs "now 2"`}]}],quiz:[{q:"Which runs first?",opts:["setTimeout(0)","Promise.resolve().then","Synchronous code after both","All at once"],ans:1,exp:"Microtasks (Promise) run before macrotasks (setTimeout)."},{q:"How do you make a class field truly private?",opts:["_field","private field","#field","Symbol"],ans:2,exp:"Prefix with # for ECMAScript private fields."},{q:"What does for await...of iterate?",opts:["A normal array","An async iterable","A Set","A generator only"],ans:1,exp:"It consumes async iterables."},{q:"What is a closure?",opts:["A class","A function that remembers its enclosing variables","A type of Promise","A type of object"],ans:1,exp:"A closure captures its outer scope."},{q:"What does Promise.allSettled return?",opts:["First fulfilled","First settled","Array of {status,value/reason}","Throws if any rejects"],ans:2,exp:"It always resolves with an array describing every promise."},{q:"Proxy lets you intercept...",opts:["Network requests","Operations on an object (get/set/etc.)","Function calls only","DOM events"],ans:1,exp:"Proxies trap object operations."},{q:"What does WeakMap allow that Map doesn't?",opts:["String keys","Garbage collection of keys","Order preservation","Iteration"],ans:1,exp:"WeakMap holds keys weakly — they can be GC'd."},{q:"What does AbortController do?",opts:["Throws errors","Cancels fetch and other abortable APIs","Pauses execution","Restarts the event loop"],ans:1,exp:"AbortController signals cancellation."}]};function i(){return e.jsx(a,{config:o})}export{i as default};
