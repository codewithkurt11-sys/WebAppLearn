/**
 * StorageService — centralised localStorage helper.
 *
 * ALL localStorage keys used by the app are declared here.
 * Nothing else in the codebase should call localStorage directly; use this
 * service instead.  That way:
 *  - Key names can never drift between files.
 *  - Clear-on-logout logic lives in one place.
 *  - Every call is wrapped in try/catch (Private-Browsing blocks writes).
 *  - It is trivially swappable with sessionStorage or a mock in tests.
 *
 * Keys are split into two groups:
 *  LOCAL_ONLY  — UX preferences that stay on this device (never cleared on logout)
 *  USER_SCOPED — data that is tied to a specific user (cleared on logout / user change)
 */

// ─── Key declarations ─────────────────────────────────────────────────────

/** Preferences that survive logout and user-switching. */
export const LOCAL_KEYS = {
  theme:        "cif_theme",
  fontSize:     "cif_font_size",
  reduceMotion: "cif_reduce_motion",
  sidebarPin:   "cif_sidebar_pinned",
  navSections:  "cif_nav_sections",
} as const;

/** Data that belongs to the current user session — cleared on logout. */
export const USER_KEYS = {
  displayName:    "cif_display_name",
  recentPages:    "cif_recent_pages",
  recentSearch:   "cif_recent_search",
  timeSpent:      "cif_time_spent",
  memberSince:    "cif_member_since",
  roadmapOrder:   "cif_roadmap_order",
  feedback:       "cif_feedback",
  // Tab-state keys use a dynamic prefix: cif_tab_<pageId>
  tabPrefix:      "cif_tab_",
} as const;

type LocalKey  = typeof LOCAL_KEYS[keyof typeof LOCAL_KEYS];

// ─── Typed shapes ─────────────────────────────────────────────────────────

/** One feedback entry per user per lesson track (matches Supabase feedback row). */
export interface LocalFeedbackEntry {
  track_id:   string;
  rating:     number;   // 1–5
  comment:    string;
  updated_at: string;   // ISO-8601
}

// ─── Low-level helpers ────────────────────────────────────────────────────

function read(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* private browsing */ }
}
function remove(key: string): void {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

// ─── Typed getters / setters ──────────────────────────────────────────────

export const storage = {
  // ---------- theme --------------------------------------------------
  getTheme:        ()  => read(LOCAL_KEYS.theme),
  setTheme:        (v: string) => write(LOCAL_KEYS.theme, v),

  // ---------- font size ----------------------------------------------
  getFontSize:     ()  => read(LOCAL_KEYS.fontSize) ?? "M",
  setFontSize:     (v: string) => write(LOCAL_KEYS.fontSize, v),

  // ---------- reduce motion ------------------------------------------
  getReduceMotion: ()  => read(LOCAL_KEYS.reduceMotion) === "1",
  setReduceMotion: (v: boolean) => write(LOCAL_KEYS.reduceMotion, v ? "1" : "0"),

  // ---------- sidebar pin --------------------------------------------
  getSidebarPin:   ()  => read(LOCAL_KEYS.sidebarPin) === "1",
  setSidebarPin:   (v: boolean) => write(LOCAL_KEYS.sidebarPin, v ? "1" : "0"),

  // ---------- nav sections -------------------------------------------
  getNavSections:  (): Record<string, boolean> | null => {
    const raw = read(LOCAL_KEYS.navSections);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },
  setNavSections:  (v: Record<string, boolean>) => write(LOCAL_KEYS.navSections, JSON.stringify(v)),

  // ---------- display name -------------------------------------------
  getDisplayName:  ()  => read(USER_KEYS.displayName) ?? "",
  setDisplayName:  (v: string) => write(USER_KEYS.displayName, v),

  // ---------- recent pages -------------------------------------------
  getRecentPages:  (): string[] => {
    const raw = read(USER_KEYS.recentPages);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  },
  setRecentPages:  (v: string[]) => write(USER_KEYS.recentPages, JSON.stringify(v)),

  // ---------- recent search ------------------------------------------
  getRecentSearch: (): string[] => {
    const raw = read(USER_KEYS.recentSearch);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  },
  setRecentSearch: (v: string[]) => write(USER_KEYS.recentSearch, JSON.stringify(v)),

  // ---------- time spent ---------------------------------------------
  getTimeSpent:    (): number => {
    const raw = read(USER_KEYS.timeSpent);
    const n   = parseInt(raw ?? "0", 10);
    return isNaN(n) ? 0 : n;
  },
  setTimeSpent:    (v: number) => write(USER_KEYS.timeSpent, String(v)),
  incrementTimeSpent: (deltaSeconds = 60) => {
    const cur = storage.getTimeSpent();
    storage.setTimeSpent(cur + deltaSeconds);
  },

  // ---------- member since -------------------------------------------
  getMemberSince:  (): string | null => read(USER_KEYS.memberSince),
  setMemberSince:  (iso: string) => write(USER_KEYS.memberSince, iso),

  // ---------- tab state (per-page) -----------------------------------
  getTab: (pageId: string): string | null => read(`${USER_KEYS.tabPrefix}${pageId}`),
  setTab: (pageId: string, tab: string)   => write(`${USER_KEYS.tabPrefix}${pageId}`, tab),

  // ---------- roadmap track order ------------------------------------
  getRoadmapOrder: (): string[] | null => {
    const raw = read(USER_KEYS.roadmapOrder);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },
  setRoadmapOrder: (v: string[]) => write(USER_KEYS.roadmapOrder, JSON.stringify(v)),

  // ---------- per-track feedback (offline fallback) ------------------
  getFeedback: (): LocalFeedbackEntry[] => {
    const raw = read(USER_KEYS.feedback);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  },
  setFeedback: (v: LocalFeedbackEntry[]) => write(USER_KEYS.feedback, JSON.stringify(v)),

  // ─── Bulk operations ────────────────────────────────────────────────

  /**
   * Called on logout or when a different user logs in on the same device.
   * Removes all cif_* keys EXCEPT the local-only (theme, font, etc.) ones.
   */
  clearUserData(): void {
    const keep = new Set(Object.values(LOCAL_KEYS));
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith("cif_") && !keep.has(k as LocalKey))
        .forEach(k => remove(k));
    } catch { /* private browsing */ }
  },

  /**
   * Remove only progress-adjacent keys (used by clearProgress in the
   * progress context, without wiping display-name, etc.).
   */
  clearProgressData(): void {
    try {
      const progressKeys = Object.keys(localStorage).filter(
        k => k === USER_KEYS.recentPages ||
             k === USER_KEYS.timeSpent   ||
             k.startsWith(USER_KEYS.tabPrefix)
      );
      progressKeys.forEach(k => remove(k));
    } catch { /* ignore */ }
  },
} as const;
