import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as n}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const a={title:"C# Intermediate",subtitle:"LINQ, generics, interfaces, and richer OOP — the productive middle of C#.",tagColor:t.rose,lang:"cs",trackKey:"cs-inter",pageId:"cs-inter",sections:[{id:"intro",label:"Introduction",intro:"Once you're past the basics, C# rewards you with LINQ, async/await, and clean generic types. This level focuses on idiomatic .NET code.",examples:[{title:"Modern C# style",explanation:"Prefer expression-bodied methods, target-typed new, and using declarations.",code:`public string Greet(string n) => $"hi {n}";
List<int> nums = new();
using var file = File.OpenRead("data.txt");`},{title:"Records",explanation:"A record is an immutable data class with value-based equality. Perfect for DTOs.",code:`public record Point(int X, int Y);
var a = new Point(1, 2);
var b = a with { Y = 9 };`},{title:"Nullable reference types",explanation:"Enable nullable in your csproj. Then string? is nullable and string is not — the compiler enforces it.",code:`string? maybeName = null;
string  name      = "Ana";
// name = null;   // warning`}]},{id:"vars",label:"Variables & Types",intro:"Value types vs reference types matter once you start passing data around. Records and tuples make data modelling easier.",examples:[{title:"Value vs reference",explanation:"struct is a value type — copied on assignment. class is a reference type — both names share the same object.",code:`struct Pt { public int X, Y; }
class Box { public int X; }

var p1 = new Pt { X = 1 };
var p2 = p1;  p2.X = 9;   // p1.X still 1

var b1 = new Box { X = 1 };
var b2 = b1;  b2.X = 9;   // b1.X is now 9`},{title:"Tuples",explanation:"Tuples bundle a few related values without defining a class. Name the components for readability.",code:`(string name, int age) p = ("Ana", 30);
Console.WriteLine(p.name);

(int min, int max) Bounds() => (0, 100);
var b = Bounds();
Console.WriteLine(b.max);`},{title:"Pattern matching",explanation:"switch expressions match on type and shape — branches return a value.",code:`object o = 42;
string kind = o switch {
    int n when n > 0 => "positive int",
    string s          => $"string {s}",
    _                 => "other"
};`}]},{id:"flow",label:"Control Flow",intro:"Pattern-matching switch expressions and LINQ queries replace many traditional loops and if/else cascades.",examples:[{title:"switch expression",explanation:"A more compact form of switch that returns a value rather than executing statements.",code:`string Day(int n) => n switch {
    1 => "Mon", 2 => "Tue", 3 => "Wed",
    >= 4 and <= 5 => "weekday",
    _ => "weekend"
};`},{title:"foreach with deconstruction",explanation:"Loop over a dictionary and unpack each KeyValuePair directly.",code:`var ages = new Dictionary<string,int> {{"Ana",30},{"Bo",25}};
foreach (var (name, age) in ages)
    Console.WriteLine($"{name}: {age}");`},{title:"yield return",explanation:"Build an iterator method that produces values on demand without allocating a full list.",code:`IEnumerable<int> Evens(int max) {
    for (int i = 0; i <= max; i += 2) yield return i;
}
foreach (var n in Evens(10)) Console.Write(n + " ");`}]},{id:"funcs",label:"Functions",intro:"Delegates, lambdas, and Func/Action types turn behaviour into a value you can pass around.",examples:[{title:"Lambda + Func",explanation:"Func<int,int> is a delegate that takes an int and returns an int. Lambdas create one inline.",code:`Func<int,int> square = x => x * x;
Console.WriteLine(square(5));   // 25`},{title:"Higher-order method",explanation:"Pass a function as a parameter to make a method generic over behaviour.",code:`int Apply(int x, Func<int,int> f) => f(x);
Console.WriteLine(Apply(3, n => n * 10));   // 30`},{title:"Extension methods",explanation:"Add methods to existing types by writing a static method whose first parameter starts with this.",code:`public static class StringExt {
    public static bool IsEmpty(this string s) => string.IsNullOrEmpty(s);
}

"".IsEmpty();   // true`}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Interfaces, abstract classes, and properties with backing logic let you design clean APIs.",examples:[{title:"Interface",explanation:"An interface defines a contract — what methods exist — without saying how they work.",code:`interface IShape { double Area(); }
class Square : IShape {
    public double Side { get; set; }
    public double Area() => Side * Side;
}`},{title:"Abstract class",explanation:"An abstract class is a partial implementation — some methods are abstract, others provided.",code:`abstract class Animal {
    public abstract string Sound();
    public void Describe() => Console.WriteLine($"goes {Sound()}");
}`},{title:"Property with logic",explanation:"Add validation by writing the get/set bodies yourself.",code:`class Person {
    private int _age;
    public int Age {
        get => _age;
        set => _age = value < 0 ? 0 : value;
    }
}`}]},{id:"arrays",label:"Arrays & Collections",intro:"LINQ is C#'s killer feature — query, filter, project any collection with a fluent API.",examples:[{title:"LINQ Where + Select",explanation:"Where filters, Select projects. They are lazy — the query runs only when you iterate.",code:`using System.Linq;
var nums = new[] { 1,2,3,4,5,6 };
var evensSquared = nums.Where(n => n % 2 == 0).Select(n => n*n);
foreach (var n in evensSquared) Console.Write(n + " ");
// 4 16 36`},{title:"GroupBy",explanation:"Group items by a key and operate on each group.",code:`var words = new[] { "apple", "ant", "bee" };
var byLetter = words.GroupBy(w => w[0]);
foreach (var g in byLetter)
    Console.WriteLine($"{g.Key}: {g.Count()}");`},{title:"ToDictionary",explanation:"Materialise a sequence into a dictionary using key and value selectors.",code:`var people = new[] { ("Ana",30), ("Bo",25) };
var map = people.ToDictionary(p => p.Item1, p => p.Item2);
Console.WriteLine(map["Ana"]);`}],tips:[{type:"tip",text:"LINQ is lazy — call ToList() or ToArray() to force evaluation when you need a snapshot."}]},{id:"errors",label:"Error Handling",intro:"Beyond try/catch, intermediate C# uses custom exceptions, the using statement, and the Try-pattern for non-exceptional failures.",examples:[{title:"Custom exception",explanation:"Derive from Exception. Override constructors so callers can pass messages and inner exceptions.",code:`class ConfigException : Exception {
    public ConfigException(string msg) : base(msg) {}
}
throw new ConfigException("missing API key");`},{title:"using for IDisposable",explanation:"using guarantees Dispose runs when the variable goes out of scope — no leaks, no forgotten close().",code:`using var stream = File.OpenRead("data.txt");
// stream auto-disposed at end of scope`},{title:"Try-pattern",explanation:"Many APIs offer TryX methods that return bool instead of throwing — perfect for expected failures like parsing.",code:`if (int.TryParse(input, out int n))
    Console.WriteLine(n);
else
    Console.WriteLine("invalid");`}]},{id:"project",label:"Mini Project",intro:"Build a tiny todo CLI using records, LINQ, and a generic repository.",examples:[{title:"Project: todo CLI",explanation:"Records model the data, LINQ filters, and a small loop drives the menu.",code:`using System;
using System.Collections.Generic;
using System.Linq;

public record Todo(int Id, string Title, bool Done);

class App {
    static List<Todo> todos = new();
    static int next = 1;

    static void Main() {
        while (true) {
            Console.Write("(a)dd (d)one (l)ist (q)uit: ");
            var cmd = Console.ReadLine();
            if (cmd == "q") break;
            else if (cmd == "a") {
                Console.Write("title: ");
                todos.Add(new Todo(next++, Console.ReadLine() ?? "", false));
            } else if (cmd == "d") {
                Console.Write("id: ");
                if (int.TryParse(Console.ReadLine(), out int id)) {
                    var t = todos.FirstOrDefault(x => x.Id == id);
                    if (t != null) {
                        todos.Remove(t);
                        todos.Add(t with { Done = true });
                    }
                }
            } else if (cmd == "l") {
                foreach (var t in todos.OrderBy(x => x.Done))
                    Console.WriteLine($"[{(t.Done?"x":" ")}] {t.Id}. {t.Title}");
            }
        }
    }
}`}]}],quiz:[{q:"What does Where do in LINQ?",opts:["Projects","Filters","Groups","Counts"],ans:1,exp:"Where filters the sequence."},{q:"What is a record?",opts:["A struct","An immutable data class with value equality","An interface","A delegate"],ans:1,exp:"Records are immutable data classes."},{q:"What does the using statement guarantee?",opts:["The variable is constant","Dispose is called","The variable is null-safe","Faster execution"],ans:1,exp:"using calls Dispose deterministically."},{q:"Which is a value type by default?",opts:["class","interface","struct","record"],ans:2,exp:"struct is a value type."},{q:"How does yield return differ from return?",opts:["It throws","It produces a sequence value and continues on next iteration","It exits the method","It is asynchronous"],ans:1,exp:"yield builds an iterator."},{q:"What's a delegate?",opts:["A class","A type that represents a method signature","A pattern","A namespace"],ans:1,exp:"A delegate references a method."},{q:"Pattern match: object o = 42; What's the kind?",opts:["string","int n when n > 0 → positive int","_ → other","null"],ans:1,exp:"42 is a positive int, the first branch matches."},{q:"How are int.TryParse's return value and out parameter used?",opts:["Both are int","Bool success + parsed int via out","Both are bool","Returns nullable int"],ans:1,exp:"Returns true on success and writes the int via out."}]};function r(){return e.jsx(n,{config:a})}export{r as default};
