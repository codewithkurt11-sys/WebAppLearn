import{r as d,j as e,T as t}from"./index-CNTZnqQQ.js";import{P as c,T as p,a as o,b as i,Q as u,I as a,C as n,c as s}from"./shared-Cgke19x4.js";const h=[{id:"intro",label:"What is Kivy"},{id:"kv",label:"KV Language"},{id:"layouts",label:"Layouts"},{id:"widgets",label:"Widgets"},{id:"touch",label:"Touch Events"},{id:"anim",label:"Animations"},{id:"apk",label:"Build APK"},{id:"quiz",label:"Quiz 🎯"}],m=[{q:"What does App.run() do in Kivy?",opts:["Compiles the app to APK","Starts the Kivy event loop and shows the window","Loads the KV file","Runs a background thread"],ans:1,exp:"App.run() starts the Kivy event loop — it opens the window, loads the UI, and keeps the app alive until closed."},{q:"Which method must every Kivy App subclass implement?",opts:["__init__","on_start","build","on_stop"],ans:2,exp:"build() is required — it must return the root widget. Kivy calls it automatically when the app starts."},{q:"In KV language, what does 'self' refer to?",opts:["The App class","The parent widget","The widget the rule applies to","The root widget"],ans:2,exp:"In a KV rule, 'self' refers to the widget the rule is defined for. 'root' refers to the root widget of the current rule tree."},{q:"Which layout places widgets one after another in a line?",opts:["FloatLayout","GridLayout","BoxLayout","AnchorLayout"],ans:2,exp:"BoxLayout arranges widgets horizontally or vertically in sequence. Use orientation: 'horizontal' or 'vertical'."},{q:"What does on_touch_down receive as its second argument?",opts:["A string event name","A MotionEvent (touch) object","The widget that was touched","A boolean"],ans:1,exp:"on_touch_down(self, touch) receives a MotionEvent object. touch.pos gives (x, y) coordinates, touch.button gives 'left'/'right' for mouse."},{q:"How do you trigger an Animation in Kivy?",opts:["widget.play()","Animation(x=100).start(widget)","widget.animate(x=100)","anim.run(widget)"],ans:1,exp:"Animation(property=value, duration=t).start(widget) animates any widget property. Chain with & (parallel) or + (sequential)."},{q:"Which command builds a debug APK with Buildozer?",opts:["buildozer android release","buildozer apk debug","buildozer android debug deploy run","buildozer build"],ans:2,exp:"buildozer android debug deploy run builds a debug APK, deploys it to a connected device, and runs it. First run takes ~15 minutes."},{q:"What file does Buildozer use to configure the APK build?",opts:["setup.py","buildozer.spec","config.ini","kivy.json"],ans:1,exp:"buildozer.spec contains all build config: app title, package name, version, permissions, included files, and target Android API level."},{q:"In KV language, how do you bind a button's on_press to a Python method?",opts:["on_press: self.my_method","on_press = my_method()","on_press -> root.my_method()","on_press: root.my_method()"],ans:3,exp:"on_press: root.my_method() calls the method on the root widget of the KV rule. Use 'self' for the widget's own methods, 'root' for the rule's root, and 'app' for the App class."},{q:"What is the difference between size and size_hint in Kivy?",opts:["They're the same","size sets absolute pixels; size_hint sets relative size as a fraction of parent (1.0 = 100%)","size_hint sets absolute pixels; size sets relative size","size is only for width, size_hint is only for height"],ans:1,exp:"size_hint=(0.5, 0.5) means 50% of parent's width and height. size=(200, 100) means absolute pixels. Setting size_hint to None lets you use size for absolute positioning."}];function y(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"What is Kivy?"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["Kivy is an open-source Python framework for building ",e.jsx("strong",{style:{color:t.text},children:"cross-platform apps"})," — the same code runs on Android, iOS, Windows, macOS, and Linux. It uses its own rendering engine (OpenGL ES 2) so UI looks identical everywhere."]}),e.jsx(a,{type:"info",children:"Kivy is great for touch-based apps, games, and tools where you want one Python codebase deployed to mobile and desktop."})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Install & First App"}),e.jsx(n,{lang:"bash",title:"terminal",code:"pip install kivy"}),e.jsx(n,{lang:"py",title:"main.py",code:`from kivy.app import App
from kivy.uix.label import Label

class HelloApp(App):
    def build(self):
        return Label(text="Hello, Kivy!")   # root widget

