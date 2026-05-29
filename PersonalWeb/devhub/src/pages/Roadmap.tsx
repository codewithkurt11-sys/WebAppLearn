import { T, PageHeader, useApp, useWindowWidth } from "../shared";

interface Step {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
  status: "done" | "next" | "locked";
  skills: string[];
}

const PHASES: { phase: string; color: string; steps: Step[] }[] = [
  {
    phase: "Phase 1 — Python Foundations",
    color: T.accent,
    steps: [
      {
        id: "py-basics", title: "Python Basics", icon: "🐍",
        color: T.accent, status: "done",
        desc: "The building blocks of every Python program",
        skills: ["Variables & Types", "Strings & f-strings", "Lists & Dicts", "If/Else", "Loops", "Functions", "Classes", "Exceptions", "Modules"],
      },
      {
        id: "py-inter", title: "Python Intermediate", icon: "🐍",
        color: T.accent, status: "next",
        desc: "Write cleaner, more powerful Python",
        skills: ["Comprehensions", "Generators", "Decorators", "File I/O", "Regular Expressions", "OOP deep dive", "Context managers"],
      },
      {
        id: "py-adv", title: "Python Advanced", icon: "🐍",
        color: T.accent, status: "locked",
        desc: "Expert-level Python patterns",
        skills: ["Async/await", "Threading", "Type hints", "Metaclasses", "Design patterns", "Performance profiling"],
      },
    ],
  },
  {
    phase: "Phase 2 — Web Development with Flask",
    color: T.green,
    steps: [
      {
        id: "flask-basics", title: "Flask Basics", icon: "🌶",
        color: T.green, status: "next",
        desc: "Build your first web server in Python",
        skills: ["Routes & views", "Request/Response", "Query params", "URL variables", "JSON APIs", "Debug mode", "testf.py explained"],
      },
      {
        id: "flask-inter", title: "Flask Intermediate", icon: "🌶",
        color: T.green, status: "locked",
        desc: "Templates, forms, and databases",
        skills: ["Jinja2 templates", "HTML forms", "SQLite + Flask", "Blueprints", "Error handling", "Flash messages", "Sessions"],
      },
      {
        id: "flask-expert", title: "Flask Expert", icon: "🌶",
        color: T.green, status: "locked",
        desc: "Production-ready Flask applications",
        skills: ["User auth & login", "SQLAlchemy ORM", "REST API design", "File uploads", "Deployment", "CORS & security"],
      },
    ],
  },
  {
    phase: "Phase 3 — JavaScript & the Browser",
    color: T.amber,
    steps: [
      {
        id: "js-basics", title: "JavaScript Basics", icon: "⚡",
        color: T.amber, status: "next",
        desc: "Make web pages interactive",
        skills: ["Variables & types", "Functions & arrows", "DOM manipulation", "Events", "Arrays & objects", "fetch API", "Async/await"],
      },
      {
        id: "js-inter", title: "JavaScript Intermediate", icon: "⚡",
        color: T.amber, status: "locked",
        desc: "Advanced JS patterns",
        skills: ["Promises", "ES Modules", "Local Storage", "Regex", "Canvas API", "Web APIs"],
      },
    ],
  },
  {
    phase: "Phase 4 — GUI, Scraping & Databases",
    color: T.sky,
    steps: [
      {
        id: "tkinter", title: "Tkinter", icon: "🖥",
        color: T.sky, status: "next",
        desc: "Build desktop apps with Python",
        skills: ["Widgets", "Layout managers", "Events", "StringVar / IntVar", "Full app patterns"],
      },
      {
        id: "kivy", title: "Kivy", icon: "📱",
        color: T.rose, status: "locked",
        desc: "Cross-platform mobile & desktop",
        skills: ["KV language", "Layouts", "Touch events", "Animations", "APK building"],
      },
      {
        id: "scraping", title: "Web Scraping", icon: "🕷",
        color: T.muted2, status: "locked",
        desc: "Extract data from any website",
        skills: ["requests library", "BeautifulSoup", "Parsing HTML", "Following links", "Saving to CSV/JSON"],
      },
      {
        id: "sqlite", title: "SQLite", icon: "🗄",
        color: T.muted2, status: "locked",
        desc: "Persistent data storage in Python",
        skills: ["CREATE / SELECT / INSERT", "WHERE & ORDER BY", "JOINS", "Python sqlite3 module", "Flask integration"],
      },
    ],
  },
];

const STATUS_BADGE = {
  done:   { label:"✓ Done",      bg:"rgba(52,211,153,.12)",  color:T.green,  border:"rgba(52,211,153,.3)"  },
  next:   { label:"→ Up Next",   bg:"rgba(124,109,250,.12)", color:T.accent, border:"rgba(124,109,250,.3)" },
  locked: { label:"🔒 Locked",   bg:"rgba(82,84,110,.1)",    color:T.muted,  border:T.border              },
};

