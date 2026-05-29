import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../../shared";

const TABS: Tab[] = [
  { id:"intro",   label:"What is Tkinter?" },
  { id:"widgets", label:"Widgets"          },
  { id:"layout",  label:"Layout"           },
  { id:"events",  label:"Events"           },
  { id:"vars",    label:"Variables"        },
  { id:"apps",    label:"Full Apps"        },
  { id:"quiz",    label:"Quiz 🎯"          },
];

const QUIZ: Question[] = [
  { q:"What is the root window in Tkinter?", opts:["A file","The main application window","A widget type","A layout manager"], ans:1, exp:"tk.Tk() creates the root window — the main application window that contains all other widgets." },
  { q:"Which method starts the GUI event loop?", opts:["root.start()","root.show()","root.mainloop()","root.run()"], ans:2, exp:"root.mainloop() starts the event loop that keeps the window open and responds to user interactions." },
  { q:"Which layout manager places widgets in a grid?", opts:["pack()","place()","grid()","frame()"], ans:2, exp:"grid() places widgets in rows and columns. pack() stacks them. place() uses exact coordinates." },
  { q:"How do you read the current value from an Entry widget?", opts:["entry.value","entry.text()","entry.get()","entry.read()"], ans:2, exp:"entry.get() returns the current text. entry.delete(0, tk.END) clears it. entry.insert(0, text) sets it." },
  { q:"What does StringVar() do?", opts:["Creates a string constant","Creates an observable variable linked to widgets","Stores text to a file","Creates a text widget"], ans:1, exp:"StringVar() is a special Tkinter variable. When it changes, any widget linked with textvariable= automatically updates." },
  { q:"Which widget displays multi-line text input?", opts:["Entry","Label","Text","Multiline"], ans:2, exp:"Text widget is for multi-line input/display. Entry is single-line. Label just shows text." },
  { q:"How do you add padding around a widget?", opts:["widget.padding(10)","pack(padding=10)","pack(padx=10, pady=10)","margin=10"], ans:2, exp:"padx and pady add horizontal/vertical padding outside the widget. ipadx/ipady add internal padding." },
  { q:"Which method shows a pop-up message box?", opts:["tk.alert()","messagebox.showinfo()","root.popup()","dialog.show()"], ans:1, exp:"from tkinter import messagebox — then messagebox.showinfo('Title', 'Message') shows a dialog." },
  { q:"How do you open a file selection dialog in Tkinter?", opts:["tk.FileDialog()","root.openFile()","filedialog.askopenfilename()","input.file()"], ans:2, exp:"from tkinter import filedialog — then filedialog.askopenfilename() opens the OS file picker and returns the selected path as a string." },
  { q:"What does widget.configure() (or widget.config()) do?", opts:["Creates a new widget","Destroys the widget","Changes widget properties after creation","Reads the current widget state"], ans:2, exp:"configure() lets you change a widget's properties after it's been created. widget.config(text='New text') changes the text, widget.config(bg='red') changes background, etc." },
];

