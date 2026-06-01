import { useState } from "react";
import { T } from "../shared";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { explainLine } from "../utils/explainCode";

interface CodeExplanationProps {
  code: string;
  lang?: string;
  /** Legacy manual steps — ignored; engine auto-generates from code */
  steps?: unknown[];
}

export function CodeExplanation({ code, lang = "py" }: CodeExplanationProps) {
  const isMobile = useWindowWidth() < 900;
  const [open, setOpen] = useState(false);

  if (!code?.trim()) return null;

  const allLines = code.trim().split("\n");
  const rows = allLines
    .map((line, i) => {
      const exp = explainLine(line, lang);
      return exp === null ? null : { lineNum: i + 1, line, exp };
    })
    .filter((r): r is { lineNum: number; line: string; exp: string } => r !== null);

  if (rows.length === 0) return null;

  return (
    <div style={{ margin: "0 0 16px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "transparent", border: `1px solid ${T.border2}`,
          borderRadius: 6, color: T.muted2,
          fontFamily: "'Fira Code',monospace",
          fontSize: isMobile ? 10.5 : 11,
          padding: "4px 11px", cursor: "pointer", transition: "all .15s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.accent; el.style.color = T.accent; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border2; el.style.color = T.muted2; }}
      >
        <span style={{ display: "inline-block", width: 10, transition: "transform .2s", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        {open ? "hide explanation" : "explain this code"}
      </button>

      <div style={{
        maxHeight: open ? "3000px" : "0",
        overflow: "hidden",
        transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 10, overflow: "hidden", marginTop: 8,
        }}>
          {rows.map((row, idx) => {
            const isNote = row.exp.startsWith("*Note:") && row.exp.endsWith("*");
            const expText = isNote ? row.exp.slice(6, -1).trim() : row.exp;
            return (
              <div
                key={row.lineNum}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.bg2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                style={{
                  display: "flex", gap: 12,
                  padding: "8px 14px",
                  borderBottom: idx < rows.length - 1 ? `1px solid ${T.border}` : "none",
                  alignItems: "flex-start",
                  transition: "background .12s",
                  background: "transparent",
                }}
              >
                <span style={{
                  color: T.muted, width: 32, flexShrink: 0,
                  fontSize: 10, fontFamily: "'Fira Code',monospace",
                  textAlign: "right", paddingTop: 3, userSelect: "none",
                }}>{row.lineNum}</span>
                <code style={{
                  fontFamily: "'Fira Code',monospace", fontSize: isMobile ? 10 : 10.5,
                  color: T.muted2, flex: "0 0 38%",
                  whiteSpace: "pre", overflow: "hidden", textOverflow: "ellipsis",
                }}>{row.line}</code>
                <span style={{
                  fontSize: isMobile ? 11.5 : 12, lineHeight: 1.65, flex: 1,
                  color: isNote ? T.muted2 : T.text,
                  fontStyle: isNote ? "italic" : "normal",
                }}>{expText}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
