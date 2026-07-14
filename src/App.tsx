/**
 * App.tsx — Root application shell.
 *
 * Changes from original:
 *  1. Uses storage service instead of raw localStorage.
 *  2. Auth redirect: protected pages now use a whitelist of public pages
 *     instead of "page !== 'home'" — prevents edge cases where a new page
 *     id added in the future causes logged-out users to be kicked.
 *  3. setPage memoization no longer lists `user` as dependency with an
 *     eslint-disable — it correctly checks the current user via a ref so
 *     the stable callback identity doesn't break.
 *  4. Time tracking uses the StorageService.
 *  5. User-switch cleanup uses the StorageService.
 *  6. The handleSignOut no longer duplicates cleanup — AuthContext.signOut
 *     already calls storage.clearUserData().
 *  7. Topbar gets aria-label for screen readers.
 *  8. Page renders are memoized to avoid re-creating PageRenderer on every
 *     state update in InnerApp.
 */

import {
  Suspense, lazy, useState, useEffect, useCallback, useRef, useMemo, memo,
} from "react";
import { Toaster } from "sonner";
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
import { storage } from "./services/storage";

// ─── Apply persisted preferences before first render ──────────────────────
// (Runs in module scope — executes synchronously before React mounts anything.)
(function initPrefs() {
  try {
    initReduceMotion();
    const size  = storage.getFontSize();
    const scale = size === "S" ? "0.92" : size === "L" ? "1.08" : "1";
    document.documentElement.style.setProperty("--cif-font-scale", scale);
  } catch { /* private browsing */ }
}());

// ─── Lazy pages ───────────────────────────────────────────────────────────
const Dashboard        = lazy(() => import("./pages/Dashboard"));
const Roadmap          = lazy(() => import("./pages/Roadmap"));
const Settings         = lazy(() => import("./pages/Settings"));
const Cheatsheets      = lazy(() => import("./pages/Cheatsheets"));
const ComponentDemo    = lazy(() => import("./pages/ComponentDemo"));
const Feedback         = lazy(() => import("./pages/Feedback"));
const Profile          = lazy(() => import("./pages/Profile"));
const PyBasics         = lazy(() => import("./pages/python/PyBasics"));
const PyIntermediate   = lazy(() => import("./pages/python/PyIntermediate"));
const PyAdvanced       = lazy(() => import("./pages/python/PyAdvanced"));
const FlaskBasics      = lazy(() => import("./pages/flask/FlaskBasics"));
const FlaskIntermediate= lazy(() => import("./pages/flask/FlaskIntermediate"));
const FlaskExpert      = lazy(() => import("./pages/flask/FlaskExpert"));
const JSBasics         = lazy(() => import("./pages/javascript/JSBasics"));
const JSIntermediate   = lazy(() => import("./pages/javascript/JSIntermediate"));
const JSAdvanced       = lazy(() => import("./pages/javascript/JSAdvanced"));
const Tkinter          = lazy(() => import("./pages/more/Tkinter"));
const Kivy             = lazy(() => import("./pages/more/Kivy"));
const WebScraping      = lazy(() => import("./pages/more/WebScraping"));
const SQLitePage       = lazy(() => import("./pages/more/SQLitePage"));
const HTMLCSs          = lazy(() => import("./pages/web/HTMLCSs"));
const CppBasics        = lazy(() => import("./pages/other/CppBasics"));
const CppIntermediate  = lazy(() => import("./pages/other/CppIntermediate"));
const CppAdvanced      = lazy(() => import("./pages/other/CppAdvanced"));
const CsharpBasics     = lazy(() => import("./pages/other/CsharpBasics"));
const CsharpIntermediate= lazy(() => import("./pages/other/CsharpIntermediate"));
const CsharpAdvanced   = lazy(() => import("./pages/other/CsharpAdvanced"));
const Home             = lazy(() => import("./pages/Home"));
const NotFound         = lazy(() => import("./pages/not-found"));

const SIDEBAR_W = 220;

/** All page IDs that are explicitly handled by PageRenderer. */
const KNOWN_PAGES = new Set([
  "home", "dashboard", "roadmap", "cheatsheet", "components",
  "feedback", "settings", "profile",
  "py-basics", "py-inter", "py-adv",
  "flask-basics", "flask-inter", "flask-expert",
  "js-basics", "js-inter", "js-adv",
  "tkinter", "kivy", "scraping", "sqlite", "html-css",
  "cpp-basics", "cpp-inter", "cpp-adv",
  "cs-basics", "cs-inter", "cs-adv",
]);

/** Pages that are accessible to unauthenticated users (guests). */
const PUBLIC_PAGES = new Set(["home"]);

/** Lesson/content pages that should appear in "Continue Learning". */
const LESSON_PAGES = new Set([
  "py-basics", "py-inter", "py-adv",
  "flask-basics", "flask-inter", "flask-expert",
  "js-basics", "js-inter", "js-adv",
  "tkinter", "kivy", "scraping", "sqlite", "html-css",
  "cpp-basics", "cpp-inter", "cpp-adv",
  "cs-basics", "cs-inter", "cs-adv",
]);

