/**
 * Feedback.tsx — rebuilt to match the actual Supabase schema.
 *
 * Real table columns:
 *   id uuid, user_id uuid, track_id text,
 *   rating integer (1–5), comment text,
 *   created_at timestamptz, updated_at timestamptz
 *
 * Each logged-in user gets exactly one row per lesson track (upserted via
 * the UNIQUE(user_id, track_id) constraint added by add_feedback_columns.sql).
 * The page loads all of the current user's entries on mount and lets them
 * create or update any entry.
 *
 * When Supabase is not configured the data is stored in localStorage via the
 * StorageService, keeping the feature functional in offline / dev mode.
 */

import { useState, useEffect, useCallback } from "react";
import { Send, Star, Pencil } from "lucide-react";
import { toast } from "sonner";
import { T } from "../utils/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { supabase, supabaseEnabled } from "../services/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";
import { storage, type LocalFeedbackEntry } from "../services/storage";
import { NAV } from "../utils/nav";
import { LESSON_COURSE } from "../hooks/useProgress";

// ─── Derived track list ────────────────────────────────────────────────────
// Pull every nav item that has a LESSON_COURSE entry, preserving section
// grouping for a readable <select> picker.

interface TrackGroup { section: string; tracks: { id: string; label: string }[] }

const TRACK_GROUPS: TrackGroup[] = NAV
  .filter(g => g.section !== "")           // skip the always-visible utility rows
  .map(g => ({
    section: g.section,
    tracks: g.items
      .filter(item => item.id in LESSON_COURSE)
      .map(item => ({ id: item.id, label: item.label })),
  }))
  .filter(g => g.tracks.length > 0);

const ALL_TRACK_IDS = new Set(Object.keys(LESSON_COURSE));

function trackLabel(id: string): string {
  for (const g of TRACK_GROUPS) {
    const t = g.tracks.find(t => t.id === id);
    if (t) return t.label;
  }
  return id;
}

// ─── Supabase helpers ──────────────────────────────────────────────────────

async function loadUserFeedback(userId: string): Promise<LocalFeedbackEntry[]> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase
      .from("feedback")
      .select("track_id, rating, comment, updated_at")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    return (data ?? []).map(r => ({
      track_id:   r.track_id   as string,
      rating:     r.rating     as number,
      comment:    (r.comment   as string | null) ?? "",
      updated_at: r.updated_at as string,
    }));
  }
  return storage.getFeedback();
}

async function saveFeedbackEntry(
  userId: string,
  entry: LocalFeedbackEntry,
): Promise<void> {
  if (supabaseEnabled && supabase) {
    const { error } = await supabase
      .from("feedback")
      .upsert(
        {
          user_id:    userId,
          track_id:   entry.track_id,
          rating:     entry.rating,
          comment:    entry.comment,
          updated_at: entry.updated_at,
        },
        { onConflict: "user_id,track_id" },
      );
    if (error) throw new Error(error.message);
    return;
  }
  // ── localStorage fallback ────────────────────────────────────────────────
  const existing = storage.getFeedback();
  const idx = existing.findIndex(e => e.track_id === entry.track_id);
  if (idx >= 0) existing[idx] = entry;
  else existing.push(entry);
  storage.setFeedback(existing);
}

// ─── Star rating component ─────────────────────────────────────────────────

const STAR_LABELS = ["", "poor", "fair", "good", "great", "excellent"] as const;

