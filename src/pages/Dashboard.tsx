import { useState, useEffect } from "react";
import {
  ArrowRight, Check, BookOpen, Hash,
  Code2, Globe, Database, Monitor, Smartphone, FlaskConical, FileCode2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { T } from "../utils/theme";
import { useApp } from "../contexts/AppContext";
import { useProgressCtx } from "../contexts/ProgressContext";
import { useAuth } from "../contexts/AuthContext";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { ALL_ITEMS } from "../utils/nav";
import { LESSON_COURSE } from "../hooks/useProgress";

interface TrackDef {
  id: string;
  name: string;
  desc: string;
  tag: string;
  color: string;
  Icon: LucideIcon;
}

const TRACK_DEFS: TrackDef[] = [
  { id: "py-basics",    name: "Python Basics",    desc: "Variables, loops, functions, classes", tag: "beginner",     color: T.accent, Icon: Code2 },
  { id: "py-inter",     name: "Python Inter.",    desc: "Files, regex, OOP, decorators",        tag: "intermediate", color: T.accent, Icon: Code2 },
  { id: "py-adv",       name: "Python Advanced",  desc: "Async/await, generators, type hints",  tag: "advanced",     color: T.accent, Icon: Code2 },
  { id: "flask-basics", name: "Flask Basics",       desc: "Routes, templates, APIs, databases",  tag: "beginner",     color: T.green,  Icon: FlaskConical },
  { id: "flask-inter",  name: "Flask Inter.",       desc: "Jinja2, forms, blueprints, sessions",  tag: "intermediate", color: T.green,  Icon: FlaskConical },
  { id: "flask-expert", name: "Flask Expert",       desc: "SQLAlchemy, auth, REST API, deploy",   tag: "advanced",     color: T.green,  Icon: FlaskConical },
  { id: "js-basics",    name: "JavaScript",       desc: "DOM, events, fetch API, ES6+",         tag: "beginner",     color: T.amber,  Icon: FileCode2 },
  { id: "js-inter",     name: "JS Intermediate",  desc: "Async, promises, ES6+ patterns",       tag: "intermediate", color: T.amber,  Icon: FileCode2 },
  { id: "js-adv",       name: "JS Advanced",      desc: "TypeScript, patterns, performance",    tag: "advanced",     color: T.amber,  Icon: FileCode2 },
  { id: "html-css",     name: "HTML & CSS",       desc: "Markup, layouts, modern CSS",           tag: "beginner",     color: T.amber,  Icon: Globe },
  { id: "cpp-basics",   name: "C++ Basics",       desc: "Syntax, memory, OOP foundations",      tag: "beginner",     color: T.sky,    Icon: Code2 },
  { id: "cpp-inter",    name: "C++ Inter.",        desc: "STL, templates, smart pointers",       tag: "intermediate", color: T.sky,    Icon: Code2 },
  { id: "cpp-adv",      name: "C++ Advanced",     desc: "Concurrency, patterns, systems",       tag: "advanced",     color: T.sky,    Icon: Code2 },
  { id: "cs-basics",    name: "C# Basics",        desc: "Syntax, .NET, OOP fundamentals",       tag: "beginner",     color: T.rose,   Icon: Code2 },
  { id: "cs-inter",     name: "C# Inter.",         desc: "LINQ, async, generics",               tag: "intermediate", color: T.rose,   Icon: Code2 },
  { id: "cs-adv",       name: "C# Advanced",      desc: "Patterns, reflection, performance",    tag: "advanced",     color: T.rose,   Icon: Code2 },
  { id: "tkinter",      name: "Tkinter",           desc: "Desktop GUI apps in Python",          tag: "beginner",     color: T.sky,    Icon: Monitor },
  { id: "kivy",         name: "Kivy",              desc: "Cross-platform mobile & desktop",     tag: "beginner",     color: T.rose,   Icon: Smartphone },
  { id: "scraping",     name: "Web Scraping",     desc: "requests, BeautifulSoup, parsers",      tag: "reference",   color: T.muted2, Icon: Globe },
  { id: "sqlite",       name: "SQLite",            desc: "Persistent data storage",              tag: "reference",   color: T.muted2, Icon: Database },
  { id: "cheatsheet",   name: "Cheatsheets",       desc: "Quick-reference cards, searchable",   tag: "reference",    color: T.green,  Icon: Hash },
];

function CircleProgress({ pct, size = 80 }: { pct: number; size?: number }) {
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{
        position: "absolute", inset: -8, borderRadius: "50%",
        background: `radial-gradient(closest-side, ${T.accent}40, transparent 70%)`,
        filter: "blur(8px)", pointerEvents: "none",
      }} />
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: "relative" }}>
        <defs>
          <linearGradient id="cifRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="var(--t-accent)" />
            <stop offset="100%" stopColor="var(--t-rose)" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={T.border} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="url(#cifRing)" strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dasharray .7s cubic-bezier(.4,0,.2,1), stroke-dashoffset 0.8s ease" }} />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 800, fontSize: 18, color: T.text,
      }}>{pct}%</div>
    </div>
  );
}

