export type ThemeKey = "void" | "sakura" | "storm" | "cozytile" | "light";

export interface ThemeColors {
  bg: string; bg2: string; surface: string; surface2: string;
  border: string; border2: string; accent: string;
  text: string; muted: string; muted2: string;
  green: string; amber: string; rose: string; sky: string;
}

export const THEMES: Record<ThemeKey, ThemeColors> = {
  void: {
    bg: "#07080f", bg2: "#0c0d17", surface: "#11121e", surface2: "#181928",
    border: "#1d1e30", border2: "#272840", accent: "#6366f1",
    text: "#e4e5f0", muted: "#52546e", muted2: "#8b8daa",
    green: "#34d399", amber: "#fbbf24", rose: "#fb7185", sky: "#38bdf8",
  },
  sakura: {
    bg: "#0f0a0f", bg2: "#160d18", surface: "#1e1020", surface2: "#261428",
    border: "#3d1f42", border2: "#4e2855", accent: "#d946ef",
    text: "#f0e4f5", muted: "#6b4d72", muted2: "#a87db5",
    green: "#86efac", amber: "#fcd34d", rose: "#f472b6", sky: "#c084fc",
  },
  storm: {
    bg: "#080c12", bg2: "#0c1119", surface: "#101822", surface2: "#16202e",
    border: "#1e2d3d", border2: "#263a50", accent: "#38bdf8",
    text: "#e0eaf5", muted: "#3d5268", muted2: "#7a9ab5",
    green: "#34d399", amber: "#fbbf24", rose: "#fb7185", sky: "#7dd3fc",
  },
  cozytile: {
    bg: "#0a0e0a", bg2: "#0e130e", surface: "#121a12", surface2: "#182018",
    border: "#1e2e1e", border2: "#283c28", accent: "#86efac",
    text: "#e0f0e0", muted: "#3d5c3d", muted2: "#7aaa7a",
    green: "#4ade80", amber: "#fbbf24", rose: "#fb7185", sky: "#38bdf8",
  },
  light: {
    bg: "#ffffff", bg2: "#f8f9fc", surface: "#f1f3f8", surface2: "#e8ebf2",
    border: "#d1d5e0", border2: "#b8bdd0", accent: "#6366f1",
    text: "#0f1118", muted: "#9095a8", muted2: "#6b7080",
    green: "#16a34a", amber: "#d97706", rose: "#e11d48", sky: "#0284c7",
  },
};

export const THEME_META: Record<ThemeKey, { label: string; desc: string; dot: string }> = {
  void:     { label: "Void",     desc: "Deep dark indigo — default",     dot: "#6366f1" },
  sakura:   { label: "Sakura",   desc: "Pink-purple, soft and vibrant",   dot: "#d946ef" },
  storm:    { label: "Storm",    desc: "Dark blue, cool and focused",     dot: "#38bdf8" },
  cozytile: { label: "Cozytile", desc: "Warm dark green, grounded calm",  dot: "#86efac" },
  light:    { label: "Light",    desc: "Clean white, full brightness",    dot: "#6366f1" },
};

export const THEME_ORDER: ThemeKey[] = ["void", "sakura", "storm", "cozytile", "light"];
export const LS_KEY = "cif_theme";

export function loadTheme(): ThemeKey {
  try {
    const v = localStorage.getItem(LS_KEY);
    if (v && v in THEMES) return v as ThemeKey;
  } catch {}
  return "void";
}

export function applyTheme(key: ThemeKey): void {
  const c = THEMES[key];
  const root = document.documentElement;
  (Object.entries(c) as [string, string][]).forEach(([k, v]) => {
    root.style.setProperty(`--t-${k}`, v);
  });
  root.style.setProperty("--t-overlay", key === "light"
    ? "rgba(248,249,252,0.94)"
    : `rgba(${hexToRgb(c.bg)},0.90)`);
  root.style.setProperty("--t-codeBg", key === "light" ? "#f4f5f9" : "#080d1a");
  try { localStorage.setItem(LS_KEY, key); } catch {}
}

function hexToRgb(hex: string): string {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export const T = {
  bg: "var(--t-bg)", bg2: "var(--t-bg2)",
  surface: "var(--t-surface)", surface2: "var(--t-surface2)",
  border: "var(--t-border)", border2: "var(--t-border2)",
  accent: "var(--t-accent)", text: "var(--t-text)",
  muted: "var(--t-muted)", muted2: "var(--t-muted2)",
  green: "var(--t-green)", amber: "var(--t-amber)",
  rose: "var(--t-rose)", sky: "var(--t-sky)",
  overlay: "var(--t-overlay)", codeBg: "var(--t-codeBg)",
} as const;
