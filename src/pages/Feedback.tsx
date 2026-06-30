import { useState, useEffect } from "react";
import { Heart, Send } from "lucide-react";
import { toast } from "sonner";
import { T } from "../utils/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { supabase, supabaseEnabled } from "../services/supabase";
import { useAuth } from "../contexts/AuthContext";

const MAX_CHARS = 280;
const RATE_LIMIT = 3;
const LS_HEARTS_KEY = "cif_hearts";

interface FeedbackItem {
  id?: string;
  message: string;
  name?: string;
  user_id?: string;
  created_at?: string;
}

function todayIso(): string { return new Date().toISOString().slice(0, 10); }
function getRateLimitCount(): number {
  try {
    const raw = localStorage.getItem("cif_fb_rate");
    if (!raw) return 0;
    const { date, count } = JSON.parse(raw);
    if (date !== todayIso()) return 0;
    return count;
  } catch { return 0; }
}
function incrementRateLimit() {
  try {
    const count = getRateLimitCount() + 1;
    localStorage.setItem("cif_fb_rate", JSON.stringify({ date: todayIso(), count }));
  } catch { /* ignore */ }
}
function getHearts(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(LS_HEARTS_KEY) ?? "{}"); } catch { return {}; }
}
function toggleHeart(id: string): boolean {
  const hearts = getHearts();
  hearts[id] = !hearts[id];
  try { localStorage.setItem(LS_HEARTS_KEY, JSON.stringify(hearts)); } catch { /* ignore */ }
  return hearts[id];
}
function timeAgo(iso?: string): string {
  if (!iso) return "just now";
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

async function saveFeedback(item: Omit<FeedbackItem, "id" | "created_at">): Promise<void> {
  if (supabaseEnabled) {
    try {
      const { error } = await supabase!.from("feedback").insert([{ ...item }]);
      if (error) throw error;
      return;
    } catch {}
  }
  const existing: FeedbackItem[] = JSON.parse(localStorage.getItem("cif_feedback_local") || "[]");
  existing.unshift({ ...item, id: crypto.randomUUID(), created_at: new Date().toISOString() });
  localStorage.setItem("cif_feedback_local", JSON.stringify(existing.slice(0, 30)));
}

async function loadFeedback(): Promise<FeedbackItem[]> {
  if (supabaseEnabled && supabase) {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(40);
      if (error) throw error;
      return data ?? [];
    } catch {}
  }
  return JSON.parse(localStorage.getItem("cif_feedback_local") || "[]");
}

export default function Feedback() {
  const isMobile = useWindowWidth() < 900;
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [name, setName] = useState<string>(() => {
    try { return localStorage.getItem("cif_display_name") ?? ""; } catch { return ""; }
  });
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [hearts, setHearts] = useState<Record<string, boolean>>(getHearts);

  useEffect(() => { loadFeedback().then(setItems); }, []);

  const submit = async () => {
    if (!message.trim()) return;
    if (getRateLimitCount() >= RATE_LIMIT) {
      toast.error("Daily limit reached — try again tomorrow.");
      return;
    }
    setBusy(true);
    const newItem = {
      message: message.trim(),
      name: name.trim() || "anon",
      user_id: user?.id,
    };
    try {
      await saveFeedback(newItem);
      incrementRateLimit();
      setMessage("");
      toast.success("Feedback posted — thanks! 🙌");
      const fresh = await loadFeedback();
      setItems(fresh);
    } catch {
      toast.error("Couldn't post feedback — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const charsLeft = MAX_CHARS - message.length;
  const charColor = charsLeft < 30 ? T.rose : charsLeft < 60 ? T.amber : T.muted2;

  return (
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 30, letterSpacing: "-1px",
        }}>Feedback</div>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 12, color: T.muted2, marginTop: 4,
        }}>// tell me what's working &amp; what isn't</div>
      </div>

      {/* Form card */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: "16px 18px", marginBottom: 22,
      }}>
        <div style={{ position: "relative" }}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value.slice(0, MAX_CHARS))}
            placeholder="What's on your mind?"
            rows={4}
            style={{
              width: "100%", resize: "none",
              background: T.bg2, color: T.text,
              border: `1px solid ${T.border}`, borderRadius: 10,
              padding: "12px 14px",
              fontSize: 13, lineHeight: 1.55,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              outline: "none", transition: "border-color .15s, box-shadow .15s",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = T.accent;
              e.currentTarget.style.boxShadow = `0 0 0 2px ${T.accent}33`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <div style={{
            position: "absolute", right: 12, bottom: 8,
            fontSize: 10.5, color: charColor,
            fontFamily: "'Fira Code',monospace",
          }}>{charsLeft}</div>
        </div>

        <div style={{
          marginTop: 10, display: "flex", gap: 10, alignItems: "center",
          flexWrap: "wrap",
        }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="your name (optional)"
            style={{
              flex: 1, minWidth: 140,
              background: T.bg2, color: T.text,
              border: `1px solid ${T.border}`, borderRadius: 10,
              padding: "9px 12px", fontSize: 12,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              outline: "none",
            }}
          />
          <button
            onClick={submit}
            disabled={busy || !message.trim()}
            style={{
              padding: "9px 18px",
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              border: "none", borderRadius: 999,
              color: "#fff", fontSize: 12.5, fontWeight: 700,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              cursor: busy || !message.trim() ? "default" : "pointer",
              opacity: busy || !message.trim() ? 0.6 : 1,
              transition: "filter .15s",
              display: "inline-flex", alignItems: "center", gap: 7,
            }}
            onMouseEnter={e => message.trim() && !busy && ((e.currentTarget as HTMLElement).style.filter = "brightness(1.1)")}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
          >
            <Send size={13} />
            Post
          </button>
        </div>
      </div>

      {/* Feed (masonry-ish via CSS columns) */}
      <div style={{
        columnCount: isMobile ? 1 : 2,
        columnGap: 12,
      }}>
        {items.map(item => {
          const id = item.id ?? item.message.slice(0, 16);
          const hearted = !!hearts[id];
          return (
            <div
              key={id}
              style={{
                breakInside: "avoid", marginBottom: 12,
                background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: "14px 16px",
                animation: "cifPop .25s ease",
              }}
            >
              <div style={{
                fontSize: 13, color: T.text, lineHeight: 1.55,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
              }}>{item.message}</div>
              <div style={{
                marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{
                  fontFamily: "'Fira Code',monospace",
                  fontSize: 10.5, color: T.muted,
                }}>{item.name ?? "anon"} · {timeAgo(item.created_at)}</div>
                <button
                  onClick={() => {
                    const next = toggleHeart(id);
                    setHearts(h => ({ ...h, [id]: next }));
                  }}
                  aria-label={hearted ? "Unheart" : "Heart"}
                  style={{
                    width: 26, height: 26,
                    background: "transparent", border: "none",
                    color: hearted ? T.rose : T.muted2,
                    cursor: "pointer", padding: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color .15s, transform .15s",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.15)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = ""}
                >
                  <Heart size={15} fill={hearted ? T.rose : "transparent"} />
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            color: T.muted,
            fontSize: 12.5,
            fontFamily: "'Fira Code', monospace",
          }}>
            // no feedback yet — be the first
          </div>
        )}
      </div>
    </div>
  );
}
