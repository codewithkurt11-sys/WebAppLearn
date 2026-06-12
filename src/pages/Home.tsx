import { T } from "../utils/theme";
import { Code2, Sparkles, BarChart3, Languages, PlayCircle, ArrowRight, Map, BookOpen } from "lucide-react";

interface HomeProps {
  onShowAuth: () => void;
  setPage: (id: string) => void;
}

const FEATURES = [
  { icon: PlayCircle, title: "Interactive Lessons", body: "Read and run every code example right in the page — no setup, no install, no waiting." },
  { icon: Code2,      title: "Built-in Code Runner", body: "Run Python and JavaScript in the browser. See output instantly with a real execution environment." },
  { icon: BarChart3,  title: "Track Progress",      body: "Your completed lessons and quiz scores sync automatically when you sign in." },
  { icon: Languages,  title: "8 Languages & Tracks", body: "Python, JavaScript, C++, C#, Flask, HTML/CSS, SQLite, Web Scraping — all in one place." },
  { icon: Map,        title: "Learning Roadmap",    body: "A visual step-by-step roadmap shows you exactly where you are and what to learn next." },
  { icon: BookOpen,   title: "Cheatsheets",         body: "Quick-reference cheatsheets for every language — searchable and always at hand." },
];

const COURSES = [
  { id: "py-basics",    name: "Python",          sub: "Basics · Inter · Advanced", color: T.accent, tag: "3 levels" },
  { id: "js-basics",    name: "JavaScript",      sub: "Basics · Inter · Advanced", color: T.amber,  tag: "3 levels" },
  { id: "cpp-basics",   name: "C++",             sub: "Basics · Inter · Advanced", color: T.sky,    tag: "3 levels" },
  { id: "cs-basics",    name: "C#",              sub: "Basics · Inter · Advanced", color: T.rose,   tag: "3 levels" },
  { id: "html-css",     name: "HTML & CSS",      sub: "Markup, layouts, modern CSS", color: T.amber, tag: "beginner" },
  { id: "flask-basics", name: "Flask",           sub: "Basics · Inter · Expert",   color: T.green,  tag: "3 levels" },
  { id: "sqlite",       name: "SQLite",          sub: "SQL, queries, the sqlite3 module", color: T.sky, tag: "reference" },
  { id: "scraping",     name: "Web Scraping",    sub: "requests, BeautifulSoup, CSV", color: T.muted2, tag: "reference" },
];

const STEPS = [
  { n: 1, title: "Sign up",        body: "Free account in seconds — email or magic link. No credit card, ever." },
  { n: 2, title: "Pick a course",  body: "Start anywhere — Python, JavaScript, C++, Flask, whatever makes sense for you." },
  { n: 3, title: "Start learning", body: "Read, run, build. Every example is interactive. Progress saves as you go." },
];

