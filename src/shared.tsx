// ─── RE-EXPORTS (modular locations) ───────────────────────────────
export { useWindowWidth }               from "./hooks/useWindowWidth";
export { T, THEMES, THEME_ORDER, THEME_META } from "./utils/theme";
export { NAV, ALL_ITEMS }              from "./utils/nav";
export type { NavItem, NavGroup, AppCtxType } from "./types";
export { AppCtx, useApp, RunCtx }       from "./contexts/AppContext";
import { useProgressCtx }               from "./contexts/ProgressContext";
import { storage }                      from "./services/storage";

// ─── LOCAL IMPORTS ─────────────────────────────────────────────────
import type { ReactNode } from "react";
import { useState, useEffect, useContext } from "react";
import { T } from "./utils/theme";
import { RunCtx } from "./contexts/AppContext";
import { useWindowWidth } from "./hooks/useWindowWidth";

// Legacy aliases so original pages compile without changes
export const DARK_COLORS  = {} as Record<string, string>;
export const LIGHT_COLORS = {} as Record<string, string>;

// ─── LOCAL TYPE DEFINITIONS ────────────────────────────────────────
export interface Tab      { id: string; label: string; }
export interface Question { q: string; opts: string[]; ans: number; exp: string; }

// ─── SYNTAX HIGHLIGHTING ──────────────────────────────────────────
const SYNTAX: Record<string, Record<string, RegExp>> = {
  py: {
    keyword:  /\b(def|class|return|import|from|as|if|elif|else|for|while|in|not|and|or|True|False|None|try|except|finally|with|pass|break|continue|yield|lambda|raise|del|global|nonlocal|async|await)\b/g,
    decorator:/^(\s*@[\w.]+)/gm,
    builtin:  /\b(print|len|range|int|str|float|bool|list|dict|type|input|open|enumerate|zip|map|filter|sorted|min|max|sum|abs|round|isinstance|super|property|random|path)\b/g,
    string:   /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    number:   /\b(\d+\.?\d*)\b/g,
    comment:  /(#[^\n]*)/g,
  },
  js: {
    keyword:  /\b(const|let|var|function|return|if|else|for|while|of|in|new|class|extends|import|export|default|async|await|try|catch|finally|throw|typeof|instanceof|this|true|false|null|undefined)\b/g,
    builtin:  /\b(console|document|window|fetch|JSON|Promise|Array|Object|Math|Date|parseInt|parseFloat|setTimeout|setInterval|alert|confirm)\b/g,
    string:   /(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    number:   /\b(\d+\.?\d*)\b/g,
    comment:  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
  },
  sql: {
    keyword:  /\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DROP|INDEX|PRIMARY|KEY|NOT|NULL|AND|OR|AUTOINCREMENT|UNIQUE|IF|EXISTS|INTEGER|TEXT|REAL|BLOB)\b/gi,
    string:   /('(?:[^'\\]|\\.)*')/g,
    number:   /\b(\d+)\b/g,
    comment:  /(--[^\n]*)/g,
  },
  bash: {
    keyword:  /\b(pip|pip3|python|python3|apk|cd|ls|mkdir|cat|echo|export|source|sudo|npm|node)\b/g,
    string:   /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    number:   /\b(\d+)\b/g,
    comment:  /(#[^\n]*)/g,
  },
  html: {
    tag:    /(<\/?[\w-]+)/g,
    attr:   /(\s[\w-]+=)/g,
    string: /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    comment:/(<!--[\s\S]*?-->)/g,
  },
};

export const TOKEN_COLORS: Record<string, string> = {
  keyword:   "#ff79c6",
  decorator: "#bd93f9",
  builtin:   "#50fa7b",
  string:    "#f1fa8c",
  number:    "#ffb86c",
  comment:   "#6272a4",
  tag:       "#ff79c6",
  attr:      "#50fa7b",
};

interface Token { type: string; value: string; }
export function tokenize(code: string, lang = "py"): Token[] {
  const rules = SYNTAX[lang] || SYNTAX.py;
  const parts = Object.entries(rules).map(([name, rx]) => `(?<${name}>${rx.source})`);
  const combined = new RegExp(parts.join("|"), "gm");
  const result: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = combined.exec(code)) !== null) {
    if (match.index > last) result.push({ type: "plain", value: code.slice(last, match.index) });
    const type = Object.keys(match.groups!).find(k => match!.groups![k] !== undefined)!;
    result.push({ type, value: match[0] });
    last = match.index + match[0].length;
  }
  if (last < code.length) result.push({ type: "plain", value: code.slice(last) });
  return result;
}

