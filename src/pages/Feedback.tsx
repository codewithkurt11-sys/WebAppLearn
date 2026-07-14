/**
 * Feedback.tsx — per-lesson "liked" toggle page.
 *
 * Real feedback table schema (confirmed from Supabase dashboard):
 *   id uuid, user_id uuid, track_id text, lesson_id text,
 *   liked bool, created_at timestamptz
 *
 * This is a simple boolean per-lesson like toggle, NOT a star-rating or
 * comment system. The page shows every lesson track grouped by language
 * section. A logged-in user can tap the heart to mark a lesson liked.
 *
 * Persistence:
 *   • Supabase configured → upsert to feedback table, conflict on
 *     (user_id, lesson_id). Run migrations/fix_schema.sql first.
 *   • Supabase not configured → localStorage via storage.getFeedback()
 */

import { useState, useEffect, useCallback } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { T } from "../utils/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { supabase, supabaseEnabled } from "../services/supabase";
import { useAuth } from "../contexts/AuthContext";
import { useApp } from "../contexts/AppContext";
import { storage, type LocalFeedbackEntry } from "../services/storage";
import { NAV } from "../utils/nav";
import { LESSON_COURSE } from "../hooks/useProgress";

// ─── Derived lesson groups ─────────────────────────────────────────────────
// Build a section → lessons list from NAV, filtering to tracked lessons only.

interface LessonEntry { id: string; label: string; trackId: string; lessonId: string }
interface LessonGroup { section: string; lessons: LessonEntry[] }

const LESSON_GROUPS: LessonGroup[] = NAV
  .filter(g => g.section !== "")
  .map(g => ({
    section: g.section,
    lessons: g.items
      .filter(item => item.id in LESSON_COURSE)
      .map(item => ({
        id:       item.id,
        label:    item.label,
        trackId:  LESSON_COURSE[item.id].trackId,
        lessonId: LESSON_COURSE[item.id].lessonId,
      })),
  }))
  .filter(g => g.lessons.length > 0);

// ─── Supabase helpers ──────────────────────────────────────────────────────

/** Returns a Set of lesson_id values the user has liked. */
async function loadLikedLessons(userId: string): Promise<Set<string>> {
  if (supabaseEnabled && supabase) {
    const { data, error } = await supabase
      .from("feedback")
      .select("lesson_id, liked")
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
    const liked = new Set<string>();
    for (const row of data ?? []) {
      if (row.liked) liked.add(row.lesson_id as string);
    }
    return liked;
  }
  // localStorage fallback
  const entries = storage.getFeedback();
  const liked = new Set<string>();
  for (const e of entries) {
    if (e.liked) liked.add(e.lesson_id);
  }
  return liked;
}

async function toggleLike(
  userId: string,
  lesson: LessonEntry,
  liked: boolean,
): Promise<void> {
  if (supabaseEnabled && supabase) {
    const { error } = await supabase
      .from("feedback")
      .upsert(
        { user_id: userId, track_id: lesson.trackId, lesson_id: lesson.lessonId, liked },
        { onConflict: "user_id,lesson_id" },
      );
    if (error) throw new Error(error.message);
    return;
  }
  // localStorage fallback
  const entries: LocalFeedbackEntry[] = storage.getFeedback();
  const idx = entries.findIndex(e => e.lesson_id === lesson.lessonId);
  if (idx >= 0) entries[idx] = { lesson_id: lesson.lessonId, liked };
  else entries.push({ lesson_id: lesson.lessonId, liked });
  storage.setFeedback(entries);
}

// ─── Heart button ──────────────────────────────────────────────────────────

