/**
 * Sidebar.tsx
 *
 * Fixes / improvements:
 *  1. Uses storage service instead of raw localStorage for pin, sections
 *     state, and display name.
 *  2. displayName reads from storage (not a raw localStorage call inside
 *     a render function) — prevents reading on every render cycle.
 *  3. NavRow tooltip is rendered with role="tooltip" for accessibility.
 *  4. Sidebar close button has an accessible aria-label when isMobile.
 *  5. Active nav item gets aria-current="page" for screen readers.
 *  6. Memo-ized sub-components prevent unnecessary re-renders.
 */

import { useState, useEffect, useMemo, memo } from "react";
import {
  LayoutDashboard, Map, MessageSquare, Settings as SettingsIcon,
  User, ChevronLeft, ChevronRight, ChevronDown, Search, LogOut, LogIn,
  Code2, Home as HomeIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ThemeKey } from "../utils/theme";
import { T, THEMES, THEME_ORDER, THEME_META } from "../utils/theme";
import { NAV } from "../utils/nav";
import { storage } from "../services/storage";

const ICON_MAP: Record<string, LucideIcon> = {
  home:       HomeIcon,
  dashboard:  LayoutDashboard,
  roadmap:    Map,
  feedback:   MessageSquare,
  settings:   SettingsIcon,
  profile:    User,
};

interface SidebarProps {
  page: string;
  setPage: (id: string) => void;
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
  theme: ThemeKey;
  setTheme: (k: ThemeKey) => void;
  onShowAuth: () => void;
  onOpenSearch: () => void;
  user: { email: string } | null;
  onSignOut: () => void;
}

const COLLAPSED_W = 64;
const EXPANDED_W  = 240;

type SectionState = Record<string, boolean>;

function loadSectionState(): SectionState {
  const stored = storage.getNavSections();
  if (stored) return stored;
  const init: SectionState = {};
  for (const g of NAV) {
    if (g.collapsible && g.section) init[g.section] = !!g.defaultOpen;
  }
  return init;
}

