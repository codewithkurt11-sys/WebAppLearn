-- ============================================================
-- Migration: add content columns to the feedback table
-- Run this once in your Supabase SQL Editor:
--   Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- 1. Add the new content columns (all idempotent — safe to re-run)
ALTER TABLE feedback
  ADD COLUMN IF NOT EXISTS rating     integer       CHECK (rating >= 1 AND rating <= 5),
  ADD COLUMN IF NOT EXISTS comment    text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz   NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz   NOT NULL DEFAULT now();

-- 2. Ensure the unique constraint the upsert relies on exists.
--    (user_id + track_id must be unique so each user has one entry per lesson.)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   pg_constraint
    WHERE  conname = 'feedback_user_id_track_id_key'
  ) THEN
    ALTER TABLE feedback
      ADD CONSTRAINT feedback_user_id_track_id_key UNIQUE (user_id, track_id);
  END IF;
END $$;

-- 3. Optional but recommended: an index for loading a user's full feedback list.
CREATE INDEX IF NOT EXISTS feedback_user_id_idx ON feedback (user_id);
