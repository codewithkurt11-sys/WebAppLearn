import { useState, useRef } from "react";
import { Check, Lock, GripVertical } from "lucide-react";
import { T } from "../utils/theme";
import { useApp } from "../contexts/AppContext";
import { useProgressCtx } from "../contexts/ProgressContext";
import { useWindowWidth } from "../hooks/useWindowWidth";

interface Step {
  id: string;
  title: string;
  desc: string;
  skills: string[];
  color: string;
}

interface Track {
  id: string;
  phase: string;
  color: string;
  steps: Step[];
}

const DEFAULT_TRACKS: Track[] = [
  { id: "python", phase: "Python Foundations", color: T.accent, steps: [
    { id: "py-basics", title: "Python Basics",       color: T.accent, desc: "The building blocks of every Python program",    skills: ["Variables & Types","Strings","Lists & Dicts","Loops","Functions","Classes","Modules"] },
    { id: "py-inter",  title: "Python Intermediate", color: T.accent, desc: "Write cleaner, more powerful Python",             skills: ["Comprehensions","Generators","Decorators","File I/O","Regex","OOP deep dive"] },
    { id: "py-adv",    title: "Python Advanced",     color: T.accent, desc: "Expert-level Python patterns",                   skills: ["Async/await","Threading","Type hints","Metaclasses","Design patterns"] },
  ]},
  { id: "flask", phase: "Flask & Web Backend", color: T.green, steps: [
    { id: "flask-basics", title: "Flask Basics",       color: T.green, desc: "Build your first web server in Python",           skills: ["Routes & views","Request/Response","JSON APIs","Debug mode"] },
    { id: "flask-inter",  title: "Flask Intermediate", color: T.green, desc: "Templates, forms, and databases",                 skills: ["Jinja2 templates","HTML forms","SQLite + Flask","Blueprints","Sessions"] },
    { id: "flask-expert", title: "Flask Expert",       color: T.green, desc: "Production-ready Flask applications",             skills: ["User auth","SQLAlchemy","REST API design","File uploads","Deployment"] },
  ]},
  { id: "javascript", phase: "JavaScript & the Browser", color: T.amber, steps: [
    { id: "js-basics", title: "JavaScript Basics",       color: T.amber, desc: "Make web pages interactive",                   skills: ["Variables","DOM manipulation","Events","fetch API","Async/await"] },
    { id: "js-inter",  title: "JavaScript Intermediate", color: T.amber, desc: "Advanced JS patterns",                         skills: ["Promises","ES Modules","Local Storage","Canvas API"] },
    { id: "js-adv",    title: "JavaScript Advanced",     color: T.amber, desc: "Deep JS and modern tooling",                   skills: ["Closures","Prototypes","Web Workers","Build tools"] },
  ]},
  { id: "web", phase: "HTML, CSS & Databases", color: T.sky, steps: [
    { id: "html-css", title: "HTML & CSS",       color: T.sky,    desc: "Structure and style for the web",                    skills: ["Semantic HTML","Flexbox","Grid","Responsive design","CSS variables"] },
    { id: "sqlite",   title: "SQLite",           color: T.sky,    desc: "Persistent data storage",                           skills: ["SELECT/INSERT","WHERE & ORDER","JOINS","sqlite3 module"] },
    { id: "scraping", title: "Web Scraping",     color: T.muted2, desc: "Extract data from any website",                     skills: ["requests","BeautifulSoup","Parsing HTML","Saving CSV"] },
  ]},
  { id: "desktop", phase: "Desktop & Mobile GUI", color: T.rose, steps: [
    { id: "tkinter", title: "Tkinter", color: T.sky,  desc: "Desktop GUI apps with Python",                                  skills: ["Widgets","Layout managers","Events","Full app patterns"] },
    { id: "kivy",    title: "Kivy",    color: T.rose, desc: "Cross-platform mobile & desktop",                               skills: ["KV language","Layouts","Touch events","APK building"] },
  ]},
  { id: "cpp", phase: "C++", color: T.sky, steps: [
    { id: "cpp-basics", title: "C++ Basics",       color: T.sky, desc: "Systems programming fundamentals",                   skills: ["Variables","Pointers","Arrays","Functions","Structs"] },
    { id: "cpp-inter",  title: "C++ Intermediate", color: T.sky, desc: "OOP and memory management",                         skills: ["Classes","Inheritance","Templates","STL","Smart pointers"] },
    { id: "cpp-adv",    title: "C++ Advanced",     color: T.sky, desc: "High-performance C++ patterns",                     skills: ["Move semantics","Concurrency","Metaprogramming","RAII"] },
  ]},
  { id: "csharp", phase: "C#", color: T.rose, steps: [
    { id: "cs-basics", title: "C# Basics",       color: T.rose, desc: "C# and .NET fundamentals",                           skills: ["Types","Control flow","Methods","LINQ intro","Namespaces"] },
    { id: "cs-inter",  title: "C# Intermediate", color: T.rose, desc: "OOP and .NET ecosystem",                             skills: ["Classes","Interfaces","Generics","Async/await","File I/O"] },
    { id: "cs-adv",    title: "C# Advanced",     color: T.rose, desc: "Advanced .NET patterns",                             skills: ["Reflection","DI","Delegates","Expression trees","ASP.NET"] },
  ]},
];

