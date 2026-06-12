import { useState, useEffect, useRef, useCallback } from "react";
import { T } from "../utils/theme";
import { NAV, ALL_ITEMS } from "../utils/nav";

const LS_KEY = "cif_recent_search";
const MAX_RECENT = 5;

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? "[]"); } catch { return []; }
}

function addRecent(id: string) {
  try {
    const prev = getRecent().filter(x => x !== id);
    localStorage.setItem(LS_KEY, JSON.stringify([id, ...prev].slice(0, MAX_RECENT)));
  } catch {}
}

export default function GlobalSearch({ open, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setRecent(getRecent());
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const filtered = query.trim()
    ? ALL_ITEMS.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.id.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const recentItems = recent
    .map(id => ALL_ITEMS.find(i => i.id === id))
    .filter(Boolean) as typeof ALL_ITEMS;

  const displayList = query.trim() ? filtered : recentItems;

  const navigate = useCallback((id: string) => {
    addRecent(id);
    onNavigate(id);
    onClose();
  }, [onNavigate, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(h => Math.min(h + 1, displayList.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
      if (e.key === "Enter" && displayList[highlighted]) {
        navigate(displayList[highlighted].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, displayList, highlighted, navigate, onClose]);

  useEffect(() => { setHighlighted(0); }, [query]);

  if (!open) return null;

  const grouped = query.trim()
    ? null
    : NAV
        .map(g => ({
          ...g,
          items: g.items.filter(i => recentItems.some(r => r.id === i.id)),
        }))
        .filter(g => g.items.length > 0);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "10vh",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: "min(600px, 94vw)",
        background: T.bg2,
        border: `1px solid ${T.border2}`,
        borderRadius: 16,
        boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        overflow: "hidden",
      }}>
        {/* Input row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "14px 18px",
          borderBottom: `1px solid ${T.border}`,
        }}>
          <span style={{ fontSize: 16, color: T.muted, flexShrink: 0 }}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages and lessons…"
            style={{
              flex: 1, border: "none", outline: "none",
              background: "transparent", color: T.text,
              fontSize: 15, fontFamily: "'Bricolage Grotesque',sans-serif",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 13, padding: "0 4px" }}
            >✕</button>
          )}
          <kbd style={{
            fontSize: 10, color: T.muted, fontFamily: "'Fira Code',monospace",
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 4, padding: "2px 7px", flexShrink: 0,
          }}>esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 420, overflowY: "auto", padding: "8px 0" }}>
          {query.trim() ? (
            filtered.length === 0 ? (
              <div style={{ padding: "24px 20px", textAlign: "center", color: T.muted, fontSize: 12.5, fontFamily: "'Fira Code',monospace" }}>
                // no results for "{query}"
              </div>
            ) : (
              filtered.map((item, i) => (
                <SearchRow
                  key={item.id}
                  item={item}
                  active={i === highlighted}
                  onClick={() => navigate(item.id)}
                  onHover={() => setHighlighted(i)}
                />
              ))
            )
          ) : recentItems.length === 0 ? (
            <div style={{ padding: "24px 20px", textAlign: "center", color: T.muted, fontSize: 12.5, fontFamily: "'Fira Code',monospace" }}>
              // search for any page or lesson
            </div>
          ) : (
            (grouped ?? []).map(group => (
              <div key={group.section}>
                <div style={{
                  fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace",
                  letterSpacing: "2px", textTransform: "uppercase",
                  padding: "6px 18px 4px",
                }}>
                  {group.section}
                </div>
                {group.items.map((item, ii) => {
                  const globalIdx = recentItems.findIndex(r => r.id === item.id);
                  return (
                    <SearchRow
                      key={item.id}
                      item={item}
                      active={globalIdx === highlighted}
                      onClick={() => navigate(item.id)}
                      onHover={() => setHighlighted(globalIdx)}
                      showRecent
                    />
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div style={{
          borderTop: `1px solid ${T.border}`, padding: "8px 18px",
          display: "flex", gap: 14, alignItems: "center",
        }}>
          {[["↑↓", "navigate"], ["↵", "open"], ["esc", "close"]].map(([key, label]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <kbd style={{ fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace", background: T.surface, border: `1px solid ${T.border}`, borderRadius: 3, padding: "1px 5px" }}>{key}</kbd>
              <span style={{ fontSize: 10, color: T.muted }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchRow({ item, active, onClick, onHover, showRecent }: {
  item: (typeof ALL_ITEMS)[0];
  active: boolean;
  onClick: () => void;
  onHover: () => void;
  showRecent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        width: "100%", padding: "9px 18px",
        border: "none", background: active ? `${item.color}18` : "transparent",
        cursor: "pointer", textAlign: "left", color: T.text,
        transition: "background .1s",
      }}
    >
      <span style={{
        width: 28, height: 28, borderRadius: 7, flexShrink: 0,
        background: active ? `${item.color}30` : T.surface,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: item.icon.length > 1 ? 9 : 13,
        fontFamily: item.icon.length > 1 ? "'Fira Code',monospace" : "inherit",
        fontWeight: 600, color: item.color,
      }}>{item.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 13 }}>{item.label}</div>
        <div style={{ fontSize: 9.5, fontFamily: "'Fira Code',monospace", color: T.muted }}>{item.id}</div>
      </div>
      {showRecent && <span style={{ fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace" }}>recent</span>}
      {active && <span style={{ fontSize: 10, color: item.color }}>→</span>}
    </button>
  );
}