function TabIntro() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>🖥 What is Tkinter?</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Tkinter is Python's <strong style={{ color:T.text }}>built-in GUI framework</strong>. It lets you create desktop applications with windows, buttons, text boxes, menus, and more — using only Python. No extra installation needed.
      </p>
      <InfoBox type="info">Tkinter comes built into Python on Windows and macOS. On Linux: <IC>sudo apt install python3-tk</IC></InfoBox>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Hello World Window</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\n# 1. Create the root window\nroot = tk.Tk()\nroot.title("My First App")   # window title\nroot.geometry("400x300")     # width x height\nroot.configure(bg="#1a1a2e") # background color\n\n# 2. Add a widget\nlabel = tk.Label(\n    root,\n    text="Hello, Tkinter! 👋",\n    font=("Arial", 18, "bold"),\n    fg="white",\n    bg="#1a1a2e",\n)\nlabel.pack(pady=40)          # center with padding\n\nbtn = tk.Button(\n    root,\n    text="Click Me",\n    command=lambda: label.config(text="You clicked it! 🎉"),\n    bg="#7c6dfa",\n    fg="white",\n    font=("Arial", 12),\n    padx=20, pady=8,\n    relief="flat",\n)\nbtn.pack()\n\n# 3. Start the event loop\nroot.mainloop()              # keeps window open`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Anatomy of a Tkinter App</CardTitle>
      <div style={{ fontFamily:"'Fira Code',monospace", fontSize:12 }}>
        {[
          { term:"Root Window", sub:"tk.Tk()", desc:"The main application window", color:T.sky },
          { term:"Widget", sub:"Label, Button, Entry...", desc:"UI elements inside the window", color:T.accent },
          { term:"Layout Manager", sub:"pack() / grid() / place()", desc:"Controls where widgets appear", color:T.green },
          { term:"Event Loop", sub:"root.mainloop()", desc:"Keeps window open, handles clicks/keys", color:T.amber },
          { term:"Callback", sub:"command=my_function", desc:"Function that runs on user action", color:T.rose },
        ].map(r => (
          <div key={r.term} style={{ display:"flex", gap:12, padding:"7px 0", borderBottom:`1px solid ${T.border}`, alignItems:"flex-start" }}>
            <div style={{ minWidth:130, flexShrink:0 }}>
              <div style={{ color:r.color, fontWeight:700, fontSize:11.5 }}>{r.term}</div>
              <div style={{ color:T.muted, fontSize:10 }}>{r.sub}</div>
            </div>
            <div style={{ color:T.muted2, fontSize:11.5 }}>{r.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  </>);
}

function TabWidgets() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>Core Widgets</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nroot = tk.Tk()\n\n# Label — display text or image\nlabel = tk.Label(root, text="Hello!", font=("Arial",14), fg="#aaa")\n\n# Button — clickable\nbtn = tk.Button(root, text="Submit", command=my_func,\n               bg="#7c6dfa", fg="white", relief="flat")\n\n# Entry — single-line text input\nentry = tk.Entry(root, width=30, font=("Arial",12))\nentry.insert(0, "placeholder text")  # default text\nvalue = entry.get()                   # read current text\nentry.delete(0, tk.END)              # clear\n\n# Text — multi-line text area\ntext = tk.Text(root, height=8, width=40, wrap=tk.WORD)\ntext.insert("1.0", "Initial text")   # insert at line 1 char 0\ncontent = text.get("1.0", tk.END)    # read all text\n\n# Checkbutton\nvar = tk.BooleanVar()\ncheck = tk.Checkbutton(root, text="I agree", variable=var)\nprint(var.get())   # True or False\n\n# Radiobutton\nchoice = tk.StringVar(value="option1")\nfor val, label_text in [("option1","Option A"),("option2","Option B")]:\n    tk.Radiobutton(root, text=label_text, variable=choice,\n                   value=val).pack()\nprint(choice.get())  # "option1" or "option2"\n\n# Listbox\nlistbox = tk.Listbox(root, height=5)\nfor item in ["Python","Flask","SQLite"]:\n    listbox.insert(tk.END, item)\nselected = listbox.get(listbox.curselection())\n\n# Combobox (dropdown) — from ttk\nfrom tkinter import ttk\ncombo = ttk.Combobox(root, values=["Python","JS","Rust"])\ncombo.set("Python")  # default`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Visual Styling</CardTitle>
      <CodeBlock lang="py" showLines code={`# Common style options for most widgets:\nwidget = tk.Button(\n    root,\n    text       = "Click Me",\n    font       = ("Arial", 14, "bold"),   # family, size, style\n    fg         = "#ffffff",               # text color\n    bg         = "#7c6dfa",               # background\n    activebackground = "#6558e0",         # hover bg\n    activeforeground = "#ffffff",         # hover text\n    relief     = "flat",  # flat|raised|sunken|groove|ridge\n    cursor     = "hand2",                 # pointer on hover\n    padx       = 20,                      # horizontal padding\n    pady       = 10,                      # vertical padding\n    borderwidth= 0,                       # border width\n    width      = 15,                      # in characters\n)\n\n# Dark theme helpers\nDARK = {"bg":"#0f0f1a","fg":"#e2e8f0"}\nACCENT = {"bg":"#7c6dfa","fg":"white"}`}/>
    </Card>
  </>);
}

