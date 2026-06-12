import{r as d,j as t,T as e}from"./index-CNTZnqQQ.js";import{P as c,T as p,a as o,b as a,Q as k,C as r,c as n,I as u}from"./shared-Cgke19x4.js";const g=[{id:"intro",label:"What is Tkinter?"},{id:"widgets",label:"Widgets"},{id:"layout",label:"Layout"},{id:"events",label:"Events"},{id:"vars",label:"Variables"},{id:"apps",label:"Full Apps"},{id:"quiz",label:"Quiz 🎯"}],f=[{q:"What is the root window in Tkinter?",opts:["A file","The main application window","A widget type","A layout manager"],ans:1,exp:"tk.Tk() creates the root window — the main application window that contains all other widgets."},{q:"Which method starts the GUI event loop?",opts:["root.start()","root.show()","root.mainloop()","root.run()"],ans:2,exp:"root.mainloop() starts the event loop that keeps the window open and responds to user interactions."},{q:"Which layout manager places widgets in a grid?",opts:["pack()","place()","grid()","frame()"],ans:2,exp:"grid() places widgets in rows and columns. pack() stacks them. place() uses exact coordinates."},{q:"How do you read the current value from an Entry widget?",opts:["entry.value","entry.text()","entry.get()","entry.read()"],ans:2,exp:"entry.get() returns the current text. entry.delete(0, tk.END) clears it. entry.insert(0, text) sets it."},{q:"What does StringVar() do?",opts:["Creates a string constant","Creates an observable variable linked to widgets","Stores text to a file","Creates a text widget"],ans:1,exp:"StringVar() is a special Tkinter variable. When it changes, any widget linked with textvariable= automatically updates."},{q:"Which widget displays multi-line text input?",opts:["Entry","Label","Text","Multiline"],ans:2,exp:"Text widget is for multi-line input/display. Entry is single-line. Label just shows text."},{q:"How do you add padding around a widget?",opts:["widget.padding(10)","pack(padding=10)","pack(padx=10, pady=10)","margin=10"],ans:2,exp:"padx and pady add horizontal/vertical padding outside the widget. ipadx/ipady add internal padding."},{q:"Which method shows a pop-up message box?",opts:["tk.alert()","messagebox.showinfo()","root.popup()","dialog.show()"],ans:1,exp:"from tkinter import messagebox — then messagebox.showinfo('Title', 'Message') shows a dialog."},{q:"How do you open a file selection dialog in Tkinter?",opts:["tk.FileDialog()","root.openFile()","filedialog.askopenfilename()","input.file()"],ans:2,exp:"from tkinter import filedialog — then filedialog.askopenfilename() opens the OS file picker and returns the selected path as a string."},{q:"What does widget.configure() (or widget.config()) do?",opts:["Creates a new widget","Destroys the widget","Changes widget properties after creation","Reads the current widget state"],ans:2,exp:"configure() lets you change a widget's properties after it's been created. widget.config(text='New text') changes the text, widget.config(bg='red') changes background, etc."}];function x(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"🖥 What is Tkinter?"}),t.jsxs("p",{style:{fontSize:12.5,color:e.muted2,lineHeight:1.65,marginBottom:10},children:["Tkinter is Python's ",t.jsx("strong",{style:{color:e.text},children:"built-in GUI framework"}),". It lets you create desktop applications with windows, buttons, text boxes, menus, and more — using only Python. No extra installation needed."]}),t.jsxs(u,{type:"info",children:["Tkinter comes built into Python on Windows and macOS. On Linux: ",t.jsx(n,{children:"sudo apt install python3-tk"})]})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Hello World Window"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

# 1. Create the root window
root = tk.Tk()
root.title("My First App")   # window title
root.geometry("400x300")     # width x height
root.configure(bg="#1a1a2e") # background color

# 2. Add a widget
label = tk.Label(
    root,
    text="Hello, Tkinter! 👋",
    font=("Arial", 18, "bold"),
    fg="white",
    bg="#1a1a2e",
)
label.pack(pady=40)          # center with padding

