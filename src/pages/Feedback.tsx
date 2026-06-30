/**
 * Feedback.tsx
 *
 * Fixes / improvements:
 *  1. Uses storage service — no raw localStorage.
 *  2. saveFeedback() no longer silently swallows Supabase errors.
 *     The error is re-thrown so the UI can show a toast.
 *  3. Feedback message is sanitised (trimmed, max 280 chars enforced server-
 *     side too).  Input injection is not possible because the message is
 *     rendered as text (not innerHTML), and Supabase handles SQL injection
 *     via parameterised queries.
 *  4. Rate-limit state is read/written through storage service.
 *  5. Hearts are stored through storage service.
 *  6. Name is no longer pre-populated from display_name by default — the user
 *     must explicitly choose to add their name (privacy improvement).
 *  7. Feedback load error is surfaced to the user (previously silent).
 *  8. Empty state is more helpful.
 */

import { useState, useEffect } from "react";
import { Heart, Send } from "lucide-react";
import { toast } from "sonner";
import { T } from "../utils/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { supabase, supabaseEnabled } from "../services/supabase";
import { useAuth } from "../contexts/AuthContext";
import { storage } from "../services/storage";

const MAX_CHARS  = 280;
const RATE_LIMIT = 3;

interface FeedbackItem {
  id?: string;
  message: string;
  name?: string;
  user_id?: string;
  created_at?: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function getRateLimitCount(): number {
  const data = storage.getFbRate();
  if (!data) return 0;
  if (data.date !== todayIso()) return 0;
  return data.count;
}

function incrementRateLimit(): void {
  const count = getRateLimitCount() + 1;
  storage.setFbRate({ date: todayIso(), count });
}

/** Save feedback — throws on error (caller handles). */
async function saveFeedback(
  item: Omit<FeedbackItem, "id" | "created_at">
): Promise<void> {
  if (supabaseEnabled && supabase) {
    const { error } = await supabase.from("feedback").insert([{ ...item }]);
    if (error) throw new Error(error.message);
    return;
  }
  // Offline fallback — store locally via storage service.
  const existing = storage.getFeedbackLocal() as FeedbackItem[];
  existing.unshift({
    ...item,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  });
  storage.setFeedbackLocal(existing.slice(0, 30));
}

async function loadFeedback(): Promise<FeedbackItem[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase
      .from("feedback")
      .select("id, message, name, created_at")
      .order("created_at", { ascending: false })
      .limit(40);
    if (error) throw new Error(error.message);
    return data ?? [];
  }
  return storage.getFeedbackLocal() as FeedbackItem[];
}