function trackRecentPage(id: string): void {
  if (!LESSON_PAGES.has(id)) return;
  const prev = storage.getRecentPages();
  storage.setRecentPages([id, ...prev.filter(x => x !== id)].slice(0, 10));
}

// ─── PageRenderer — memoized to prevent re-mounting on parent state changes ─

interface PageRendererProps {
  page: string;
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  onShowAuth: () => void;
  setPage: (id: string) => void;
}

const PageRenderer = memo(function PageRenderer({
  page, theme, setTheme, onShowAuth, setPage,
}: PageRendererProps) {
  // canRun controls whether CodeBlocks on lesson pages show the ▶ run button.
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
            {page === "flask-basics"    && <FlaskBasics />}
            {page === "flask-inter"     && <FlaskIntermediate />}
            {page === "flask-expert"    && <FlaskExpert />}
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
            {!KNOWN_PAGES.has(page) && <NotFound />}
          </div>
        </Suspense>
      </ErrorBoundary>
    </RunCtx.Provider>
  );
});

// ─── InnerApp ─────────────────────────────────────────────────────────────

function InnerApp() {
  const { user, loading, signOut } = useAuth();

  // Keep a ref to track the previous user ID so we know when the account switched.
  const prevUserIdRef = useRef<string | null | undefined>(undefined);
  // Keep a ref to the latest user value for use inside stable callbacks.
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  const isMobile = useWindowWidth() < 900;
  useReduceMotion();

  const [page,        setPageRaw]     = useState(() => (user ? "dashboard" : "home"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAuth,    setShowAuth]    = useState(false);
  const [showSearch,  setShowSearch]  = useState(false);
  const [theme,       setTheme]       = useState<ThemeKey>(loadTheme);

  // Apply theme CSS variables whenever the theme changes.
  useEffect(() => { applyTheme(theme); }, [theme]);

  // Increment time-spent counter every 60 seconds (UX metric, not sensitive).
  useEffect(() => {
    const id = setInterval(() => {
      storage.incrementTimeSpent(60);
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  // Global keyboard shortcuts.
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

  /**
   * setPage — stable callback that:
   *  - Redirects logged-in users from "home" → "dashboard"
   *  - Tracks recent lesson pages
   *  - Scrolls the main content area back to the top
   *
   * Uses userRef so it doesn't need `user` as a dependency (avoiding stale
   * closures while keeping a stable function reference for child components).
   */
  const setPage = useCallback((id: string) => {
    const currentUser = userRef.current;
    const target = (id === "home" && currentUser) ? "dashboard" : id;
    setPageRaw(target);
    trackRecentPage(target);
    try {
      document.querySelector("main")?.scrollTo({ top: 0, behavior: "smooth" });
    } catch { /* Safari compatibility */ }
  }, []); // Intentionally stable — reads user via ref.

  // Auto-redirect on login/logout.
  // Only runs after the initial session is resolved (loading === false).
  useEffect(() => {
    if (loading) return;

    if (user && PUBLIC_PAGES.has(page)) {
      // Logged in but on a guest-only page → go to dashboard.
      setPageRaw("dashboard");
    } else if (!user && !PUBLIC_PAGES.has(page)) {
      // Logged out but on a protected page → go to home.
      setPageRaw("home");
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear stale localStorage when a DIFFERENT user logs in on the same device.
  useEffect(() => {
    // Skip the very first mount (prevUserIdRef is still undefined).
    if (prevUserIdRef.current === undefined) {
      prevUserIdRef.current = user?.id ?? null;
      return;
    }

    const prev = prevUserIdRef.current;
    const next = user?.id ?? null;
    if (prev !== null && next !== null && prev !== next) {
      // A different user just logged in — clear data from the previous session.
      storage.clearUserData();
    }
    prevUserIdRef.current = next;
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * handleSignOut — delegates to AuthContext.signOut which already
   * calls storage.clearUserData() before signing out of Supabase.
   */
  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const appCtx = useMemo(() => ({ page, setPage }), [page, setPage]);

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
          onSignOut={handleSignOut}
        />

        {/* Main content area */}
        <div
          role="main"
          style={{
            flex: 1,
            marginLeft: isMobile ? 0 : SIDEBAR_W,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <TopBar
            page={page}
            onMenu={() => setSidebarOpen(o => !o)}
            menuOpen={sidebarOpen}
            onSearch={() => setShowSearch(true)}
            theme={theme}
          />
          <main
            id="main-content"
            style={{ flex: 1, overflowY: "auto", background: T.bg }}
          >
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
        <Toaster position="bottom-right" richColors theme="dark" />
      </ProgressProvider>
    </AuthProvider>
  );
}