btn = tk.Button(
    root,
    text="Click Me",
    command=lambda: label.config(text="You clicked it! 🎉"),
    bg="#7c6dfa",
    fg="white",
    font=("Arial", 12),
    padx=20, pady=8,
    relief="flat",
)
btn.pack()

# 3. Start the event loop
root.mainloop()              # keeps window open`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Anatomy of a Tkinter App"}),t.jsx("div",{style:{fontFamily:"'Fira Code',monospace",fontSize:12},children:[{term:"Root Window",sub:"tk.Tk()",desc:"The main application window",color:e.sky},{term:"Widget",sub:"Label, Button, Entry...",desc:"UI elements inside the window",color:e.accent},{term:"Layout Manager",sub:"pack() / grid() / place()",desc:"Controls where widgets appear",color:e.green},{term:"Event Loop",sub:"root.mainloop()",desc:"Keeps window open, handles clicks/keys",color:e.amber},{term:"Callback",sub:"command=my_function",desc:"Function that runs on user action",color:e.rose}].map(i=>t.jsxs("div",{style:{display:"flex",gap:12,padding:"7px 0",borderBottom:`1px solid ${e.border}`,alignItems:"flex-start"},children:[t.jsxs("div",{style:{minWidth:130,flexShrink:0},children:[t.jsx("div",{style:{color:i.color,fontWeight:700,fontSize:11.5},children:i.term}),t.jsx("div",{style:{color:e.muted,fontSize:10},children:i.sub})]}),t.jsx("div",{style:{color:e.muted2,fontSize:11.5},children:i.desc})]},i.term))})]})]})}function m(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Core Widgets"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

root = tk.Tk()

# Label — display text or image
label = tk.Label(root, text="Hello!", font=("Arial",14), fg="#aaa")

# Button — clickable
btn = tk.Button(root, text="Submit", command=my_func,
               bg="#7c6dfa", fg="white", relief="flat")

# Entry — single-line text input
entry = tk.Entry(root, width=30, font=("Arial",12))
entry.insert(0, "placeholder text")  # default text
value = entry.get()                   # read current text
entry.delete(0, tk.END)              # clear

# Text — multi-line text area
text = tk.Text(root, height=8, width=40, wrap=tk.WORD)
text.insert("1.0", "Initial text")   # insert at line 1 char 0
content = text.get("1.0", tk.END)    # read all text

# Checkbutton
var = tk.BooleanVar()
check = tk.Checkbutton(root, text="I agree", variable=var)
print(var.get())   # True or False

# Radiobutton
choice = tk.StringVar(value="option1")
for val, label_text in [("option1","Option A"),("option2","Option B")]:
    tk.Radiobutton(root, text=label_text, variable=choice,
                   value=val).pack()
print(choice.get())  # "option1" or "option2"

# Listbox
listbox = tk.Listbox(root, height=5)
for item in ["Python","Flask","SQLite"]:
    listbox.insert(tk.END, item)
selected = listbox.get(listbox.curselection())

# Combobox (dropdown) — from ttk
from tkinter import ttk
combo = ttk.Combobox(root, values=["Python","JS","Rust"])
combo.set("Python")  # default`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Visual Styling"}),t.jsx(r,{lang:"py",showLines:!0,code:`# Common style options for most widgets:
widget = tk.Button(
    root,
    text       = "Click Me",
    font       = ("Arial", 14, "bold"),   # family, size, style
    fg         = "#ffffff",               # text color
    bg         = "#7c6dfa",               # background
    activebackground = "#6558e0",         # hover bg
    activeforeground = "#ffffff",         # hover text
    relief     = "flat",  # flat|raised|sunken|groove|ridge
    cursor     = "hand2",                 # pointer on hover
    padx       = 20,                      # horizontal padding
    pady       = 10,                      # vertical padding
    borderwidth= 0,                       # border width
    width      = 15,                      # in characters
)

# Dark theme helpers
DARK = {"bg":"#0f0f1a","fg":"#e2e8f0"}
ACCENT = {"bg":"#7c6dfa","fg":"white"}`})]})]})}function b(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"pack() — Stack Widgets"}),t.jsx(r,{lang:"py",showLines:!0,code:`# pack() — simplest, stacks widgets