function HeartButton({
  liked,
  busy,
  onToggle,
  label,
}: {
  liked: boolean;
  busy:  boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={busy}
      aria-label={liked ? `Unlike ${label}` : `Like ${label}`}
      aria-pressed={liked}
      style={{
        background: "none", border: "none",
        padding: "6px 8px", borderRadius: 8,
        cursor: busy ? "default" : "pointer",
        display: "flex", alignItems: "center", gap: 5,
        opacity: busy ? 0.6 : 1,
        transition: "opacity .15s, background .15s",
        flexShrink: 0,
      }}
      onMouseEnter={e => { if (!busy) (e.currentTarget as HTMLElement).style.background = `${T.rose}18`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; }}
    >
      <Heart
        size={18}
        fill={liked ? T.rose : "transparent"}
        color={liked ? T.rose : T.muted2}
        style={{ transition: "fill .15s, color .15s" }}
      />
    </button>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default function Feedback() {
  const isMobile      = useWindowWidth() < 700;
  const { user }      = useAuth();
  const { setPage }   = useApp();

  // Set of lesson_id strings that the user has liked.
  const [liked,    setLiked]    = useState<Set<string>>(new Set());
  const [loading,  setLoading]  = useState(true);
  const [loadErr,  setLoadErr]  = useState<string | null>(null);
  // Track which lesson IDs have an in-flight toggle request.
  const [busyIds,  setBusyIds]  = useState<Set<string>>(new Set());

  // Load liked lessons on mount.
  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadLikedLessons(user.id)
      .then(set => { setLiked(set); setLoading(false); })
      .catch(e  => { setLoadErr(e.message); setLoading(false); });
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleToggle = useCallback(async (lesson: LessonEntry) => {
    if (!user || busyIds.has(lesson.lessonId)) return;
    const newLiked = !liked.has(lesson.lessonId);

    // Optimistic update
    setLiked(prev => {
      const next = new Set(prev);
      if (newLiked) next.add(lesson.lessonId);
      else          next.delete(lesson.lessonId);
      return next;
    });
    setBusyIds(prev => new Set(prev).add(lesson.lessonId));

    try {
      await toggleLike(user.id, lesson, newLiked);
    } catch (e: unknown) {
      // Roll back
      setLiked(prev => {
        const next = new Set(prev);
        if (newLiked) next.delete(lesson.lessonId);
        else          next.add(lesson.lessonId);
        return next;
      });
      const msg = e instanceof Error ? e.message : "Unknown error";
      console.error("[Feedback] toggle error:", msg);
      toast.error("Couldn't save — please try again.");
    } finally {
      setBusyIds(prev => { const next = new Set(prev); next.delete(lesson.lessonId); return next; });
    }
  }, [user, liked, busyIds]);

  const totalLiked = liked.size;

  // ── Auth guard ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 480, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Bricolage Grotesque',sans-serif",
          fontWeight: 800, fontSize: isMobile ? 24 : 30,
          letterSpacing: "-1px", margin: 0,
        }}>Feedback</h1>
        <div style={{
          fontFamily: "'Fira Code',monospace", fontSize: 12,
          color: T.muted2, marginTop: 4, marginBottom: 28,
        }}>// like the lessons you enjoyed</div>

        <div style={{
          background: T.surface, border: `1px solid ${T.border}`,
          borderRadius: 14, padding: "28px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>🔒</div>
          <div style={{
            fontFamily: "'Bricolage Grotesque',sans-serif",
            fontWeight: 700, fontSize: 15, marginBottom: 8,
          }}>Sign in to like lessons</div>
          <div style={{
            fontSize: 12.5, color: T.muted2, lineHeight: 1.6, marginBottom: 22,
          }}>
            Mark lessons you found helpful. Your likes are saved to your account
            and synced across devices.
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
    <div style={{ padding: isMobile ? "20px 14px" : "32px 28px", maxWidth: 720, margin: "0 auto" }}>

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
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <span>// like the lessons you enjoyed</span>
          {!loading && totalLiked > 0 && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              color: T.rose,
            }}>
              <Heart size={10} fill={T.rose} color={T.rose} />
              {totalLiked} liked
            </span>
          )}
        </div>
      </div>

      {loadErr && (
        <div style={{
          padding: "12px 16px", marginBottom: 20,
          background: `${T.rose}12`, border: `1px solid ${T.rose}33`,
          borderRadius: 10, fontSize: 12.5, color: T.rose,
        }}>
          Couldn't load your likes: {loadErr}
        </div>
      )}

      {/* Lesson groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {LESSON_GROUPS.map(group => (
          <div key={group.section}>
            {/* Section header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, marginBottom: 10,
            }}>
              <div style={{
                fontFamily: "'Bricolage Grotesque',sans-serif",
                fontWeight: 700, fontSize: 11,
                color: T.muted2, textTransform: "uppercase",
                letterSpacing: "2px", whiteSpace: "nowrap",
              }}>{group.section}</div>
              <div style={{
                flex: 1, height: 1,
                background: `linear-gradient(90deg, ${T.border}, transparent)`,
              }} />
            </div>

            {/* Lesson rows */}
            <div style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 12,
              overflow: "hidden",
            }}>
              {group.lessons.map((lesson, idx) => {
                const isLiked  = liked.has(lesson.lessonId);
                const isBusy   = busyIds.has(lesson.lessonId);
                const isLast   = idx === group.lessons.length - 1;

                return (
                  <div
                    key={lesson.id}
                    style={{
                      display: "flex", alignItems: "center",
                      justifyContent: "space-between",
                      padding: isMobile ? "11px 14px" : "12px 18px",
                      borderBottom: isLast ? "none" : `1px solid ${T.border}`,
                      transition: "background .12s",
                      gap: 12,
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.bg2; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}
                  >
                    {/* Lesson name */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: "'Bricolage Grotesque',sans-serif",
                        fontWeight: 600, fontSize: 13.5,
                        color: T.text, whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis",
                      }}>
                        {lesson.label}
                      </div>
                      {isLiked && (
                        <div style={{
                          fontFamily: "'Fira Code',monospace",
                          fontSize: 10, color: T.rose, marginTop: 2,
                        }}>liked</div>
                      )}
                    </div>

                    {/* Heart toggle */}
                    {loading ? (
                      <div style={{
                        width: 32, height: 32,
                        borderRadius: 8,
                        background: T.bg2,
                        animation: "shimmer 1.5s ease-in-out infinite",
                      }} />
                    ) : (
                      <HeartButton
                        liked={isLiked}
                        busy={isBusy}
                        onToggle={() => handleToggle(lesson)}
                        label={lesson.label}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      {!loading && (
        <div style={{
          marginTop: 28, textAlign: "center",
          fontFamily: "'Fira Code',monospace",
          fontSize: 11, color: T.muted,
        }}>
          // tap a heart to like or unlike a lesson
          {!supabaseEnabled && (
            <div style={{ marginTop: 4, color: T.amber }}>
              // offline mode — likes saved locally
            </div>
          )}
        </div>
      )}
    </div>
  );
}
