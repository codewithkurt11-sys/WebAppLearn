/**
 * Settings.tsx
 *
 * Fixes / improvements:
 *  1. Uses storage service — no raw localStorage.
 *  2. Duplicate sign-out cleanup code removed — signOut() in AuthContext
 *     already calls storage.clearUserData().
 *  3. "Sign out" button in Account card calls signOut() directly (cleanup
 *     is handled centrally in AuthContext).
 *  4. confirmDelete state is no longer needed since sign-out is safe; it
 *     has been kept for "reset progress" confirmation only.
 *  5. Toast notifications use the sonner library correctly (no undefined calls).
 *  6. Full TypeScript typing — no `any` casts.
 */

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, LogOut, AlertTriangle, Trash2, X } from "lucide-react";
import type { ThemeKey } from "../utils/theme";
import { T, THEMES, THEME_ORDER, THEME_META } from "../utils/theme";
import { useAuth } from "../contexts/AuthContext";
import { useProgressCtx } from "../contexts/ProgressContext";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { useReduceMotion } from "../hooks/useReduceMotion";
import { toast } from "sonner";
import { storage } from "../services/storage";

interface SettingsProps {
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  onShowAuth: () => void;
}

const FONT_SIZES = ["S", "M", "L"] as const;
type Size = typeof FONT_SIZES[number];