# Stack vertically (default)
tk.Label(root, text="Top").pack()
tk.Label(root, text="Middle").pack()
tk.Label(root, text="Bottom").pack()

# Options
btn.pack(
    side    = tk.TOP,    # TOP|BOTTOM|LEFT|RIGHT
    fill    = tk.X,      # X|Y|BOTH|NONE (expand to fill)
    expand  = True,      # take up extra space
    padx    = 10,        # outer horizontal padding
    pady    = 5,         # outer vertical padding
    ipadx   = 10,        # inner horizontal padding
    ipady   = 5,         # inner vertical padding
)

# Side by side
btn1.pack(side=tk.LEFT, padx=5)
btn2.pack(side=tk.LEFT, padx=5)
btn3.pack(side=tk.RIGHT)`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"grid() — Row & Column Layout"}),t.jsx(r,{lang:"py",showLines:!0,code:`# grid() — rows and columns, like a table

# Simple form layout
tk.Label(root, text="Name:").grid(row=0, column=0, sticky="e")
tk.Entry(root).grid(row=0, column=1, padx=5, pady=3)

tk.Label(root, text="Email:").grid(row=1, column=0, sticky="e")
tk.Entry(root).grid(row=1, column=1, padx=5, pady=3)

tk.Label(root, text="Age:").grid(row=2, column=0, sticky="e")
tk.Entry(root).grid(row=2, column=1, padx=5, pady=3)

tk.Button(root, text="Submit").grid(
    row=3, column=0, columnspan=2, pady=10
)

# sticky = which sides to stick to: "w","e","n","s","we","nsew"
# columnspan = span multiple columns
# rowspan = span multiple rows

# Make columns resizable
root.columnconfigure(1, weight=1)  # column 1 expands`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Frame — Group Widgets"}),t.jsx(r,{lang:"py",showLines:!0,code:`# Frame — a container widget for grouping

top_frame = tk.Frame(root, bg="#1a1a2e", pady=10)
top_frame.pack(fill=tk.X)

bottom_frame = tk.Frame(root, bg="#0f0f1a")
bottom_frame.pack(fill=tk.BOTH, expand=True)

# Add widgets to frames
tk.Label(top_frame, text="Header", bg="#1a1a2e",
         fg="white", font=("Arial",16,"bold")).pack()

tk.Button(bottom_frame, text="Action 1").pack(side=tk.LEFT)
tk.Button(bottom_frame, text="Action 2").pack(side=tk.LEFT)

# LabelFrame — frame with a border label
group = tk.LabelFrame(root, text="Settings", padx=10, pady=10)
group.pack(padx=10, pady=10)
tk.Checkbutton(group, text="Dark mode").pack()`})]})]})}function h(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"⚡ Events & Bindings"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

root = tk.Tk()

# Button command — simplest
btn = tk.Button(root, text="Click", command=on_click)

# bind() — any widget, any event
label = tk.Label(root, text="Hover me")
label.bind("<Enter>",  on_hover)    # mouse enters
label.bind("<Leave>",  on_leave)    # mouse leaves
label.bind("<Button-1>", on_click)  # left click
label.bind("<Button-3>", on_right)  # right click
label.bind("<Double-Button-1>", on_double)  # double click

# Keyboard events
root.bind("<Return>",  lambda e: print("Enter pressed"))
root.bind("<Escape>",  lambda e: root.quit())
root.bind("<KeyPress>",lambda e: print(e.char, e.keysym))

# Event object (e) gives you info:
# e.widget  — which widget triggered
# e.x, e.y  — mouse position
# e.char    — character pressed
# e.keysym  — key name ("Return","Escape","Left"...)

def on_click(event):
    print(f"Clicked at ({event.x}, {event.y})")
    event.widget.config(bg="green")  # change the clicked widget`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"after() — Timers & Animation"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

root = tk.Tk()
count = 0
label = tk.Label(root, text="0", font=("Arial",48))
label.pack(pady=40)

