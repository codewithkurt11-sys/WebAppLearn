/**
 * useProgress — Supabase-backed lesson progress hook.
 *
 * Fixes / improvements:
 *  1. Uses storage service instead of raw localStorage calls.
 *  2. Optimistic update in saveProgress is rolled back on Supabase error
 *     so the UI doesn't permanently show incorrect state.
 *  3. clearProgress now uses storage.clearProgressData() from the service.
 *  4. Loads progress from Supabase ONLY when a user is logged in — guests
 *     get an empty map immediately (no loading spinner).
 *  5. Cancels the in-flight Supabase query when the user changes to avoid
 *     stale data from a previous user appearing for the new user.
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

/** Maps a lesson page ID → the Supabase (courseId, lessonId) tuple. */
export const LESSON_COURSE: Record<string, { courseId: string; lessonId: string }> = {
  "py-basics":    { courseId: "python",     lessonId: "py-basics"    },
  "py-inter":     { courseId: "python",     lessonId: "py-inter"     },
  "py-adv":       { courseId: "python",     lessonId: "py-adv"       },
  "flask-basics": { courseId: "flask",      lessonId: "flask-basics" },
  "flask-inter":  { courseId: "flask",      lessonId: "flask-inter"  },
  "flask-expert": { courseId: "flask",      lessonId: "flask-expert" },
  "js-basics":    { courseId: "javascript", lessonId: "js-basics"    },
  "js-inter":     { courseId: "javascript", lessonId: "js-inter"     },
  "js-adv":       { courseId: "javascript", lessonId: "js-adv"       },
  "cpp-basics":   { courseId: "cpp",        lessonId: "cpp-basics"   },
  "cpp-inter":    { courseId: "cpp",        lessonId: "cpp-inter"    },
  "cpp-adv":      { courseId: "cpp",        lessonId: "cpp-adv"      },
  "cs-basics":    { courseId: "csharp",     lessonId: "cs-basics"    },
  "cs-inter":     { courseId: "csharp",     lessonId: "cs-inter"     },
  "cs-adv":       { courseId: "csharp",     lessonId: "cs-adv"       },
  "tkinter":      { courseId: "desktop",    lessonId: "tkinter"      },
  "kivy":         { courseId: "desktop",    lessonId: "kivy"         },
  "scraping":     { courseId: "python",     lessonId: "scraping"     },
  "sqlite":       { courseId: "python",     lessonId: "sqlite"       },
  "html-css":     { courseId: "web",        lessonId: "html-css"     },
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
              score:     row.score as number | null,
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
   * Saves lesson progress optimistically to local state and then persists
   * to Supabase.  If Supabase fails the previous value is restored.
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

      const { error } = await supabase!
        .from("user_progress")
        .upsert(
          {
            user_id:    user.id,
            course_id:  mapping.courseId,
            lesson_id:  mapping.lessonId,
            completed,
            score:      score ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,course_id,lesson_id" }
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
    [user, progress] // progress included so rollback captures correct prev value
  );

  /**
   * Clears all progress for the current user:
   *  1. Deletes all rows from Supabase user_progress.
   *  2. Clears progress-related localStorage keys (not preferences).
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
        // Don't silently swallow — let caller handle.
        throw new Error(error.message);
      }
    }

    storage.clearProgressData();
    setProgress({});
  }, [user]);

  return { progress, loading, saveProgress, clearProgress };
}
