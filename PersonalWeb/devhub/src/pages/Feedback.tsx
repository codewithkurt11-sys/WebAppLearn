import { useState, useEffect } from "react";
import { T, useWindowWidth, PageHeader } from "../shared";
import { supabase } from "../services/supabase";

interface FeedbackItem {
  id?: string;
  message: string;
  name?: string;
  created_at?: string;
}

// Try to post to Supabase; fallback to localStorage board
async function saveFeedback(item: Omit<FeedbackItem, "id" | "created_at">): Promise<void> {
  try {
    const { error } = await supabase.from("feedback").insert([{ ...item }]);
    if (error) throw error;
  } catch {
    // fallback: save locally
    const existing: FeedbackItem[] = JSON.parse(localStorage.getItem("pt_feedback_local") || "[]");
    existing.unshift({ ...item, id: crypto.randomUUID(), created_at: new Date().toISOString() });
    localStorage.setItem("pt_feedback_local", JSON.stringify(existing.slice(0, 30)));
  }
}

async function loadFeedback(): Promise<FeedbackItem[]> {
  try {
    const { data, error } = await supabase
      .from("feedback")
      .select("id, message, name, created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error || !data) throw error;
    return data;
  } catch {
    // fallback to local
    return JSON.parse(localStorage.getItem("pt_feedback_local") || "[]");
  }
}

function timeAgo(iso?: string): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export default function Feedback() {
  const isMobile = useWindowWidth() < 900;
  const [name, setName]       = useState("");
  const [msg, setMsg]         = useState("");
  const [sent, setSent]       = useState(false);
  const [busy, setBusy]       = useState(false);
  const [board, setBoard]     = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback().then(data => { setBoard(data); setLoading(false); });
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setBusy(true);
    const item = { message: msg.trim(), name: name.trim() || undefined };
    await saveFeedback(item);
    setBoard(prev => [{ ...item, id: "new", created_at: new Date().toISOString() }, ...prev]);
    setSent(true);
    setBusy(false);
  };

  const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
    width: "100%", boxSizing: "border-box",
    background: T.surface, border: `1px solid ${T.border2}`,
    borderRadius: 9, padding: "10px 14px", color: T.text,
    fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13,
    outline: "none", ...extra,
  });

  return (
    <div>
      <PageHeader eyebrow="codewithkurt" title="Feedback" sub="Share what's working, what's broken, or what you'd like added." color={T.rose}/>

      <div style={{ padding: isMobile ? "0 16px 40px" : "0 24px 40px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24, alignItems: "start" }}>

        {/* ── Submit form ──────────────────────────────────────── */}
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Fira Code',monospace", color: T.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14 }}>Leave Feedback</div>

          {sent ? (
            <div style={{ background: `rgba(52,211,153,.06)`, border: `1px solid rgba(52,211,153,.2)`, borderRadius: 12, padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✓</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Thanks!</div>
              <div style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.6, marginBottom: 16 }}>Your feedback has been added to the board.</div>
              <button onClick={() => { setSent(false); setMsg(""); setName(""); }} style={{ background: T.accent, color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8, fontWeight: 700, fontSize: 12.5, cursor: "pointer" }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input
                type="text" placeholder="Your name (optional)" value={name}
                onChange={e => setName(e.target.value)}
                style={inp()}
                onFocus={e => (e.target.style.borderColor = T.accent)}
                onBlur={e  => (e.target.style.borderColor = T.border2)}
              />
              <textarea
                required value={msg}
                onChange={e => setMsg(e.target.value)}
                placeholder="What do you think? Any bugs, suggestions, or ideas..."
                rows={5}
                style={inp({ resize: "vertical", lineHeight: 1.7 })}
                onFocus={e => (e.target.style.borderColor = T.accent)}
                onBlur={e  => (e.target.style.borderColor = T.border2)}
              />
              <button
                type="submit" disabled={busy || !msg.trim()}
                style={{
                  background: busy || !msg.trim() ? T.border2 : T.accent,
                  color: "#fff", border: "none", padding: "11px 0", borderRadius: 9,
                  fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 13,
                  cursor: busy || !msg.trim() ? "not-allowed" : "pointer",
                  opacity: busy || !msg.trim() ? 0.6 : 1, transition: "all .2s",
                }}
              >
                {busy ? "Sending…" : "Post Feedback →"}
              </button>
              <div style={{ fontSize: 10.5, color: T.muted, fontFamily: "'Fira Code',monospace" }}>
                // Feedback is public and visible to everyone on the board.
              </div>
            </form>
          )}
        </div>

        {/* ── Board ────────────────────────────────────────────── */}
        <div>
          <div style={{ fontSize: 11, fontFamily: "'Fira Code',monospace", color: T.muted, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span>Feedback Board</span>
            <span style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: "1px 6px", fontSize: 10, color: T.muted2 }}>{board.length}</span>
          </div>

          {loading ? (
            <div style={{ color: T.muted, fontSize: 12, fontFamily: "'Fira Code',monospace" }}>// loading…</div>
          ) : board.length === 0 ? (
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px", textAlign: "center", color: T.muted2 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>✎</div>
              <div style={{ fontSize: 12.5 }}>No feedback yet — be the first!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: isMobile ? "none" : 480, overflowY: "auto" }}>
              {board.map((item, i) => (
                <div key={item.id || i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 11, padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},${T.rose})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                      {(item.name || "?").slice(0, 1).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{item.name || "Anonymous"}</div>
                    </div>
                    <div style={{ fontSize: 10, color: T.muted, fontFamily: "'Fira Code',monospace", flexShrink: 0 }}>{timeAgo(item.created_at)}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.65 }}>{item.message}</div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
