import{j as e,T as a}from"./index-CNTZnqQQ.js";import{C as t}from"./CourseTemplate-BmaL7IWO.js";import"./shared-Cgke19x4.js";const n={title:"C# Advanced",subtitle:"Async/await, spans, source generators, and parallelism — the modern .NET toolkit.",tagColor:a.rose,lang:"cs",trackKey:"cs-adv",pageId:"cs-adv",sections:[{id:"intro",label:"Introduction",intro:"Advanced C# leans heavily on async/await and the Task Parallel Library. Performance-sensitive code uses Span<T>, Memory<T>, and zero-allocation patterns.",examples:[{title:"async Main",explanation:"Modern entry points can be async. The runtime awaits the returned Task before exiting.",code:`using System.Net.Http;

static async Task Main() {
    var http = new HttpClient();
    var text = await http.GetStringAsync("https://example.com");
    Console.WriteLine(text.Length);
}`},{title:"ValueTask vs Task",explanation:"ValueTask avoids allocation when the result is often already available. Use it on hot paths.",code:`ValueTask<int> ReadCachedOrLoadAsync() {
    if (_cached.HasValue) return new ValueTask<int>(_cached.Value);
    return new ValueTask<int>(LoadAsync());
}`},{title:"Cancellation",explanation:"Pass CancellationToken through async methods so callers can stop long-running work.",code:`async Task DoWorkAsync(CancellationToken ct) {
    while (!ct.IsCancellationRequested) {
        await Task.Delay(100, ct);
    }
}`}]},{id:"vars",label:"Variables & Types",intro:"Spans give you safe, fast access to slices of arrays and strings without copying.",examples:[{title:"Span<T>",explanation:"Span<T> is a stack-only view of contiguous memory. Slicing is free.",code:`Span<int> nums = stackalloc int[] { 1, 2, 3, 4, 5 };
var middle = nums.Slice(1, 3);   // {2,3,4}`},{title:"ref struct",explanation:"A ref struct can never be boxed or stored on the heap. It enforces span-like guarantees.",code:`public ref struct LineReader {
    private ReadOnlySpan<char> _buffer;
    public LineReader(ReadOnlySpan<char> buf) { _buffer = buf; }
}`},{title:"Generic constraints",explanation:"where clauses constrain T to specific kinds of types — useful for safe generic APIs.",code:`T Min<T>(T a, T b) where T : IComparable<T>
    => a.CompareTo(b) <= 0 ? a : b;`}]},{id:"flow",label:"Control Flow",intro:"Async streams, parallel loops, and channels let you express concurrent workflows clearly.",examples:[{title:"await foreach",explanation:"An async iterator yields values asynchronously. await foreach consumes them.",code:`async IAsyncEnumerable<int> StreamAsync() {
    for (int i = 0; i < 5; i++) {
        await Task.Delay(100);
        yield return i;
    }
}

await foreach (var n in StreamAsync())
    Console.WriteLine(n);`},{title:"Parallel.ForEach",explanation:"Run an action on each item in parallel across multiple threads.",code:`Parallel.ForEach(urls, url => {
    var data = http.GetString(url);
    Process(data);
});`},{title:"Channels",explanation:"System.Threading.Channels.Channel<T> is a high-performance producer/consumer queue.",code:`var ch = Channel.CreateUnbounded<int>();
_ = Task.Run(async () => {
    for (int i = 0; i < 5; i++) await ch.Writer.WriteAsync(i);
    ch.Writer.Complete();
});
await foreach (var n in ch.Reader.ReadAllAsync())
    Console.WriteLine(n);`}]},{id:"funcs",label:"Functions",intro:"Local functions, ref returns, and source generators expand what methods can express.",examples:[{title:"Local function",explanation:"Declare a helper inside another method. It can access the enclosing locals without capturing them in a closure.",code:`int Outer(int seed) {
    int Helper(int x) => x + seed;
    return Helper(10);
}`},{title:"ref return",explanation:"Return a reference to existing storage so callers can read or modify it directly.",code:`static ref int First(int[] arr) => ref arr[0];

var nums = new[] { 1, 2, 3 };
ref int slot = ref First(nums);
slot = 99;   // nums is now {99,2,3}`},{title:"Async LINQ",explanation:"System.Linq.Async adds .ToListAsync(), .WhereAwait, etc. to IAsyncEnumerable.",code:"var first = await StreamAsync().FirstAsync();"}]},{id:"oop",label:"OOP — Classes & Objects",intro:"Advanced design uses sealed by default, init-only setters, and required members.",examples:[{title:"init-only property",explanation:"init lets a value be set in object initialisers but not changed afterwards.",code:`public class User {
    public string Email { get; init; }
}
var u = new User { Email = "a@b.c" };
// u.Email = "x";   // ERROR`},{title:"Required members (C# 11)",explanation:"required forces callers to set the property in the object initialiser.",code:`public class User {
    public required string Email { get; init; }
}
// var u = new User();   // ERROR: Email required`},{title:"Default interface methods",explanation:"Interfaces can now provide a default implementation that classes inherit unless they override it.",code:`interface ILogger {
    void Log(string msg);
    void Info(string msg) => Log("INFO: " + msg);
}`}]},{id:"arrays",label:"Arrays & Collections",intro:"Advanced collections include ImmutableArray, FrozenSet, and the new collection expressions in C# 12.",examples:[{title:"Collection expression",explanation:"C# 12 lets you build collections with [..] syntax. The compiler picks the best concrete type.",code:`int[] a = [1, 2, 3];
List<int> b = [..a, 4, 5];      // spread
ReadOnlySpan<int> s = [10,20];`},{title:"ImmutableArray<T>",explanation:"ImmutableArray cannot be modified after creation. With-style methods return new instances.",code:`var arr = ImmutableArray.Create(1,2,3);
var arr2 = arr.Add(4);   // arr unchanged`},{title:"AsyncEnumerable.ToListAsync",explanation:"Drain an async sequence into a list with one await.",code:"var list = await StreamAsync().ToListAsync();"}]},{id:"errors",label:"Error Handling",intro:"Advanced error handling means catching the right exceptions, observing aggregate exceptions, and using ConfigureAwait correctly.",examples:[{title:"exception filter",explanation:"Use when to catch only certain matching exceptions, without unwinding the stack first.",code:`try { /* ... */ }
catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound) {
    // handle 404 only
}`},{title:"AggregateException",explanation:"Parallel and Task APIs can throw many exceptions at once, packaged in AggregateException.",code:`try { Parallel.ForEach(items, Work); }
catch (AggregateException ae) {
    foreach (var e in ae.InnerExceptions) Log(e);
}`},{title:"ConfigureAwait(false)",explanation:"In library code, skip the captured sync context to avoid deadlocks and improve performance.",code:"var data = await http.GetStringAsync(url).ConfigureAwait(false);"}]},{id:"project",label:"Mini Project",intro:"Build a tiny async web crawler that fetches a list of URLs in parallel with cancellation and a channel-based result pipeline.",examples:[{title:"Project: async crawler",explanation:"We push results into a channel from many worker tasks and consume them in Main.",code:`using System.Net.Http;
using System.Threading.Channels;

static async Task Main() {
    var urls = new[] {
        "https://example.com",
        "https://example.org",
    };
    using var cts  = new CancellationTokenSource(TimeSpan.FromSeconds(5));
    var http       = new HttpClient();
    var ch         = Channel.CreateUnbounded<(string url, int bytes)>();

    var workers = urls.Select(async u => {
        var s = await http.GetStringAsync(u, cts.Token);
        await ch.Writer.WriteAsync((u, s.Length), cts.Token);
    }).ToList();

    _ = Task.WhenAll(workers).ContinueWith(_ => ch.Writer.Complete());

    await foreach (var r in ch.Reader.ReadAllAsync(cts.Token))
        Console.WriteLine($"{r.url}: {r.bytes} bytes");
}`}],tips:[{type:"warn",text:"Always pass CancellationToken to every async call inside your work loop — without it, cancellation has no effect on hot paths."}]}],quiz:[{q:"What does ValueTask offer over Task?",opts:["Cancellation","No allocation when result is already available","Built-in retry","Synchronous waiting"],ans:1,exp:"ValueTask avoids heap allocation in fast paths."},{q:"What is Span<T>?",opts:["A boxed array","A stack-only view of contiguous memory","A new collection type","A reflection API"],ans:1,exp:"Span<T> is a ref struct that views memory."},{q:"What does ConfigureAwait(false) do?",opts:["Disables awaiting","Skips the captured sync context","Cancels the task","Logs the wait"],ans:1,exp:"Useful in library code to avoid deadlocks."},{q:"What does init on a property mean?",opts:["Always non-null","Can only be set in the initialiser","Lazy initialised","Auto-initialised"],ans:1,exp:"init makes a setter usable only during object initialisation."},{q:"What language keyword catches only specific exceptions inline?",opts:["if","when","filter","throw"],ans:1,exp:"catch (X ex) when (...) is an exception filter."},{q:"Channel<T> is for…",opts:["UI events","Producer/consumer messaging between tasks","DI containers","Configuration"],ans:1,exp:"Channels are high-perf in-process queues."},{q:"What does required do in C# 11?",opts:["Marks a method as virtual","Forces callers to set the member in object initializer","Locks the field","Enables nullable"],ans:1,exp:"required ensures the property must be initialised."},{q:"When iterating IAsyncEnumerable<T>, which keyword do you use?",opts:["foreach await","await foreach","await each","for await"],ans:1,exp:"await foreach consumes async streams."}]};function o(){return e.jsx(t,{config:n})}export{o as default};
