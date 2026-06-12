import { useState, useEffect, useMemo } from "react";
import { T } from "../utils/theme";
import { useAuth } from "../contexts/AuthContext";
import { useProgressCtx } from "../contexts/ProgressContext";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useApp } from "../contexts/AppContext";
import { ALL_ITEMS } from "../utils/nav";

const COURSE_LESSONS: Record<string, { label: string; ids: string[]; color: string }> = {
  python:     { label: "Python",     ids: ["py-basics","py-inter","py-adv","scraping","sqlite"], color: T.accent },
  flask:      { label: "Flask",      ids: ["flask-basics","flask-inter","flask-expert"],         color: T.green  },
  javascript: { label: "JavaScript", ids: ["js-basics","js-inter"],                              color: T.amber  },
  desktop:    { label: "Desktop",    ids: ["tkinter","kivy"],                                    color: T.sky    },
  web:        { label: "Web",        ids: ["html-css"],                                          color: T.amber  },
};

const pageLabel = (id: string) => ALL_ITEMS.find(i => i.id === id)?.label ?? id;

export default function Profile() {
  const { user } = useAuth();
  const { progress } = useProgressCtx();
  const isMobile = useWindowWidth() < 900;
  const { setPage } = useApp();

  const [displayName, setDisplayName] = useState<string>(() => {
    try { return localStorage.getItem("cif_display_name") ?? ""; } catch { return ""; }
  });

  const [recentPages, setRecentPages] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cif_recent_pages");
      if (raw) setRecentPages(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const saveName = (v: string) => {
    setDisplayName(v);
    try { localStorage.setItem("cif_display_name", v); } catch { /* ignore */ }
  };

  const initials = (displayName || user?.email || "··").slice(0, 2).toUpperCase();
  const memberSince = (() => {
    try {
      const v = localStorage.getItem("cif_member_since");
      if (v) return new Date(v).toLocaleDateString();
      const today = new Date().toISOString();
      localStorage.setItem("cif_member_since", today);
      return new Date(today).toLocaleDateString();
    } catch { return "—"; }
  })();

  const skills = useMemo(() => Object.entries(COURSE_LESSONS).map(([key, c]) => {
    const done = c.ids.filter(id => progress[id]?.completed).length;
    const pct  = c.ids.length ? Math.round(done / c.ids.length * 100) : 0;
    return { key, label: c.label, color: c.color, pct, done, total: c.ids.length };
  }), [progress]);

  const scored   = Object.values(progress).map(p => p?.score).filter(s => typeof s === "number") as number[];
  const accuracy = scored.length ? Math.round(scored.reduce((a,b)=>a+b,0) / scored.length) : 0;
  const quizzes  = scored.length;
  const minutes  = (() => {
    try {
      const raw = localStorage.getItem("cif_time_spent");
      return raw ? Math.round(parseInt(raw, 10) / 60) : 0;
    } catch { return 0; }
  })();

  const weakest = Object.entries(progress)
    .filter(([_,p]) => p?.score != null)
    .sort(([,a],[,b]) => (a!.score! - b!.score!))
    .slice(0, 3)
    .map(([id]) => pageLabel(id));

  const activity = Object.entries(progress)
    .filter(([_, p]) => p?.score != null || p?.completed)
    .slice(0, 6)
    .map(([id, p]) => ({
      id, label: pageLabel(id),
      score: p?.score ?? (p?.completed ? 100 : 0),
    }));

  return (
    <div style={{
      padding: isMobile ? "20px 14px" : "32px 28px",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
      gap: 18, alignItems: "start",
    }}>
      {/* LEFT COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 18,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              boxShadow: `0 8px 24px ${T.accent}55`,
            }}>{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <input
                value={displayName}
                placeholder={user?.email?.split("@")[0] ?? "Your name"}
                onChange={e => saveName(e.target.value)}
                style={{
                  width: "100%", background: "transparent",
                  border: "none", outline: "none",
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  fontWeight: 700, fontSize: 16, color: T.text,
                  padding: 0, marginBottom: 2,
                }}
              />
              <div style={{
                fontSize: 11, color: T.muted2,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{user?.email ?? "guest@local"}</div>
            </div>
          </div>
          <div style={{
            marginTop: 12, paddingTop: 10,
            borderTop: `1px solid ${T.border}`,
            fontFamily: "'Fira Code',monospace",
            fontSize: 10, color: T.muted, letterSpacing: "0.5px",
          }}>// member since {memberSince}</div>
        </Card>

        <Card>
          <SectionTitle>Skills</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {skills.map(s => (
              <div key={s.key}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 6, alignItems: "baseline",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{s.label}</span>
                  <span style={{
                    fontSize: 10.5, color: s.color,
                    fontFamily: "'Fira Code',monospace", fontWeight: 600,
                  }}>{s.pct}%</span>
                </div>
                <AnimatedBar pct={s.pct} color={s.color} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          <StatCard label="Accuracy" value={`${accuracy}%`} color={T.accent} />
          <StatCard label="Quizzes"  value={quizzes}        color={T.green}  />
          <StatCard label="Time"     value={`${minutes}m`}  color={T.amber}  />
        </div>

        {weakest.length > 0 && (
          <Card>
            <SectionTitle>Focus next</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {weakest.map(w => (
                <span key={w} style={{
                  fontSize: 11, padding: "4px 10px",
                  background: `${T.amber}18`,
                  border: `1px solid ${T.amber}44`,
                  borderRadius: 999, color: T.amber, fontWeight: 600,
                }}>{w}</span>
              ))}
            </div>
          </Card>
        )}

        {/* Pure-CSS bar chart — no recharts needed */}
        <Card>
          <SectionTitle>Progress by track</SectionTitle>
          <CSSBarChart data={skills.map(s => ({ name: s.label, pct: s.pct, color: s.color }))} />
        </Card>

        {activity.length > 0 && (
          <Card>
            <SectionTitle>Recent activity</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {activity.map(a => (
                <button
                  key={a.id}
                  onClick={() => setPage(a.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center", gap: 10,
                    padding: "8px 10px",
                    background: T.bg2, border: `1px solid ${T.border}`,
                    borderRadius: 8, cursor: "pointer",
                    color: T.text, textAlign: "left",
                    transition: "all .15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.accent}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.border}
                >
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{a.label}</span>
                  <ScorePill score={a.score} />
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ── CSS bar chart (replaces recharts) ── */
function CSSBarChart({ data }: { data: { name: string; pct: number; color: string }[] }) {
  const maxPct = Math.max(...data.map(d => d.pct), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160, paddingTop: 8 }}>
      {data.map(d => (
        <div key={d.name} style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6, height: "100%",
        }}>
          <div style={{
            fontSize: 9, color: d.color,
            fontFamily: "'Fira Code',monospace", fontWeight: 700,
            minHeight: 14, display: "flex", alignItems: "flex-end",
          }}>{d.pct > 0 ? `${d.pct}%` : ""}</div>
          <div style={{
            width: "100%", flex: 1,
            display: "flex", alignItems: "flex-end",
          }}>
            <AnimatedBar
              pct={(d.pct / maxPct) * 100}
              color={d.color}
              vertical
            />
          </div>
          <div style={{
            fontSize: 10, color: T.muted2,
            fontFamily: "'Fira Code',monospace",
            textAlign: "center", lineHeight: 1.2,
            whiteSpace: "nowrap", overflow: "hidden",
            textOverflow: "ellipsis", maxWidth: "100%",
          }}>{d.name}</div>
        </div>
      ))}
    </div>
  );
}

/* ── shared pieces ── */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 14, padding: "16px 18px",
      transition: "transform .2s ease, box-shadow .2s ease",
    }}>{children}</div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 10,
      color: T.muted2, textTransform: "uppercase", letterSpacing: "2px",
      marginBottom: 14, display: "flex", alignItems: "center", gap: 6,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: T.accent, boxShadow: `0 0 6px ${T.accent}`,
      }} />
      {children}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      borderRadius: 12, padding: "14px 14px", textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22,
        background: `linear-gradient(135deg, ${color}, ${T.rose})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1,
      }}>{value}</div>
      <div style={{
        marginTop: 4, fontSize: 10.5, color: T.muted2,
        textTransform: "uppercase", letterSpacing: "1px",
      }}>{label}</div>
    </div>
  );
}

function AnimatedBar({ pct, color, vertical }: { pct: number; color: string; vertical?: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setW(pct));
    return () => cancelAnimationFrame(id);
  }, [pct]);

  if (vertical) {
    return (
      <div style={{ width: "100%", height: "100%", background: T.border, borderRadius: 4, overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{
          width: "100%", height: `${w}%`, borderRadius: 4,
          background: `linear-gradient(180deg, ${color}, ${color}99)`,
          transition: "height .6s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    );
  }

  return (
    <div style={{ height: 5, background: T.border, borderRadius: 3, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${w}%`, borderRadius: 3,
        background: `linear-gradient(90deg, ${color}, ${color}99)`,
        transition: "width .6s cubic-bezier(.4,0,.2,1)",
      }} />
    </div>
  );
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 80 ? T.green : score >= 60 ? T.amber : T.rose;
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, padding: "3px 9px",
      borderRadius: 999, background: `${color}1c`, color,
      fontFamily: "'Fira Code',monospace",
    }}>{score}%</span>
  );
}
