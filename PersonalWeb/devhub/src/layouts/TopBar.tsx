import { Search } from "lucide-react";
import type { ThemeKey } from "../utils/theme";
import { T, THEMES } from "../utils/theme";
import { ALL_ITEMS } from "../utils/nav";

interface TopBarProps {
  page: string;
  onMenu: () => void;
  menuOpen?: boolean;
  onSearch?: () => void;
  theme: ThemeKey;
}

/**
 * Mobile-only native app bar. Desktop hides this and uses the sidebar.
 *
 * Renders:
 *  - Animated hamburger ↔ X (3 lines morph)
 *  - Centred bold page title
 *  - Search + active theme dot on the right
 *  - Translucent blurred surface with a 1px gradient border-fade at the bottom
 */
export function TopBar({ page, onMenu, menuOpen = false, onSearch, theme }: TopBarProps) {
  const current = ALL_ITEMS.find(i => i.id === page);
  const title = current?.label ?? "codeisfun";

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 50,
      height: 52,
      display: "flex", alignItems: "center", gap: 8,
      padding: "0 12px",
      background: T.overlay,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: `1px solid transparent`,
      backgroundImage: `linear-gradient(${T.overlay}, ${T.overlay}),
        linear-gradient(90deg, transparent, ${T.border} 30%, ${T.border} 70%, transparent)`,
      backgroundOrigin: "border-box",
      backgroundClip: "padding-box, border-box",
    }}>
      {/* Hamburger ↔ X */}
      <button
        onClick={onMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        style={{
          width: 38, height: 38, flexShrink: 0,
          border: `1px solid ${T.border2}`,
          background: T.surface, borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", padding: 0,
          transition: "all .15s",
        }}
      >
        <Burger open={menuOpen} />
      </button>

      {/* Page title */}
      <div style={{
        flex: 1, minWidth: 0,
        textAlign: "center",
        fontFamily: "'Bricolage Grotesque',sans-serif",
        fontWeight: 700, fontSize: 14.5,
        color: T.text,
        letterSpacing: "-0.2px",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>{title}</div>

      {/* Search */}
      {onSearch && (
        <button
          onClick={onSearch}
          aria-label="Search"
          style={{
            width: 38, height: 38, flexShrink: 0,
            border: `1px solid ${T.border2}`,
            background: T.surface, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: T.muted2, cursor: "pointer",
            transition: "color .15s, border-color .15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = T.accent;
            (e.currentTarget as HTMLElement).style.borderColor = T.accent;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = T.muted2;
            (e.currentTarget as HTMLElement).style.borderColor = T.border2;
          }}
        >
          <Search size={16} />
        </button>
      )}

      {/* Active theme dot */}
      <div
        title={`Theme: ${theme}`}
        style={{
          width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
          background: THEMES[theme].accent,
          boxShadow: `0 0 0 2px ${T.bg2}, 0 0 0 3px ${T.border2}`,
        }}
      />
    </div>
  );
}

function Burger({ open }: { open: boolean }) {
  const line: React.CSSProperties = {
    position: "absolute", left: 8, right: 8, height: 2,
    background: "var(--t-text)", borderRadius: 1,
    transition: "transform .25s cubic-bezier(.4,0,.2,1), opacity .2s, top .25s",
  };
  return (
    <span style={{ position: "relative", width: 22, height: 16, display: "inline-block" }}>
      <span style={{ ...line, top: open ? 7 : 1, transform: open ? "rotate(45deg)" : "none" }} />
      <span style={{ ...line, top: 7, opacity: open ? 0 : 1 }} />
      <span style={{ ...line, top: open ? 7 : 13, transform: open ? "rotate(-45deg)" : "none" }} />
    </span>
  );
}