export default function Home({ onShowAuth, setPage }: HomeProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text }}>
      {/* HERO */}
      <section style={{
        padding: "80px 24px 60px", maxWidth: 1100, margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "4px 12px", borderRadius: 999,
          background: `${T.accent}15`, border: `1px solid ${T.accent}30`,
          color: T.accent, fontSize: 11, fontFamily: "'Fira Code',monospace",
          marginBottom: 24,
        }}>
          <Sparkles size={12} /> learning that actually clicks
        </div>

        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: "clamp(40px, 7vw, 76px)", fontWeight: 800,
          letterSpacing: "-1.5px", lineHeight: 1,
          margin: 0,
          background: `linear-gradient(120deg, ${T.text}, ${T.accent}, ${T.rose})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>
          {"</> codeisfun"}
        </h1>

        <p style={{
          fontSize: 19, color: T.muted2,
          maxWidth: 560, margin: "20px auto 10px",
          lineHeight: 1.55,
        }}>
          Learn to code. Actually understand it.
        </p>
        <p style={{
          fontSize: 14, color: T.muted,
          maxWidth: 520, margin: "0 auto 36px",
          lineHeight: 1.6,
          fontFamily: "'Fira Code',monospace",
        }}>
          // Python · JavaScript · C++ · C# · Flask · HTML/CSS · SQLite · Web Scraping
        </p>

        <div style={{ display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={onShowAuth}
            style={{
              padding: "13px 24px", borderRadius: 10,
              background: `linear-gradient(120deg, ${T.accent}, ${T.rose})`,
              color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 700, fontSize: 14,
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: `0 8px 24px ${T.accent}55`,
            }}
          >Get Started Free <ArrowRight size={16} /></button>
          <button
            onClick={() => scrollTo("features")}
            style={{
              padding: "13px 24px", borderRadius: 10,
              background: T.surface, color: T.text,
              border: `1px solid ${T.border2}`, cursor: "pointer",
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 600, fontSize: 14,
            }}
          >See what's inside</button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 28, fontWeight: 700, marginBottom: 8, color: T.text,
        }}>Why codeisfun</h2>
        <p style={{ fontSize: 13, color: T.muted2, marginBottom: 24, fontFamily: "'Fira Code',monospace" }}>
          // everything you need to go from zero to confident
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          gap: 16,
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 14, padding: 20,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${T.accent}15`, color: T.accent,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}><f.icon size={20} /></div>
              <div style={{ fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: T.muted2, lineHeight: 1.55 }}>{f.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section style={{ padding: "40px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 28, fontWeight: 700, marginBottom: 8, color: T.text,
        }}>Courses & Tracks</h2>
        <p style={{ fontSize: 13, color: T.muted2, marginBottom: 24, fontFamily: "'Fira Code',monospace" }}>
          // 8 languages and topics, 20+ individual tracks
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))",
          gap: 14,
        }}>
          {COURSES.map(c => (
            <button
              key={c.id}
              onClick={onShowAuth}
              style={{
                textAlign: "left", padding: 18,
                background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 12, cursor: "pointer", color: T.text,
                fontFamily: "inherit", transition: "transform .15s, border-color .15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor = c.color;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = T.border;
              }}
            >
              <div style={{
                fontSize: 9, color: c.color, letterSpacing: "1.5px",
                textTransform: "uppercase", fontFamily: "'Fira Code',monospace",
                marginBottom: 8,
              }}>{c.tag}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.muted2, marginBottom: 10, lineHeight: 1.45 }}>{c.sub}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>Sign in to start →</div>
            </button>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "40px 24px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontSize: 28, fontWeight: 700, marginBottom: 24, color: T.text,
        }}>How it works</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
          gap: 16,
        }}>
          {STEPS.map(s => (
            <div key={s.n} style={{
              background: T.surface, border: `1px solid ${T.border}`,
              borderRadius: 14, padding: 22,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
                color: "#fff", fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14, fontFamily: "'Bricolage Grotesque',sans-serif",
              }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: T.muted2, lineHeight: 1.55 }}>{s.body}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={onShowAuth}
            style={{
              padding: "14px 28px", borderRadius: 10,
              background: `linear-gradient(120deg, ${T.accent}, ${T.rose})`,
              color: "#fff", border: "none", cursor: "pointer",
              fontFamily: "'Bricolage Grotesque',sans-serif",
              fontWeight: 700, fontSize: 15,
              boxShadow: `0 8px 24px ${T.accent}55`,
            }}
          >Create your free account</button>
        </div>
      </section>

      <footer style={{
        borderTop: `1px solid ${T.border}`,
        padding: "20px 24px",
        textAlign: "center",
        color: T.muted, fontSize: 11,
        fontFamily: "'Fira Code',monospace",
      }}>// codeisfun · learn to code, actually understand it</footer>
      {/* setPage reserved for future deep links */}
      <span style={{ display: "none" }}>{typeof setPage}</span>
    </div>
  );
}
