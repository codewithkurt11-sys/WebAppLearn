import{r as p,j as e,T as n}from"./index-CNTZnqQQ.js";import{P as x,a as l,b as o,T as m,C as g,I as i,c as s,d as y}from"./shared-Cgke19x4.js";const f={py:{lang:"py",code:`from flask import Flask, request
from markupsafe import escape

app = Flask(__name__)

@app.route("/hello")
def hello():
    # reads ?name= from URL, default "Flask"
    name = request.args.get("name", "Flask")
    return f"Hello, {escape(name)}!"

if __name__ == "__main__":
    app.run(debug=True)`},js:{lang:"js",code:`const loadUser = async (id) => {
  try {
    const res  = await fetch(\`/api/user/\${id}\`)
    const data = await res.json()
    console.log(data.name)
  } catch (err) {
    console.error("Failed:", err)
  }
}`},sql:{lang:"sql",code:`CREATE TABLE IF NOT EXISTS users (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  email TEXT UNIQUE
);

SELECT * FROM users WHERE name = 'Alice';
INSERT INTO users (name, email) VALUES ('Bob', 'b@m.com');`},bash:{lang:"bash",code:`# Install Flask on Alpine Linux (Acode)
apk add py3-flask

# Run your app from terminal (NOT play button!)
python3 ~/testf.py

# Install Python packages (standard)
pip install requests beautifulsoup4`}},b=[{id:"py",label:"🐍 Python"},{id:"js",label:"⚡ JavaScript"},{id:"sql",label:"🗄 SQL"},{id:"bash",label:"💻 Shell"}];function k(){const[t,h]=p.useState("py"),[a,u]=p.useState(!1),d=f[t];return e.jsxs("div",{children:[e.jsx(x,{eyebrow:"Components",title:"CodeBlock System",sub:"Syntax highlighting, copy button, line numbers — the building blocks of every guide page.",color:n.accent}),e.jsxs("div",{style:{padding:"0 24px 40px"},children:[e.jsxs(l,{children:[e.jsx(o,{color:n.accent,children:"Live Preview"}),e.jsx("p",{style:{fontSize:12.5,color:n.muted2,marginBottom:14,lineHeight:1.6},children:"Switch language to see different syntax highlighting. Each language has its own token rules."}),e.jsx(m,{tabs:b,active:t,onChange:h}),e.jsx("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:4},children:e.jsx("button",{onClick:()=>u(r=>!r),style:{padding:"5px 12px",borderRadius:6,border:`1px solid ${a?n.accent:n.border2}`,background:a?"rgba(124,109,250,.12)":"transparent",color:a?n.accent:n.muted2,fontFamily:"'Fira Code',monospace",fontSize:11,transition:"all .2s",cursor:"pointer"},children:a?"✓ line numbers on":"line numbers off"})}),e.jsx(g,{code:d.code,lang:d.lang,showLines:a})]}),e.jsxs(l,{children:[e.jsx(o,{color:n.green,children:"InfoBox Variants"}),e.jsxs(i,{type:"tip",children:["Use ",e.jsx(s,{children:"app.run(debug=True)"})," only in development — never in production."]}),e.jsxs(i,{type:"warn",children:["Always run Flask from the ",e.jsx(s,{children:"terminal"}),", not the play button (Pyodide can't run servers)."]}),e.jsxs(i,{type:"info",children:["The ",e.jsx(s,{children:"__name__"})," variable equals ",e.jsx(s,{children:'"__main__"'})," when you run a file directly."]}),e.jsxs(i,{type:"note",children:["Install Flask on Alpine Linux with ",e.jsx(s,{children:"apk add py3-flask"})," — not pip."]})]}),e.jsxs(l,{children:[e.jsx(o,{color:n.sky,children:"Token Color Reference"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8,fontFamily:"'Fira Code',monospace",fontSize:12},children:Object.entries(y).map(([r,c])=>e.jsxs("div",{style:{background:n.bg2,border:`1px solid ${n.border}`,borderRadius:7,padding:"6px 12px",display:"flex",alignItems:"center",gap:8},children:[e.jsx("span",{style:{width:10,height:10,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}),e.jsx("span",{style:{color:c},children:r})]},r))})]}),e.jsxs(l,{children:[e.jsx(o,{color:n.rose,children:"Inline Code — IC component"}),e.jsxs("p",{style:{fontSize:12.5,color:n.muted2,lineHeight:1.65},children:["Use ",e.jsx(s,{children:"IC"})," for inline references: ",e.jsx(s,{children:"def greet():"}),", ",e.jsx(s,{children:"request.args.get()"}),", ",e.jsx(s,{children:"app.run(debug=True)"}),". It automatically applies the violet style. You can override the color too: ",e.jsx(s,{color:n.green,children:"T.green"}),", ",e.jsx(s,{color:n.amber,children:"T.amber"}),", ",e.jsx(s,{color:n.rose,children:"T.rose"}),"."]})]})]})]})}export{k as default};
