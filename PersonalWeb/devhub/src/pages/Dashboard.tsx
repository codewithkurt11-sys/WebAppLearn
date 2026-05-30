import { T, useApp, useWindowWidth } from "../shared";
import { useProgressCtx } from "../contexts/ProgressContext";

function StatCard({ value, label, color }: { value: string; label: string; color?: string }) {
  const isMobile = useWindowWidth() < 900;
  return (
    <div style={{
      background:T.surface, border:`1px solid ${T.border}`, borderRadius:12,
      padding: isMobile ? "12px 10px" : "16px 18px",
      flex:1, minWidth: isMobile ? 80 : 110,
      display:"flex", flexDirection:"column", alignItems: isMobile ? "center" : "flex-start",
    }}>
      <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize: isMobile ? 18 : 24, letterSpacing:"-1px", color:color||T.accent }}>{value}</div>
      <div style={{ fontSize: isMobile ? 9.5 : 10.5, color:T.muted, marginTop:3, textAlign: isMobile ? "center" : "left" }}>{label}</div>
    </div>
  );
}

function TrackCard({ id, icon, name, desc, tag, color, done, scorePercent }: {
  id:string; icon:string; name:string; desc:string; tag:string; color:string; done:boolean; scorePercent:number|null;
}) {
  const { setPage } = useApp();
  return (
    <button onClick={() => setPage(id)} style={{
      background:T.surface, border:`1px solid ${done ? color : T.border}`,
      borderRadius:14, padding:"16px 14px", textAlign:"left",
      transition:"all .2s", width:"100%", color:T.text,
      position:"relative", overflow:"hidden", cursor:"pointer",
    }}
      onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=color; el.style.transform="translateY(-2px)"; el.style.background=T.surface2; }}
      onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=done?color:T.border; el.style.transform=""; el.style.background=T.surface; }}
    >
      {done && (
        <div style={{ position:"absolute", top:10, right:10, background:"rgba(52,211,153,.15)", color:T.green, fontSize:9, fontFamily:"'Fira Code',monospace", padding:"2px 6px", borderRadius:4, letterSpacing:"1px" }}>DONE ✓</div>
      )}
      <div style={{ fontSize:20, marginBottom:8 }}>{icon}</div>
      <div style={{ fontWeight:700, fontSize:13, marginBottom:4, color:T.text }}>{name}</div>
      <div style={{ fontSize:11, color:T.muted, lineHeight:1.55, marginBottom:10 }}>{desc}</div>
      {scorePercent !== null && scorePercent > 0 && (
        <div style={{ height:3, background:T.border, borderRadius:2, overflow:"hidden", marginBottom:8 }}>
          <div style={{ height:"100%", borderRadius:2, width:`${scorePercent}%`, background:`linear-gradient(90deg,${color},${color}88)`, transition:"width .6s ease" }}/>
        </div>
      )}
      <div style={{ fontSize:9, fontFamily:"'Fira Code',monospace", color, letterSpacing:"1px", textTransform:"uppercase" }}>{tag}</div>
    </button>
  );
}

const TRACK_DEFS = [
  { id:"py-basics",    icon:"λ",   name:"Python Basics",    desc:"Variables, loops, functions, classes, errors, modules",  tag:"beginner · 10 tabs",   color:"#7c6dfa" },
  { id:"py-inter",     icon:"λ",   name:"Python Inter.",    desc:"Files, regex, OOP deep dive, decorators, testing",        tag:"intermediate",          color:"#7c6dfa" },
  { id:"py-adv",       icon:"λ",   name:"Python Advanced",  desc:"Async/await, generators, type hints, metaclasses",        tag:"advanced",              color:"#7c6dfa" },
  { id:"flask-basics", icon:"{ }", name:"Flask",             desc:"Routes, templates, APIs, databases, authentication",     tag:"basics → expert",      color:"#34d399" },
  { id:"js-basics",    icon:"⟩",   name:"JavaScript",        desc:"DOM, events, fetch API, ES6+ modern JS",                 tag:"beginner · 2 levels",  color:"#fbbf24" },
  { id:"tkinter",      icon:"□",   name:"Tkinter",           desc:"Desktop GUI apps using Python's built-in toolkit",       tag:"beginner",             color:"#38bdf8" },
  { id:"kivy",         icon:"◱",   name:"Kivy",              desc:"Cross-platform mobile & desktop apps with Python",       tag:"beginner",             color:"#fb7185" },
  { id:"cheatsheet",   icon:"#",   name:"Cheatsheets",       desc:"Quick-reference cards for Python, JS & Flask",           tag:"searchable · filterable", color:"#34d399" },
];