function TabLayout() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>pack() — Stack Widgets</CardTitle>
      <CodeBlock lang="py" showLines code={`# pack() — simplest, stacks widgets\n\n# Stack vertically (default)\ntk.Label(root, text="Top").pack()\ntk.Label(root, text="Middle").pack()\ntk.Label(root, text="Bottom").pack()\n\n# Options\nbtn.pack(\n    side    = tk.TOP,    # TOP|BOTTOM|LEFT|RIGHT\n    fill    = tk.X,      # X|Y|BOTH|NONE (expand to fill)\n    expand  = True,      # take up extra space\n    padx    = 10,        # outer horizontal padding\n    pady    = 5,         # outer vertical padding\n    ipadx   = 10,        # inner horizontal padding\n    ipady   = 5,         # inner vertical padding\n)\n\n# Side by side\nbtn1.pack(side=tk.LEFT, padx=5)\nbtn2.pack(side=tk.LEFT, padx=5)\nbtn3.pack(side=tk.RIGHT)`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>grid() — Row & Column Layout</CardTitle>
      <CodeBlock lang="py" showLines code={`# grid() — rows and columns, like a table\n\n# Simple form layout\ntk.Label(root, text="Name:").grid(row=0, column=0, sticky="e")\ntk.Entry(root).grid(row=0, column=1, padx=5, pady=3)\n\ntk.Label(root, text="Email:").grid(row=1, column=0, sticky="e")\ntk.Entry(root).grid(row=1, column=1, padx=5, pady=3)\n\ntk.Label(root, text="Age:").grid(row=2, column=0, sticky="e")\ntk.Entry(root).grid(row=2, column=1, padx=5, pady=3)\n\ntk.Button(root, text="Submit").grid(\n    row=3, column=0, columnspan=2, pady=10\n)\n\n# sticky = which sides to stick to: "w","e","n","s","we","nsew"\n# columnspan = span multiple columns\n# rowspan = span multiple rows\n\n# Make columns resizable\nroot.columnconfigure(1, weight=1)  # column 1 expands`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Frame — Group Widgets</CardTitle>
      <CodeBlock lang="py" showLines code={`# Frame — a container widget for grouping\n\ntop_frame = tk.Frame(root, bg="#1a1a2e", pady=10)\ntop_frame.pack(fill=tk.X)\n\nbottom_frame = tk.Frame(root, bg="#0f0f1a")\nbottom_frame.pack(fill=tk.BOTH, expand=True)\n\n# Add widgets to frames\ntk.Label(top_frame, text="Header", bg="#1a1a2e",\n         fg="white", font=("Arial",16,"bold")).pack()\n\ntk.Button(bottom_frame, text="Action 1").pack(side=tk.LEFT)\ntk.Button(bottom_frame, text="Action 2").pack(side=tk.LEFT)\n\n# LabelFrame — frame with a border label\ngroup = tk.LabelFrame(root, text="Settings", padx=10, pady=10)\ngroup.pack(padx=10, pady=10)\ntk.Checkbutton(group, text="Dark mode").pack()`}/>
    </Card>
  </>);
}

function TabEvents() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>⚡ Events & Bindings</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nroot = tk.Tk()\n\n# Button command — simplest\nbtn = tk.Button(root, text="Click", command=on_click)\n\n# bind() — any widget, any event\nlabel = tk.Label(root, text="Hover me")\nlabel.bind("<Enter>",  on_hover)    # mouse enters\nlabel.bind("<Leave>",  on_leave)    # mouse leaves\nlabel.bind("<Button-1>", on_click)  # left click\nlabel.bind("<Button-3>", on_right)  # right click\nlabel.bind("<Double-Button-1>", on_double)  # double click\n\n# Keyboard events\nroot.bind("<Return>",  lambda e: print("Enter pressed"))\nroot.bind("<Escape>",  lambda e: root.quit())\nroot.bind("<KeyPress>",lambda e: print(e.char, e.keysym))\n\n# Event object (e) gives you info:\n# e.widget  — which widget triggered\n# e.x, e.y  — mouse position\n# e.char    — character pressed\n# e.keysym  — key name ("Return","Escape","Left"...)\n\ndef on_click(event):\n    print(f"Clicked at ({event.x}, {event.y})")\n    event.widget.config(bg="green")  # change the clicked widget`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>after() — Timers & Animation</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nroot = tk.Tk()\ncount = 0\nlabel = tk.Label(root, text="0", font=("Arial",48))\nlabel.pack(pady=40)\n\ndef tick():\n    global count\n    count += 1\n    label.config(text=str(count))\n    root.after(1000, tick)   # call tick() again after 1000ms\n\ntick()                       # start the loop\nroot.mainloop()\n\n# after(ms, callback) — schedule a function call\n# after_cancel(id)    — cancel a scheduled call\n\n# Progress bar using after()\nfrom tkinter import ttk\npbar = ttk.Progressbar(root, length=300, mode="determinate")\npbar.pack()\n\ndef advance():\n    if pbar["value"] < 100:\n        pbar["value"] += 5\n        root.after(100, advance)\n\nadvance()`}/>
    </Card>
  </>);
}

