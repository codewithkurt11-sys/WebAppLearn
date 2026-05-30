import { T } from "../utils/theme";
import { NAV } from "../utils/nav";
import { useApp } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";

export function TopBar({ onMenu, onShowAuth, isDark, onToggleTheme }: {
  onMenu: () => void; onShowAuth: () => void; isDark: boolean; onToggleTheme: () => void;
}) {
  const { page } = useApp();
  const { user } = useAuth();
  const allItems = NAV.flatMap(g => g.items);
  const current  = allItems.find(i => i.id === page);

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8, padding: "13px 14px",
      borderBottom: `1px solid ${T.border}`,
      background: T.overlay, backdropFilter: "blur(12px)",
      position: "sticky", top: 0, zIndex: 50,
      boxShadow: "0 2px 20px rgba(0,0,0,.13)",
    }}>
      <button
        onClick={onMenu}
        style={{
          width: 36, height: 36, border: `1px solid ${T.border2}`, background: T.surface,
          borderRadius: 9, color: T.text, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16, flexShrink: 0, cursor: "pointer",
          transition: "all .15s",
        }}
      >☰</button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {current?.label || "WebAppLearn"}
        </div>
      </div>

      <button
        onClick={onToggleTheme}
        style={{
          width: 34, height: 34, border: `1px solid ${T.border2}`, background: T.surface,
          borderRadius: 8, color: T.muted2, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 15, flexShrink: 0, cursor: "pointer",
          transition: "all .15s",
        }}
      >
        {isDark ? "☀" : "🌙"}
      </button>

      {user ? (
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg,${T.accent},${T.rose})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 800, color: "#fff", flexShrink: 0,
        }}>
          {user.email?.slice(0, 2).toUpperCase()}
        </div>
      ) : (
        <button
          onClick={onShowAuth}
          style={{
            padding: "6px 12px", border: `1px solid ${T.border2}`, background: "transparent",
            borderRadius: 8, color: T.accent, fontSize: 11.5, fontWeight: 600,
            cursor: "pointer", flexShrink: 0, transition: "all .15s",
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
