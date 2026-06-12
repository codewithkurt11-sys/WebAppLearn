import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as i}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const a={title:"C# Basics",subtitle:"Get started with C# — the friendly, statically typed language behind .NET, Unity, and games.",tagColor:t.rose,lang:"cs",trackKey:"cs-basics",pageId:"cs-basics",sections:[{id:"intro",label:"Introduction",intro:"C# is a managed, statically typed language. You write code, the compiler turns it into IL, and the .NET runtime executes it. Memory is collected automatically.",examples:[{title:"Hello, World!",explanation:"Top-level statements (C# 9+) let you skip writing a Main method for tiny programs.",code:'Console.WriteLine("Hello, World!");'},{title:"Classic Main method",explanation:"A full program in C# is a class with a static Main method. Console.WriteLine prints a line.",code:`using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`},{title:"Reading input",explanation:"Console.ReadLine returns the typed line as a string. Convert it if you need a number.",code:`Console.Write("Your name: ");
string name = Console.ReadLine();
Console.WriteLine($"Hi, {name}!");`}],tips:[{type:"info",text:"Save files as .cs, build with dotnet build, run with dotnet run."}]},{id:"vars",label:"Variables & Types",intro:"C# is statically typed: every variable has a type and you cannot assign a value of a different type.",examples:[{title:"Primitive types",explanation:"Use int for whole numbers, double for decimals, char for one character, bool for true/false, string for text.",code:`int    age    = 30;
double price  = 9.99;
char   grade  = 'A';
bool   active = true;
string name   = "Alice";`},{title:"var keyword",explanation:"var asks the compiler to infer the type from the value. It is still statically typed.",code:`var count = 42;            // int
var greeting = "hello";    // string
var score = 88.5;          // double`},{title:"String interpolation",explanation:"Prefix a string with $ and use {expr} to insert values directly.",code:`string name = "Ana";
int age = 25;
Console.WriteLine($"{name} is {age} years old");`}],tips:[{type:"warn",text:"C# strings use double quotes only. Single quotes are for char."}]},{id:"flow",label:"Control Flow",intro:"C# has if/else, switch (including switch expressions), for, while, and foreach loops — all in C-style syntax.",examples:[{title:"if / else if",explanation:"Chain conditions with else if. The first match wins.",code:`int score = 75;
if      (score >= 90) Console.WriteLine("A");
else if (score >= 80) Console.WriteLine("B");
else                  Console.WriteLine("C");`},{title:"for loop",explanation:"Same three-part form as in C/C++. Perfect for counting.",code:`for (int i = 1; i <= 5; i++) {
    Console.WriteLine($"step {i}");
}`},{title:"foreach",explanation:"foreach iterates the values of any IEnumerable — arrays, lists, dictionaries.",code:`string[] names = { "Ana", "Bo", "Cy" };
foreach (var n in names) Console.WriteLine(n);`}]},{id:"funcs",label:"Functions",intro:"C# calls them methods. They live inside a class, declare a return type, and run when called.",examples:[{title:"Static method",explanation:"static means the method belongs to the class itself, not to an instance. Good for utilities.",code:`class Math2 {
    public static int Add(int a, int b) => a + b;
}

Math2.Add(2, 3);   // 5`},{title:"Optional parameters",explanation:"Give a parameter a default value so callers can leave it out.",code:`void Greet(string name = "stranger") {
    Console.WriteLine($"Hi, {name}!");
}
Greet();          // Hi, stranger!
Greet("Ana");     // Hi, Ana!`},{title:"Out parameters",explanation:"out marks a parameter that the method writes to. Useful when returning multiple values.",code:`bool TryParseAge(string s, out int age) {
    return int.TryParse(s, out age);
}

if (TryParseAge("42", out int a))
    Console.WriteLine(a);`}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Classes bundle data (properties) and behaviour (methods). C# leans heavily on properties to expose data safely.",examples:[{title:"Class with properties",explanation:"Properties look like fields but are really get/set methods. The compiler generates the storage when you write { get; set; }.",code:`class Dog {
    public string Name { get; set; }
    public int    Age  { get; set; }

    public Dog(string name, int age) {
        Name = name; Age = age;
    }
    public void Bark() => Console.WriteLine($"{Name}: woof");
}

var d = new Dog("Rex", 4);
d.Bark();`},{title:"Read-only property",explanation:"Drop set to make a property read from outside but writable inside the constructor.",code:`class User {
    public string Email { get; }
    public User(string e) => Email = e;
}`},{title:"Inheritance",explanation:"A class can inherit from another using : Base. Use override to redefine virtual methods.",code:`class Animal {
    public virtual void Speak() => Console.WriteLine("...");
}
class Cat : Animal {
    public override void Speak() => Console.WriteLine("meow");
}`}],tips:[{type:"tip",text:"Prefer properties to public fields — they let you add validation later without breaking callers."}]},{id:"arrays",label:"Arrays & Collections",intro:"C# has fixed arrays, growable List<T>, key-value Dictionary<K,V>, and many more — all type-safe via generics.",examples:[{title:"Array",explanation:"An array has a fixed size declared when you create it. Access elements with [i].",code:`int[] scores = { 90, 85, 78 };
Console.WriteLine(scores[0]);   // 90
Console.WriteLine(scores.Length);`},{title:"List<T>",explanation:"List<T> grows on demand. Add appends; Count tells you the size.",code:`using System.Collections.Generic;

var nums = new List<int> { 1, 2, 3 };
nums.Add(4);
foreach (var n in nums) Console.Write(n + " ");`},{title:"Dictionary<K,V>",explanation:"A dictionary maps keys to values. Access with [key]; check existence with ContainsKey.",code:`var ages = new Dictionary<string,int> {
    { "Ana", 30 },
    { "Bo",  25 }
};
Console.WriteLine(ages["Ana"]);`}]},{id:"errors",label:"Error Handling",intro:"C# uses try / catch / finally. throw raises an exception; catch handles specific types.",examples:[{title:"Basic try / catch",explanation:"Wrap code that might fail in try. The first matching catch handles it.",code:`try {
    int x = int.Parse("abc");
} catch (FormatException) {
    Console.WriteLine("not a number");
}`},{title:"Catching multiple types",explanation:"Chain catch blocks. Always order from most specific to most general.",code:`try { /* ... */ }
catch (FileNotFoundException) { /* ... */ }
catch (IOException)            { /* ... */ }
catch (Exception)              { /* ... */ }`},{title:"Throwing your own",explanation:'throw new ExceptionType("message") raises an exception. Use ArgumentException for bad input.',code:`int Divide(int a, int b) {
    if (b == 0) throw new ArgumentException("b cannot be 0");
    return a / b;
}`}],tips:[{type:"info",text:"finally runs whether or not an exception was thrown — use it to release resources."}]},{id:"project",label:"Mini Project",intro:"Build a tiny console-based contact list with a Contact class, a List<Contact>, and a simple menu.",examples:[{title:"Project: contacts app",explanation:"We define a Contact, store many in a list, and let the user add or list contacts. Combines classes, lists, control flow, and input.",code:`using System;
using System.Collections.Generic;

class Contact {
    public string Name { get; set; }
    public string Phone { get; set; }
}

class Program {
    static List<Contact> contacts = new();

    static void Main() {
        while (true) {
            Console.Write("(a)dd  (l)ist  (q)uit: ");
            switch (Console.ReadLine()) {
                case "a":
                    Console.Write("name: ");  var n = Console.ReadLine();
                    Console.Write("phone: "); var p = Console.ReadLine();
                    contacts.Add(new Contact { Name = n, Phone = p });
                    break;
                case "l":
                    foreach (var c in contacts)
                        Console.WriteLine($"{c.Name}: {c.Phone}");
                    break;
                case "q": return;
            }
        }
    }
}`}]}],quiz:[{q:"Which keyword infers a variable's type?",opts:["auto","let","var","dynamic"],ans:2,exp:"var infers the type at compile time."},{q:"How do you write a string with an embedded value?",opts:['"x = " + x','$"x = {x}"','"x = ${x}"','f"x = {x}"'],ans:1,exp:"Prefix with $ for string interpolation."},{q:"What collection grows on demand?",opts:["int[]","List<int>","string[10]","Tuple"],ans:1,exp:"List<T> grows automatically."},{q:"How do you mark a method overridable?",opts:["new","virtual","override","abstract"],ans:1,exp:"virtual lets derived classes override it."},{q:"Which keyword catches all exceptions?",opts:["catch (Throwable)","catch (Exception)","catch (Error)","catch ()"],ans:1,exp:"Exception is the base type for most exceptions."},{q:"What is Console.ReadLine's return type?",opts:["int","string","char","object"],ans:1,exp:"It returns a string (or null at EOF)."},{q:'Which exception is thrown by int.Parse("abc")?',opts:["IOException","FormatException","ArgumentException","NullReferenceException"],ans:1,exp:"Parsing a non-numeric string throws FormatException."},{q:"Where do top-level statements run?",opts:["Inside any class","Implicit Main method","Module initialiser","Static constructor"],ans:1,exp:"Top-level statements compile to an implicit Main."}]};function r(){return e.jsx(i,{config:a})}export{r as default};