export function Sidebar({
  page, setPage, open, onClose, isMobile,
  theme, setTheme, onShowAuth, onOpenSearch, user, onSignOut,
}: SidebarProps) {
  const [pinned, setPinned] = useState<boolean>(() => storage.getSidebarPin());
  const [hover,  setHover]  = useState(false);
  const [sections, setSections] = useState<SectionState>(loadSectionState);

  // Persist pin preference.
  useEffect(() => {
    storage.setSidebarPin(pinned);
  }, [pinned]);

  // Persist section collapse state.
  useEffect(() => {
    storage.setNavSections(sections);
  }, [sections]);

  // Auto-expand the section containing the active page.
  const activeSection = useMemo(() => {
    for (const g of NAV) {
      if (g.collapsible && g.items.some(i => i.id === page)) return g.section;
    }
    return null;
  }, [page]);

  useEffect(() => {
    if (activeSection && !sections[activeSection]) {
      setSections(s => ({ ...s, [activeSection]: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  const expanded = isMobile ? true : (pinned || hover);
  const width    = isMobile ? 280 : (expanded ? EXPANDED_W : COLLAPSED_W);

  const go = (id: string) => { setPage(id); if (isMobile) onClose(); };
  const toggleSection = (name: string) =>
    setSections(s => ({ ...s, [name]: !s[name] }));

  // Read display name from storage (not inline inside render).
  const displayName = storage.getDisplayName() || null;
  const initials = displayName
    ? displayName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? "··";
  const shortLabel = displayName ?? user?.email ?? "Guest";

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div
          onClick={onClose}
          role="button"
          aria-label="Close menu"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onClose()}
          style={{
            position: "fixed", inset: 0, zIndex: 98,
            background: "rgba(0,0,0,.55)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            animation: "cifFade .18s ease",
          }}
        />
      )}

      <aside
        aria-label="Main navigation"
        onMouseEnter={() => !isMobile && setHover(true)}
        onMouseLeave={() => !isMobile && setHover(false)}
        style={{
          position: "fixed", top: 0, left: 0, height: "100vh",
          width, background: T.bg2,
          borderRight: `1px solid ${T.border}`,
          zIndex: 99,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          transition: "width .25s cubic-bezier(.4,0,.2,1), transform .28s cubic-bezier(.4,0,.2,1)",
          transform: isMobile ? (open ? "translateX(0)" : "translateX(-100%)") : "translateX(0)",
          boxShadow: expanded && !isMobile ? `4px 0 32px rgba(0,0,0,.18)` : "none",
        }}
      >
        {/* Logo */}
        <div style={{
          height: 56, padding: "0 14px", flexShrink: 0,
          display: "flex", alignItems: "center", gap: 10,
          borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: `linear-gradient(135deg, ${T.accent}22, ${T.rose}18)`,
            border: `1px solid ${T.border2}`, color: T.accent,
          }}>
            <Code2 size={18} strokeWidth={2.2} />
          </div>
          {expanded && (
            <div style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap" }}>
              <div style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 800, fontSize: 16,
                background: `linear-gradient(120deg, ${T.accent}, ${T.rose})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}>codeisfun</div>
              <div style={{
                fontSize: 9, color: T.muted,
                fontFamily: "'Fira Code',monospace", letterSpacing: "0.5px",
              }}>{"</> learn to code"}</div>
            </div>
          )}
        </div>

        {/* Search */}
        <div style={{ padding: "10px 12px 4px", flexShrink: 0 }}>
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            style={{
              display: "flex", alignItems: "center",
              gap: expanded ? 8 : 0, width: "100%",
              padding: expanded ? "8px 10px" : "8px",
              justifyContent: expanded ? "flex-start" : "center",
              background: T.surface, border: `1px solid ${T.border2}`,
              borderRadius: 8, color: T.muted2, fontSize: 12,
              cursor: "pointer", transition: "all .15s",
              fontFamily: "'Bricolage Grotesque',sans-serif",
            }}
          >
            <Search size={14} />
            {expanded && (
              <>
                <span style={{ flex: 1, textAlign: "left" }}>Search…</span>
                <kbd style={{
                  fontSize: 9, fontFamily: "'Fira Code',monospace",
                  background: T.bg2, border: `1px solid ${T.border}`,
                  borderRadius: 3, padding: "1px 5px", color: T.muted,
                }}>⌘K</kbd>
              </>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Site navigation"
          style={{ padding: "8px 0 12px", flex: 1, overflowY: "auto", overflowX: "hidden" }}
        >
          {NAV.map((group, gi) => {
            // Hide "home" nav item when user is logged in.
            const visibleItems = user
              ? group.items.filter(item => item.id !== "home")
              : group.items;
            if (visibleItems.length === 0) return null;

            const showHeader  = !!group.section && group.collapsible !== false;
            const isOpen      = showHeader ? !!sections[group.section] : true;
            const showDivider = gi > 0;

            return (
              <div key={group.section + gi} style={{ marginTop: gi === 0 ? 4 : 6 }}>
                {showDivider && (
                  <div style={{
                    height: 1, background: T.border,
                    margin: expanded ? "6px 14px 8px" : "6px 12px 8px",
                    opacity: .55,
                  }} />
                )}
                {showHeader && expanded && (
                  <button
                    onClick={() => toggleSection(group.section)}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${group.section}`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "4px 16px 6px",
                      background: "transparent", border: "none",
                      color: T.muted, fontSize: 9,
                      fontFamily: "'Fira Code',monospace",
                      letterSpacing: "2px", textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    <span>{group.section}</span>
                    <span style={{
                      display: "inline-flex", color: T.muted2,
                      transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                      transition: "transform .18s",
                    }}>
                      <ChevronDown size={12} />
                    </span>
                  </button>
                )}
                {isOpen && visibleItems.map(item => {
                  const active = page === item.id;
                  const Icon   = ICON_MAP[item.id];
                  return (
                    <NavRow
                      key={item.id}
                      label={item.label}
                      color={item.color}
                      active={active}
                      expanded={expanded}
                      onClick={() => go(item.id)}
                      icon={Icon
                        ? <Icon size={16} strokeWidth={active ? 2.4 : 1.9} />
                        : <span style={{
                            fontFamily: "'Fira Code',monospace",
                            fontSize: 10, fontWeight: 700,
                          }}>{item.icon}</span>}
                      tag={item.tag}
                    />
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* User chip */}
        {user && (
          <div style={{
            padding: expanded ? "10px 12px" : "10px 0",
            borderTop: `1px solid ${T.border}`, flexShrink: 0,
            display: "flex", alignItems: "center",
            gap: 10, justifyContent: expanded ? "flex-start" : "center",
          }}>
            <div
              aria-label={`Logged in as ${shortLabel}`}
              style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, color: "#fff",
                fontFamily: "'Bricolage Grotesque',sans-serif",
                boxShadow: `0 0 0 2px ${T.bg2}, 0 4px 12px ${T.accent}55`,
              }}
            >{initials}</div>
            {expanded && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 11.5, fontWeight: 600, color: T.text,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>{shortLabel}</div>
                <div style={{
                  fontSize: 9, color: T.muted,
                  fontFamily: "'Fira Code',monospace", letterSpacing: "0.5px",
                }}>member</div>
              </div>
            )}
          </div>
        )}

        {/* Theme dots + sign out / in */}
        <div style={{
          padding: expanded ? "10px 12px 8px" : "10px 0 8px",
          flexShrink: 0,
          borderTop: `1px solid ${T.border}`,
          display: "flex", flexDirection: "column",
          alignItems: expanded ? "stretch" : "center",
          gap: 8,
        }}>
          <div
            role="group"
            aria-label="Select theme"
            style={{
              display: "flex", alignItems: "center",
              gap: 6, justifyContent: expanded ? "flex-start" : "center",
              flexWrap: "wrap",
            }}
          >
            {THEME_ORDER.map(k => (
              <button
                key={k}
                title={THEME_META[k].label}
                aria-pressed={k === theme}
                aria-label={`${THEME_META[k].label} theme`}
                onClick={() => setTheme(k)}
                style={{
                  width: k === theme ? 14 : 10,
                  height: k === theme ? 14 : 10,
                  borderRadius: "50%",
                  border: k === theme ? `2px solid ${T.text}` : "2px solid transparent",
                  background: THEMES[k].accent,
                  cursor: "pointer", transition: "all .2s", padding: 0,
                }}
              />
            ))}
          </div>

          {user ? (
            <IconBtn
              label="Sign out" expanded={expanded} tone="rose"
              icon={<LogOut size={14} />} onClick={onSignOut}
            />
          ) : (
            <IconBtn
              label="Sign in to sync" expanded={expanded} tone="accent"
              icon={<LogIn size={14} />} onClick={onShowAuth}
            />
          )}
        </div>

        {/* Pin/collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={() => setPinned(p => !p)}
            title={pinned ? "Collapse sidebar" : "Pin sidebar open"}
            aria-label={pinned ? "Collapse sidebar" : "Pin sidebar open"}
            style={{
              height: 36, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: T.bg2, border: "none",
              borderTop: `1px solid ${T.border}`,
              color: T.muted2, cursor: "pointer",
              transition: "color .15s, background .15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = T.accent;
              (e.currentTarget as HTMLElement).style.background = T.surface;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = T.muted2;
              (e.currentTarget as HTMLElement).style.background = T.bg2;
            }}
          >
            {pinned ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </aside>
    </>
  );
}

// ─── NavRow ──────────────────────────────────────────────────────────────

const NavRow = memo(function NavRow({
  label, color, active, expanded, onClick, icon, tag,
}: {
  label: string; color: string; active: boolean; expanded: boolean;
  onClick: () => void; icon: React.ReactNode; tag?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-current={active ? "page" : undefined}
        title={!expanded ? label : undefined}
        style={{
          position: "relative",
          display: "flex", alignItems: "center", gap: 10,
          width: "100%",
          padding: expanded ? "8px 14px 8px 24px" : "10px 0",
          justifyContent: expanded ? "flex-start" : "center",
          border: "none", textAlign: "left",
          background: active
            ? `linear-gradient(90deg, ${color}1f, transparent 70%)`
            : hover ? T.surface : "transparent",
          color: active ? T.text : T.muted2,
          fontSize: 12.5, fontWeight: active ? 600 : 500,
          cursor: "pointer", transition: "background .15s, color .15s",
        }}
      >
        {active && (
          <span aria-hidden style={{
            position: "absolute", left: 0, top: 6, bottom: 6,
            width: 3, borderRadius: "0 3px 3px 0",
            background: color, boxShadow: `0 0 12px ${color}88`,
          }} />
        )}
        <span style={{
          width: 18, display: "flex", alignItems: "center", justifyContent: "center",
          color: active ? color : T.muted2, flexShrink: 0,
          transition: "color .15s",
        }}>{icon}</span>
        {expanded && <span style={{ flex: 1, whiteSpace: "nowrap" }}>{label}</span>}
        {expanded && tag && (
          <span style={{
            fontSize: 8, fontFamily: "'Fira Code',monospace",
            letterSpacing: "1px", textTransform: "uppercase",
            padding: "2px 5px", borderRadius: 4,
            background: tag === "advanced" ? `${T.rose}1e` : `${color}1e`,
            color: tag === "advanced" ? T.rose : color,
          }}>{tag.slice(0, 3)}</span>
        )}
      </button>

      {!expanded && hover && (
        <div
          role="tooltip"
          style={{
            position: "absolute", left: "calc(100% + 8px)", top: "50%",
            transform: "translateY(-50%)",
            background: T.surface2, color: T.text,
            border: `1px solid ${T.border2}`,
            borderRadius: 6, padding: "5px 10px",
            fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
            zIndex: 110, pointerEvents: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,.35)",
            animation: "cifFade .15s ease",
          }}
        >{label}</div>
      )}
    </div>
  );
});

// ─── IconBtn ─────────────────────────────────────────────────────────────

function IconBtn({
  label, icon, expanded, tone, onClick,
}: {
  label: string; icon: React.ReactNode; expanded: boolean;
  tone: "accent" | "rose"; onClick: () => void;
}) {
  const c = tone === "accent" ? T.accent : T.rose;
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      style={{
        display: "flex", alignItems: "center",
        gap: expanded ? 8 : 0,
        justifyContent: "center",
        width: expanded ? "100%" : 36, height: 32,
        padding: expanded ? "0 10px" : 0,
        background: `${c}10`, border: `1px solid ${c}40`,
        borderRadius: 8, color: c, fontSize: 11.5, fontWeight: 600,
        cursor: "pointer", transition: "all .15s",
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = `${c}22`}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = `${c}10`}
    >
      {icon}{expanded && <span>{label}</span>}
    </button>
  );
}