def tick():
    global count
    count += 1
    label.config(text=str(count))
    root.after(1000, tick)   # call tick() again after 1000ms

tick()                       # start the loop
root.mainloop()

# after(ms, callback) — schedule a function call
# after_cancel(id)    — cancel a scheduled call

# Progress bar using after()
from tkinter import ttk
pbar = ttk.Progressbar(root, length=300, mode="determinate")
pbar.pack()

def advance():
    if pbar["value"] < 100:
        pbar["value"] += 5
        root.after(100, advance)

advance()`})]})]})}function y(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Tkinter Variables — Live Binding"}),t.jsxs("p",{style:{fontSize:12.5,color:e.muted2,lineHeight:1.65,marginBottom:10},children:["Tkinter variables (",t.jsx(n,{children:"StringVar"}),", ",t.jsx(n,{children:"IntVar"}),", etc.) automatically update linked widgets when they change — like reactive state."]}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

root = tk.Tk()

# StringVar — for text
name_var = tk.StringVar(value="World")

# Link to Entry: changing the entry updates name_var
entry = tk.Entry(root, textvariable=name_var)
entry.pack(padx=10, pady=5)

# Link to Label: automatically shows current value
label = tk.Label(root, textvariable=name_var)
label.pack()

# Read the value
print(name_var.get())     # "World"

# Set the value (updates all linked widgets!)
name_var.set("Alice")

# Trace — call function when value changes
def on_change(*args):
    print("Changed to:", name_var.get())

name_var.trace("w", on_change)   # "w" = on write

# Other variable types:
score   = tk.IntVar(value=0)     # integers
price   = tk.DoubleVar(value=0.) # floats
active  = tk.BooleanVar(value=True)  # bool (for Checkbutton)`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"Live Calculator Example"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

root = tk.Tk()
root.title("Live Calculator")

a_var = tk.StringVar(value="0")
b_var = tk.StringVar(value="0")
result_var = tk.StringVar(value="= 0")

def update(*args):
    try:
        a = float(a_var.get())
        b = float(b_var.get())
        result_var.set(f"= {a + b}")
    except ValueError:
        result_var.set("= ?")

a_var.trace("w", update)   # recalculate on any change
b_var.trace("w", update)

tk.Label(root, text="A:").grid(row=0, column=0)
tk.Entry(root, textvariable=a_var).grid(row=0, column=1)

tk.Label(root, text="B:").grid(row=1, column=0)
tk.Entry(root, textvariable=b_var).grid(row=1, column=1)

tk.Label(root, textvariable=result_var,
         font=("Arial",18,"bold"),
         fg="#7c6dfa").grid(row=2, columnspan=2, pady=10)

