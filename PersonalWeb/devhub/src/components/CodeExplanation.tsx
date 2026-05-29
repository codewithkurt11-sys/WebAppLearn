import { useState, useContext } from "react";
import { T, RunCtx, useWindowWidth } from "../shared";

interface ExplainStep {
  lines: string;
  text: string;
}

interface CodeExplanationProps {
  steps: ExplainStep[];
  code?: string;
}

export function CodeExplanation({ steps }: CodeExplanationProps) {
  const isMobile   = useWindowWidth() < 900;
  const [open, setOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ margin:"0 0 16px" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 0",
          color: T.muted2,
          fontFamily: "'Fira Code',monospace",
          fontSize: isMobile ? 11 : 11.5,
          transition: "color .15s",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = T.accent; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = T.muted2; }}
      >
        <span style={{
          display: "inline-block",
          width: 12,
          transition: "transform .2s",
          transform: open ? "rotate(90deg)" : "rotate(0deg)",
        }}>▶</span>
        {open ? "hide explanation" : "explain this code"}
      </button>

      {open && (
        <div style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: 10,
          overflow: "hidden",
          marginTop: 8,
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "10px 16px",
                borderBottom: i < steps.length - 1 ? `1px solid ${T.border}` : "none",
                alignItems: "flex-start",
              }}
            >
              <code style={{
                fontFamily: "'Fira Code',monospace",
                fontSize: 10.5,
                color: T.accent,
                background: "rgba(124,109,250,.1)",
                padding: "2px 8px",
                borderRadius: 4,
                whiteSpace: "nowrap",
                flexShrink: 0,
                marginTop: 1,
              }}>
                {step.lines}
              </code>
              <span style={{
                fontSize: isMobile ? 12 : 12.5,
                color: T.muted2,
                lineHeight: 1.65,
              }}>
                {step.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
