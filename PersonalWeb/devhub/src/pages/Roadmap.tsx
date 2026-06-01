import { Check, Lock } from "lucide-react";
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

const PHASES: { phase: string; color: string; steps: Step[] }[] = [
  { phase: "Phase 1 — Python Foundations", color: T.accent, steps: [
    { id: "py-basics", title: "Python Basics",       color: T.accent, desc: "The building blocks of every Python program",
      skills: ["Variables & Types","Strings","Lists & Dicts","Loops","Functions","Classes","Modules"] },
    { id: "py-inter",  title: "Python Intermediate", color: T.accent, desc: "Write cleaner, more powerful Python",
      skills: ["Comprehensions","Generators","Decorators","File I/O","Regex","OOP deep dive"] },
    { id: "py-adv",    title: "Python Advanced",      color: T.accent, desc: "Expert-level Python patterns",
      skills: ["Async/await","Threading","Type hints","Metaclasses","Design patterns"] },
  ]},
  { phase: "Phase 2 — Web Development with Flask", color: T.green, steps: [
    { id: "flask-basics", title: "Flask Basics",       color: T.green, desc: "Build your first web server in Python",
      skills: ["Routes & views","Request/Response","JSON APIs","Debug mode"] },
    { id: "flask-inter",  title: "Flask Intermediate", color: T.green, desc: "Templates, forms, and databases",
      skills: ["Jinja2 templates","HTML forms","SQLite + Flask","Blueprints","Sessions"] },
    { id: "flask-expert", title: "Flask Expert",        color: T.green, desc: "Production-ready Flask applications",
      skills: ["User auth","SQLAlchemy","REST API design","File uploads","Deployment"] },
  ]},
  { phase: "Phase 3 — JavaScript & the Browser", color: T.amber, steps: [
    { id: "js-basics", title: "JavaScript Basics",       color: T.amber, desc: "Make web pages interactive",
      skills: ["Variables","DOM manipulation","Events","fetch API","Async/await"] },
    { id: "js-inter",  title: "JavaScript Intermediate", color: T.amber, desc: "Advanced JS patterns",
      skills: ["Promises","ES Modules","Local Storage","Canvas API"] },
  ]},
  { phase: "Phase 4 — GUI, Scraping & Databases", color: T.sky, steps: [
    { id: "tkinter",  title: "Tkinter",      color: T.sky,    desc: "Desktop GUI apps with Python",
      skills: ["Widgets","Layout managers","Events","Full app patterns"] },
    { id: "kivy",     title: "Kivy",          color: T.rose,   desc: "Cross-platform mobile & desktop",
      skills: ["KV language","Layouts","Touch events","APK building"] },
    { id: "scraping", title: "Web Scraping",  color: T.muted2, desc: "Extract data from any website",
      skills: ["requests","BeautifulSoup","Parsing HTML","Saving CSV"] },
    { id: "sqlite",   title: "SQLite",         color: T.muted2, desc: "Persistent data storage",
      skills: ["SELECT/INSERT","WHERE & ORDER","JOINS","sqlite3 module"] },
  ]},
];

const ALL_STEPS = PHASES.flatMap(p => p.steps);

export default function Roadmap() {
  const { setPage } = useApp();
  const { progress } = useProgressCtx();
  const isMobile = useWindowWidth() < 900;

  const doneCount = ALL_STEPS.filter(s => progress[s.id]?.completed).length;
  const total = ALL_STEPS.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const firstUndone = ALL_STEPS.find(s => !progress[s.id]?.completed)?.id;

  let stepIndex = -1;

  return (
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px" }}>
      <style>{`
        @keyframes cifPulseRing {
          0% { box-shadow: 0 0 0 0 var(--t-accent); }
          70% { box-shadow: 0 0 0 10px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
      `}</style>

      {/* Header + progress */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 32,
          letterSpacing: "-1px", marginBottom: 6,
        }}>Roadmap</div>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 12, color: T.muted2, marginBottom: 18,
        }}>// {doneCount} of {total} milestones complete</div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`, borderRadius: 3,
              background: `linear-gradient(90deg, ${T.accent}, ${T.rose})`,
              transition: "width .8s ease",
            }} />
          </div>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800, fontSize: 16, color: T.text,
            minWidth: 44, textAlign: "right",
          }}>{pct}%</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative" }}>
        {/* center line */}
        <div aria-hidden style={{
          position: "absolute",
          left: isMobile ? 19 : "50%",
          transform: isMobile ? "none" : "translateX(-1px)",
          top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom, ${T.accent}, ${T.border} 90%)`,
          borderRadius: 1,
        }} />

        {PHASES.map(phase => (
          <div key={phase.phase} style={{ position: "relative" }}>
            {/* Phase divider */}
            <div style={{
              position: "relative",
              display: "flex", alignItems: "center", gap: 14,
              padding: "26px 0 18px",
              margin: isMobile ? "0 0 0 0" : "0",
            }}>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, transparent, ${phase.color}55)`,
              }} />
              <div style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 800, fontSize: 11.5,
                textTransform: "uppercase", letterSpacing: "2px",
                color: phase.color, textAlign: "center",
                padding: "4px 12px",
                background: T.bg,
                borderRadius: 6,
              }}>{phase.phase}</div>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${phase.color}55, transparent)`,
              }} />
            </div>

            {phase.steps.map(step => {
              stepIndex++;
              const p = progress[step.id];
              const done = !!p?.completed;
              const current = !done && step.id === firstUndone;
              const locked = !done && !current;
              const sideRight = isMobile ? true : (stepIndex % 2 === 1);

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

function TimelineRow({
  step, done, current, locked, isMobile, sideRight, onClick,
}: {
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
      {/* node */}
      <div style={{
        position: "absolute",
        left: isMobile ? 12 : "50%",
        transform: isMobile ? "none" : "translateX(-50%)",
        top: 22,
        width: 18, height: 18, borderRadius: "50%",
        background: nodeFill,
        border: `2px solid ${T.bg}`,
        boxShadow: current ? `0 0 0 0 ${T.accent}` : `0 0 0 1px ${nodeColor}`,
        animation: current ? "cifPulseRing 1.6s ease-out infinite" : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2,
      }}>
        {done && <Check size={11} strokeWidth={3} color={T.bg} />}
        {locked && <Lock size={9} strokeWidth={2.5} color={T.muted} />}
      </div>

      {/* card */}
      <button
        onClick={onClick}
        style={{
          ...cardCol,
          display: "block", width: isMobile ? "auto" : "calc(50% - 28px)",
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 12, padding: "14px 16px",
          cursor: "pointer", color: T.text,
          textAlign: cardCol.textAlign,
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
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 6, gap: 8, flexDirection: cardCol.textAlign === "right" ? "row-reverse" : "row",
        }}>
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
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 5,
          justifyContent: cardCol.textAlign === "right" ? "flex-end" : "flex-start",
        }}>
          {step.skills.slice(0, 5).map(s => (
            <span key={s} style={{
              fontSize: 10, padding: "2px 7px",
              background: T.bg2, border: `1px solid ${T.border}`,
              borderRadius: 4, color: T.muted2,
              fontFamily: "'Fira Code',monospace",
            }}>{s}</span>
          ))}
        </div>
      </button>
    </div>
  );
}