// ─── PYODIDE SINGLETON ────────────────────────────────────────────
// Bumped from v0.25.0 → v0.27.1 for better stdlib coverage & performance
const PYODIDE_VERSION = "v0.27.1";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/${PYODIDE_VERSION}/full/`;

let _pyodide: Promise<any> | null = null;
let _pyodideLoading = false;
let _pyodideReady   = false;
const _pyodideListeners = new Set<() => void>();
function _notifyPyodide() { _pyodideListeners.forEach(fn => fn()); }

export async function getPyodide() {
  if (!_pyodide) {
    _pyodideLoading = true;
    _notifyPyodide();
    _pyodide = (async () => {
      try {
        if (!(window as any).loadPyodide) {
          await new Promise<void>((res, rej) => {
            const s = document.createElement("script");
            s.src = `${PYODIDE_CDN}pyodide.js`;
            s.onload = () => res();
            s.onerror = () => rej(new Error("Failed to load Pyodide script"));
            document.head.appendChild(s);
          });
        }
        const py = await (window as any).loadPyodide({ indexURL: PYODIDE_CDN });
        py.runPython("import sys, io\n_buf = io.StringIO()\nsys.stdout = _buf\nsys.stderr = _buf");
        _pyodideLoading = false;
        _pyodideReady   = true;
        _notifyPyodide();
        return py;
      } catch (err) {
        _pyodideLoading = false;
        _pyodide = null;
        _notifyPyodide();
        throw err;
      }
    })();
  }
  return _pyodide;
}

// ─── JS IFRAME RUNNER ─────────────────────────────────────────────
interface RunResult { output: string; elapsed: string; }
function runJSInIframe(code: string): Promise<RunResult> {
  return new Promise(resolve => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts");
    iframe.style.cssText = "position:fixed;width:0;height:0;border:none;opacity:0;pointer-events:none;top:-9999px";
    document.body.appendChild(iframe);
    const timer = setTimeout(() => {
      window.removeEventListener("message", handler);
      iframe.remove();
      resolve({ output: "⚠ Execution timed out after 10s", elapsed: "10000" });
    }, 10000);
    function handler(e: MessageEvent) {
      if (e.source !== iframe.contentWindow) return;
      const d = e.data as any;
      if (!d) return;
      if (d.type === "ready") {
        iframe.contentWindow!.postMessage({ type: "run", code: code.trim() }, "*");
      } else if (d.type === "result") {
        clearTimeout(timer);
        window.removeEventListener("message", handler);
        iframe.remove();
        resolve({ output: d.output, elapsed: d.elapsed });
      }
    }
    window.addEventListener("message", handler);
    iframe.srcdoc = `<!DOCTYPE html><html><body><script>