if __name__ == "__main__":
    HelloApp().run()`}),e.jsxs(a,{type:"tip",children:["The class name determines the KV file loaded automatically: ",e.jsx(s,{children:"HelloApp"})," looks for ",e.jsx(s,{children:"hello.kv"}),"."]})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"App Lifecycle"}),e.jsx(n,{lang:"py",title:"lifecycle.py",code:`from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

class MyApp(App):
    def build(self):
        # Called once at startup — return root widget
        return BoxLayout()

    def on_start(self):
        print("App started")

    def on_pause(self):
        # Android home button — return True to allow pause
        return True

    def on_resume(self):
        print("Back from pause")

    def on_stop(self):
        print("App closing")`})]})]})}function g(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"KV Language Basics"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"KV is Kivy's declarative UI language. It separates layout from logic — like HTML/CSS for Python apps. Indentation defines the widget tree."}),e.jsx(n,{lang:"py",title:"myapp.kv",code:`# Widget rule — applies to ALL MyWidget instances
<MyWidget>:
    orientation: 'vertical'
    Label:
        text: 'Hello'
        font_size: '20sp'
        color: 1, 0.4, 0.4, 1   # RGBA  (red)
    Button:
        text: 'Click Me'
        size_hint: (1, 0.2)      # 100% wide, 20% tall
        on_press: root.do_something()`}),e.jsxs(a,{type:"info",children:[e.jsx(s,{children:"root"})," = the top widget of the current rule. ",e.jsx(s,{children:"self"})," = the widget the property belongs to. ",e.jsx(s,{children:"app"})," = the App instance."]})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Property Bindings"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["KV bindings are ",e.jsx("strong",{style:{color:t.text},children:"reactive"})," — when a referenced property changes, the bound value updates automatically."]}),e.jsx(n,{lang:"py",title:"binding.kv",code:`<CounterWidget>:
    orientation: 'vertical'
    Label:
        # Automatically updates when root.count changes
        text: f"Count: {root.count}"
        font_size: '24sp'
    Slider:
        min: 0
        max: 100
        value: root.count
        on_value: root.count = int(self.value)
    Label:
        # Reactive expression — recomputes on change
        text: "Even" if root.count % 2 == 0 else "Odd"
        color: 0.2, 1, 0.5, 1 if root.count % 2 == 0 else (1, 0.4, 0.4, 1)`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Custom Widget in KV + Python"}),e.jsx(n,{lang:"py",title:"main.py",code:`from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import NumericProperty

class CounterWidget(BoxLayout):
    count = NumericProperty(0)   # reactive property

    def increment(self):
        self.count += 1

    def reset(self):
        self.count = 0

class CounterApp(App):
    def build(self):
        return CounterWidget()`}),e.jsx(n,{lang:"py",title:"counter.kv",code:`<CounterWidget>:
    orientation: 'vertical'
    padding: 20
    spacing: 10
    Label:
        text: str(root.count)
        font_size: '64sp'
    Button:
        text: '+ Add'
        on_press: root.increment()
    Button:
        text: 'Reset'
        on_press: root.reset()`})]})]})}function x(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"BoxLayout"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["The most common layout. Stacks widgets horizontally or vertically. ",e.jsx(s,{children:"size_hint"})," controls proportional sizing."]}),e.jsx(n,{lang:"py",title:"boxlayout.kv",code:`BoxLayout:
    orientation: 'horizontal'   # or 'vertical'
    spacing: 10
    padding: [10, 10, 10, 10]   # left, top, right, bottom
    Button:
        text: 'Left'
        size_hint: (0.3, 1)    # 30% width, full height
    Button:
        text: 'Middle'
        size_hint: (0.4, 1)
    Button:
        text: 'Right'
        size_hint: (0.3, 1)`}),e.jsxs(a,{type:"tip",children:[e.jsx(s,{children:"size_hint: (None, None)"})," disables proportional sizing so you can use fixed ",e.jsx(s,{children:"size: (200, 50)"}),"."]})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"GridLayout"}),e.jsx(n,{lang:"py",title:"grid.kv",code:`GridLayout:
    cols: 3          # 3 columns — rows auto-expand
    spacing: 5
    padding: 10
    Button:
        text: '1'
    Button:
        text: '2'
    Button:
        text: '3'
    Button:
        text: '4'
    Button:
        text: '5'
    Button:
        text: '6'`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"FloatLayout & AnchorLayout"}),e.jsx(n,{lang:"py",title:"float_anchor.kv",code:`# FloatLayout — absolute or hint-based positioning
