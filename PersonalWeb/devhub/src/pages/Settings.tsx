import { useState, useEffect } from "react";
import { Copy, Check, Trash2, RefreshCw } from "lucide-react";
import type { ThemeKey } from "../utils/theme";
import { T, THEMES, THEME_ORDER, THEME_META } from "../utils/theme";
import { useAuth } from "../contexts/AuthContext";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useReduceMotion } from "../hooks/useReduceMotion";

interface SettingsProps {
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  onShowAuth: () => void;
}

const FONT_SIZES = ["S","M","L"] as const;
type Size = typeof FONT_SIZES[number];
const SIZE_KEY = "cif_font_size";

export default function Settings({ theme, setTheme, onShowAuth }: SettingsProps) {
  const { user, signOut } = useAuth();
  const isMobile = useWindowWidth() < 900;
  const [reduce, setReduce] = useReduceMotion();

  const [displayName, setDisplayName] = useState<string>(() => {
    try { return localStorage.getItem("cif_display_name") ?? ""; } catch { return ""; }
  });
  const [size, setSize] = useState<Size>(() => {
    try { return (localStorage.getItem(SIZE_KEY) as Size) ?? "M"; } catch { return "M"; }
  });
  const [copied, setCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(SIZE_KEY, size); } catch { /* ignore */ }
    document.documentElement.style.setProperty(
      "--cif-font-scale",
      size === "S" ? "0.92" : size === "L" ? "1.08" : "1",
    );
  }, [size]);

  const saveName = (v: string) => {
    setDisplayName(v);
    try { localStorage.setItem("cif_display_name", v); } catch { /* ignore */ }
  };

  const copyEmail = async () => {
    if (!user?.email) return;
    try { await navigator.clipboard.writeText(user.email); setCopied(true); setTimeout(()=>setCopied(false), 1400); }
    catch { /* ignore */ }
  };

  const resetProgress = () => {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith("cif_progress_") || k === "cif_recent_pages")
        .forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
    setConfirmReset(false);
    window.location.reload();
  };

  const deleteAccount = async () => {
    try {
      Object.keys(localStorage)
        .filter(k => k.startsWith("cif_"))
        .forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
    await signOut();
    setConfirmDelete(false);
    window.location.reload();
  };

  const initials = (displayName || user?.email || "··").slice(0, 2).toUpperCase();

  return (
    <div style={{
      padding: isMobile ? "20px 14px" : "32px 28px",
      maxWidth: 860, margin: "0 auto",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ marginBottom: 4 }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: 26, letterSpacing: "-0.8px",
        }}>Settings</div>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 11.5, color: T.muted2, marginTop: 4,
        }}>// tune your workspace</div>
      </div>

      {/* Account */}
      <Card>
        <CardTitle>Account</CardTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
            background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 800, fontSize: 16,
            fontFamily: "'Bricolage Grotesque',sans-serif",
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <input
              value={displayName}
              placeholder="Display name"
              onChange={e => saveName(e.target.value)}
              style={{
                width: "100%", background: T.bg2,
                border: `1px solid ${T.border}`, borderRadius: 8,
                padding: "8px 12px", color: T.text, fontSize: 13,
                fontFamily: "'Bricolage Grotesque',sans-serif",
                outline: "none", marginBottom: 6,
              }}
            />
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 11.5, color: T.muted2,
            }}>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email ?? "Not signed in"}
              </span>
              {user?.email && (
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  style={{
                    width: 26, height: 26,
                    background: T.bg2, border: `1px solid ${T.border}`,
                    borderRadius: 6, color: copied ? T.green : T.muted2,
                    cursor: "pointer", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    transition: "color .15s",
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                </button>
              )}
            </div>
          </div>
        </div>
        {!user && <PrimaryBtn onClick={onShowAuth}>Sign in to sync</PrimaryBtn>}
        {user && <SecondaryBtn onClick={signOut}>Sign out</SecondaryBtn>}
      </Card>

      {/* Themes */}
      <Card>
        <CardTitle>Themes</CardTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
        }}>
          {THEME_ORDER.map(k => {
            const c = THEMES[k];
            const active = k === theme;
            return (
              <button
                key={k}
                onClick={() => setTheme(k)}
                style={{
                  position: "relative",
                  background: c.bg,
                  border: `1px solid ${active ? c.accent : T.border}`,
                  borderRadius: 10, padding: "10px",
                  cursor: "pointer", textAlign: "left",
                  boxShadow: active ? `0 0 0 2px ${c.accent}66, 0 8px 24px ${c.accent}33` : "none",
                  transition: "all .2s",
                }}
              >
                {/* mini preview */}
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  <span style={{ flex: 1, height: 22, background: c.surface, borderRadius: 4, border: `1px solid ${c.border}` }} />
                  <span style={{ width: 22, height: 22, background: c.accent, borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                  <span style={{ width: 30, height: 6, background: c.text, borderRadius: 2, opacity: 0.8 }} />
                  <span style={{ width: 18, height: 6, background: c.muted2, borderRadius: 2 }} />
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: c.text,
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                }}>{THEME_META[k].label}</div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <CardTitle>Preferences</CardTitle>
        <Row label="Text size">
          <div style={{ display: "flex", gap: 6 }}>
            {FONT_SIZES.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: size === s ? `linear-gradient(135deg, ${T.accent}, ${T.rose})` : T.bg2,
                  border: `1px solid ${size === s ? "transparent" : T.border}`,
                  color: size === s ? "#fff" : T.muted2,
                  fontWeight: 700, fontSize: 11.5,
                  fontFamily: "'Bricolage Grotesque',sans-serif",
                  cursor: "pointer", transition: "all .15s",
                }}
              >{s}</button>
            ))}
          </div>
        </Row>
        <Row label="Reduce animations">
          <Toggle on={reduce} onChange={setReduce} />
        </Row>
      </Card>

      {/* Progress */}
      <Card>
        <CardTitle>Progress</CardTitle>
        {!confirmReset ? (
          <SecondaryBtn onClick={() => setConfirmReset(true)} icon={<RefreshCw size={13} />}>
            Reset progress
          </SecondaryBtn>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: T.muted2 }}>Sure? This clears all local progress.</span>
            <DangerBtn onClick={resetProgress}>Yes, reset</DangerBtn>
            <SecondaryBtn onClick={() => setConfirmReset(false)}>Cancel</SecondaryBtn>
          </div>
        )}
      </Card>

      {/* Danger zone — only for signed-in users */}
      {user && (
        <Card danger>
          <CardTitle tone="rose">Danger zone</CardTitle>
          <div style={{ fontSize: 12, color: T.muted2, marginBottom: 12, lineHeight: 1.5 }}>
            Sign out and clear all local data. This cannot be undone.
          </div>
          {!confirmDelete ? (
            <DangerBtn onClick={() => setConfirmDelete(true)} icon={<Trash2 size={13} />}>
              Delete account
            </DangerBtn>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <DangerBtn onClick={deleteAccount}>
                Confirm delete
              </DangerBtn>
              <SecondaryBtn onClick={() => setConfirmDelete(false)}>Cancel</SecondaryBtn>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

/* ───────────── pieces ───────────── */

function Card({ children, danger = false }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <div style={{
      background: danger ? `linear-gradient(180deg, ${T.surface}, ${T.rose}10)` : T.surface,
      border: `1px solid ${danger ? `${T.rose}44` : T.border}`,
      borderRadius: 14, padding: "16px 20px",
      transition: "transform .2s, box-shadow .2s",
    }}>{children}</div>
  );
}

function CardTitle({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "rose" }) {
  const c = tone === "rose" ? T.rose : T.accent;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      fontFamily: "'Fira Code',monospace",
      fontWeight: 600, fontSize: 10,
      color: T.muted2, textTransform: "uppercase",
      letterSpacing: "2px", marginBottom: 14,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: c, boxShadow: `0 0 8px ${c}`,
      }} />
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "10px 0", borderBottom: `1px solid ${T.border}`,
    }}>
      <span style={{ fontSize: 12.5, color: T.text }}>{label}</span>
      {children}
    </div>
  );
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "9px 18px",
        background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
        border: "none", borderRadius: 10,
        color: "#fff", fontSize: 13, fontWeight: 700,
        cursor: "pointer", transition: "filter .15s",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
    >{children}</button>
  );
}

function SecondaryBtn({ children, onClick, icon }: { children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        background: "transparent",
        border: `1px solid ${T.border2}`,
        borderRadius: 10, color: T.muted2, fontSize: 12.5, fontWeight: 600,
        cursor: "pointer", transition: "all .15s",
        display: "inline-flex", alignItems: "center", gap: 7,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = T.accent;
        (e.currentTarget as HTMLElement).style.color = T.accent;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = T.border2;
        (e.currentTarget as HTMLElement).style.color = T.muted2;
      }}
    >{icon}{children}</button>
  );
}

function DangerBtn({ children, onClick, icon }: { children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        background: T.rose,
        border: "none", borderRadius: 10,
        color: "#fff", fontSize: 12.5, fontWeight: 700,
        cursor: "pointer", transition: "filter .15s",
        display: "inline-flex", alignItems: "center", gap: 7,
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
    >{icon}{children}</button>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      style={{
        width: 42, height: 24, borderRadius: 999,
        background: on ? T.accent : T.border2,
        border: "none", position: "relative", cursor: "pointer",
        transition: "background .2s", padding: 0,
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: on ? 21 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left .2s",
      }} />
    </button>
  );
}