function SectionDivider({ label, count }: { label: string; count?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 14px" }}>
      <div style={{
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 700, fontSize: 11,
        color: T.muted2, textTransform: "uppercase",
        letterSpacing: "2px", whiteSpace: "nowrap",
      }}>{label}</div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
      {count !== undefined && (
        <div style={{
          fontSize: 10, fontFamily: "'Fira Code',monospace", color: T.muted,
        }}>// {count} tracks</div>
      )}
    </div>
  );
}

const NOISE_BG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.45'/></svg>")`;

export default function Dashboard() {
  const { setPage } = useApp();
  const { progress, loading } = useProgressCtx();
  const { user } = useAuth();
  const isMobile = useWindowWidth() < 900;

  const [recentPages, setRecentPages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cif_recent_pages");
      if (raw) setRecentPages(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const trackIds       = TRACK_DEFS.filter(t => t.id !== "cheatsheet").map(t => t.id);
  const completedCount = trackIds.filter(id => progress[id]?.completed).length;
  const quizzesTaken   = trackIds.filter(id => progress[id]?.score != null).length;
  const pct = trackIds.length ? Math.round((completedCount / trackIds.length) * 100) : 0;

  const avgScore = (() => {
    const scored = trackIds.map(id => progress[id]?.score).filter(s => s != null) as number[];
    if (!scored.length) return 0;
    return Math.round(scored.reduce((a, b) => a + b, 0) / scored.length);
  })();

  const displayName = (() => {
    try { return localStorage.getItem("cif_display_name"); } catch { return null; }
  })();
  const name = displayName ?? user?.email?.split("@")[0] ?? "friend";

  const recentContinue = recentPages
    .filter(id => id in LESSON_COURSE && ALL_ITEMS.some(i => i.id === id))
    .slice(0, 4)
    .map(id => {
      const navItem = ALL_ITEMS.find(i => i.id === id)!;
      const p = progress[id];
      const pctVal = p?.completed ? 100 : p?.score != null ? Math.min(95, p.score) : 25;
      const lastTab = (() => { try { return localStorage.getItem(`cif_tab_${id}`); } catch { return null; } })();
      return { id, label: navItem.label, color: navItem.color, pct: pctVal, lastTab };
    });

  const pad = isMobile ? "16px" : "28px";

  return (
    <div>
      {/* ─── Hero ─── */}
      <div style={{ padding: `${isMobile ? "20px" : "32px"} ${pad} 22px` }}>
        <div style={{
          position: "relative",
          background: `linear-gradient(135deg, ${T.bg2}, ${T.surface})`,
          border: `1px solid ${T.border}`,
          borderRadius: 18,
          padding: isMobile ? "22px 18px" : "32px 32px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 24,
          flexWrap: isMobile ? "wrap" : "nowrap",
          overflow: "hidden",
        }}>
          {/* noise overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0,
            backgroundImage: NOISE_BG, opacity: 0.07,
            pointerEvents: "none", mixBlendMode: "overlay",
          }} />
          {/* accent glow */}
          <div aria-hidden style={{
            position: "absolute", right: -60, top: -60,
            width: 240, height: 240, borderRadius: "50%",
            background: `radial-gradient(closest-side, ${T.accent}22, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 800,
              fontSize: isMobile ? "clamp(1.5rem,6vw,2rem)" : "clamp(2rem,3.6vw,2.6rem)",
              letterSpacing: "-1.2px", lineHeight: 1.05, marginBottom: 8,
            }}>
              hey,{" "}
              <span style={{
                background: `linear-gradient(90deg, ${T.accent}, ${T.rose})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{name}</span>
            </div>
            <div style={{
              fontFamily: "'Fira Code',monospace",
              fontSize: 12, color: T.muted2, marginBottom: 18,
              letterSpacing: "0.3px",
            }}>// keep building</div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <StatPill label="Completed"    value={completedCount} color={T.accent} loading={loading} />
              <StatPill label="Quizzes"      value={quizzesTaken}   color={T.green}  loading={loading} />
              <StatPill label="Avg score"    value={`${avgScore}%`} color={T.amber}  loading={loading} />
            </div>
          </div>

          {loading ? (
            <div style={{
              width: isMobile ? 72 : 96, height: isMobile ? 72 : 96, borderRadius: "50%",
              flexShrink: 0,
              background: `linear-gradient(90deg, var(--t-surface) 25%, var(--t-surface2) 50%, var(--t-surface) 75%)`,
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }} />
          ) : (
            <CircleProgress pct={pct} size={isMobile ? 72 : 96} />
          )}
        </div>
      </div>

      {/* ─── Continue Learning ─── */}
      <div style={{ padding: `0 ${pad} 24px` }}>
        <SectionDivider label="Continue learning" />
        {recentContinue.length === 0 ? (
          <div style={{
            padding: "16px 20px",
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            fontSize: 12.5,
            color: T.muted2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span>You haven't started any lessons yet.</span>
            <button onClick={() => setPage("py-basics")} style={{
              background: "transparent",
              border: `1px solid ${T.border2}`,
              borderRadius: 8,
              color: T.accent,
              fontSize: 12,
              padding: "5px 12px",
              cursor: "pointer",
            }}>Start here →</button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
          }}>
            {recentContinue.map(h => (
              <ContinueCard key={h.id} {...h} onClick={() => setPage(h.id)} />
            ))}
          </div>
        )}
      </div>

      {/* ─── All Tracks ─── */}
      <div style={{ padding: `0 ${pad} 32px` }}>
        <SectionDivider label="All tracks" count={TRACK_DEFS.length} />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill,minmax(150px,1fr))"
            : "repeat(auto-fill,minmax(220px,1fr))",
          gap: 12,
        }}>
          {TRACK_DEFS.map(t => {
            const p = progress[t.id];
            const done = !!p?.completed;
            const score = p?.score ?? null;
            const pctVal = done ? 100 : score != null ? Math.min(95, score) : 0;
            return (
              <TrackCard
                key={t.id}
                track={t}
                done={done}
                pct={pctVal}
                onClick={() => setPage(t.id)}
              />
            );
          })}
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div style={{
        padding: "28px 16px",
        textAlign: "center",
        fontFamily: "'Fira Code',monospace",
        fontSize: 10.5, color: T.muted, letterSpacing: "1px",
      }}>// codeisfun</div>
    </div>
  );
}

/* ───────────────── pieces ───────────────── */

const SHIMMER_STYLE: React.CSSProperties = {
  background: `linear-gradient(90deg, var(--t-surface) 25%, var(--t-surface2) 50%, var(--t-surface) 75%)`,
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s infinite",
  borderRadius: 6,
  display: "inline-block",
};

function StatPill({ label, value, color, loading }: { label: string; value: number | string; color: string; loading?: boolean }) {
  return (
    <div style={{
      padding: "6px 14px",
      background: T.bg,
      border: `1px solid ${T.border2}`,
      borderRadius: 999,
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: color,
        boxShadow: `0 0 8px ${color}`,
      }} />
      {loading ? (
        <div style={{ ...SHIMMER_STYLE, width: 40, height: 14 }} />
      ) : (
        <span style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: 14, color: T.text,
        }}>{value}</span>
      )}
      <span style={{ fontSize: 10.5, color: T.muted2 }}>{label}</span>
    </div>
  );
}