FloatLayout:
    Button:
        text: 'Top Left'
        size_hint: (0.3, 0.1)
        pos_hint: {'x': 0, 'top': 1}    # x=0%, top=100%
    Button:
        text: 'Center'
        size_hint: (0.4, 0.15)
        pos_hint: {'center_x': 0.5, 'center_y': 0.5}

# AnchorLayout — pins content to an edge
AnchorLayout:
    anchor_x: 'right'
    anchor_y: 'bottom'
    Button:
        text: 'Bottom Right'
        size_hint: (None, None)
        size: (150, 50)`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"ScrollView"}),e.jsx(n,{lang:"py",title:"scroll.kv",code:`ScrollView:
    # Must have one child. Child needs a fixed/minimum size.
    BoxLayout:
        orientation: 'vertical'
        size_hint_y: None
        height: self.minimum_height    # key: lets content expand
        spacing: 5
        padding: 10
        Button:
            text: 'Item 1'
            size_hint_y: None
            height: 50
        Button:
            text: 'Item 2'
            size_hint_y: None
            height: 50
        # Add many more — ScrollView handles the scroll`})]})]})}function f(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Common Widgets"}),e.jsx(n,{lang:"py",title:"widgets.kv",code:`# Label
Label:
    text: "Hello Kivy"
    font_size: '18sp'
    bold: True
    color: 0.9, 0.9, 1, 1    # RGBA

# Button
Button:
    text: "Press Me"
    background_color: 0.5, 0.2, 0.8, 1
    on_press: print("pressed")
    on_release: print("released")

# TextInput
TextInput:
    hint_text: "Type here..."
    multiline: False
    on_text_validate: root.on_enter(self.text)

# CheckBox
CheckBox:
    active: True
    on_active: root.toggle(self.active)

# Slider
Slider:
    min: 0
    max: 100
    value: 50
    step: 1
    on_value: root.update_val(self.value)`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Image & Switch"}),e.jsx(n,{lang:"py",title:"image_switch.kv",code:`# Image — local file or URL
Image:
    source: 'assets/logo.png'
    keep_ratio: True
    allow_stretch: True

# Switch (toggle)
Switch:
    active: False
    on_active: root.on_switch(self.active)

# ProgressBar
ProgressBar:
    max: 100
    value: 75

# Spinner (dropdown)
Spinner:
    text: 'Python'
    values: ['Python', 'JavaScript', 'Kivy', 'Flask']
    on_text: root.on_select(self.text)`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Popup & ModalView"}),e.jsx(n,{lang:"py",title:"popup_example.py",code:`from kivy.uix.popup import Popup
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout

def show_popup():
    content = BoxLayout(orientation='vertical', padding=10, spacing=10)
    content.add_widget(Label(text="Are you sure?"))

    close_btn = Button(text="Close", size_hint=(1, 0.3))
    content.add_widget(close_btn)

    popup = Popup(
        title="Confirm",
        content=content,
        size_hint=(0.8, 0.4)
    )
    close_btn.bind(on_press=popup.dismiss)
    popup.open()`})]})]})}function b(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Touch Event Methods"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:["Every widget has three touch methods. They bubble up the widget tree — call ",e.jsx(s,{children:"return True"})," to consume the event and stop bubbling."]}),e.jsx(n,{lang:"py",title:"touch_events.py",code:`from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse

class DrawWidget(Widget):
    def on_touch_down(self, touch):
        # Fires when finger/mouse first makes contact
        print(f"Touch down at {touch.pos}")
        with self.canvas:
            Color(1, 0.4, 0.4, 1)
            Ellipse(pos=(touch.x - 10, touch.y - 10), size=(20, 20))
        return True   # consume — don't pass to children

    def on_touch_move(self, touch):
        # Fires continuously as finger drags
        print(f"Dragging: {touch.pos}, delta: {touch.dpos}")
        with self.canvas:
            Color(0.4, 0.8, 1, 0.8)
            Ellipse(pos=(touch.x - 5, touch.y - 5), size=(10, 10))

    def on_touch_up(self, touch):
        # Fires when finger/mouse is released
        print(f"Touch up at {touch.pos}")`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Touch Object Properties"}),e.jsx(n,{lang:"py",title:"touch_props.py",code:`def on_touch_down(self, touch):
    touch.pos       # (x, y) — current position
    touch.x         # x coordinate
    touch.y         # y coordinate
    touch.ox, touch.oy   # original touch-down position
    touch.dx, touch.dy   # delta since last move event
    touch.dpos      # (dx, dy) tuple
    touch.button    # 'left', 'right', 'middle' (mouse)
    touch.is_double_tap  # True if double-tap detected
    touch.grab(self)    # receive touch events even outside widget

    # Check if touch is inside this widget
    if self.collide_point(*touch.pos):
        print("Touched inside widget!")`}),e.jsxs(a,{type:"tip",children:["Use ",e.jsx(s,{children:"touch.grab(self)"})," in ",e.jsx(s,{children:"on_touch_down"})," to keep receiving move/up events even when the finger leaves your widget."]})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Gesture Detection"}),e.jsx(n,{lang:"py",title:"gestures.py",code:`from kivy.uix.widget import Widget