const _logs=[];
const _fmt=a=>{try{return typeof a==='object'?JSON.stringify(a,null,2):String(a);}catch(e){return String(a);}};
console.log=(...a)=>_logs.push({t:'log',v:a.map(_fmt).join(' ')});
console.error=(...a)=>_logs.push({t:'err',v:a.map(_fmt).join(' ')});
console.warn=(...a)=>_logs.push({t:'warn',v:a.map(_fmt).join(' ')});
window.alert=m=>_logs.push({t:'log',v:'[alert] '+String(m)});
window.addEventListener('message',function(e){
  if(!e.data||e.data.type!=='run')return;
  const _t=performance.now();
  try{(new Function(e.data.code))();}
  catch(err){_logs.push({t:'err',v:(err.name||'Error')+': '+err.message});}
  const elapsed=(performance.now()-_t).toFixed(1);
  const lines=_logs.map(l=>l.t==='err'?'❌ '+l.v:l.t==='warn'?'⚠ '+l.v:l.v);
  parent.postMessage({type:'result',output:lines.join('\\n'),elapsed},'*');
});
parent.postMessage({type:'ready'},'*');
<\/script></body></html>`;
  });
}

// ─── CODE BLOCK ───────────────────────────────────────────────────
function HighlightedLine({ line, lang }: { line: string; lang: string }) {
  const tokens = tokenize(line, lang);
  return <>{tokens.map((tok, i) => <span key={i} style={{ color: TOKEN_COLORS[tok.type] || T.text }}>{tok.value}</span>)}</>;
}

function detectRunnability(code: string, lang: string): "runnable" | "terminal" | "devtools" {
  if (lang === "js") {
    if (/document\.|window\.|querySelector|innerHTML|addEventListener|fetch\(/.test(code)) return "devtools";
  }
  if (lang === "py") {
    if (/from flask|import flask|import tkinter|from tkinter|import requests|from requests|import kivy|from kivy|app\.run\(|\.get\(url|\.post\(url/.test(code)) return "terminal";
  }
  return "runnable";
}

const COLLAPSE_THRESHOLD = 20;

export function CodeBlock({ code, lang = "py", title, showLines = false, runnable }: {
  code: string; lang?: string; title?: string; showLines?: boolean; runnable?: boolean;
}) {
  const isMobile   = useWindowWidth() < 900;
  const canRunPage = useContext(RunCtx);
  const [copied, setCopied]     = useState(false);
  const [output, setOutput]     = useState<string | null>(null);
  const [execTime, setExecTime] = useState<string | null>(null);
  const [running, setRunning]   = useState(false);
  const [pyReady, setPyReady]   = useState(_pyodideReady);

  const lines = code.trim().split("\n");
  const [collapsed, setCollapsed] = useState(() => lines.length > COLLAPSE_THRESHOLD);

  const autoRun = runnable === undefined
    ? detectRunnability(code, lang)
    : (runnable ? "runnable" : "terminal");
  const canRun = canRunPage && autoRun === "runnable" && (lang === "js" || lang === "py");
  const mutedHint = canRunPage && !canRun && (lang === "py" || lang === "js") && autoRun !== "runnable"
    ? (autoRun === "devtools" ? "// run in browser devtools" : "// run in your terminal")
    : null;

  useEffect(() => {
    if (lang !== "py" || !canRun) return;
    if (!_pyodide) getPyodide().catch(() => {});
    const update = () => setPyReady(_pyodideReady);
    _pyodideListeners.add(update);
    return () => { _pyodideListeners.delete(update); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    setExecTime(null);
    if (lang === "js") {
      const { output: out, elapsed } = await runJSInIframe(code);
      setOutput(out.trim() || "(no output — add console.log to see results)");
      setExecTime(elapsed);
    } else if (lang === "py") {
      if (!_pyodideReady) { setOutput("⏳ Loading Python runtime…"); setRunning(false); return; }
      const t0 = performance.now();
      const timer = setTimeout(() => { setOutput("⚠ Execution timed out after 10s"); setRunning(false); }, 10000);
      try {
        const py = await getPyodide();
        clearTimeout(timer);
        py.runPython("_buf.truncate(0); _buf.seek(0)");
        try {
          py.runPython(code.trim());
        } catch (e: any) {
          const msg = String(e.message || e);
          const short = msg.split("\n").filter((l: string) => !l.includes("File \"<exec>\"")).join("\n").trim();
          setOutput("❌ " + (short || msg));
          setExecTime((performance.now() - t0).toFixed(1));
          setRunning(false);
          return;
        }
        const out = (py.runPython("_buf.getvalue()") as string).trim();
        setOutput(out || "(no output — add print() to see results)");
        setExecTime((performance.now() - t0).toFixed(1));
      } catch (e: any) {
        clearTimeout(timer);
        setOutput("❌ Failed to load Python runtime: " + e.message);
      }
    }
    setRunning(false);
  };

  const clearOutput = () => { setOutput(null); setExecTime(null); };
  const LANG_LABELS: Record<string, string> = { py: "python", js: "javascript", sql: "sql", bash: "shell", html: "html" };
  const LANG_DOTS:   Record<string, string> = { py: "#7c6dfa", js: "#fbbf24", sql: "#38bdf8", bash: "#34d399", html: "#fb7185" };
  const dot = LANG_DOTS[lang] || T.muted2;

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }).catch(() => {
      // Clipboard API might not be available in some iframe sandboxes.
      // Silently ignore — the copy button just won't toggle.
    });
  };

  const pyLoading   = lang === "py" && canRun && !pyReady && _pyodideLoading;
  const runDisabled = running || pyLoading;
  const runBtnLabel = running ? "⏳ running…" : pyLoading ? "⏳ loading py…" : "▶ run";
  const displayLines = collapsed ? lines.slice(0, COLLAPSE_THRESHOLD) : lines;

  return (
    <div style={{ margin: "12px 0" }}>
    <div style={{ background: T.codeBg, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", fontSize: isMobile ? 11.5 : 12.5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", background: T.surface2, borderBottom: `1px solid ${T.border}` }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }}/>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }}/>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840", display: "inline-block" }}/>
        <span style={{ flex: 1, fontSize: 10, fontFamily: "'Fira Code',monospace", color: dot, letterSpacing: "1px", paddingLeft: 6 }}>{title || LANG_LABELS[lang] || lang}</span>
        {mutedHint && <span style={{ fontFamily: "'Fira Code',monospace", fontSize: 9.5, color: T.muted, letterSpacing: "0.5px", marginRight: 4 }}>{mutedHint}</span>}
        {canRun && (
          <button onClick={runCode} disabled={runDisabled} style={{
            background: running ? "rgba(251,191,36,.1)" : "rgba(52,211,153,.1)",
            border: `1px solid ${running ? T.amber : T.green}`,
            borderRadius: 5, color: running ? T.amber : T.green,
            fontFamily: "'Fira Code',monospace", fontSize: 10, padding: "3px 10px",
            transition: "all .2s", cursor: runDisabled ? "wait" : "pointer", marginRight: 2,
            opacity: pyLoading && !running ? 0.6 : 1,
          }}>{runBtnLabel}</button>
        )}
        {output !== null && (
          <button onClick={clearOutput} style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 5, color: T.muted2, fontFamily: "'Fira Code',monospace", fontSize: 10, padding: "3px 8px", cursor: "pointer", marginRight: 2 }}>
            ✕ clear
          </button>
        )}
        <button onClick={handleCopy} style={{ background: copied ? "rgba(52,211,153,.15)" : T.surface2, border: "none", borderRadius: 5, color: copied ? T.green : T.muted2, fontFamily: "'Fira Code',monospace", fontSize: 10, padding: "3px 10px", transition: "all .2s", cursor: "pointer" }}>
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <div style={{ padding: "16px 0", overflowX: "auto", fontFamily: "'Fira Code',monospace", lineHeight: 1.8, position: "relative" }}>
        {displayLines.map((line, i) => (
          <div key={i} style={{ display: "flex", minHeight: "1.8em" }}>
            {showLines && <span style={{ width: 36, flexShrink: 0, textAlign: "right", paddingRight: 16, color: T.muted, userSelect: "none", fontSize: 11 }}>{i + 1}</span>}
            <pre style={{ margin: 0, padding: "0 20px", whiteSpace: "pre", flex: 1, minWidth: 0 }}><HighlightedLine line={line} lang={lang}/></pre>
          </div>
        ))}
        {lines.length > COLLAPSE_THRESHOLD && (
          <div style={{ position: "relative" }}>
            {collapsed && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: `linear-gradient(transparent, ${T.codeBg})`, pointerEvents: "none" }}/>
            )}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: collapsed ? 8 : 4 }}>
              <button
                onClick={() => setCollapsed(c => !c)}
                style={{ background: T.surface, border: `1px solid ${T.border2}`, borderRadius: 6, color: T.muted2, fontFamily: "'Fira Code',monospace", fontSize: 10, padding: "4px 14px", cursor: "pointer", transition: "all .15s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.accent; el.style.color = T.accent; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border2; el.style.color = T.muted2; }}
              >
                {collapsed ? `▼ show all ${lines.length} lines` : "▲ collapse"}
              </button>
            </div>
          </div>
        )}
      </div>
      {output !== null && (
        <div style={{ borderTop: `1px solid ${T.border}`, background: T.bg, fontFamily: "'Fira Code',monospace", fontSize: 11.5, maxHeight: 240, overflowY: "auto", lineHeight: 1.75 }}>
          <div style={{ padding: "8px 16px 4px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: T.muted, fontSize: 10, userSelect: "none" }}>▶ output</span>
            {execTime && <span style={{ fontSize: 9, color: T.muted, fontFamily: "'Fira Code',monospace" }}>{execTime}ms</span>}
          </div>
          <div style={{ padding: "0 16px 12px" }}>
            {output.split("\n").map((line, i) => {
              const isErr  = line.startsWith("❌") || line.startsWith("⚠");
              const isWarn = line.startsWith("⚠");
              const lineColor = isErr && !isWarn ? T.rose : isWarn ? T.amber : T.green;
              return (
                <div key={i} style={{ display: "flex", gap: 8, color: lineColor }}>
                  <span style={{ color: T.muted, userSelect: "none", flexShrink: 0 }}>{">>>"}</span>
                  <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{line}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

// ─── INFO BOX ─────────────────────────────────────────────────────
const BOX_STYLES = {
  tip:  { bg: "rgba(52,211,153,.06)",  border: "rgba(52,211,153,.2)",  color: T.green,  icon: "✅" },
  warn: { bg: "rgba(251,191,36,.06)",  border: "rgba(251,191,36,.2)",  color: T.amber,  icon: "⚠️" },
  info: { bg: "rgba(124,109,250,.06)", border: "rgba(124,109,250,.2)", color: T.accent, icon: "💡" },
  note: { bg: "rgba(56,189,248,.06)",  border: "rgba(56,189,248,.2)",  color: T.sky,    icon: "📝" },
};
export function InfoBox({ type = "info", children }: { type?: keyof typeof BOX_STYLES; children: ReactNode }) {
  const s = BOX_STYLES[type];
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 9, padding: "10px 14px", fontSize: 12.5, color: s.color, lineHeight: 1.65, margin: "10px 0", display: "flex", gap: 8, alignItems: "flex-start" }}>
      <span style={{ flexShrink: 0 }}>{s.icon}</span><span>{children}</span>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────
export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const isMobile = useWindowWidth() < 900;
  return (
    <div className="wl-card" style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 13, padding: isMobile ? "14px 14px" : "18px 20px", marginBottom: 14, ...style }}>
      {children}
    </div>
  );
}
export function CardTitle({ children, color }: { children: ReactNode; color?: string }) {
  return <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 11, color: color || T.accent, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>{children}</div>;
}

// ─── INLINE CODE ──────────────────────────────────────────────────
export function IC({ children, color }: { children: ReactNode; color?: string }) {
  return <code style={{ fontFamily: "'Fira Code',monospace", fontSize: 11, background: "rgba(124,109,250,.12)", color: color || T.accent, padding: "1px 6px", borderRadius: 4 }}>{children}</code>;
}

// ─── DEFINITION BOX ───────────────────────────────────────────────
export function Def({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div style={{
      background: "rgba(124,109,250,.07)",
      borderLeft: `3px solid ${T.accent}`,
      borderRadius: "0 8px 8px 0",
      padding: "10px 16px",
      marginBottom: 14,
    }}>
      <span style={{ fontSize: 9.5, color: T.accent, fontFamily: "'Fira Code',monospace", letterSpacing: "1.5px", fontWeight: 700 }}>DEFINITION · </span>
      <strong style={{ fontSize: 12.5, color: T.text }}>{term}</strong>
      <span style={{ fontSize: 12.5, color: T.muted2 }}>{" — "}{children}</span>
    </div>
  );
}

// ─── TRY IT YOURSELF ──────────────────────────────────────────────
export function TryIt({ children }: { children: ReactNode }) {
  return (
    <div style={{
      background: "rgba(52,211,153,.04)",
      border: `1px solid rgba(52,211,153,.2)`,
      borderRadius: 10,
      padding: "12px 16px",
      marginTop: 14,
    }}>
      <div style={{
        fontSize: 9.5, color: T.green, fontFamily: "'Fira Code',monospace",
        letterSpacing: "1.5px", fontWeight: 700, marginBottom: 7,
      }}>✏  TRY IT YOURSELF</div>
      {children}
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────
export function Quiz({ questions, trackKey, trackId }: { questions: Question[]; trackKey?: string; trackId?: string }) {
  trackKey = trackKey ?? trackId;
  const [answers, setAnswers]   = useState<Record<number, number>>({});
  const [submitted, setSubmit]  = useState(false);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const { saveProgress } = useProgressCtx();

  // BUG FIX: previously `score` was computed from `submitted` which was
  // still `false` when handleSubmit ran, causing saveProgress to always
  // receive score=0.  Now we compute the score from answers directly.
  const computeScore = () =>
    questions.reduce((n, q, i) => n + (answers[i] === q.ans ? 1 : 0), 0);

  const score = submitted ? computeScore() : 0;

  const handleSubmit = async () => {
    // Compute score BEFORE setting submitted so we capture the correct value.
    const finalScore = computeScore();
    setSubmit(true);
    const pct = Math.round((finalScore / questions.length) * 100);
    if (trackKey) {
      setSaving(true);
      await saveProgress(trackKey, finalScore === questions.length, pct);
      setSaving(false);
      setSaved(true);
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 13, marginBottom: 16, color: T.accent }}>
        📝 Quiz — {questions.length} questions
      </div>
      {questions.map((q, qi) => (
        <div key={qi} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 11, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, lineHeight: 1.5 }}>
            <span style={{ color: T.muted, fontFamily: "'Fira Code',monospace", fontSize: 10, marginRight: 8 }}>Q{qi + 1}</span>
            {q.q}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {q.opts.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = submitted && oi === q.ans;
              const isWrong   = submitted && selected && oi !== q.ans;
              return (
                <button
                  key={oi}
                  disabled={submitted}
                  onClick={() => setAnswers(prev => ({ ...prev, [qi]: oi }))}
                  style={{
                    textAlign: "left", padding: "9px 13px",
                    border: `1px solid ${isCorrect ? T.green : isWrong ? T.rose : selected ? T.accent : T.border2}`,
                    borderRadius: 8,
                    background: isCorrect ? "rgba(52,211,153,.08)" : isWrong ? "rgba(251,113,133,.08)" : selected ? `${T.accent}12` : "transparent",
                    color: isCorrect ? T.green : isWrong ? T.rose : selected ? T.accent : T.muted2,
                    fontSize: 12.5, cursor: submitted ? "default" : "pointer",
                    transition: "all .15s",
                  }}
                >{opt}</button>
              );
            })}
          </div>
          {submitted && (
            <div style={{ marginTop: 10, fontSize: 11.5, color: T.muted2, background: T.bg2, borderRadius: 7, padding: "8px 12px" }}>
              💡 {q.exp}
            </div>
          )}
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          style={{
            padding: "10px 24px",
            background: allAnswered ? `linear-gradient(135deg,${T.accent},${T.rose})` : T.border,
            border: "none", borderRadius: 9, color: "#fff",
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 700, fontSize: 13,
            cursor: allAnswered ? "pointer" : "not-allowed",
            opacity: allAnswered ? 1 : 0.6,
            transition: "opacity .2s",
          }}
        >Submit answers</button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{
            padding: "10px 20px", borderRadius: 9,
            background: score === questions.length ? "rgba(52,211,153,.1)" : "rgba(251,191,36,.1)",
            border: `1px solid ${score === questions.length ? T.green : T.amber}`,
            color: score === questions.length ? T.green : T.amber,
            fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 14,
          }}>
            {score}/{questions.length} correct · {Math.round((score / questions.length) * 100)}%
          </div>
          {saving && <span style={{ fontSize: 11.5, color: T.muted, fontFamily: "'Fira Code',monospace" }}>saving…</span>}
          {saved  && <span style={{ fontSize: 11.5, color: T.green, fontFamily: "'Fira Code',monospace" }}>✓ saved</span>}
          <button
            onClick={() => { setAnswers({}); setSubmit(false); setSaved(false); }}
            style={{
              padding: "10px 18px", borderRadius: 9,
              background: "transparent",
              border: `1px solid ${T.border2}`,
              color: T.muted2,
              fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 12.5,
              cursor: "pointer", transition: "all .15s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = T.accent;
              el.style.color = T.accent;
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = T.border2;
              el.style.color = T.muted2;
            }}
          >↺ Retry Quiz</button>
        </div>
      )}
    </div>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────
export function Section({ title, children, color }: { title: string; children: ReactNode; color?: string }) {
  const isMobile = useWindowWidth() < 900;
  return (
    <div style={{ padding: isMobile ? "20px 14px" : "28px 24px", borderBottom: `1px solid ${T.border}` }}>
      <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: isMobile ? 17 : 20, letterSpacing: "-0.5px", marginBottom: 14, color: color || T.text }}>{title}</h2>
      {children}
    </div>
  );
}

// ─── TABS / TABBAR ────────────────────────────────────────────────
// Note: `Tabs` (no localStorage) was a dead duplicate of `TabBar` — removed.
export function TabBar({ tabs, active, onChange, pageId }: {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  pageId?: string;
}) {
  const handleChange = (id: string) => {
    onChange(id);
    if (pageId) {
      storage.setTab(pageId, id);
    }
  };
  return (
    <div style={{ display: "flex", gap: 2, padding: "12px 14px 0", borderBottom: `1px solid ${T.border}`, overflowX: "auto" }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleChange(tab.id)}
          style={{
            padding: "8px 14px", border: "none", background: "transparent",
            color: active === tab.id ? T.accent : T.muted2,
            borderBottom: active === tab.id ? `2px solid ${T.accent}` : "2px solid transparent",
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: active === tab.id ? 700 : 500,
            fontSize: 12.5, cursor: "pointer", transition: "all .15s",
            whiteSpace: "nowrap",
          }}
        >{tab.label}</button>
      ))}
    </div>
  );
}

// ─── PAGE HEADER ──────────────────────────────────────────────────
export function PageHeader({ icon, title, subtitle, sub, color, tag, eyebrow }: { icon?: string; title: string; subtitle?: string; sub?: string; color?: string; tag?: string; eyebrow?: string }) {
  subtitle = subtitle ?? sub;
  tag = tag ?? eyebrow;
  const isMobile = useWindowWidth() < 900;
  return (
    <div style={{ padding: isMobile ? "20px 14px 14px" : "36px 24px 20px" }}>
      {icon && <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 10 }}>{icon}</div>}
      {tag && <div style={{ fontSize: 9, color: color || T.accent, fontFamily: "'Fira Code',monospace", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>{tag}</div>}
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(1.3rem,6vw,1.7rem)" : "clamp(1.5rem,4vw,2.2rem)", lineHeight: 1.1, marginBottom: subtitle ? 8 : 0, letterSpacing: "-1px", color: color || T.text }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: T.muted2, lineHeight: 1.6 }}>{subtitle}</p>}
    </div>
  );
}