function TabVars() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>Tkinter Variables — Live Binding</CardTitle>
      <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65, marginBottom:10 }}>
        Tkinter variables (<IC>StringVar</IC>, <IC>IntVar</IC>, etc.) automatically update linked widgets when they change — like reactive state.
      </p>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nroot = tk.Tk()\n\n# StringVar — for text\nname_var = tk.StringVar(value="World")\n\n# Link to Entry: changing the entry updates name_var\nentry = tk.Entry(root, textvariable=name_var)\nentry.pack(padx=10, pady=5)\n\n# Link to Label: automatically shows current value\nlabel = tk.Label(root, textvariable=name_var)\nlabel.pack()\n\n# Read the value\nprint(name_var.get())     # "World"\n\n# Set the value (updates all linked widgets!)\nname_var.set("Alice")\n\n# Trace — call function when value changes\ndef on_change(*args):\n    print("Changed to:", name_var.get())\n\nname_var.trace("w", on_change)   # "w" = on write\n\n# Other variable types:\nscore   = tk.IntVar(value=0)     # integers\nprice   = tk.DoubleVar(value=0.) # floats\nactive  = tk.BooleanVar(value=True)  # bool (for Checkbutton)`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>Live Calculator Example</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nroot = tk.Tk()\nroot.title("Live Calculator")\n\na_var = tk.StringVar(value="0")\nb_var = tk.StringVar(value="0")\nresult_var = tk.StringVar(value="= 0")\n\ndef update(*args):\n    try:\n        a = float(a_var.get())\n        b = float(b_var.get())\n        result_var.set(f"= {a + b}")\n    except ValueError:\n        result_var.set("= ?")\n\na_var.trace("w", update)   # recalculate on any change\nb_var.trace("w", update)\n\ntk.Label(root, text="A:").grid(row=0, column=0)\ntk.Entry(root, textvariable=a_var).grid(row=0, column=1)\n\ntk.Label(root, text="B:").grid(row=1, column=0)\ntk.Entry(root, textvariable=b_var).grid(row=1, column=1)\n\ntk.Label(root, textvariable=result_var,\n         font=("Arial",18,"bold"),\n         fg="#7c6dfa").grid(row=2, columnspan=2, pady=10)\n\nroot.mainloop()`}/>
    </Card>
  </>);
}