function timeAgo(iso?: string): string {
  if (!iso) return "just now";
  const diff = Date.now() - new Date(iso).getTime();
  const m    = Math.floor(diff / 60_000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h    = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Feedback() {
  const isMobile = useWindowWidth() < 900;
  const { user } = useAuth();

  const [message, setMessage] = useState("");
  const [name,    setName]    = useState("");     // intentionally blank — user's choice
  const [busy,    setBusy]    = useState(false);
  const [items,   setItems]   = useState<FeedbackItem[]>([]);
  const [hearts,  setHearts]  = useState<Record<string, boolean>>(() => storage.getFbHearts());
  const [loadErr, setLoadErr] = useState<string | null>(null);

  useEffect(() => {
    loadFeedback()
      .then(setItems)
      .catch(e => setLoadErr(e.message));
  }, []);

  const submit = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    if (getRateLimitCount() >= RATE_LIMIT) {
      toast.error("Daily limit reached — try again tomorrow.");
      return;
    }
    setBusy(true);
    try {
      await saveFeedback({
        message: trimmed.slice(0, MAX_CHARS),
        name:    name.trim() || "anon",
        user_id: user?.id,
      });
      incrementRateLimit();
      setMessage("");
      toast.success("Feedback posted — thanks! 🙌");
      const fresh = await loadFeedback();
      setItems(fresh);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      console.error("[Feedback] save error:", msg);
      toast.error("Couldn't post feedback — please try again.");
    } finally {
      setBusy(false);
    }
  };

  const toggleHeart = (id: string) => {
    const next = { ...hearts, [id]: !hearts[id] };
    setHearts(next);
    storage.setFbHearts(next);
  };

  const charsLeft  = MAX_CHARS - message.length;
  const charColor  = charsLeft < 30 ? T.rose : charsLeft < 60 ? T.amber : T.muted2;
  const overLimit  = charsLeft < 0;

  return (
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 30,
          letterSpacing: "-1px", margin: 0,
        }}>Feedback</h1>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 12, color: T.muted2, marginTop: 4,
        }}>// tell me what's working &amp; what isn't</div>
      </div>

      {/* Compose form */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: "16px 18px", marginBottom: 22,
      }}>
        <div style={{ position: "relative" }}>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value.slice(0, MAX_CHARS + 1))}
            placeholder="What's on your mind?"
            rows={4}
            maxLength={MAX_CHARS + 1}
            aria-label="Feedback message"
            aria-describedby="char-count"
            style={{
              width: "100%", resize: "none",
              background: T.bg2, color: T.text,
              border: `1px solid ${overLimit ? T.rose : T.border}`, borderRadius: 10,
              padding: "12px 14px",
              fontSize: 13, lineHeight: 1.55,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              outline: "none", transition: "border-color .15s, box-shadow .15s",
              boxSizing: "border-box",
            }}
            onFocus={e => {
              e.currentTarget.style.borderColor = T.accent;
              e.currentTarget.style.boxShadow   = `0 0 0 2px ${T.accent}33`;
            }}
            onBlur={e => {
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.boxShadow   = "none";
            }}
          />
          <div
            id="char-count"
            aria-live="polite"
            style={{
              position: "absolute", right: 12, bottom: 8,
              fontSize: 10.5, color: charColor,
              fontFamily: "'Fira Code',monospace",
            }}
          >{charsLeft}</div>
        </div>

        <div style={{
          marginTop: 10, display: "flex", gap: 10,
          alignItems: "center", flexWrap: "wrap",
        }}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="your name (optional)"
            aria-label="Your name (optional)"
            maxLength={40}
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
            disabled={busy || !message.trim() || overLimit}
            aria-label="Post feedback"
            style={{
              padding: "9px 18px",
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              border: "none", borderRadius: 999,
              color: "#fff", fontSize: 12.5, fontWeight: 700,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              cursor: busy || !message.trim() || overLimit ? "default" : "pointer",
              opacity: busy || !message.trim() || overLimit ? 0.6 : 1,
              transition: "filter .15s",
              display: "inline-flex", alignItems: "center", gap: 7,
            }}
            onMouseEnter={e => {
              if (message.trim() && !busy && !overLimit) {
                (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
              }
            }}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = ""}
          >
            <Send size={13} />
            Post
          </button>
        </div>
      </div>

      {/* Error state */}
      {loadErr && (
        <div style={{
          padding: "12px 16px", marginBottom: 16,
          background: `${T.rose}12`, border: `1px solid ${T.rose}33`,
          borderRadius: 10, fontSize: 12.5, color: T.rose,
        }}>
          Couldn't load feedback: {loadErr}
        </div>
      )}

      {/* Feed */}
      <div style={{ columnCount: isMobile ? 1 : 2, columnGap: 12 }}>
        {items.map(item => {
          const id      = item.id ?? item.message.slice(0, 16);
          const hearted = !!hearts[id];
          return (
            <div
              key={id}
              style={{
                breakInside: "avoid", marginBottom: 12,
                background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: "14px 16px",
              }}
            >
              {/* Message rendered as text — no XSS risk */}
              <p style={{
                fontSize: 13, color: T.text, lineHeight: 1.55,
                whiteSpace: "pre-wrap", wordBreak: "break-word",
                margin: 0,
              }}>{item.message}</p>
              <div style={{
                marginTop: 10, paddingTop: 8, borderTop: `1px solid ${T.border}`,
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{
                  fontFamily: "'Fira Code',monospace",
                  fontSize: 10.5, color: T.muted,
                }}>{item.name ?? "anon"} · {timeAgo(item.created_at)}</div>
                <button
                  onClick={() => toggleHeart(id)}
                  aria-label={hearted ? "Unheart this feedback" : "Heart this feedback"}
                  aria-pressed={hearted}
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
        {items.length === 0 && !loadErr && (
          <div style={{
            textAlign: "center", padding: "40px 20px",
            color: T.muted, fontSize: 12.5,
            fontFamily: "'Fira Code', monospace",
          }}>
            // no feedback yet — be the first
          </div>
        )}
      </div>
    </div>
  );
}
