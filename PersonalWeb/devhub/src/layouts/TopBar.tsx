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
      display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
      borderBottom: `1px solid ${T.border}`,
      background: T.overlay, backdropFilter: "blur(10px)",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <button
        onClick={onMenu}
        style={{
          width: 34, height: 34, border: `1px solid ${T.border2}`, background: T.surface,
          borderRadius: 8, color: T.text, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 16, flexShrink: 0, cursor: "pointer",
        }}
      >☰</button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {current?.label || "WebAppLearn"}
        </div>
      </div>

      <button
        onClick={onToggleTheme}
        style={{
          width: 32, height: 32, border: `1px solid ${T.border2}`, background: T.surface,
          borderRadius: 7, color: T.muted2, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14, flexShrink: 0, cursor: "pointer",
        }}
      >
        {isDark ? "☀" : "🌙"}
      </button>

      {user ? (
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
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
            padding: "5px 10px", border: `1px solid ${T.border2}`, background: "transparent",
            borderRadius: 7, color: T.accent, fontSize: 11, fontWeight: 600,
            cursor: "pointer", flexShrink: 0,
          }}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
