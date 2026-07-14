/**
 * useProgress — Supabase-backed lesson progress hook.
 *
 * Real user_progress schema (confirmed from Supabase dashboard):
 *   id uuid, user_id uuid, track_id text, lesson_id text,
 *   completed bool, completed_at timestamptz,
 *   created_at timestamptz, updated_at timestamptz, score integer
 *
 * NOTE: there is NO course_id column. What the code previously called
 * "courseId" maps to the real DB column "track_id".
 *
 * Unique constraint: (user_id, lesson_id)  ← required for upsert.
 * Run migrations/fix_schema.sql once in Supabase to add the constraint
 * and the score column before this code will persist correctly.
 */

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase, supabaseEnabled } from "../services/supabase";
import { storage } from "../services/storage";

export interface LessonProgress {
  completed: boolean;
  score: number | null;
}

export type ProgressMap = Record<string, LessonProgress>;

/**
 * Maps a lesson page ID → the real Supabase column values:
 *   trackId  → stored as track_id  (the language/framework group)
 *   lessonId → stored as lesson_id (the specific lesson, same as the page key)
 */
export const LESSON_COURSE: Record<string, { trackId: string; lessonId: string }> = {
  "py-basics":    { trackId: "python",     lessonId: "py-basics"    },
  "py-inter":     { trackId: "python",     lessonId: "py-inter"     },
  "py-adv":       { trackId: "python",     lessonId: "py-adv"       },
  "flask-basics": { trackId: "flask",      lessonId: "flask-basics" },
  "flask-inter":  { trackId: "flask",      lessonId: "flask-inter"  },
  "flask-expert": { trackId: "flask",      lessonId: "flask-expert" },
  "js-basics":    { trackId: "javascript", lessonId: "js-basics"    },
  "js-inter":     { trackId: "javascript", lessonId: "js-inter"     },
  "js-adv":       { trackId: "javascript", lessonId: "js-adv"       },
  "cpp-basics":   { trackId: "cpp",        lessonId: "cpp-basics"   },
  "cpp-inter":    { trackId: "cpp",        lessonId: "cpp-inter"    },
  "cpp-adv":      { trackId: "cpp",        lessonId: "cpp-adv"      },
  "cs-basics":    { trackId: "csharp",     lessonId: "cs-basics"    },
  "cs-inter":     { trackId: "csharp",     lessonId: "cs-inter"     },
  "cs-adv":       { trackId: "csharp",     lessonId: "cs-adv"       },
  "tkinter":      { trackId: "desktop",    lessonId: "tkinter"      },
  "kivy":         { trackId: "desktop",    lessonId: "kivy"         },
  "scraping":     { trackId: "python",     lessonId: "scraping"     },
  "sqlite":       { trackId: "python",     lessonId: "sqlite"       },
  "html-css":     { trackId: "web",        lessonId: "html-css"     },
};

export function useProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading,  setLoading]  = useState(true);

  // Load (or clear) progress whenever the user changes.
  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      // Guest mode or Supabase not configured — return empty map immediately.
      if (!supabaseEnabled || !user) {
        if (!cancelled) {
          setProgress({});
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase!
          .from("user_progress")
          .select("lesson_id, completed, score")
          .eq("user_id", user.id);

        if (cancelled) return;

        if (error) {
          console.error("[useProgress] load error:", error.message);
          setProgress({});
        } else {
          const map: ProgressMap = {};
          for (const row of data ?? []) {
            map[row.lesson_id as string] = {
              completed: row.completed as boolean,
              score:     row.score     as number | null,
            };
          }
          setProgress(map);
        }
      } catch (e) {
        if (!cancelled) {
          console.error("[useProgress] unexpected error:", e);
          setProgress({});
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [user?.id]); // Only re-run when the user ID changes, not the full user object.

  /**
   * Saves lesson progress optimistically to local state, then persists to
   * Supabase.  On Supabase failure the previous value is restored.
   *
   * DB columns written:
   *   user_id, track_id, lesson_id, completed, completed_at, score, updated_at
   * Conflict target: (user_id, lesson_id)
   */
  const saveProgress = useCallback(
    async (trackKey: string, completed: boolean, score?: number) => {
      const mapping = LESSON_COURSE[trackKey];
      if (!mapping) {
        console.warn("[useProgress] unknown trackKey:", trackKey);
        return;
      }

      // Optimistic update
      const newEntry: LessonProgress = { completed, score: score ?? null };
      const prevEntry = progress[trackKey];
      setProgress(prev => ({ ...prev, [trackKey]: newEntry }));

      if (!supabaseEnabled || !user) return;

      const now = new Date().toISOString();

      const { error } = await supabase!
        .from("user_progress")
        .upsert(
          {
            user_id:      user.id,
            track_id:     mapping.trackId,
            lesson_id:    mapping.lessonId,
            completed,
            completed_at: completed ? now : null,
            score:        score ?? null,
            updated_at:   now,
          },
          { onConflict: "user_id,lesson_id" },
        );

      if (error) {
        console.error("[useProgress] save error:", error.message);
        // Roll back the optimistic update.
        setProgress(prev => ({
          ...prev,
          ...(prevEntry !== undefined
            ? { [trackKey]: prevEntry }
            : (() => { const p = { ...prev }; delete p[trackKey]; return p; })()),
        }));
      }
    },
    [user, progress],
  );

  /**
   * Clears all progress for the current user:
   *  1. Deletes all user_progress rows from Supabase.
   *  2. Clears progress-related localStorage keys.
   *  3. Resets in-memory progress state.
   */
  const clearProgress = useCallback(async () => {
    if (supabaseEnabled && user) {
      const { error } = await supabase!
        .from("user_progress")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("[useProgress] clearProgress error:", error.message);
        throw new Error(error.message);
      }
    }

    storage.clearProgressData();
    setProgress({});
  }, [user]);

  return { progress, loading, saveProgress, clearProgress };
}
