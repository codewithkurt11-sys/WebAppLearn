import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { AuthProvider }       from "./contexts/AuthContext";
import { ProgressProvider }   from "./contexts/ProgressContext";
import { AppCtx, RunCtx }     from "./contexts/AppContext";
import { useAuth }            from "./contexts/AuthContext";
import { Sidebar }            from "./layouts/Sidebar";
import { TopBar }             from "./layouts/TopBar";
import AuthModal              from "./components/AuthModal";
import GlobalSearch           from "./components/GlobalSearch";
import PageSkeleton           from "./components/PageSkeleton";
import { ErrorBoundary }      from "./components/ErrorBoundary";
import type { ThemeKey }      from "./utils/theme";
import { loadTheme, applyTheme } from "./utils/theme";
import { T }                  from "./utils/theme";
import { useWindowWidth }     from "./hooks/useWindowWidth";
import { useReduceMotion, initReduceMotion } from "./hooks/useReduceMotion";

// Apply persisted preferences immediately — before React renders anything
(function initPrefs() {
  try {
    initReduceMotion();
    const size = localStorage.getItem("cif_font_size") ?? "M";
    const scale = size === "S" ? "0.92" : size === "L" ? "1.08" : "1";
    document.documentElement.style.setProperty("--cif-font-scale", scale);
  } catch {}
}());

// Lazy pages
const Dashboard      = lazy(() => import("./pages/Dashboard"));
const Roadmap        = lazy(() => import("./pages/Roadmap"));
const Settings       = lazy(() => import("./pages/Settings"));
const Cheatsheets    = lazy(() => import("./pages/Cheatsheets"));
const ComponentDemo  = lazy(() => import("./pages/ComponentDemo"));
const Feedback       = lazy(() => import("./pages/Feedback"));
const Profile        = lazy(() => import("./pages/Profile"));
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
const JSAdvanced     = lazy(() => import("./pages/javascript/JSAdvanced"));
const CppBasics      = lazy(() => import("./pages/other/CppBasics"));
const CppIntermediate= lazy(() => import("./pages/other/CppIntermediate"));
const CppAdvanced    = lazy(() => import("./pages/other/CppAdvanced"));
const CsharpBasics   = lazy(() => import("./pages/other/CsharpBasics"));
const CsharpIntermediate = lazy(() => import("./pages/other/CsharpIntermediate"));
const CsharpAdvanced = lazy(() => import("./pages/other/CsharpAdvanced"));
const Home           = lazy(() => import("./pages/Home"));

const SIDEBAR_W = 220;

// Only lesson/content pages go into Continue Learning — never utility pages.
const LESSON_PAGES = new Set([
  "py-basics", "py-inter", "py-adv",
  "flask-basics", "flask-inter", "flask-expert",
  "js-basics", "js-inter", "js-adv",
  "tkinter", "kivy", "scraping", "sqlite", "html-css",
  "cpp-basics", "cpp-inter", "cpp-adv",
  "cs-basics", "cs-inter", "cs-adv",
]);

function trackRecentPage(id: string) {
  if (!LESSON_PAGES.has(id)) return; // skip utility pages
  try {
    const raw = localStorage.getItem("cif_recent_pages");
    const prev: string[] = raw ? JSON.parse(raw) : [];
    const next = [id, ...prev.filter(x => x !== id)].slice(0, 10);
    localStorage.setItem("cif_recent_pages", JSON.stringify(next));
  } catch {}
}