export default function Settings({ theme, setTheme, onShowAuth }: SettingsProps) {
  const { user, signOut, deleteAccount } = useAuth();
  const { clearProgress } = useProgressCtx();
  const isMobile = useWindowWidth() < 900;
  const [reduce, setReduce] = useReduceMotion();

  const [displayName,    setDisplayName]    = useState(() => storage.getDisplayName());
  const [size,           setSize]           = useState<Size>(() => storage.getFontSize() as Size);
  const [copied,         setCopied]         = useState(false);
  const [confirmReset,   setConfirmReset]   = useState(false);
  const [confirmSignOut, setConfirmSignOut] = useState(false);
  const [resetting,      setResetting]      = useState(false);
  const [signingOut,     setSigningOut]     = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting,        setDeleting]        = useState(false);

  // Apply font-size CSS variable whenever the size preference changes.
  useEffect(() => {
    storage.setFontSize(size);
    document.documentElement.style.setProperty(
      "--cif-font-scale",
      size === "S" ? "0.92" : size === "L" ? "1.08" : "1",
    );
  }, [size]);

  const saveName = (v: string) => {
    setDisplayName(v);
    storage.setDisplayName(v);
  };

  const copyEmail = async () => {
    if (!user?.email) return;
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      toast.error("Couldn't copy — check browser permissions.");
    }
  };

  /**
   * resetProgress — deletes all lesson completions / quiz scores.
   * Calls clearProgress() which handles Supabase + localStorage + state.
   */
  const resetProgress = async () => {
    setResetting(true);
    try {
      await clearProgress();
      toast.success("Progress reset — all lessons cleared.");
    } catch {
      toast.error("Something went wrong — try again.");
    } finally {
      setResetting(false);
      setConfirmReset(false);
    }
  };

  /**
   * handleSignOut — delegates entirely to AuthContext.signOut(), which:
   *  - Calls storage.clearUserData() (clears user-specific localStorage).
   *  - Signs out of Supabase.
   *  - The AuthContext sets user → null, InnerApp auto-redirects to home.
   */
  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await signOut();
    } catch {
      toast.error("Sign-out failed — please try again.");
    } finally {
      setSigningOut(false);
      setConfirmSignOut(false);
    }
  };

  /**
   * handleDeleteAccount — permanently deletes the Supabase user record.
   * Delegates to AuthContext.deleteAccount(), which calls the server-side
   * `delete-account` Edge Function (service-role key never touches the client)
   * and then signs out. On success the user is redirected to home by InnerApp.
   *
   * NOTE (flagged for schema owner): cleanup of user_progress / feedback rows
   * is NOT handled here — it belongs to the schema owner via ON DELETE CASCADE
   * on the auth.users FK (or dedicated cleanup in the Edge Function).
   */
  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      const { error } = await deleteAccount();
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Your account has been permanently deleted.");
      setShowDeleteModal(false);
      // signOut() (called inside deleteAccount) clears state → app redirects.
    } catch {
      toast.error("Couldn't delete your account — please try again.");
    } finally {
      setDeleting(false);
    }
  };

  const initials = (displayName || user?.email || "··").slice(0, 2).toUpperCase();

  return (
    <div style={{
      padding: isMobile ? "20px 14px" : "32px 28px",
      maxWidth: 860, margin: "0 auto",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      {/* Page title */}
      <div style={{ marginBottom: 4 }}>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: 26, letterSpacing: "-0.8px", margin: 0,
        }}>Settings</h1>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 11.5, color: T.muted2, marginTop: 4,
        }}>// tune your workspace</div>
      </div>

      {/* ── Account ────────────────────────────────────── */}
      <Card>
        <CardTitle>Account</CardTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <div
            aria-label="Profile avatar"
            style={{
              width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 16,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              boxShadow: `0 6px 18px ${T.accent}44`,
            }}
          >{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <input
              value={displayName}
              placeholder="Display name"
              aria-label="Display name"
              onChange={e => saveName(e.target.value)}
              style={{
                width: "100%", background: T.bg2,
                border: `1px solid ${T.border}`, borderRadius: 8,
                padding: "8px 12px", color: T.text, fontSize: 13,
                fontFamily: "'Bricolage Grotesque',sans-serif",
                outline: "none", marginBottom: 6,
                transition: "border-color .15s",
              }}
              onFocus={e  => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={e   => (e.currentTarget.style.borderColor = T.border)}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: T.muted2 }}>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user?.email ?? "Not signed in"}
              </span>
              {user?.email && (
                <button
                  onClick={copyEmail}
                  title="Copy email"
                  aria-label="Copy email address"
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

        {!user ? (
          <PrimaryBtn onClick={onShowAuth}>Sign in to sync</PrimaryBtn>
        ) : (
          <SecondaryBtn
            onClick={() => signOut()}
            icon={<LogOut size={13} />}
          >
            Sign out
          </SecondaryBtn>
        )}
      </Card>

      {/* ── Themes ─────────────────────────────────────── */}
      <Card>
        <CardTitle>Themes</CardTitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 10,
        }}>
          {THEME_ORDER.map(k => {
            const c      = THEMES[k];
            const active = k === theme;
            return (
              <button
                key={k}
                onClick={() => setTheme(k)}
                aria-pressed={active}
                aria-label={`${THEME_META[k].label} theme`}
                title={THEME_META[k].desc}
                style={{
                  position: "relative",
                  background: c.bg, border: `1px solid ${active ? c.accent : T.border}`,
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
                <div style={{ fontSize: 11, fontWeight: 700, color: c.text, fontFamily: "'Bricolage Grotesque',sans-serif" }}>
                  {THEME_META[k].label}
                </div>
                {active && (
                  <div aria-hidden style={{
                    position: "absolute", top: 6, right: 6,
                    width: 16, height: 16, borderRadius: "50%",
                    background: c.accent,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Check size={10} color={c.bg} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </Card>

      {/* ── Preferences ────────────────────────────────── */}
      <Card>
        <CardTitle>Preferences</CardTitle>
        <Row label="Text size">
          <div style={{ display: "flex", gap: 6 }} role="group" aria-label="Text size">
            {FONT_SIZES.map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                aria-label={`Text size ${s}`}
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
          <Toggle on={reduce} onChange={setReduce} label="Reduce animations" />
        </Row>
      </Card>

      {/* ── Progress ───────────────────────────────────── */}
      <Card>
        <CardTitle>Progress</CardTitle>
        <p style={{ fontSize: 12, color: T.muted2, marginBottom: 12, lineHeight: 1.5 }}>
          {user
            ? "Resets all lesson completions and quiz scores — both locally and in the cloud."
            : "Clears recently visited lessons and time-spent data from this browser."}
        </p>
        {!confirmReset ? (
          <SecondaryBtn onClick={() => setConfirmReset(true)} icon={<RefreshCw size={13} />}>
            Reset progress
          </SecondaryBtn>
        ) : (
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, color: T.muted2 }}>
              {user ? "This deletes all your saved progress. Sure?" : "Clear local progress data?"}
            </span>
            <DangerBtn onClick={resetProgress} disabled={resetting}>
              {resetting ? "Resetting…" : "Yes, reset"}
            </DangerBtn>
            <SecondaryBtn onClick={() => setConfirmReset(false)}>Cancel</SecondaryBtn>
          </div>
        )}
      </Card>

      {/* ── Danger zone — signed-in users only ─────────── */}
      {user && (
        <Card danger>
          <CardTitle tone="rose">Danger zone</CardTitle>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: T.muted2, marginBottom: 10, lineHeight: 1.5 }}>
              <strong style={{ color: T.text }}>Sign out &amp; clear local data</strong>
              <br />
              Signs you out and clears all browser-stored preferences and recent pages.
              Your cloud progress is preserved.
            </div>
            {!confirmSignOut ? (
              <DangerBtn onClick={() => setConfirmSignOut(true)} icon={<LogOut size={13} />}>
                Sign out &amp; clear data
              </DangerBtn>
            ) : (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.muted2 }}>Sign out and clear all local data?</span>
                <DangerBtn onClick={handleSignOut} disabled={signingOut}>
                  {signingOut ? "Signing out…" : "Confirm"}
                </DangerBtn>
                <SecondaryBtn onClick={() => setConfirmSignOut(false)}>Cancel</SecondaryBtn>
              </div>
            )}
          </div>

          <div style={{
            paddingTop: 14, borderTop: `1px solid ${T.rose}22`,
          }}>
            <div style={{ fontSize: 12, color: T.muted2, marginBottom: 10, lineHeight: 1.5 }}>
              <strong style={{ color: T.rose }}>Delete account</strong>
              <br />
              Permanently deletes your account and cloud sign-in. This action
              cannot be undone.
            </div>
            <DangerBtn onClick={() => setShowDeleteModal(true)} icon={<Trash2 size={13} />}>
              Delete my account
            </DangerBtn>
          </div>
        </Card>
      )}

      {/* ── Delete-account confirmation modal ──────────── */}
      {showDeleteModal && user && (
        <DeleteAccountModal
          email={user.email ?? ""}
          deleting={deleting}
          onCancel={() => { if (!deleting) setShowDeleteModal(false); }}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  );
}

/* ───────────────── Delete-account modal ───────────────── */

function DeleteAccountModal({
  email, deleting, onCancel, onConfirm,
}: {
  email: string;
  deleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const [typed, setTyped] = useState("");
  // Require the user to type "DELETE" to arm the destructive action.
  const armed = typed.trim().toUpperCase() === "DELETE";

  // Close on Escape (unless a deletion is in-flight).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !deleting) onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [deleting, onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Confirm account deletion"
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,.55)", backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.surface, border: `1px solid ${T.rose}44`,
          borderRadius: 16, padding: "22px 22px 20px",
          maxWidth: 420, width: "100%",
          boxShadow: `0 24px 60px rgba(0,0,0,.4)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9, flexShrink: 0,
            background: `${T.rose}18`, border: `1px solid ${T.rose}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <AlertTriangle size={17} color={T.rose} />
          </div>
          <h2 style={{
            margin: 0, fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 800, fontSize: 17, letterSpacing: "-0.4px", color: T.text,
          }}>Delete account?</h2>
          <button
            onClick={onCancel}
            disabled={deleting}
            aria-label="Close dialog"
            style={{
              marginLeft: "auto", width: 28, height: 28, borderRadius: 7,
              background: T.bg2, border: `1px solid ${T.border}`,
              color: T.muted2, cursor: deleting ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: deleting ? 0.5 : 1,
            }}
          >
            <X size={14} />
          </button>
        </div>

        <p style={{ fontSize: 13, color: T.muted2, lineHeight: 1.6, margin: "0 0 12px" }}>
          This permanently deletes the account for{" "}
          <strong style={{ color: T.text }}>{email || "this user"}</strong>.
          This action <strong style={{ color: T.rose }}>cannot be undone</strong>.
        </p>

        <label style={{ display: "block", fontSize: 11.5, color: T.muted2, marginBottom: 6 }}>
          Type <strong style={{ color: T.text }}>DELETE</strong> to confirm:
        </label>
        <input
          value={typed}
          onChange={e => setTyped(e.target.value)}
          placeholder="DELETE"
          aria-label="Type DELETE to confirm"
          autoFocus
          disabled={deleting}
          style={{
            width: "100%", background: T.bg2,
            border: `1px solid ${armed ? T.rose : T.border}`, borderRadius: 8,
            padding: "9px 12px", color: T.text, fontSize: 13,
            fontFamily: "'Fira Code',monospace", outline: "none", marginBottom: 16,
          }}
        />

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <SecondaryBtn onClick={onCancel}>Cancel</SecondaryBtn>
          <DangerBtn onClick={onConfirm} disabled={!armed || deleting} icon={<Trash2 size={13} />}>
            {deleting ? "Deleting…" : "Delete forever"}
          </DangerBtn>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── UI pieces ───────────────── */

function Card({ children, danger = false }: { children: React.ReactNode; danger?: boolean }) {
  return (
    <div style={{
      background: danger ? `linear-gradient(180deg, ${T.surface}, ${T.rose}10)` : T.surface,
      border: `1px solid ${danger ? `${T.rose}44` : T.border}`,
      borderRadius: 14, padding: "16px 20px",
    }}>{children}</div>
  );
}

function CardTitle({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "rose" }) {
  const c = tone === "rose" ? T.rose : T.accent;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 7,
      fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 10,
      color: T.muted2, textTransform: "uppercase", letterSpacing: "2px", marginBottom: 14,
    }}>
      <span aria-hidden style={{
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

function SecondaryBtn({ children, onClick, icon }: {
  children: React.ReactNode; onClick?: () => void; icon?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px", background: "transparent",
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

function DangerBtn({ children, onClick, icon, disabled }: {
  children: React.ReactNode; onClick?: () => void;
  icon?: React.ReactNode; disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 16px",
        background: disabled ? T.border : T.rose,
        border: "none", borderRadius: 10,
        color: "#fff", fontSize: 12.5, fontWeight: 700,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "filter .15s, background .15s",
        display: "inline-flex", alignItems: "center", gap: 7,
        opacity: disabled ? 0.6 : 1,
      }}
      onMouseEnter={e => !disabled && ((e.currentTarget as HTMLElement).style.filter = "brightness(1.1)")}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
    >{icon}{children}</button>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
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
        boxShadow: "0 1px 4px rgba(0,0,0,.3)",
      }} />
    </button>
  );
}