root.mainloop()`})]})]})}function w(){return t.jsxs(t.Fragment,{children:[t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"📋 Full App: To-Do List"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk
from tkinter import messagebox

class TodoApp:
    def __init__(self, root):
        self.root = root
        self.root.title("To-Do List")
        self.root.geometry("400x500")
        self.root.configure(bg="#0f0f1a")
        self.setup_ui()

    def setup_ui(self):
        # Header
        tk.Label(
            self.root, text="My To-Do List",
            font=("Arial",18,"bold"),
            fg="#7c6dfa", bg="#0f0f1a"
        ).pack(pady=(20,10))

        # Input row
        frame = tk.Frame(self.root, bg="#0f0f1a")
        frame.pack(fill=tk.X, padx=15)

        self.entry = tk.Entry(
            frame, font=("Arial",13),
            bg="#1a1a2e", fg="white",
            relief="flat", bd=5,
        )
        self.entry.pack(side=tk.LEFT, fill=tk.X, expand=True)
        self.entry.bind("<Return>", lambda e: self.add_task())

        tk.Button(
            frame, text="Add", command=self.add_task,
            bg="#7c6dfa", fg="white",
            relief="flat", padx=12,
        ).pack(side=tk.LEFT, padx=(5,0))

        # Listbox
        self.listbox = tk.Listbox(
            self.root, font=("Arial",12),
            bg="#1a1a2e", fg="#e2e8f0",
            selectbackground="#7c6dfa",
            relief="flat", bd=10,
        )
        self.listbox.pack(fill=tk.BOTH, expand=True,
                          padx=15, pady=10)

        # Delete button
        tk.Button(
            self.root, text="Delete Selected",
            command=self.delete_task,
            bg="#f43f5e", fg="white",
            relief="flat", pady=8,
        ).pack(fill=tk.X, padx=15, pady=(0,15))

    def add_task(self):
        task = self.entry.get().strip()
        if not task:
            messagebox.showwarning("Empty", "Enter a task first!")
            return
        self.listbox.insert(tk.END, f"  ☐  {task}")
        self.entry.delete(0, tk.END)

    def delete_task(self):
        sel = self.listbox.curselection()
        if not sel:
            messagebox.showinfo("Info", "Select a task first")
            return
        self.listbox.delete(sel[0])

if __name__ == "__main__":
    root = tk.Tk()
    app  = TodoApp(root)
    root.mainloop()`})]}),t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"📊 Full App: Unit Converter"}),t.jsx(r,{lang:"py",showLines:!0,code:`import tkinter as tk

conversions = {
    "km → miles":  lambda x: x * 0.621371,
    "miles → km":  lambda x: x * 1.60934,
    "°C → °F":     lambda x: x * 9/5 + 32,
    "°F → °C":     lambda x: (x - 32) * 5/9,
    "kg → lbs":    lambda x: x * 2.20462,
    "lbs → kg":    lambda x: x * 0.453592,
}

root = tk.Tk()
root.title("Unit Converter")
root.geometry("320x260")
root.configure(bg="#0f0f1a")

input_var  = tk.StringVar()
result_var = tk.StringVar(value="Result appears here")
mode_var   = tk.StringVar(value=list(conversions.keys())[0])

def convert(*_):
    try:
        val    = float(input_var.get())
        mode   = mode_var.get()
        result = conversions[mode](val)
        result_var.set(f"{val} → {result:.4f}")
    except ValueError:
        result_var.set("Enter a number")

input_var.trace("w", convert)
mode_var.trace("w", convert)

from tkinter import ttk
ttk.Combobox(
    root, textvariable=mode_var,
    values=list(conversions.keys()),
    state="readonly", width=18,
).pack(pady=(20,10))

tk.Entry(
    root, textvariable=input_var,
    font=("Arial",16), width=14,
    justify="center",
).pack(pady=5)

tk.Label(
    root, textvariable=result_var,
    font=("Arial",14,"bold"),
    fg="#7c6dfa", bg="#0f0f1a",
).pack(pady=20)

root.mainloop()`})]})]})}function T(){const[i,l]=d.useState(()=>{try{return localStorage.getItem("cif_tab_tkinter")??"intro"}catch{return"intro"}}),s={intro:t.jsx(x,{}),widgets:t.jsx(m,{}),layout:t.jsx(b,{}),events:t.jsx(h,{}),vars:t.jsx(y,{}),apps:t.jsx(w,{})};return t.jsxs("div",{children:[t.jsx(c,{eyebrow:"GUI · Tkinter · Beginner",title:"Tkinter",sub:"Build desktop apps with Python's built-in GUI toolkit — widgets, layouts, events, full apps",color:e.sky}),t.jsxs("div",{style:{padding:"0 24px 40px"},children:[t.jsx("p",{style:{fontSize:13,color:e.muted2,lineHeight:1.7,marginBottom:20},children:"Most Python tutorials only teach you to write scripts that run in a terminal. Tkinter lets you wrap those scripts in a real windowed app with buttons, input fields, and menus — without learning a new language. It's also built into Python, so there's nothing to install."}),t.jsx(p,{tabs:g,active:i,onChange:l,pageId:"tkinter"}),i==="quiz"?t.jsxs(o,{children:[t.jsx(a,{color:e.sky,children:"🎯 Tkinter Quiz"}),t.jsx(k,{questions:f,trackId:"tkinter"})]}):s[i]]})]})}export{T as default};