function TabApps() {
  return (<>
    <Card>
      <CardTitle color={T.sky}>📋 Full App: To-Do List</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\nfrom tkinter import messagebox\n\nclass TodoApp:\n    def __init__(self, root):\n        self.root = root\n        self.root.title("To-Do List")\n        self.root.geometry("400x500")\n        self.root.configure(bg="#0f0f1a")\n        self.setup_ui()\n\n    def setup_ui(self):\n        # Header\n        tk.Label(\n            self.root, text="My To-Do List",\n            font=("Arial",18,"bold"),\n            fg="#7c6dfa", bg="#0f0f1a"\n        ).pack(pady=(20,10))\n\n        # Input row\n        frame = tk.Frame(self.root, bg="#0f0f1a")\n        frame.pack(fill=tk.X, padx=15)\n\n        self.entry = tk.Entry(\n            frame, font=("Arial",13),\n            bg="#1a1a2e", fg="white",\n            relief="flat", bd=5,\n        )\n        self.entry.pack(side=tk.LEFT, fill=tk.X, expand=True)\n        self.entry.bind("<Return>", lambda e: self.add_task())\n\n        tk.Button(\n            frame, text="Add", command=self.add_task,\n            bg="#7c6dfa", fg="white",\n            relief="flat", padx=12,\n        ).pack(side=tk.LEFT, padx=(5,0))\n\n        # Listbox\n        self.listbox = tk.Listbox(\n            self.root, font=("Arial",12),\n            bg="#1a1a2e", fg="#e2e8f0",\n            selectbackground="#7c6dfa",\n            relief="flat", bd=10,\n        )\n        self.listbox.pack(fill=tk.BOTH, expand=True,\n                          padx=15, pady=10)\n\n        # Delete button\n        tk.Button(\n            self.root, text="Delete Selected",\n            command=self.delete_task,\n            bg="#f43f5e", fg="white",\n            relief="flat", pady=8,\n        ).pack(fill=tk.X, padx=15, pady=(0,15))\n\n    def add_task(self):\n        task = self.entry.get().strip()\n        if not task:\n            messagebox.showwarning("Empty", "Enter a task first!")\n            return\n        self.listbox.insert(tk.END, f"  ☐  {task}")\n        self.entry.delete(0, tk.END)\n\n    def delete_task(self):\n        sel = self.listbox.curselection()\n        if not sel:\n            messagebox.showinfo("Info", "Select a task first")\n            return\n        self.listbox.delete(sel[0])\n\nif __name__ == "__main__":\n    root = tk.Tk()\n    app  = TodoApp(root)\n    root.mainloop()`}/>
    </Card>
    <Card>
      <CardTitle color={T.sky}>📊 Full App: Unit Converter</CardTitle>
      <CodeBlock lang="py" showLines code={`import tkinter as tk\n\nconversions = {\n    "km → miles":  lambda x: x * 0.621371,\n    "miles → km":  lambda x: x * 1.60934,\n    "°C → °F":     lambda x: x * 9/5 + 32,\n    "°F → °C":     lambda x: (x - 32) * 5/9,\n    "kg → lbs":    lambda x: x * 2.20462,\n    "lbs → kg":    lambda x: x * 0.453592,\n}\n\nroot = tk.Tk()\nroot.title("Unit Converter")\nroot.geometry("320x260")\nroot.configure(bg="#0f0f1a")\n\ninput_var  = tk.StringVar()\nresult_var = tk.StringVar(value="Result appears here")\nmode_var   = tk.StringVar(value=list(conversions.keys())[0])\n\ndef convert(*_):\n    try:\n        val    = float(input_var.get())\n        mode   = mode_var.get()\n        result = conversions[mode](val)\n        result_var.set(f"{val} → {result:.4f}")\n    except ValueError:\n        result_var.set("Enter a number")\n\ninput_var.trace("w", convert)\nmode_var.trace("w", convert)\n\nfrom tkinter import ttk\nttk.Combobox(\n    root, textvariable=mode_var,\n    values=list(conversions.keys()),\n    state="readonly", width=18,\n).pack(pady=(20,10))\n\ntk.Entry(\n    root, textvariable=input_var,\n    font=("Arial",16), width=14,\n    justify="center",\n).pack(pady=5)\n\ntk.Label(\n    root, textvariable=result_var,\n    font=("Arial",14,"bold"),\n    fg="#7c6dfa", bg="#0f0f1a",\n).pack(pady=20)\n\nroot.mainloop()`}/>
    </Card>
  </>);
}

export default function Tkinter() {
  const [tab, setTab] = useState("intro");
  const content: Record<string, React.ReactNode> = {
    intro:<TabIntro/>, widgets:<TabWidgets/>, layout:<TabLayout/>,
    events:<TabEvents/>, vars:<TabVars/>, apps:<TabApps/>,
  };
  return (
    <div>
      <PageHeader eyebrow="GUI · Tkinter · Beginner" title="Tkinter" sub="Build desktop apps with Python's built-in GUI toolkit — widgets, layouts, events, full apps" color={T.sky}/>
      <div style={{ padding:"0 24px 40px" }}>
        <p style={{ fontSize:13, color:T.muted2, lineHeight:1.7, marginBottom:20 }}>
          Most Python tutorials only teach you to write scripts that run in a terminal. Tkinter lets you wrap those scripts in a real windowed app with buttons, input fields, and menus — without learning a new language. It's also built into Python, so there's nothing to install.
        </p>
        <TabBar tabs={TABS} active={tab} onChange={setTab}/>
        {tab==="quiz"
          ? <Card><CardTitle color={T.sky}>🎯 Tkinter Quiz</CardTitle><Quiz questions={QUIZ}/></Card>
          : content[tab]
        }
      </div>
    </div>
  );
}