const LS_ORDER_KEY = "cif_roadmap_order";

function loadOrder(): string[] {
  try {
    const raw = localStorage.getItem(LS_ORDER_KEY);
    if (raw) {
      const parsed: string[] = JSON.parse(raw);
      // Ensure any new tracks not in saved order get appended
      const saved = new Set(parsed);
      const all = DEFAULT_TRACKS.map(t => t.id);
      return [...parsed.filter(id => all.includes(id)), ...all.filter(id => !saved.has(id))];
    }
  } catch {}
  return DEFAULT_TRACKS.map(t => t.id);
}

function saveOrder(order: string[]) {
  try { localStorage.setItem(LS_ORDER_KEY, JSON.stringify(order)); } catch {}
}

export default function Roadmap() {
  const { setPage } = useApp();
  const { progress, loading } = useProgressCtx();
  const isMobile = useWindowWidth() < 900;

  const [trackOrder, setTrackOrder] = useState<string[]>(loadOrder);
  const [editMode, setEditMode] = useState(false);
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);

  if (loading) return (
    <div style={{ padding: 32, color: T.muted2, fontFamily: "'Fira Code',monospace", fontSize: 12 }}>
      // loading roadmap...
    </div>
  );

  const orderedTracks = trackOrder
    .map(id => DEFAULT_TRACKS.find(t => t.id === id))
    .filter(Boolean) as Track[];

  const ALL_STEPS = orderedTracks.flatMap(t => t.steps);
  const doneCount = ALL_STEPS.filter(s => progress[s.id]?.completed).length;
  const total = ALL_STEPS.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;
  const firstUndone = ALL_STEPS.find(s => !progress[s.id]?.completed)?.id;

  // Drag handlers for reordering tracks
  const onDragStart = (i: number) => { dragIdx.current = i; };
  const onDragEnter = (i: number) => { dragOverIdx.current = i; };
  const onDragEnd = () => {
    const from = dragIdx.current;
    const to = dragOverIdx.current;
    if (from === null || to === null || from === to) { dragIdx.current = null; dragOverIdx.current = null; return; }
    const next = [...trackOrder];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setTrackOrder(next);
    saveOrder(next);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  let stepIndex = -1;

  return (
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px" }}>
      <style>{`
        @keyframes cifPulseRing {
          0%   { box-shadow: 0 0 0 0 var(--t-accent,${T.accent}); }
          70%  { box-shadow: 0 0 0 10px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .rmap-track-row { transition: opacity .15s; }
        .rmap-track-row.dragging { opacity: 0.4; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 6 }}>
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 32, letterSpacing: "-1px", marginBottom: 4 }}>
              Roadmap
            </div>
            <div style={{ fontFamily: "'Fira Code',monospace", fontSize: 11, color: T.muted2 }}>
              // {doneCount} of {total} milestones complete
            </div>
          </div>
          <button
            onClick={() => setEditMode(e => !e)}
            style={{
              flexShrink: 0,
              padding: "7px 14px",
              border: `1px solid ${editMode ? T.accent : T.border2}`,
              borderRadius: 8,
              background: editMode ? `${T.accent}18` : T.surface,
              color: editMode ? T.accent : T.muted2,
              fontFamily: "'Fira Code',monospace",
              fontSize: 11, cursor: "pointer",
              transition: "all .2s",
            }}
          >
            {editMode ? "✓ done" : "reorder tracks"}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14 }}>
          <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${T.accent}, ${T.rose})`, transition: "width .8s ease" }} />
          </div>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 16, color: T.text, minWidth: 44, textAlign: "right" }}>{pct}%</div>
        </div>
      </div>

      {/* Edit mode: drag-to-reorder track list */}
      {editMode && (
        <div style={{ marginBottom: 28, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <GripVertical size={13} color={T.muted} />
            <span style={{ fontSize: 11, color: T.muted2, fontFamily: "'Fira Code',monospace" }}>drag to set your learning priority</span>
          </div>
          {orderedTracks.map((track, i) => {
            const donePct = track.steps.length
              ? Math.round(track.steps.filter(s => progress[s.id]?.completed).length / track.steps.length * 100)
              : 0;
            return (
              <div
                key={track.id}
                className="rmap-track-row"
                draggable
                onDragStart={() => onDragStart(i)}
                onDragEnter={() => onDragEnter(i)}
                onDragEnd={onDragEnd}
                onDragOver={e => e.preventDefault()}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px",
                  borderBottom: i < orderedTracks.length - 1 ? `1px solid ${T.border}` : "none",
                  cursor: "grab", userSelect: "none",
                  background: T.surface,
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.surface2}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = T.surface}
              >
                <GripVertical size={15} color={T.muted} style={{ flexShrink: 0 }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: track.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.text }}>{track.phase}</div>
                  <div style={{ fontSize: 10, color: T.muted, fontFamily: "'Fira Code',monospace", marginTop: 2 }}>
                    {track.steps.length} lessons · {donePct}% done
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 60, height: 3, background: T.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${donePct}%`, background: track.color, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 10, color: T.muted2, fontFamily: "'Fira Code',monospace", minWidth: 30, textAlign: "right" }}>
                    #{i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        <div aria-hidden style={{
          position: "absolute",
          left: isMobile ? 19 : "50%",
          transform: isMobile ? "none" : "translateX(-1px)",
          top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom, ${T.accent}, ${T.border} 90%)`,
          borderRadius: 1,
        }} />

        {orderedTracks.map(track => (
          <div key={track.id} style={{ position: "relative" }}>
            {/* Phase divider */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "26px 0 18px" }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${track.color}55)` }} />
              <div style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 800, fontSize: 11, textTransform: "uppercase", letterSpacing: "2px",
                color: track.color, padding: "4px 12px", background: T.bg, borderRadius: 6,
              }}>{track.phase}</div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${track.color}55, transparent)` }} />
            </div>

            {track.steps.map(step => {
              stepIndex++;
              const done = !!progress[step.id]?.completed;
              const current = !done && step.id === firstUndone;
              const locked = !done && !current;
              const sideRight = isMobile ? true : stepIndex % 2 === 1;
              return (
                <TimelineRow
                  key={step.id}
                  step={step}
                  done={done}
                  current={current}
                  locked={locked}
                  isMobile={isMobile}
                  sideRight={sideRight}
                  onClick={() => setPage(step.id)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ step, done, current, locked, isMobile, sideRight, onClick }: {
  step: Step; done: boolean; current: boolean; locked: boolean;
  isMobile: boolean; sideRight: boolean; onClick: () => void;
}) {
  const nodeColor = done ? T.green : current ? T.accent : T.border2;
  const nodeFill  = done ? T.green : current ? T.accent : T.surface2;

  const cardCol: React.CSSProperties = isMobile
    ? { marginLeft: 44, marginRight: 0 }
    : sideRight
      ? { marginLeft: "calc(50% + 28px)", marginRight: 0 }
      : { marginLeft: 0, marginRight: "calc(50% + 28px)", textAlign: "right" };

  return (
    <div style={{ position: "relative", padding: "12px 0" }}>
      <div style={{
        position: "absolute",
        left: isMobile ? 12 : "50%",
        transform: isMobile ? "none" : "translateX(-50%)",
        top: 22, width: 18, height: 18, borderRadius: "50%",
        background: nodeFill, border: `2px solid ${T.bg}`,
        boxShadow: current ? `0 0 0 0 ${T.accent}` : `0 0 0 1px ${nodeColor}`,
        animation: current ? "cifPulseRing 1.6s ease-out infinite" : "none",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
      }}>
        {done && <Check size={11} strokeWidth={3} color={T.bg} />}
        {locked && <Lock size={9} strokeWidth={2.5} color={T.muted} />}
      </div>

      <button
        onClick={onClick}
        style={{
          ...cardCol,
          display: "block", width: isMobile ? "auto" : "calc(50% - 28px)",
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 12, padding: "14px 16px",
          cursor: "pointer", color: T.text,
          textAlign: (cardCol.textAlign as React.CSSProperties["textAlign"]) ?? "left",
          transition: "all .2s",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = `0 10px 28px ${step.color}22`;
          el.style.borderColor = step.color;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "";
          el.style.boxShadow = "none";
          el.style.borderColor = T.border;
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, gap: 8, flexDirection: cardCol.textAlign === "right" ? "row-reverse" : "row" }}>
          <div style={{ fontWeight: 700, fontSize: 13.5, color: T.text }}>{step.title}</div>
          <div style={{
            fontSize: 9, fontFamily: "'Fira Code',monospace",
            letterSpacing: "1px", textTransform: "uppercase",
            padding: "2px 7px", borderRadius: 4,
            background: done ? `${T.green}1a` : current ? `${T.accent}1a` : `${T.muted}1a`,
            color: done ? T.green : current ? T.accent : T.muted2,
          }}>{done ? "done" : current ? "now" : "next"}</div>
        </div>
        <div style={{ fontSize: 11.5, color: T.muted2, lineHeight: 1.5, marginBottom: 10 }}>{step.desc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: cardCol.textAlign === "right" ? "flex-end" : "flex-start" }}>
          {step.skills.slice(0, 5).map(s => (
            <span key={s} style={{ fontSize: 10, padding: "2px 7px", background: T.bg2, border: `1px solid ${T.border}`, borderRadius: 4, color: T.muted2, fontFamily: "'Fira Code',monospace" }}>{s}</span>
          ))}
        </div>
      </button>
    </div>
  );
              }