function PageRenderer({ page, theme, setTheme, onShowAuth, setPage }: {
  page: string;
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  onShowAuth: () => void;
  setPage: (id: string) => void;
}) {
  const canRun = true;

  return (
    <RunCtx.Provider value={canRun}>
      <ErrorBoundary>
        <Suspense fallback={<PageSkeleton />}>
          <div className="wl-page">
            {page === "home"       && <Home onShowAuth={onShowAuth} setPage={setPage} />}
            {page === "dashboard"  && <Dashboard />}
            {page === "roadmap"    && <Roadmap />}
            {page === "cheatsheet" && <Cheatsheets />}
            {page === "components" && <ComponentDemo />}
            {page === "feedback"   && <Feedback />}
            {page === "settings"   && <Settings theme={theme} setTheme={setTheme} onShowAuth={onShowAuth} />}
            {page === "profile"    && <Profile />}
            {page === "py-basics"  && <PyBasics />}
            {page === "py-inter"   && <PyIntermediate />}
            {page === "py-adv"     && <PyAdvanced />}
            {page === "flask-basics"   && <FlaskBasics />}
            {page === "flask-inter"    && <FlaskIntermediate />}
            {page === "flask-expert"   && <FlaskExpert />}
            {page === "js-basics"  && <JSBasics />}
            {page === "js-inter"   && <JSIntermediate />}
            {page === "js-adv"     && <JSAdvanced />}
            {page === "tkinter"    && <Tkinter />}
            {page === "kivy"       && <Kivy />}
            {page === "scraping"   && <WebScraping />}
            {page === "sqlite"     && <SQLitePage />}
            {page === "html-css"   && <HTMLCSs />}
            {page === "cpp-basics" && <CppBasics />}
            {page === "cpp-inter"  && <CppIntermediate />}
            {page === "cpp-adv"    && <CppAdvanced />}
            {page === "cs-basics"  && <CsharpBasics />}
            {page === "cs-inter"   && <CsharpIntermediate />}
            {page === "cs-adv"     && <CsharpAdvanced />}
          </div>
        </Suspense>
      </ErrorBoundary>
    </RunCtx.Provider>
  );
}

function InnerApp() {
  const { user, signOut } = useAuth();
  const isMobile = useWindowWidth() < 900;
  useReduceMotion(); // initialise reduce-motion CSS class from localStorage

  const [page,        setPageRaw]     = useState(() => (user ? "dashboard" : "home"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuth,    setShowAuth]    = useState(false);
  const [showSearch,  setShowSearch]  = useState(false);
  const [theme,       setTheme]       = useState<ThemeKey>(loadTheme);

  useEffect(() => { applyTheme(theme); }, [theme]);

  // Track time spent (increment every 60s)
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const prev = parseInt(localStorage.getItem("cif_time_spent") ?? "0", 10);
        localStorage.setItem("cif_time_spent", String((isNaN(prev) ? 0 : prev) + 60));
      } catch {}
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowAuth(false);
        setSidebarOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const setPage = useCallback((id: string) => {
    // Logged-in users should never see Home — redirect to Dashboard.
    const target = (id === "home" && user) ? "dashboard" : id;
    setPageRaw(target);
    trackRecentPage(target);
    try {
      document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
    } catch {}
  }, [user]);

  // Auto-redirect on login/logout
  useEffect(() => {
    if (user && page === "home") setPageRaw("dashboard");
    if (!user && page !== "home") setPageRaw("home");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const appCtx = { page, setPage };

  return (
    <AppCtx.Provider value={appCtx}>
      <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>

        <Sidebar
          page={page}
          setPage={setPage}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
          theme={theme}
          setTheme={setTheme}
          onShowAuth={() => setShowAuth(true)}
          onOpenSearch={() => setShowSearch(true)}
          user={user ? { email: user.email ?? "" } : null}
          onSignOut={signOut}
        />

        {/* Main content */}
        <div style={{
          flex: 1,
          marginLeft: isMobile ? 0 : SIDEBAR_W,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}>
          <TopBar
            page={page}
            onMenu={() => setSidebarOpen(o => !o)}
            menuOpen={sidebarOpen}
            onSearch={() => setShowSearch(true)}
            theme={theme}
          />
          <main style={{ flex: 1, overflowY: "auto", background: T.bg }}>
            <PageRenderer
              page={page}
              theme={theme}
              setTheme={setTheme}
              onShowAuth={() => setShowAuth(true)}
              setPage={setPage}
            />
          </main>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <GlobalSearch
        open={showSearch}
        onClose={() => setShowSearch(false)}
        onNavigate={setPage}
      />
    </AppCtx.Provider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <InnerApp />
      </ProgressProvider>
    </AuthProvider>
  );
}
