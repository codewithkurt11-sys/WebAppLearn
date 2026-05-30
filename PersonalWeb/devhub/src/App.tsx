import { lazy, Suspense, useState, type ReactNode } from "react";
import { T, DARK_COLORS, LIGHT_COLORS, AppCtx, RunCtx, useApp, useWindowWidth } from "./shared";
import { AuthProvider } from "./contexts/AuthContext";
import { Sidebar } from "./layouts/Sidebar";
import { TopBar }  from "./layouts/TopBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import PageSkeleton from "./components/PageSkeleton";
import AuthModal from "./components/AuthModal";

// ─── LAZY PAGE IMPORTS (route-based code splitting) ────────────────
const Dashboard      = lazy(() => import("./pages/Dashboard"));
const Roadmap        = lazy(() => import("./pages/Roadmap"));
const Cheatsheets    = lazy(() => import("./pages/Cheatsheets"));
const ComponentDemo  = lazy(() => import("./pages/ComponentDemo"));
const Feedback       = lazy(() => import("./pages/Feedback"));
const Settings       = lazy(() => import("./pages/Settings"));
const PyBasics       = lazy(() => import("./pages/python/PyBasics"));
const PyIntermediate = lazy(() => import("./pages/python/PyIntermediate"));
const PyAdvanced     = lazy(() => import("./pages/python/PyAdvanced"));
const FlaskBasics    = lazy(() => import("./pages/flask/FlaskBasics"));
const FlaskIntermediate = lazy(() => import("./pages/flask/FlaskIntermediate"));
const FlaskExpert    = lazy(() => import("./pages/flask/FlaskExpert"));
const JSBasics       = lazy(() => import("./pages/javascript/JSBasics"));
const JSIntermediate = lazy(() => import("./pages/javascript/JSIntermediate"));
const Tkinter        = lazy(() => import("./pages/more/Tkinter"));
const Kivy           = lazy(() => import("./pages/more/Kivy"));
const WebScraping    = lazy(() => import("./pages/more/WebScraping"));
const SQLitePage     = lazy(() => import("./pages/more/SQLitePage"));
const HTMLCSs        = lazy(() => import("./pages/web/HTMLCSs"));

// ─── HELPERS ──────────────────────────────────────────────────────
const NO_RUN = (node: ReactNode) => (
  <RunCtx.Provider value={false}>{node}</RunCtx.Provider>
);

function ComingSoon({ title, desc, color }: { title: string; desc: string; color?: string }) {
  return (
    <div style={{ padding: "60px 24px", textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ fontSize: 48, marginBottom: 20 }}>🚧</div>
      <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-1px", marginBottom: 10, color: color || T.accent }}>{title}</h2>
      <p style={{ fontSize: 13, color: T.muted2, lineHeight: 1.7 }}>{desc}</p>
      <div style={{ marginTop: 20, fontSize: 11, fontFamily: "'Fira Code',monospace", color: T.muted }}>// coming next →</div>
    </div>
  );
}

// ─── PAGE ROUTER ──────────────────────────────────────────────────
function PageRouter() {
  const { page } = useApp();

  const content = (() => {
    switch (page) {
      case "dashboard":    return <Dashboard/>;
      case "roadmap":      return <Roadmap/>;
      case "cheatsheet":   return NO_RUN(<Cheatsheets/>);
      case "components":   return <ComponentDemo/>;
      case "feedback":     return <Feedback/>;
      case "settings":     return <Settings/>;
      case "py-basics":    return <PyBasics/>;
      case "py-inter":     return <PyIntermediate/>;
      case "py-adv":       return <PyAdvanced/>;
      case "flask-basics": return NO_RUN(<FlaskBasics/>);
      case "flask-inter":  return NO_RUN(<FlaskIntermediate/>);
      case "flask-expert": return NO_RUN(<FlaskExpert/>);
      case "js-basics":    return <JSBasics/>;
      case "js-inter":     return <JSIntermediate/>;
      case "tkinter":      return NO_RUN(<Tkinter/>);
      case "kivy":         return NO_RUN(<Kivy/>);
      case "scraping":     return NO_RUN(<WebScraping/>);
      case "sqlite":       return NO_RUN(<SQLitePage/>);
      case "html-css":     return NO_RUN(<HTMLCSs/>);
      default:             return <Dashboard/>;
    }
  })();

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton/>}>
        <div key={page} className="wl-page">
          {content}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

// ─── INNER APP ────────────────────────────────────────────────────
function InnerApp() {
  const [page, setPage]               = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuth, setShowAuth]       = useState(false);
  const [isDark, setIsDark]           = useState(() => {
    try { return localStorage.getItem("theme") !== "light"; } catch { return true; }
  });
  const isMobile = useWindowWidth() < 900;

  const colors  = isDark ? DARK_COLORS : LIGHT_COLORS;
  const cssVars = Object.entries(colors).map(([k, v]) => `--t-${k}: ${v};`).join("\n  ");

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };

  return (
    <AppCtx.Provider value={{ page, setPage }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300;12..96,500;12..96,700;12..96,800&family=Fira+Code:wght@400;500&display=swap');
        :root { ${cssVars} }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 14.5px; }
        body { background: var(--t-bg); color: var(--t-text); font-family: 'Bricolage Grotesque', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; transition: background .2s, color .2s; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--t-border2); border-radius: 2px; }
        * { scrollbar-width: thin; scrollbar-color: var(--t-border2) transparent; }
        code, pre { font-family: 'Fira Code', monospace; font-size: 13px; }
        button { cursor: pointer; font-family: inherit; }
        input, select, textarea { font-family: inherit; }
        @keyframes pgFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .wl-page { animation: pgFade .22s ease both; }
        .wl-card { transition: transform .18s ease, box-shadow .18s ease; }
        .wl-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,.10); }
      `}</style>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)}/>}

      <div style={{ display: "flex" }}>
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
          onShowAuth={() => setShowAuth(true)}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />
        <main style={{
          marginLeft: isMobile ? 0 : 218,
          minHeight: "100vh", flex: 1, minWidth: 0,
          transition: "margin-left .28s cubic-bezier(.4,0,.2,1)",
          display: "flex", flexDirection: "column",
        }}>
          {isMobile && (
            <TopBar
              onMenu={() => setSidebarOpen(true)}
              onShowAuth={() => setShowAuth(true)}
              isDark={isDark}
              onToggleTheme={toggleTheme}
            />
          )}
          <div style={{ maxWidth: 880, margin: "0 auto", width: "100%", flex: 1 }}>
            <PageRouter/>
          </div>
        </main>
      </div>
    </AppCtx.Provider>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <InnerApp/>
      </ErrorBoundary>
    </AuthProvider>
  );
}
