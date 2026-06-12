import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as a}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const n={title:"C++ Basics",subtitle:"Learn the fundamentals of C++ — variables, control flow, functions, and classes.",tagColor:t.sky,lang:"cpp",trackKey:"cpp-basics",pageId:"cpp-basics",sections:[{id:"intro",label:"Introduction",intro:"C++ is a compiled, statically-typed language that runs close to the metal. You declare every variable's type, compile your code, then run the resulting binary. It's fast and predictable, which is why it powers games, browsers, and operating systems.",examples:[{title:"Hello, World!",explanation:"Every C++ program starts at the main() function. We include <iostream> to use std::cout for printing, and end every statement with a semicolon.",code:`#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`},{title:"Using the std namespace",explanation:"Writing std:: in front of every standard name gets noisy. The using directive lets you drop the prefix for the rest of the file.",code:`#include <iostream>
using namespace std;

int main() {
    cout << "C++ is fun" << endl;
    return 0;
}`},{title:"Reading input",explanation:"std::cin reads a value from the keyboard into a variable of the matching type. Combine with cout to make an interactive program.",code:`#include <iostream>
using namespace std;

int main() {
    string name;
    cout << "Your name: ";
    cin >> name;
    cout << "Hi, " << name << "!" << endl;
    return 0;
}`}],tips:[{type:"info",text:"C++ files end in .cpp. Compile with g++ file.cpp -o app then run with ./app."},{type:"tip",text:"main() must return int. Returning 0 means success."}]},{id:"vars",label:"Variables & Types",intro:"C++ requires you to declare a type for every variable. The compiler uses that type to allocate memory and catch bugs at compile time.",examples:[{title:"Primitive types",explanation:"The basic numeric and text types each take a fixed amount of memory. Use int for whole numbers, double for decimals, char for a single character, bool for true/false.",code:`int    age    = 25;
double price  = 9.99;
char   grade  = 'A';
bool   active = true;
std::string name = "Alice";`},{title:"Constants and auto",explanation:"const locks a value so it cannot change. auto asks the compiler to figure out the type from the value you assigned.",code:`const double PI = 3.14159;
auto count = 42;          // int
auto label = "hello";     // const char*
// PI = 3.0;              // ERROR: const cannot be reassigned`},{title:"Type conversion",explanation:"C++ lets you cast between numeric types with static_cast. This is safer than the old C-style (int)x conversion.",code:`double d = 9.7;
int    i = static_cast<int>(d);   // 9 (truncates)
double back = static_cast<double>(i) / 2;  // 4.5`}],tips:[{type:"warn",text:"Uninitialised variables hold garbage. Always set a starting value: int x = 0; not just int x;"}]},{id:"flow",label:"Control Flow",intro:"Control flow decides which lines run, and how many times. C++ has if/else, while, for, and switch — all curly-brace blocks.",examples:[{title:"if / else",explanation:"if checks a boolean condition. else if chains more checks. else runs when nothing else matched.",code:`int score = 78;

if (score >= 90)       std::cout << "A";
else if (score >= 80)  std::cout << "B";
else if (score >= 70)  std::cout << "C";
else                   std::cout << "F";`},{title:"for loop",explanation:"A classic for loop has three parts separated by semicolons: initialise, condition, step. It's perfect for counting.",code:`for (int i = 1; i <= 5; i++) {
    std::cout << "step " << i << std::endl;
}`},{title:"while and break",explanation:"while repeats as long as a condition stays true. break exits the loop immediately.",code:`int n = 0;
while (true) {
    if (n >= 3) break;
    std::cout << n << " ";
    n++;
}`}],tips:[{type:"tip",text:"Always use { } even for one-line if bodies — it prevents the classic dangling-else bug."}]},{id:"funcs",label:"Functions",intro:"A function packages a piece of behaviour behind a name. Declare its return type, name, and parameter types, then call it from anywhere.",examples:[{title:"Defining a function",explanation:"The return type comes first, then the name, then the parameter list. Use return to send back a value.",code:`int add(int a, int b) {
    return a + b;
}

int main() {
    std::cout << add(2, 3);  // 5
    return 0;
}`},{title:"Default parameters",explanation:"Give a parameter a default value with =. Callers can omit it and the default will be used.",code:`void greet(std::string name = "stranger") {
    std::cout << "Hi, " << name << "!\\n";
}

greet();          // Hi, stranger!
greet("Alice");   // Hi, Alice!`},{title:"Pass by reference",explanation:"Adding & to a parameter means the function works on the original variable, not a copy. Great for editing data in place.",code:`void doubleIt(int& x) {
    x = x * 2;
}

int n = 5;
doubleIt(n);
// n is now 10`}],tips:[{type:"info",text:"Function names should describe what they do: calculatePrice, not cp."}]},{id:"oop",label:"OOP — Classes & Objects",intro:"A class is a blueprint for an object — it bundles related data (fields) and behaviour (methods). Objects are instances of a class.",examples:[{title:"Defining a class",explanation:"public members are accessible from outside. The constructor (same name as the class) runs when you create an object.",code:`class Dog {
public:
    std::string name;
    int age;

    Dog(std::string n, int a) {
        name = n;
        age  = a;
    }

    void bark() {
        std::cout << name << " says woof!\\n";
    }
};

Dog d("Rex", 3);
d.bark();`},{title:"Private fields",explanation:"Use private for data the outside world should not touch directly. Expose it through methods so the class controls access.",code:`class Counter {
private:
    int value = 0;
public:
    void inc() { value++; }
    int  get() { return value; }
};`},{title:"Inheritance",explanation:"A derived class inherits everything from the base. Override behaviour by re-declaring methods.",code:`class Animal {
public:
    void eat() { std::cout << "munch\\n"; }
};

class Cat : public Animal {
public:
    void meow() { std::cout << "meow\\n"; }
};

Cat c;
c.eat();   // inherited
c.meow();  // own method`}],tips:[{type:"tip",text:"Keep fields private and expose getters/setters. It's called encapsulation and prevents bugs at scale."}]},{id:"arrays",label:"Arrays & Collections",intro:"Arrays hold a fixed number of values of the same type. For dynamic, growable lists prefer std::vector from <vector>.",examples:[{title:"Fixed-size array",explanation:"Declare an array with the type, name, and size in brackets. Access elements with [i] — indices start at 0.",code:`int scores[3] = {90, 85, 78};
std::cout << scores[0]  << std::endl;  // 90
std::cout << scores[2]  << std::endl;  // 78`},{title:"std::vector",explanation:"A vector grows on demand. Use push_back to append, size() to ask how many items it has.",code:`#include <vector>

std::vector<int> nums = {1, 2, 3};
nums.push_back(4);

for (int n : nums) std::cout << n << " ";
// 1 2 3 4`},{title:"Looping with index",explanation:"A classic for loop gives you both the index and the value, which is useful when you need to know where you are.",code:`std::vector<std::string> names = {"Ana", "Bo", "Cy"};
for (int i = 0; i < names.size(); i++) {
    std::cout << i << ": " << names[i] << "\\n";
}`}],tips:[{type:"warn",text:"Going past the end of an array is undefined behaviour. Always check the index against size()."}]},{id:"errors",label:"Error Handling",intro:"C++ uses try / catch with thrown exceptions to signal problems your code cannot handle locally.",examples:[{title:"throw and catch",explanation:"throw raises an exception. The nearest enclosing catch block with a matching type runs instead of the rest of try.",code:`#include <stdexcept>

try {
    throw std::runtime_error("something broke");
} catch (const std::exception& e) {
    std::cout << "Caught: " << e.what() << "\\n";
}`},{title:"Multiple catch blocks",explanation:"Chain catch blocks for different exception types. The first matching one runs.",code:`try {
    /* ... */
} catch (const std::invalid_argument& e) {
    std::cout << "bad input\\n";
} catch (const std::exception& e) {
    std::cout << "other error\\n";
}`},{title:"Validating input",explanation:"Throw an exception when input does not meet your function's contract, so callers cannot ignore the problem.",code:`int safeDivide(int a, int b) {
    if (b == 0) throw std::invalid_argument("divide by zero");
    return a / b;
}`}],tips:[{type:"info",text:"Catch by const reference (const std::exception&) to avoid slicing and unnecessary copies."}]},{id:"project",label:"Mini Project",intro:"Combine everything into a small command-line app — a temperature converter with menu, classes, and input validation.",examples:[{title:"Project: temperature converter",explanation:"We define a Converter class, read a menu choice, and print the converted value. This mixes I/O, control flow, classes, and basic math.",code:`#include <iostream>
using namespace std;

class Converter {
public:
    double cToF(double c) { return c * 9.0 / 5 + 32; }
    double fToC(double f) { return (f - 32) * 5.0 / 9; }
};

int main() {
    Converter conv;
    int choice;
    double value;

    cout << "1) C to F   2) F to C\\nPick: ";
    cin  >> choice;
    cout << "Temperature: ";
    cin  >> value;

    if      (choice == 1) cout << conv.cToF(value) << " F\\n";
    else if (choice == 2) cout << conv.fToC(value) << " C\\n";
    else                  cout << "invalid choice\\n";
}`}],tips:[{type:"tip",text:"Extend this: keep looping until the user types q, or add Kelvin support as a third method."}]}],quiz:[{q:"Which header gives you std::cout?",opts:["<string>","<iostream>","<vector>","<stdio.h>"],ans:1,exp:"<iostream> provides cin and cout."},{q:"What does every C++ statement end with?",opts:[".",";",":","newline"],ans:1,exp:"Statements end with a semicolon."},{q:"Which keyword prevents a variable from being reassigned?",opts:["static","let","const","final"],ans:2,exp:"const locks the value."},{q:"What does static_cast<int>(9.7) produce?",opts:["10","9","9.7","Error"],ans:1,exp:"Converting double to int truncates toward zero."},{q:"How do you access the 3rd element of int a[5]?",opts:["a(3)","a[3]","a[2]","a.at(3)"],ans:2,exp:"Indices start at 0, so the 3rd element is a[2]."},{q:"Which class member access keyword hides data from outside code?",opts:["public","private","static","open"],ans:1,exp:"private fields are only accessible inside the class."},{q:"What does void doubleIt(int& x) mean for x?",opts:["x is a copy","x is read-only","x is the original variable (by reference)","x is a pointer"],ans:2,exp:"& makes x a reference — changes affect the caller's variable."},{q:'Which type of exception does throw std::runtime_error("x") raise?',opts:["std::logic_error","std::runtime_error","int","std::string"],ans:1,exp:"runtime_error is a standard library exception class."}]};function r(){return e.jsx(a,{config:n})}export{r as default};