const QUICK_LINKS = [
  { id:"py-basics",   icon:"λ",   label:"Python Basics",    color:"#7c6dfa" },
  { id:"cheatsheet",  icon:"#",   label:"Cheatsheets",      color:"#34d399" },
  { id:"flask-basics",icon:"{ }", label:"Flask",            color:"#34d399" },
  { id:"js-basics",   icon:"⟩",   label:"JavaScript",       color:"#fbbf24" },
];

export default function Dashboard() {
  const { setPage } = useApp();
  const isMobile    = useWindowWidth() < 900;
  const pad         = isMobile ? "0 16px" : "0 24px";
  const { progress, loading } = useProgressCtx();

  const trackIds = TRACK_DEFS.filter(t => t.id !== "cheatsheet").map(t => t.id);
  const completedCount = trackIds.filter(id => progress[id]?.completed).length;
  const quizzesTaken   = trackIds.filter(id => progress[id]?.score !== null && progress[id]?.score !== undefined).length;
  const pct = trackIds.length > 0 ? Math.round((completedCount / trackIds.length) * 100) : 0;

  return (
    <div>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? "28px 16px 20px" : "44px 24px 24px" }}>
        <h1 style={{
          fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800,
          fontSize: isMobile ? "clamp(1.8rem,8vw,2.4rem)" : "clamp(2rem,5vw,3rem)",
          lineHeight:1.05, letterSpacing:"-2px", marginBottom:14,
        }}>
          <span style={{ background:`linear-gradient(90deg,${T.accent},${T.rose})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Learn</span>
          {" and "}
          <span>Build</span>
        </h1>
        <p style={{ fontSize: isMobile ? 12.5 : 13.5, color:T.muted2, lineHeight:1.7, maxWidth:520, marginBottom:22 }}>
          Python, Flask, JavaScript, GUI frameworks and more. Structured guides, interactive quizzes, syntax-highlighted examples, and quick-reference cheatsheets.
        </p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={() => setPage("roadmap")} style={{
            background:T.accent, color:"#fff", border:"none",
            padding: isMobile ? "11px 18px" : "11px 22px",
            borderRadius:9, fontWeight:700, fontSize:12.5, cursor:"pointer", transition:"opacity .2s"
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity=".85"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity="1"}
          >View Roadmap →</button>
          {QUICK_LINKS.map(q => (
            <button key={q.id} onClick={() => setPage(q.id)} style={{
              background:"transparent", color:T.muted2, border:`1px solid ${T.border2}`,
              padding: isMobile ? "10px 14px" : "10px 18px",
              borderRadius:9, fontWeight:500, fontSize:12, cursor:"pointer", transition:"all .2s",
            }}
              onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=q.color; el.style.color=q.color; }}
              onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor=T.border2; el.style.color=T.muted2; }}
            >
              {q.icon} {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── My Progress ─────────────────────────────────────────── */}
      <div style={{ padding:`0 ${isMobile?"16px":"24px"} 24px`, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap: isMobile ? 7 : 10 }}>
        <StatCard value={loading ? "…" : String(completedCount)} label="Tracks Done"   color={T.accent}/>
        <StatCard value={loading ? "…" : String(quizzesTaken)}   label="Quizzes Taken" color={T.green}/>
        <StatCard value={loading ? "…" : `${pct}%`}              label="Completion"    color={T.amber}/>
      </div>

      {/* ── Getting Started banner ──────────────────────────────── */}
      <div style={{ padding:`0 ${isMobile?"16px":"24px"} 24px` }}>
        <div style={{
          background:`linear-gradient(135deg,rgba(124,109,250,.08),rgba(251,113,133,.06))`,
          border:`1px solid ${T.border}`, borderRadius:14, padding: isMobile ? "16px" : "18px 22px",
          display:"flex", flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center", gap:14,
        }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:14, marginBottom:4 }}>New here? Start with Python Basics 🐍</div>
            <div style={{ fontSize:12, color:T.muted2, lineHeight:1.6 }}>
              Build a solid foundation — variables, loops, functions, classes, and modules. Interactive quizzes included.
            </div>
          </div>
          <button onClick={() => setPage("py-basics")} style={{
            background:T.accent, color:"#fff", border:"none",
            padding:"10px 20px", borderRadius:9, fontWeight:700, fontSize:12.5,
            cursor:"pointer", flexShrink:0, transition:"opacity .2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity=".85"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity="1"}
          >Start Learning →</button>
        </div>
      </div>

      {/* ── Learning Tracks ─────────────────────────────────────── */}
      <div style={{ padding:`0 ${isMobile?"16px":"24px"}`, marginBottom:14, display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"2px", whiteSpace:"nowrap" }}>Learning Tracks</div>
        <div style={{ flex:1, height:1, background:T.border }}/>
        <div style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:T.muted }}>{TRACK_DEFS.length} tracks</div>
      </div>
      <div style={{ padding:`0 ${isMobile?"16px":"24px"} 32px`, display:"grid", gridTemplateColumns: isMobile ? "repeat(auto-fill,minmax(145px,1fr))" : "repeat(auto-fill,minmax(175px,1fr))", gap:10 }}>
        {TRACK_DEFS.map(t => {
          const p = progress[t.id];
          const scorePercent = (p?.score != null) ? Math.min(100, p.score) : null;
          return (
            <TrackCard
              key={t.id}
              {...t}
              done={p?.completed ?? false}
              scorePercent={scorePercent}
            />
          );
        })}
      </div>

      {/* ── Tips ────────────────────────────────────────────────── */}
      <div style={{ padding:`0 ${isMobile?"16px":"24px"} 40px` }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
          <div style={{ fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:11, color:T.muted, textTransform:"uppercase", letterSpacing:"2px", whiteSpace:"nowrap" }}>Tips for Learning</div>
          <div style={{ flex:1, height:1, background:T.border }}/>
        </div>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap:10 }}>
          {[
            { icon:"▶", color:T.green, title:"Run examples", body:"Click the ▶ run button on Python and JavaScript blocks to execute code right in your browser — no setup needed." },
            { icon:"🎯", color:T.accent, title:"Take quizzes", body:"Test your knowledge at the end of every topic. Your score is saved to your account automatically." },
            { icon:"≡", color:T.amber, title:"Use cheatsheets", body:"Quick-reference cards for Python, JS, and Flask. Search or filter by language for fast lookup." },
          ].map((tip, i) => (
            <div key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 16px" }}>
              <div style={{ fontSize:18, marginBottom:8 }}>{tip.icon}</div>
              <div style={{ fontWeight:700, fontSize:12.5, marginBottom:4, color:tip.color }}>{tip.title}</div>
              <div style={{ fontSize:11.5, color:T.muted2, lineHeight:1.6 }}>{tip.body}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize:10, fontFamily:"'Fira Code',monospace", color:T.muted, letterSpacing:"2px", textAlign:"center", padding:"20px 0 30px" }}>
        // codewithkurt
      </div>
    </div>
  );
}