function ContinueCard({
  label, color, pct, lastTab, onClick,
}: { label: string; color: string; pct: number; lastTab: string | null; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        background: `${T.surface}cc`,
        border: `1px solid ${T.border}`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 14, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 12,
        textAlign: "left", cursor: "pointer", color: T.text,
        transition: "all .2s",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 12px 32px ${color}30`;
        el.style.borderColor = color;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "none";
        el.style.borderColor = T.border;
      }}
    >
      {/* left accent bar */}
      <span style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 4, background: color,
      }} />
      <div style={{ flex: 1, minWidth: 0, paddingLeft: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 2 }}>{label}</div>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 10.5, color: T.muted2, marginBottom: 8,
        }}>{lastTab ? `// last: ${lastTab}` : "// resume"}</div>
        <div style={{ height: 4, background: T.border, borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`, borderRadius: 2,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: "width .6s ease",
          }} />
        </div>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: 999,
        background: `${color}1c`, border: `1px solid ${color}55`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color, flexShrink: 0,
      }}>
        <ArrowRight size={16} />
      </div>
    </button>
  );
}

function TrackCard({
  track, done, pct, onClick,
}: { track: TrackDef; done: boolean; pct: number; onClick: () => void }) {
  const { name, desc, tag, color, Icon } = track;
  return (
    <button
      onClick={onClick}
      style={{
        position: "relative",
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 14, padding: "16px 16px 14px",
        textAlign: "left", cursor: "pointer", color: T.text,
        transition: "all .2s",
        overflow: "hidden",
        borderLeft: done ? `3px solid ${T.green}` : `3px solid transparent`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 12px 32px ${color}26`;
        const ov = el.querySelector<HTMLElement>("[data-overlay]");
        if (ov) ov.style.opacity = "0.15";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "none";
        const ov = el.querySelector<HTMLElement>("[data-overlay]");
        if (ov) ov.style.opacity = "0.08";
      }}
    >
      <div
        data-overlay
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${color} 0%, transparent 60%)`,
          opacity: 0.08, transition: "opacity .2s",
          pointerEvents: "none",
        }}
      />
      <div style={{
        position: "relative",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: 10,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: `${color}18`, border: `1px solid ${color}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color,
        }}>
          <Icon size={18} strokeWidth={2} />
        </div>
        {done && (
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            background: T.green,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.bg,
          }}>
            <Check size={13} strokeWidth={3} />
          </div>
        )}
      </div>
      <div style={{ position: "relative", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{name}</div>
      <div style={{
        position: "relative",
        fontSize: 11, color: T.muted2, lineHeight: 1.45,
        minHeight: 30, marginBottom: 10,
      }}>{desc}</div>
      <div style={{ position: "relative", height: 3, background: T.border, borderRadius: 2, overflow: "hidden", marginBottom: 8 }}>
        <div style={{
          height: "100%", width: `${pct}%`, borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          transition: "width .6s ease",
        }} />
      </div>
      <div style={{
        position: "relative",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{
          fontSize: 9, fontFamily: "'Fira Code',monospace",
          letterSpacing: "1px", textTransform: "uppercase",
          padding: "2px 7px", borderRadius: 4,
          background: `${color}1a`, color,
        }}>{tag}</span>
        <span style={{
          fontSize: 10, color: T.muted, fontFamily: "'Fira Code',monospace",
        }}>{pct}%</span>
      </div>
    </button>
  );
}