class SwipeWidget(Widget):
    _touch_start = None

    def on_touch_down(self, touch):
        self._touch_start = touch.pos
        touch.grab(self)

    def on_touch_up(self, touch):
        if touch.grab_current is not self:
            return
        if self._touch_start is None:
            return
        dx = touch.x - self._touch_start[0]
        dy = touch.y - self._touch_start[1]
        if abs(dx) > abs(dy):
            if dx > 50:
                print("Swipe RIGHT →")
            elif dx < -50:
                print("Swipe LEFT ←")
        else:
            if dy > 50:
                print("Swipe UP ↑")
            elif dy < -50:
                print("Swipe DOWN ↓")`})]})]})}function v(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Basic Animation"}),e.jsxs("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:[e.jsx(s,{children:"Animation"})," smoothly transitions any widget property over time. Works on position, size, color, opacity — anything numeric."]}),e.jsx(n,{lang:"py",title:"animation.py",code:`from kivy.animation import Animation
from kivy.uix.button import Button

btn = Button(text="Animate", pos=(100, 100), size=(150, 50))

# Move button to x=400 over 1 second
anim = Animation(x=400, duration=1)
anim.start(btn)

# Animate multiple properties at once
anim = Animation(x=400, y=300, opacity=0.5, duration=0.8)
anim.start(btn)

# Easing transitions
anim = Animation(x=400, duration=1, t='out_bounce')
# Options: 'linear', 'in_quad', 'out_quad', 'in_out_cubic',
#          'out_bounce', 'out_elastic', 'in_back', 'out_back'`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Chaining Animations"}),e.jsx(n,{lang:"py",title:"chain_anim.py",code:`from kivy.animation import Animation

# Sequential: run one after another (+)
anim = (
    Animation(x=400, duration=0.5) +
    Animation(y=400, duration=0.5) +
    Animation(x=100, y=100, duration=0.8, t='out_bounce')
)
anim.start(widget)

# Parallel: run at the same time (&)
anim = (
    Animation(x=400, duration=1) &
    Animation(opacity=0, duration=1)
)
anim.start(widget)

# Callbacks
anim.bind(on_complete=lambda a, w: print("Done!"))
anim.bind(on_progress=lambda a, w, p: print(f"{p:.0%}"))

# Cancel
anim.cancel(widget)        # stop this specific anim
Animation.cancel_all(widget)  # stop all running anims`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Clock & Scheduling"}),e.jsx(n,{lang:"py",title:"clock_examples.py",code:`from kivy.clock import Clock

# Run once after 2 seconds
Clock.schedule_once(lambda dt: print("2s later"), 2)

# Repeat every 1 second (dt = time since last call)
def tick(dt):
    print(f"Tick! {dt:.3f}s elapsed")

event = Clock.schedule_interval(tick, 1.0)

# Cancel the repeating event
event.cancel()

# Schedule for next frame (dt=0 means "as soon as possible")
Clock.schedule_once(lambda dt: widget.update(), 0)

# Real-time animation loop (60fps)
class MyApp(App):
    def build(self):
        Clock.schedule_interval(self.update, 1/60)
        return Widget()

    def update(self, dt):
        # Called ~60 times per second
        self.widget.x += 100 * dt   # dt ensures frame-rate independent speed`}),e.jsxs(a,{type:"tip",children:["Always multiply movement by ",e.jsx(s,{children:"dt"})," (delta time) for frame-rate independent animation — the same speed on all devices."]})]})]})}function _(){return e.jsxs(e.Fragment,{children:[e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Build with Buildozer"}),e.jsx("p",{style:{fontSize:12.5,color:t.muted2,lineHeight:1.65,marginBottom:10},children:"Buildozer packages your Kivy app into an Android APK (or iOS IPA). Run on Linux — use a VM or GitHub Actions on Windows/Mac."}),e.jsx(n,{lang:"bash",title:"terminal",code:`# Install buildozer (Linux only)