function StarRating({
  value,
  onChange,
  readonly = false,
  size = 22,
}: {
  value: number;
  onChange?: (n: number) => void;
  readonly?: boolean;
  size?: number;
}) {
  const [hovered, setHovered] = useState(0);
  const display = readonly ? value : (hovered || value);

  return (
    <div
      style={{ display: "flex", gap: 3, alignItems: "center" }}
      onMouseLeave={() => !readonly && setHovered(0)}
    >
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(n)}
          onMouseEnter={() => !readonly && setHovered(n)}
          aria-label={`Rate ${n} out of 5`}
          style={{
            background: "none", border: "none",
            padding: "2px 1px", lineHeight: 1,
            cursor: readonly ? "default" : "pointer",
          }}
        >
          <Star
            size={size}
            fill={n <= display ? T.amber : "transparent"}
            color={n <= display ? T.amber : T.muted2}
            style={{ transition: "fill .1s, color .1s", display: "block" }}
          />
        </button>
      ))}
      {!readonly && value > 0 && (
        <span style={{
          fontSize: 11, color: T.muted2,
          fontFamily: "'Fira Code',monospace", marginLeft: 4,
        }}>
          {STAR_LABELS[value]}
        </span>
      )}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

const MAX_COMMENT = 500;

export default function Feedback() {
  const isMobile = useWindowWidth() < 900;
  const { user }    = useAuth();
  const { setPage } = useApp();

  const [entries,    setEntries]    = useState<LocalFeedbackEntry[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [loadErr,    setLoadErr]    = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState("");
  const [rating,     setRating]     = useState(0);
  const [comment,    setComment]    = useState("");
  const [busy,       setBusy]       = useState(false);

  // Load existing feedback for this user on mount.
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadUserFeedback(user.id)
      .then(data => { setEntries(data); setLoading(false); })
      .catch(e  => { setLoadErr(e.message); setLoading(false); });
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pre-populate the form whenever the selected track changes.
  useEffect(() => {
    if (!selectedId) { setRating(0); setComment(""); return; }
    const existing = entries.find(e => e.track_id === selectedId);
    setRating(existing?.rating ?? 0);
    setComment(existing?.comment ?? "");
  }, [selectedId, entries]);

  const handleSubmit = useCallback(async () => {
    if (!user || !selectedId || rating === 0) return;
    setBusy(true);
    const entry: LocalFeedbackEntry = {
      track_id:   selectedId,
      rating,
      comment:    comment.trim().slice(0, MAX_COMMENT),
      updated_at: new Date().toISOString(),
    };
    try {
      await saveFeedbackEntry(user.id, entry);
      setEntries(prev => {
        const idx = prev.findIndex(e => e.track_id === selectedId);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = entry;
          return next;
        }
        return [...prev, entry];
      });
      toast.success("Feedback saved — thanks!");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      console.error("[Feedback] save error:", msg);
      toast.error("Couldn't save feedback — please try again.");
    } finally {
      setBusy(false);
    }
  }, [user, selectedId, rating, comment]); // eslint-disable-line react-hooks/exhaustive-deps

  const existingForSelected = entries.find(e => e.track_id === selectedId);
  const charsLeft = MAX_COMMENT - comment.length;
  const canSubmit = !!selectedId && rating > 0 && !busy;

  // ── Auth guard ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 540, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 30,
          letterSpacing: "-1px", margin: 0,
        }}>Feedback</h1>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 12, color: T.muted2, marginTop: 4, marginBottom: 28,
        }}>// rate and review lessons</div>

        <div style={{
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 14, padding: "28px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🔒</div>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 700, fontSize: 15, marginBottom: 8,
          }}>Sign in to leave feedback</div>
          <div style={{
            fontSize: 12.5, color: T.muted2,
            lineHeight: 1.6, marginBottom: 22,
          }}>
            Rate lessons and leave comments for each track you've worked through.
            Your feedback is saved to your account and synced across devices.
          </div>
          <button
            onClick={() => setPage("home")}
            style={{
              padding: "9px 22px",
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              border: "none", borderRadius: 10,
              color: "#fff", fontWeight: 700, fontSize: 13,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              cursor: "pointer",
            }}
          >Sign in</button>
        </div>
      </div>
    );
  }

  // ── Main page ───────────────────────────────────────────────────────────
  return (
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 900, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 30,
          letterSpacing: "-1px", margin: 0,
        }}>Feedback</h1>
        <div style={{
          fontFamily: "'Fira Code',monospace",
          fontSize: 12, color: T.muted2, marginTop: 4,
        }}>// rate and review lessons</div>
      </div>

      {/* ── Submit / edit form ─────────────────────────────────────────── */}
      <div style={{
        background: T.surface, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: "18px 20px", marginBottom: 28,
      }}>
        {/* Section label */}
        <div style={{
          fontFamily: "'Fira Code',monospace", fontWeight: 600, fontSize: 10,
          color: T.muted2, textTransform: "uppercase", letterSpacing: "2px",
          marginBottom: 16, display: "flex", alignItems: "center", gap: 6,
        }}>
          <span aria-hidden style={{
            width: 6, height: 6, borderRadius: "50%",
            background: T.accent, boxShadow: `0 0 8px ${T.accent}`,
          }} />
          {existingForSelected ? "Update feedback" : "Submit feedback"}
        </div>

        {/* Track picker */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="track-select"
            style={{
              fontSize: 11, color: T.muted2, display: "block",
              marginBottom: 6, fontFamily: "'Fira Code',monospace",
            }}
          >
            lesson track
          </label>
          <select
            id="track-select"
            value={selectedId}
            onChange={e => setSelectedId(e.target.value)}
            aria-label="Select lesson track"
            style={{
              width: "100%", background: T.bg2, color: T.text,
              border: `1px solid ${T.border}`, borderRadius: 10,
              padding: "9px 12px", fontSize: 13,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              outline: "none", cursor: "pointer",
              appearance: "none", WebkitAppearance: "none",
            }}
            onFocus={e  => { e.currentTarget.style.borderColor = T.accent; }}
            onBlur={e   => { e.currentTarget.style.borderColor = T.border; }}
          >
            <option value="" disabled>— choose a track —</option>
            {TRACK_GROUPS.map(g => (
              <optgroup key={g.section} label={g.section}>
                {g.tracks.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                    {entries.find(e => e.track_id === t.id) ? " ✓" : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Star rating */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 11, color: T.muted2, marginBottom: 8,
            fontFamily: "'Fira Code',monospace",
          }}>rating</div>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Comment */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 11, color: T.muted2, marginBottom: 6,
            fontFamily: "'Fira Code',monospace",
          }}>
            comment <span style={{ color: T.muted }}>(optional, max {MAX_COMMENT})</span>
          </div>
          <div style={{ position: "relative" }}>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value.slice(0, MAX_COMMENT + 1))}
              placeholder="What did you find helpful? What could be clearer?"
              rows={3}
              aria-label="Feedback comment"
              style={{
                width: "100%", resize: "vertical",
                background: T.bg2, color: T.text,
                border: `1px solid ${T.border}`, borderRadius: 10,
                padding: "10px 12px 24px",
                fontSize: 12.5, lineHeight: 1.55,
                fontFamily: "'Bricolage Grotesque',sans-serif",
                outline: "none", boxSizing: "border-box",
                transition: "border-color .15s",
              }}
              onFocus={e => { e.currentTarget.style.borderColor = T.accent; }}
              onBlur={e  => { e.currentTarget.style.borderColor = T.border;  }}
            />
            <div style={{
              position: "absolute", right: 10, bottom: 8,
              fontSize: 10, fontFamily: "'Fira Code',monospace",
              color: charsLeft < 50 ? T.rose : T.muted,
              pointerEvents: "none",
            }}>{charsLeft}</div>
          </div>
        </div>

        {/* Submit button + hint */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            aria-label={existingForSelected ? "Update feedback" : "Submit feedback"}
            style={{
              padding: "9px 20px",
              background: `linear-gradient(135deg, ${T.accent}, ${T.rose})`,
              border: "none", borderRadius: 10,
              color: "#fff", fontSize: 13, fontWeight: 700,
              fontFamily: "'Bricolage Grotesque',sans-serif",
              cursor: canSubmit ? "pointer" : "default",
              opacity: canSubmit ? 1 : 0.5,
              transition: "filter .15s, opacity .15s",
              display: "inline-flex", alignItems: "center", gap: 7,
            }}
            onMouseEnter={e => { if (canSubmit) (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ""; }}
          >
            <Send size={13} />
            {busy ? "Saving…" : existingForSelected ? "Update" : "Submit"}
          </button>

          {selectedId && rating === 0 && (
            <span style={{ fontSize: 11.5, color: T.muted2, fontFamily: "'Fira Code',monospace" }}>
              // pick a star rating to enable submit
            </span>
          )}
        </div>
      </div>

      {/* ── Your submitted feedback ─────────────────────────────────────── */}
      <div>
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 14,
        }}>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700,
            fontSize: 11, color: T.muted2, textTransform: "uppercase",
            letterSpacing: "2px", whiteSpace: "nowrap",
          }}>Your feedback</div>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${T.border}, transparent)` }} />
          <div style={{ fontSize: 10, fontFamily: "'Fira Code',monospace", color: T.muted }}>
            // {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </div>
        </div>

        {loadErr && (
          <div style={{
            padding: "12px 16px", marginBottom: 14,
            background: `${T.rose}12`, border: `1px solid ${T.rose}33`,
            borderRadius: 10, fontSize: 12.5, color: T.rose,
          }}>
            Couldn't load feedback: {loadErr}
          </div>
        )}

        {loading ? (
          <div style={{
            padding: "24px", textAlign: "center",
            color: T.muted, fontFamily: "'Fira Code',monospace", fontSize: 12,
          }}>// loading…</div>
        ) : entries.length === 0 ? (
          <div style={{
            padding: "28px 20px", textAlign: "center",
            color: T.muted, fontFamily: "'Fira Code',monospace", fontSize: 12.5,
            background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12,
          }}>
            // no feedback yet — select a track above to get started
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 12,
          }}>
            {entries
              .filter(e => ALL_TRACK_IDS.has(e.track_id))
              .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
              .map(e => {
                const isEditing = selectedId === e.track_id;
                return (
                  <div
                    key={e.track_id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Edit feedback for ${trackLabel(e.track_id)}`}
                    onClick={() => setSelectedId(e.track_id)}
                    onKeyDown={ev => {
                      if (ev.key === "Enter" || ev.key === " ") setSelectedId(e.track_id);
                    }}
                    style={{
                      background: T.surface,
                      border: `1px solid ${isEditing ? T.accent : T.border}`,
                      borderRadius: 12, padding: "14px 16px",
                      cursor: "pointer", transition: "border-color .15s",
                      outline: "none",
                    }}
                    onMouseEnter={ev => {
                      if (!isEditing) (ev.currentTarget as HTMLElement).style.borderColor = T.accent;
                    }}
                    onMouseLeave={ev => {
                      if (!isEditing) (ev.currentTarget as HTMLElement).style.borderColor = T.border;
                    }}
                  >
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", gap: 8, marginBottom: 8,
                    }}>
                      <div style={{
                        fontFamily: "'Bricolage Grotesque',sans-serif",
                        fontWeight: 700, fontSize: 13.5, color: T.text,
                        minWidth: 0, flex: 1,
                      }}>{trackLabel(e.track_id)}</div>
                      <StarRating value={e.rating} readonly size={14} />
                    </div>

                    {e.comment ? (
                      <p style={{
                        fontSize: 12.5, color: T.muted2,
                        margin: "0 0 10px", lineHeight: 1.55,
                        whiteSpace: "pre-wrap", wordBreak: "break-word",
                      }}>{e.comment}</p>
                    ) : (
                      <p style={{
                        fontSize: 11.5, color: T.muted,
                        margin: "0 0 10px",
                        fontFamily: "'Fira Code',monospace",
                      }}>// no comment</p>
                    )}

                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "'Fira Code',monospace",
                      fontSize: 10, color: T.muted,
                      borderTop: `1px solid ${T.border}`, paddingTop: 8,
                    }}>
                      <span>// {new Date(e.updated_at).toLocaleDateString()}</span>
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        color: T.accent, fontSize: 9,
                      }}>
                        <Pencil size={10} />edit
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
