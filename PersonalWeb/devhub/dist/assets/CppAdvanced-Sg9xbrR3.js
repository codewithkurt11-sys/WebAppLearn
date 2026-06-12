import{j as e,T as t}from"./index-CNTZnqQQ.js";import{C as a}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const n={title:"C++ Advanced",subtitle:"Modern C++ — smart pointers, move semantics, templates, concurrency.",tagColor:t.sky,lang:"cpp",trackKey:"cpp-adv",pageId:"cpp-adv",sections:[{id:"intro",label:"Introduction",intro:"Advanced C++ is mostly about doing more with less code while staying fast. Modern features like smart pointers, move semantics, and concepts replace whole categories of old-school bugs.",examples:[{title:"Modern C++ mindset",explanation:"Prefer values to pointers, references to copies, RAII to manual cleanup, and the standard library to handwritten loops.",code:`// Old
int* p = new int(42);
// ... delete p;

// Modern
auto p = std::make_unique<int>(42);   // freed automatically`},{title:"Compile-time everything",explanation:"constexpr lets you compute values at compile time, eliminating runtime cost.",code:`constexpr int square(int x) { return x * x; }
constexpr int N = square(8);   // computed at compile time`},{title:"Modules (C++20)",explanation:"Modules replace the old #include text-pasting model with proper imports.",code:`// math.ixx
export module math;
export int add(int a, int b) { return a + b; }

// main.cpp
import math;
int x = add(2, 3);`}]},{id:"vars",label:"Variables & Types",intro:"Advanced types include smart pointers, std::optional, std::variant, and structured bindings.",examples:[{title:"unique_ptr and shared_ptr",explanation:"unique_ptr owns one resource; shared_ptr is reference counted. Both delete the resource when nobody needs it.",code:`auto u = std::make_unique<int>(7);
auto s = std::make_shared<int>(9);
auto s2 = s;   // ref count = 2`},{title:"std::optional",explanation:"An optional represents either a value or 'nothing' without using nullable pointers.",code:`std::optional<int> find(int key) {
    if (key == 1) return 42;
    return std::nullopt;
}
if (auto r = find(1)) std::cout << *r;`},{title:"Structured bindings",explanation:"Unpack pairs, tuples, and structs into named variables in one line.",code:`std::map<std::string,int> m = {{"a",1},{"b",2}};
for (auto& [key, val] : m) {
    std::cout << key << "=" << val << "\\n";
}`}]},{id:"flow",label:"Control Flow",intro:"Algorithms and ranges (C++20) replace much of what you used to write as loops.",examples:[{title:"if-init",explanation:"Declare and check a variable in a single statement — keeps scope tight.",code:`if (auto it = map.find(key); it != map.end()) {
    use(it->second);
}`},{title:"Ranges pipeline (C++20)",explanation:"Compose filters and transforms like a pipeline. Each step is lazy.",code:`#include <ranges>
auto evens = v
    | std::views::filter([](int n){ return n % 2 == 0; })
    | std::views::transform([](int n){ return n * n; });`},{title:"std::accumulate",explanation:"Reduce a range to a single value with a starting seed and a binary op.",code:`#include <numeric>
int sum = std::accumulate(v.begin(), v.end(), 0);`}]},{id:"funcs",label:"Functions",intro:"Templates evolved with concepts, variadic templates, and perfect forwarding.",examples:[{title:"Concepts (C++20)",explanation:"A concept constrains a template to types that satisfy a predicate. Errors become readable.",code:`#include <concepts>
template <std::integral T>
T addOne(T x) { return x + 1; }

addOne(3);     // ok
// addOne("x"); // ERROR: not integral`},{title:"Variadic templates",explanation:"A pack of template parameters lets you write functions that take any number of arguments of any types.",code:`template <typename... Args>
void printAll(Args... args) {
    ((std::cout << args << " "), ...);
}
printAll(1, "two", 3.14);`},{title:"Perfect forwarding",explanation:"std::forward preserves the value category (lvalue/rvalue) of a forwarded argument — critical when wrapping calls.",code:`template <typename T, typename... Args>
T make(Args&&... args) {
    return T(std::forward<Args>(args)...);
}`}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Move semantics, deleted functions, and the rule of zero define modern class design.",examples:[{title:"Move constructor",explanation:"A move constructor steals the resources of a temporary instead of copying them.",code:`class Buffer {
    int* data;
public:
    Buffer(Buffer&& other) noexcept
        : data(other.data) { other.data = nullptr; }
};`},{title:"Delete unwanted operations",explanation:"Mark functions as = delete to prohibit them — e.g. making a class non-copyable.",code:`class Connection {
public:
    Connection(const Connection&) = delete;
    Connection& operator=(const Connection&) = delete;
};`},{title:"Rule of zero",explanation:"If your members are RAII types, you can skip writing destructor / copy / move altogether.",code:`class Player {
    std::string name;
    std::vector<int> scores;   // both manage themselves
};`}],tips:[{type:"tip",text:"Prefer the rule of zero. Write special member functions only when you really need to."}]},{id:"arrays",label:"Arrays & Collections",intro:"Advanced containers include flat_map (C++23), small_vector, and the algorithm/ranges combo.",examples:[{title:"std::span",explanation:"A span is a non-owning view of a contiguous sequence — pass it instead of pointer+length.",code:`#include <span>
void sum(std::span<const int> data) {
    int s = 0;
    for (int n : data) s += n;
}`},{title:"emplace_back vs push_back",explanation:"emplace_back constructs in place using the arguments, avoiding a temporary copy.",code:`std::vector<std::pair<int,std::string>> v;
v.emplace_back(1, "hello");   // builds in place`},{title:"Erase-remove idiom (pre-C++20)",explanation:"Erase elements matching a predicate from a vector. C++20 simplifies this with std::erase_if.",code:`v.erase(std::remove_if(v.begin(), v.end(),
    [](int x){ return x < 0; }), v.end());

// C++20:
std::erase_if(v, [](int x){ return x < 0; });`}]},{id:"errors",label:"Error Handling",intro:"Modern error handling balances exceptions with std::expected (C++23) and noexcept for performance-critical code.",examples:[{title:"std::expected (C++23)",explanation:"Return either a value or an error without exceptions — like Rust's Result.",code:`#include <expected>
std::expected<int,std::string> parse(const std::string& s) {
    if (s.empty()) return std::unexpected("empty");
    return std::stoi(s);
}`},{title:"Exception safety guarantees",explanation:"Document whether a function offers no-throw, strong, or basic guarantees — it's part of the API.",code:`// Strong guarantee: either succeeds, or state is unchanged
void push(T v) {
    auto tmp = data;
    tmp.push_back(v);   // may throw
    data = std::move(tmp);
}`},{title:"swap-and-throw",explanation:"A common technique: build the new state in a temporary, then swap. If construction throws, the original is untouched.",code:`void replace(std::vector<int> newData) {
    data.swap(newData);   // noexcept
}`}]},{id:"project",label:"Mini Project",intro:"Build a tiny thread-safe job queue — uses templates, mutexes, condition variables, and move semantics.",examples:[{title:"Project: thread-safe queue",explanation:"We expose push() and pop() across threads. push notifies a waiting pop using a condition variable.",code:`#include <queue>
#include <mutex>
#include <condition_variable>

template <typename T>
class JobQueue {
    std::queue<T> q;
    mutable std::mutex m;
    std::condition_variable cv;
public:
    void push(T v) {
        {
            std::lock_guard<std::mutex> lk(m);
            q.push(std::move(v));
        }
        cv.notify_one();
    }
    T pop() {
        std::unique_lock<std::mutex> lk(m);
        cv.wait(lk, [this]{ return !q.empty(); });
        T v = std::move(q.front());
        q.pop();
        return v;
    }
};`}],tips:[{type:"warn",text:"Always lock before touching shared state, even reads. Race conditions are undefined behaviour."}]}],quiz:[{q:"Which pointer is reference-counted?",opts:["std::unique_ptr","std::shared_ptr","std::weak_ptr*","Raw pointer"],ans:1,exp:"shared_ptr counts references."},{q:"What does std::move do?",opts:["Copies","Casts to rvalue reference so resources can be transferred","Frees memory","Renames a variable"],ans:1,exp:"It casts a value to an rvalue so a move constructor can run."},{q:"constexpr means…",opts:["Constant at runtime","Can be evaluated at compile time","Thread safe","Inlined"],ans:1,exp:"constexpr may be evaluated at compile time."},{q:"What does = delete do?",opts:["Frees memory","Removes the function from the API","Marks override","Makes a class abstract"],ans:1,exp:"= delete prohibits the function."},{q:"Which is correct about std::span?",opts:["It owns its data","It is a non-owning view","It allocates on the heap","It is reference-counted"],ans:1,exp:"span is a lightweight view."},{q:"What is a concept?",opts:["A class type","A compile-time constraint on a template parameter","A namespace","A macro"],ans:1,exp:"A concept constrains template parameters."},{q:"What is the rule of zero?",opts:["Avoid all classes","Let RAII members handle special functions so you write none","Always delete copy ops","Never throw exceptions"],ans:1,exp:"Rely on your members' special member functions when possible."},{q:"What does std::accumulate need from <numeric>?",opts:["A container, begin, end","A range and a seed","Begin, end, seed and op","Nothing"],ans:2,exp:"accumulate takes begin, end, seed, and an optional binary op."}]};function r(){return e.jsx(a,{config:n})}export{r as default};