pip install buildozer

# In your project folder — generates buildozer.spec
buildozer init

# Build debug APK (~15 min first time — downloads Android SDK)
buildozer android debug

# Build + deploy to USB-connected device + run
buildozer android debug deploy run

# View live logcat output
buildozer android logcat`}),e.jsx(a,{type:"warn",children:"First build downloads ~1GB of Android SDK/NDK tools. Subsequent builds are much faster (2–5 min)."})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"buildozer.spec — Key Settings"}),e.jsx(n,{lang:"bash",title:"buildozer.spec",code:`[app]
# App display name
title = My Kivy App

# Android package name (reverse domain)
package.name = mykivyapp
package.domain = org.yourname

# Source files to include
source.include_exts = py,png,jpg,kv,atlas,json

# App version
version = 1.0.0

# Python version
python_version = 3

# Required permissions
android.permissions = INTERNET, CAMERA, WRITE_EXTERNAL_STORAGE

# Minimum Android version
android.minapi = 21

# Target Android API (use latest stable)
android.api = 33

# Landscape/portrait
orientation = portrait

# Kivy version
requirements = python3,kivy==2.3.0

[buildozer]
# Android NDK version (auto-downloaded)
android.ndk_version = 25b`})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Project Structure"}),e.jsx(n,{lang:"bash",title:"project layout",code:`my_kivy_app/
├── main.py            # App entry point
├── myapp.kv           # KV layout file (optional)
├── buildozer.spec     # Build config
├── assets/
│   ├── icon.png       # 512×512 app icon
│   └── presplash.png  # Splash screen (1024×1024)
└── screens/
    ├── home.py
    └── settings.py`}),e.jsxs(a,{type:"tip",children:["Set ",e.jsx(s,{children:"icon.filename = %(source.dir)s/assets/icon.png"})," and ",e.jsx(s,{children:"presplash.filename"})," in buildozer.spec for a branded APK."]})]}),e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Release APK (Google Play)"}),e.jsx(n,{lang:"bash",title:"terminal",code:`# Build unsigned release APK
buildozer android release

# Sign with your keystore (required for Play Store)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1   -keystore myapp.keystore   bin/myapp-1.0.0-release-unsigned.apk mykey

# Align for Play Store
zipalign -v 4   bin/myapp-1.0.0-release-unsigned.apk   bin/myapp-release.apk`}),e.jsxs(a,{type:"info",children:["Generate a keystore once with ",e.jsx(s,{children:"keytool -genkey -v -keystore myapp.keystore -alias mykey -keyalg RSA -keysize 2048 -validity 10000"}),". Keep it safe — you need it for every update."]})]})]})}function k(){const[r,l]=d.useState(()=>{try{return localStorage.getItem("cif_tab_kivy")??"intro"}catch{return"intro"}});return e.jsxs("div",{children:[e.jsx(c,{eyebrow:"gui • cross-platform",title:"Kivy",sub:"Build Android, iOS, Windows & Linux apps from one Python codebase.",color:t.rose}),e.jsxs("div",{style:{padding:"0 16px 40px"},children:[e.jsx("p",{style:{fontSize:13,color:t.muted2,lineHeight:1.7,marginBottom:20},children:"Kivy lets you write one Python codebase and deploy it as an Android app, an iOS app, a Windows app, and a Linux app — simultaneously. For Python developers who want to reach mobile users without learning Swift or Kotlin, Kivy is a genuine path. The same skills also transfer to game development and interactive data tools."}),e.jsx(p,{tabs:h,active:r,onChange:l,pageId:"kivy"}),r==="intro"&&e.jsx(y,{}),r==="kv"&&e.jsx(g,{}),r==="layouts"&&e.jsx(x,{}),r==="widgets"&&e.jsx(f,{}),r==="touch"&&e.jsx(b,{}),r==="anim"&&e.jsx(v,{}),r==="apk"&&e.jsx(_,{}),r==="quiz"&&e.jsxs(o,{children:[e.jsx(i,{color:t.rose,children:"Quiz 🎯"}),e.jsx(u,{questions:m,trackId:"kivy"})]})]})]})}export{k as default};
