import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as a}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const n={title:"C++ Intermediate",subtitle:"Pointers, references, the STL, and richer OOP — bridge from beginner to confident.",tagColor:t.sky,lang:"cpp",trackKey:"cpp-inter",pageId:"cpp-inter",sections:[{id:"intro",label:"Introduction",intro:"At the intermediate level you stop treating C++ as a faster Python and start working with what makes it different — pointers, references, templates, and the Standard Template Library (STL).",examples:[{title:"Recap: classes and vectors",explanation:"A quick refresher that combines a class with a vector — the foundation we'll build on.",code:`#include <vector>
struct Item { std::string name; int qty; };
std::vector<Item> cart = { {"book",2}, {"pen",5} };`},{title:"Compile flags worth knowing",explanation:"Turn on warnings and modern C++. These are the flags every serious C++ project uses.",code:"g++ -std=c++17 -Wall -Wextra -O2 main.cpp -o app"},{title:"Project layout",explanation:"Split your project into headers (.h) and source files (.cpp). Headers declare; source files implement.",code:`// dog.h
class Dog { public: void bark(); };

// dog.cpp
#include "dog.h"
#include <iostream>
void Dog::bark() { std::cout << "woof"; }`}],tips:[{type:"tip",text:"Always compile with -Wall — it catches bugs the standard already knows about."}]},{id:"vars",label:"Variables & Types",intro:"Beyond primitives, C++ gives you fine-grained control over memory through references and pointers.",examples:[{title:"References vs pointers",explanation:"A reference is another name for an existing variable. A pointer holds an address — it can point at different things over time.",code:`int x = 10;
int& ref = x;     // alias for x
int* ptr = &x;    // address of x

ref = 20;         // x is now 20
*ptr = 30;        // x is now 30`},{title:"Const correctness",explanation:"Use const everywhere a value should not change. It documents intent and lets the compiler help you.",code:`void print(const std::string& s) {
    std::cout << s;
    // s = "x";   // ERROR: s is const
}`},{title:"auto and range-for",explanation:"Modern C++ leans on auto and range-for to keep code short and safe.",code:`std::vector<int> v = {1,2,3};
for (auto n : v) std::cout << n << " ";`}],tips:[{type:"warn",text:"A reference must be initialised when declared and cannot be re-seated to a different variable."}]},{id:"flow",label:"Control Flow",intro:"Intermediate control flow is mostly about writing fewer, clearer branches — and using the STL algorithms instead of hand-rolled loops.",examples:[{title:"Switch with fallthrough",explanation:"switch picks a branch by integer value. Don't forget break — without it execution falls through to the next case.",code:`switch (day) {
  case 1: case 2: case 3: case 4: case 5:
    std::cout << "weekday"; break;
  default:
    std::cout << "weekend";
}`},{title:"Range-for with index trick",explanation:"When you need both index and value, pair an int counter with a range-for.",code:`int i = 0;
for (auto& name : names) {
    std::cout << i++ << ": " << name << "\\n";
}`},{title:"std::find",explanation:"Instead of writing a loop to search a container, call std::find from <algorithm>.",code:`#include <algorithm>
auto it = std::find(v.begin(), v.end(), 42);
if (it != v.end()) std::cout << "found at " << (it - v.begin());`}]},{id:"funcs",label:"Functions",intro:"Templates and lambdas let you write functions that work with many types and capture local state.",examples:[{title:"Template function",explanation:"A template lets one function work with any type. The compiler stamps out a version for each type you use.",code:`template <typename T>
T maxOf(T a, T b) {
    return a > b ? a : b;
}

maxOf(3, 5);        // 5  (int)
maxOf(2.1, 1.9);    // 2.1 (double)`},{title:"Lambda expression",explanation:"A lambda is an inline anonymous function. Capture variables in the [] brackets.",code:`int base = 100;
auto addBase = [base](int x) { return x + base; };
std::cout << addBase(5);   // 105`},{title:"std::function as a parameter",explanation:"Accept a callable as a parameter using std::function from <functional> for clean callback APIs.",code:`#include <functional>
void apply(int x, std::function<int(int)> f) {
    std::cout << f(x);
}
apply(10, [](int n){ return n*n; });   // 100`}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Richer OOP means virtual methods, destructors, and the rule of three / five for memory management.",examples:[{title:"Virtual methods",explanation:"Mark a method virtual to allow derived classes to override it polymorphically.",code:`class Shape {
public:
    virtual double area() const = 0;   // pure virtual
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
};`},{title:"Destructor",explanation:"The destructor (~ClassName) runs when an object is destroyed. Use it to release resources.",code:`class File {
    FILE* f;
public:
    File(const char* p) { f = fopen(p, "r"); }
    ~File() { if (f) fclose(f); }
};`},{title:"Composition over inheritance",explanation:"Often it is cleaner to hold an object as a member than to inherit from a base class.",code:`class Engine { public: void start() {} };
class Car {
    Engine engine;
public:
    void drive() { engine.start(); }
};`}],tips:[{type:"info",text:"Mark overrides with the override keyword — the compiler will warn if you got the signature wrong."}]},{id:"arrays",label:"Arrays & Collections",intro:"The STL has containers and algorithms for almost every common task. Knowing which one to pick is most of the skill.",examples:[{title:"std::map",explanation:"A map stores key-value pairs sorted by key. Lookup is O(log n).",code:`#include <map>
std::map<std::string,int> ages = {{"Ana",30},{"Bo",25}};
std::cout << ages["Ana"];   // 30`},{title:"std::unordered_set",explanation:"A hash set gives O(1) average lookup and prevents duplicates.",code:`#include <unordered_set>
std::unordered_set<int> seen;
seen.insert(5);
if (seen.count(5)) std::cout << "yes";`},{title:"std::sort with lambda",explanation:"Sort any container by a custom rule by passing a comparator lambda.",code:`#include <algorithm>
std::vector<int> v = {3,1,4,1,5};
std::sort(v.begin(), v.end(), [](int a, int b){ return a > b; });
// 5 4 3 1 1`}]},{id:"errors",label:"Error Handling",intro:"Beyond throwing exceptions, intermediate code uses RAII (Resource Acquisition Is Initialisation) so cleanup happens automatically.",examples:[{title:"Custom exception class",explanation:"Derive from std::exception and override what() to ship a meaningful message.",code:`class BadConfig : public std::exception {
    std::string msg;
public:
    BadConfig(std::string m) : msg(std::move(m)) {}
    const char* what() const noexcept override { return msg.c_str(); }
};`},{title:"RAII for cleanup",explanation:"Wrap any resource in a class whose destructor releases it. Then leaks are impossible even if an exception is thrown.",code:`class Lock {
    std::mutex& m;
public:
    Lock(std::mutex& m) : m(m) { m.lock(); }
    ~Lock() { m.unlock(); }
};`},{title:"noexcept",explanation:"Mark functions that cannot throw with noexcept — the compiler optimises better and callers get a guarantee.",code:"int safeAdd(int a, int b) noexcept { return a + b; }"}],tips:[{type:"tip",text:"Prefer std::unique_ptr and std::shared_ptr over raw new/delete."}]},{id:"project",label:"Mini Project",intro:"Build a small inventory manager that uses vectors, maps, classes, and templates together.",examples:[{title:"Project: tiny inventory",explanation:"We define an Item class, store items in a vector, and expose helpers to add and total. Everything we've covered shows up in one place.",code:`#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Item { string name; double price; int qty; };

class Inventory {
    vector<Item> items;
public:
    void add(Item i) { items.push_back(i); }
    double total() const {
        double sum = 0;
        for (const auto& i : items) sum += i.price * i.qty;
        return sum;
    }
    void list() const {
        for (const auto& i : items)
            cout << i.name << " x" << i.qty
                 << " @ " << i.price << "\\n";
    }
};

int main() {
    Inventory inv;
    inv.add({"book", 12.5, 2});
    inv.add({"pen",   1.5, 10});
    inv.list();
    cout << "Total: " << inv.total() << "\\n";
}`}]}],quiz:[{q:"Which is true about references?",opts:["Can be reassigned to a new variable","Must be initialised when declared","Have their own address","Are nullable"],ans:1,exp:"References must be initialised and cannot be re-seated."},{q:"What does -Wall do for g++?",opts:["Enables all warnings","Links all libraries","Optimises aggressively","Builds for all platforms"],ans:0,exp:"-Wall enables most common warnings."},{q:"Which container gives O(1) average lookup by key?",opts:["std::map","std::vector","std::unordered_map","std::list"],ans:2,exp:"unordered_map uses a hash table."},{q:"What does override do?",opts:["Marks a virtual method","Tells the compiler to verify the signature matches a base virtual","Prevents inheritance","Inlines the method"],ans:1,exp:"override asks the compiler to confirm you are overriding a virtual."},{q:"What is RAII?",opts:["A namespace","A pattern where resources are released in destructors","A template trick","An exception type"],ans:1,exp:"RAII ties resource lifetime to object lifetime."},{q:"What is the type of auto x = 3.14;?",opts:["int","double","float","long"],ans:1,exp:"3.14 is a double literal."},{q:"How do you mark a function that cannot throw?",opts:["const","noexcept","final","inline"],ans:1,exp:"noexcept tells the compiler and callers it won't throw."},{q:"Which header has std::sort?",opts:["<vector>","<algorithm>","<numeric>","<utility>"],ans:1,exp:"std::sort lives in <algorithm>."}]};function r(){return e.jsx(a,{config:n})}export{r as default};
