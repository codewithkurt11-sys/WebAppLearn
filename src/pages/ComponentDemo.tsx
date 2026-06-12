import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, TOKEN_COLORS, Tab } from "../shared";

const DEMO_SNIPPETS: Record<string, { lang: string; code: string }> = {
  py: { lang:"py", code:`from flask import Flask, request\nfrom markupsafe import escape\n\napp = Flask(__name__)\n\n@app.route("/hello")\ndef hello():\n    # reads ?name= from URL, default "Flask"\n    name = request.args.get("name", "Flask")\n    return f"Hello, {escape(name)}!"\n\nif __name__ == "__main__":\n    app.run(debug=True)` },
  js: { lang:"js", code:`const loadUser = async (id) => {\n  try {\n    const res  = await fetch(\`/api/user/\${id}\`)\n    const data = await res.json()\n    console.log(data.name)\n  } catch (err) {\n    console.error("Failed:", err)\n  }\n}` },
  sql:{ lang:"sql", code:`CREATE TABLE IF NOT EXISTS users (\n  id    INTEGER PRIMARY KEY AUTOINCREMENT,\n  name  TEXT NOT NULL,\n  email TEXT UNIQUE\n);\n\nSELECT * FROM users WHERE name = 'Alice';\nINSERT INTO users (name, email) VALUES ('Bob', 'b@m.com');` },
  bash:{ lang:"bash", code:`# Install Flask on Alpine Linux (Acode)\napk add py3-flask\n\n# Run your app from terminal (NOT play button!)\npython3 ~/testf.py\n\n# Install Python packages (standard)\npip install requests beautifulsoup4` },
};

const LANG_TABS: Tab[] = [
  { id:"py",   label:"🐍 Python"    },
  { id:"js",   label:"⚡ JavaScript" },
  { id:"sql",  label:"🗄 SQL"        },
  { id:"bash", label:"💻 Shell"      },
];

export default function ComponentDemo() {
  const [activeLang, setActiveLang] = useState("py");
  const [showLines, setShowLines]   = useState(false);
  const snippet = DEMO_SNIPPETS[activeLang];

  return (
    <div>
      <PageHeader eyebrow="Components" title="CodeBlock System" sub="Syntax highlighting, copy button, line numbers — the building blocks of every guide page." color={T.accent}/>
      <div style={{ padding:"0 24px 40px" }}>

        <Card>
          <CardTitle color={T.accent}>Live Preview</CardTitle>
          <p style={{ fontSize:12.5, color:T.muted2, marginBottom:14, lineHeight:1.6 }}>Switch language to see different syntax highlighting. Each language has its own token rules.</p>
          <TabBar tabs={LANG_TABS} active={activeLang} onChange={setActiveLang}/>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <button onClick={() => setShowLines(v => !v)} style={{
              padding:"5px 12px", borderRadius:6,
              border:`1px solid ${showLines?T.accent:T.border2}`,
              background: showLines?"rgba(124,109,250,.12)":"transparent",
              color: showLines?T.accent:T.muted2,
              fontFamily:"'Fira Code',monospace", fontSize:11, transition:"all .2s", cursor:"pointer",
            }}>
              {showLines?"✓ line numbers on":"line numbers off"}
            </button>
          </div>
          <CodeBlock code={snippet.code} lang={snippet.lang} showLines={showLines}/>
        </Card>

        <Card>
          <CardTitle color={T.green}>InfoBox Variants</CardTitle>
          <InfoBox type="tip">Use <IC>app.run(debug=True)</IC> only in development — never in production.</InfoBox>
          <InfoBox type="warn">Always run Flask from the <IC>terminal</IC>, not the play button (Pyodide can't run servers).</InfoBox>
          <InfoBox type="info">The <IC>__name__</IC> variable equals <IC>"__main__"</IC> when you run a file directly.</InfoBox>
          <InfoBox type="note">Install Flask on Alpine Linux with <IC>apk add py3-flask</IC> — not pip.</InfoBox>
        </Card>

        <Card>
          <CardTitle color={T.sky}>Token Color Reference</CardTitle>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, fontFamily:"'Fira Code',monospace", fontSize:12 }}>
            {Object.entries(TOKEN_COLORS).map(([type, color]) => (
              <div key={type} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:7, padding:"6px 12px", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:10, height:10, borderRadius:"50%", background:color, display:"inline-block", flexShrink:0 }}/>
                <span style={{ color }}>{type}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle color={T.rose}>Inline Code — IC component</CardTitle>
          <p style={{ fontSize:12.5, color:T.muted2, lineHeight:1.65 }}>
            Use <IC>IC</IC> for inline references: <IC>def greet():</IC>, <IC>request.args.get()</IC>, <IC>app.run(debug=True)</IC>. It automatically applies the violet style.
            You can override the color too: <IC color={T.green}>T.green</IC>, <IC color={T.amber}>T.amber</IC>, <IC color={T.rose}>T.rose</IC>.
          </p>
        </Card>

      </div>
    </div>
  );
}