function StepCard({ step }: { step: Step }) {
  const { setPage } = useApp();
  const badge = STATUS_BADGE[step.status];
  const clickable = step.status !== "locked";

  return (
    <div
      onClick={() => clickable && setPage(step.id)}
      style={{
        background:T.surface, border:`1px solid ${step.status==="done"?step.color:step.status==="next"?`${step.color}44`:T.border}`,
        borderRadius:14, padding:"18px 20px",
        opacity: step.status==="locked" ? 0.5 : 1,
        cursor: clickable ? "pointer" : "default",
        transition:"all .2s",
        position:"relative", overflow:"hidden",
      }}
      onMouseEnter={e => { if(clickable){ const el=e.currentTarget as HTMLElement; el.style.borderColor=step.color; el.style.transform="translateY(-2px)"; } }}
      onMouseLeave={e => { if(clickable){ const el=e.currentTarget as HTMLElement; el.style.borderColor=step.status==="done"?step.color:step.status==="next"?`${step.color}44`:T.border; el.style.transform=""; } }}
    >
      {step.status === "done" && (
        <div style={{ position:"absolute", top:0, right:0, width:80, height:80, background:`radial-gradient(circle at top right, ${step.color}18, transparent 70%)`, pointerEvents:"none" }}/>
      )}

      <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
        <span style={{ fontSize:24, flexShrink:0 }}>{step.icon}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:14, marginBottom:3 }}>{step.title}</div>
          <div style={{ fontSize:11.5, color:T.muted2, lineHeight:1.5 }}>{step.desc}</div>
        </div>
        <span style={{ flexShrink:0, fontSize:9, fontFamily:"'Fira Code',monospace", letterSpacing:"1px", textTransform:"uppercase", padding:"3px 8px", borderRadius:5, background:badge.bg, color:badge.color, border:`1px solid ${badge.border}`, whiteSpace:"nowrap" }}>
          {badge.label}
        </span>
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
        {step.skills.map((skill, i) => (
          <span key={i} style={{ fontSize:10, fontFamily:"'Fira Code',monospace", padding:"2px 8px", borderRadius:4, background:T.bg2, color:T.muted2, border:`1px solid ${T.border2}` }}>{skill}</span>
        ))}
      </div>

      {clickable && (
        <div style={{ marginTop:12, fontSize:10.5, fontFamily:"'Fira Code',monospace", color:step.color, letterSpacing:"1px" }}>
          {step.status==="done" ? "// review →" : "// start →"}
        </div>
      )}
    </div>
  );
}

export default function Roadmap() {
  const isMobile   = useWindowWidth() < 900;
  const doneCount  = PHASES.flatMap(p=>p.steps).filter(s=>s.status==="done").length;
  const totalCount = PHASES.flatMap(p=>p.steps).length;
  const pct = Math.round((doneCount/totalCount)*100);
  const pad = isMobile ? "0 16px" : "0 24px";

  return (
    <div>
      <PageHeader eyebrow="Learning Path" title="Your Roadmap" sub="From Python basics to full-stack Flask apps — track your journey" color={T.sky}/>
      <div style={{ padding:`${pad.replace("0","0")} 40px`.replace("0 16px 40px","0 16px").replace("0 24px 40px","0 24px"), paddingBottom:40, paddingLeft: isMobile?16:24, paddingRight: isMobile?16:24 }}>

        {/* Overall progress */}
        <div style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:13, padding:"18px 20px", marginBottom:28 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:13 }}>Overall Progress</span>
            <span style={{ fontFamily:"'Fira Code',monospace", fontSize:11, color:T.accent }}>{doneCount}/{totalCount} steps · {pct}%</span>
          </div>
          <div style={{ height:6, background:T.border, borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:4, width:`${pct}%`, background:`linear-gradient(90deg,${T.accent},${T.green})`, transition:"width .6s ease" }}/>
          </div>
          <div style={{ display:"flex", gap:16, marginTop:14, flexWrap:"wrap" }}>
            {[
              { label:"Done",   color:T.green,  count: PHASES.flatMap(p=>p.steps).filter(s=>s.status==="done").length },
              { label:"Up Next",color:T.accent, count: PHASES.flatMap(p=>p.steps).filter(s=>s.status==="next").length },
              { label:"Locked", color:T.muted,  count: PHASES.flatMap(p=>p.steps).filter(s=>s.status==="locked").length },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ width:8, height:8, borderRadius:"50%", background:item.color, display:"inline-block" }}/>
                <span style={{ fontSize:11, color:T.muted2 }}>{item.count} {item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phases */}
        {PHASES.map((phase, pi) => (
          <div key={pi} style={{ marginBottom:32 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:12, color:phase.color, textTransform:"uppercase", letterSpacing:"1.5px", whiteSpace:"nowrap" }}>
                {phase.phase}
              </div>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${phase.color}44,transparent)` }}/>
            </div>

            {/* Steps grid — single column on mobile */}
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
              {phase.steps.map((step, si) => (
                <div key={si} style={{ display:"flex", flexDirection:"column", gap:0 }}>
                  {si > 0 && (
                    <div style={{ display:"flex", alignItems:"center", marginBottom:8, paddingLeft:24 }}>
                      <div style={{ width:1, height:12, background:`${phase.color}33` }}/>
                    </div>
                  )}
                  <StepCard step={step}/>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Tip */}
        <div style={{ background:"rgba(124,109,250,.06)", border:`1px solid rgba(124,109,250,.2)`, borderRadius:10, padding:"14px 18px", fontSize:12.5, color:T.muted2, lineHeight:1.65 }}>
          💡 <strong style={{ color:T.text }}>Study tip:</strong> Don't try to memorize syntax — try to understand <em>why</em> things work the way they do. When something confuses you, that's actually the good part. Sit with it for 10 minutes before reaching for Google. The quiz at the end of each module will tell you honestly what you actually know versus what you just think you know. Move on only when the quiz feels easy, not just possible.
        </div>
      </div>
    </div>
  );
}
