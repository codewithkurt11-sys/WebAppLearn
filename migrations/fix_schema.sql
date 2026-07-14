-- ============================================================
-- Migration: fix user_progress + feedback tables
-- Run once in Supabase SQL Editor:
--   Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ── user_progress ─────────────────────────────────────────────────────────
-- Add score column (nullable integer, 0-100)
ALTER TABLE user_progress
  ADD COLUMN IF NOT EXISTS score integer CHECK (score >= 0 AND score <= 100);

-- Add the unique constraint the upsert onConflict clause relies on.
-- lesson_id values are globally unique in this app (py-basics, py-inter, etc.)
-- so (user_id, lesson_id) is the natural unique key.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE  conname = 'user_progress_user_id_lesson_id_key'
  ) THEN
    ALTER TABLE user_progress
      ADD CONSTRAINT user_progress_user_id_lesson_id_key UNIQUE (user_id, lesson_id);
  END IF;
END $$;

-- Fast per-user loads
CREATE INDEX IF NOT EXISTS user_progress_user_id_idx ON user_progress (user_id);


-- ── feedback ──────────────────────────────────────────────────────────────
-- Add the unique constraint the upsert onConflict clause relies on.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE  conname = 'feedback_user_id_lesson_id_key'
  ) THEN
    ALTER TABLE feedback
      ADD CONSTRAINT feedback_user_id_lesson_id_key UNIQUE (user_id, lesson_id);
  END IF;
END $$;

-- Fast per-user loads
CREATE INDEX IF NOT EXISTS feedback_user_id_idx ON feedback (user_id);
