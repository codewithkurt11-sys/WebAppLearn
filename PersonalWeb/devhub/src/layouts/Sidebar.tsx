import { T } from "../utils/theme";
import { NAV } from "../utils/nav";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";

const tagStyle = (tag?: string): { bg: string; color: string } => ({
  beginner:     { bg: "rgba(56,189,248,.12)",  color: "#38bdf8" },
  intermediate: { bg: "rgba(124,109,250,.12)", color: "#7c6dfa" },
  advanced:     { bg: "rgba(251,113,133,.12)", color: "#fb7185" },
}[tag || ""] ?? { bg: "", color: "" });

function SidebarFooter({ onShowAuth, isDark, onToggleTheme }: {
  onShowAuth: () => void; isDark: boolean; onToggleTheme: () => void;
}) {
  const { user, signOut, loading } = useAuth();

  const themeBtn = (
    <button
      onClick={onToggleTheme}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        width: "100%", padding: "7px 12px", background: "transparent",
        border: `1px solid ${T.border2}`, borderRadius: 7,
        color: T.muted2, fontSize: 11, cursor: "pointer", transition: "all .15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 8,
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = T.accent; el.style.color = T.accent; }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = T.border2; el.style.color = T.muted2; }}
    >
      {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );

  if (loading) return (
    <div style={{ padding: "14px 18px", borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
      {themeBtn}
      <div style={{ fontSize: 10, color: T.muted, fontFamily: "'Fira Code',monospace" }}>// loading…</div>
    </div>
  );

  if (!user) return (
    <div style={{ padding: "14px 18px", borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
      {themeBtn}
      <button
        onClick={onShowAuth}
        style={{
          width: "100%", padding: "8px 12px", background: "rgba(124,109,250,.12)",
          border: `1px solid rgba(124,109,250,.25)`, borderRadius: 8,
          color: T.accent, fontSize: 11.5, fontWeight: 600,
          fontFamily: "'Bricolage Grotesque',sans-serif", cursor: "pointer", transition: "all .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(124,109,250,.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(124,109,250,.12)")}
      >
        Sign in to sync progress →
      </button>
    </div>
  );

  const initials   = user.email?.slice(0, 2).toUpperCase() ?? "??";
  const shortEmail = user.email && user.email.length > 22 ? user.email.slice(0, 20) + "…" : user.email;

  return (
    <div style={{ padding: "14px 18px", borderTop: `1px solid ${T.border}`, flexShrink: 0 }}>
      {themeBtn}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
          background: `linear-gradient(135deg,${T.accent},${T.rose})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 800, color: "#fff",
          fontFamily: "'Bricolage Grotesque',sans-serif",
        }}>{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shortEmail}</div>
          <div style={{ fontSize: 9, color: T.green, fontFamily: "'Fira Code',monospace" }}>● syncing</div>
        </div>
      </div>
      <button
        onClick={signOut}
        style={{
          width: "100%", padding: "7px 12px", background: "transparent",
          border: `1px solid ${T.border2}`, borderRadius: 7,
          color: T.muted2, fontSize: 11, cursor: "pointer", transition: "all .15s",
        }}
        onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = T.rose; el.style.color = T.rose; }}
        onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = T.border2; el.style.color = T.muted2; }}
      >
        Sign out
      </button>
    </div>
  );
}

export function Sidebar({ open, onClose, isMobile, onShowAuth, isDark, onToggleTheme }: {
  open: boolean; onClose: () => void; isMobile: boolean;
  onShowAuth: () => void; isDark: boolean; onToggleTheme: () => void;
}) {
  const { page, setPage } = useApp();
  const go = (id: string) => { setPage(id); if (isMobile) onClose(); };

  return (
    <>
      {isMobile && open && (
        <div
          onClick={onClose}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", zIndex: 98, backdropFilter: "blur(3px)" }}
        />
      )}
      <aside style={{
        position: "fixed", top: 0, left: 0, width: 218, height: "100vh",
        background: T.bg2, borderRight: `1px solid ${T.border}`,
        zIndex: 99, display: "flex", flexDirection: "column", overflowY: "auto",
        transition: "transform .28s cubic-bezier(.4,0,.2,1)",
        transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
      }}>
        <div style={{ padding: "18px 18px 14px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 17,
            letterSpacing: "-0.5px",
            background: `linear-gradient(120deg,${T.accent},${T.rose})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>WebAppLearn</div>
          <div style={{ fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace", marginTop: 2, letterSpacing: "0.5px" }}>
            // my learning space
          </div>
        </div>

        <nav style={{ padding: "8px 0 24px", flex: 1 }}>
          {NAV.map(group => (
            <div key={group.section} style={{ marginTop: 16 }}>
              <div style={{
                fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace",
                letterSpacing: "2px", textTransform: "uppercase", padding: "0 16px 6px",
              }}>{group.section}</div>
              {group.items.map(item => {
                const active = page === item.id;
                const tc = tagStyle(item.tag);
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 14px",
                      border: "none", textAlign: "left",
                      background: active ? T.surface2 : "transparent",
                      color: active ? T.text : T.muted2,
                      fontSize: 12.5, fontWeight: 500,
                      borderLeft: active ? `2px solid ${item.color}` : "2px solid transparent",
                      transition: "all .15s", cursor: "pointer",
                    }}
                    onMouseEnter={e => { if (!active)(e.currentTarget as HTMLElement).style.background = T.surface; }}
                    onMouseLeave={e => { if (!active)(e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{
                      fontSize: item.icon.length > 1 ? 10 : 14,
                      fontFamily: item.icon.length > 1 ? "'Fira Code',monospace" : "inherit",
                      lineHeight: 1, width: 18, textAlign: "center",
                      color: active ? item.color : T.muted2,
                      fontWeight: item.icon.length > 1 ? 600 : 400,
                    }}>{item.icon}</span>
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.tag && (
                      <span style={{
                        fontSize: 8, fontFamily: "'Fira Code',monospace", letterSpacing: "1px",
                        textTransform: "uppercase", padding: "2px 5px", borderRadius: 4,
                        background: tc.bg, color: tc.color,
                      }}>
                        {item.tag.slice(0, 3)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <SidebarFooter onShowAuth={onShowAuth} isDark={isDark} onToggleTheme={onToggleTheme}/>
      </aside>
    </>
  );
}
