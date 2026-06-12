import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase, supabaseEnabled } from "../services/supabase";

export interface LessonProgress {
  completed: boolean;
  score: number | null;
}

export type ProgressMap = Record<string, LessonProgress>;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      if (!supabaseEnabled || !user) {
        if (!cancelled) {
          setProgress({});
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("user_progress")
        .select("course_id, lesson_id, completed, score")
        .eq("user_id", user.id);

      if (cancelled) return;

      if (error) {
        console.error("[progress] load error:", error.message);
        setProgress({});
      } else {
        const map: ProgressMap = {};
        for (const row of data ?? []) {
          const key = row.lesson_id as string;
          map[key] = { completed: row.completed, score: row.score };
        }
        setProgress(map);
      }
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [user]);

  const saveProgress = useCallback(
    async (trackKey: string, completed: boolean, score?: number) => {
      const mapping = LESSON_COURSE[trackKey];
      if (!mapping) return;

      setProgress(prev => ({
        ...prev,
        [trackKey]: { completed, score: score ?? null },
      }));

      if (!supabaseEnabled || !user) return;

      const { error } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id:   user.id,
            course_id: mapping.courseId,
            lesson_id: mapping.lessonId,
            completed,
            score:     score ?? null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,course_id,lesson_id" }
        );

      if (error) {
        console.error("[progress] save error:", error.message);
      }
    },
    [user]
  );

  return { progress, loading, saveProgress };
}
