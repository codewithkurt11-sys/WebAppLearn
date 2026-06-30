import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseEnabled = !!(url && key);

/**
 * Bug fix: previously cast as `SupabaseClient` (non-null) even when env vars
 * are missing — meaning any future code that forgets the `supabaseEnabled`
 * guard would throw at runtime with no TypeScript warning.
 *
 * Now typed as `SupabaseClient | null`, so TypeScript enforces the guard.
 * All existing call-sites already use `supabaseEnabled` checks, so no
 * changes are needed there.
 */
export const supabase: SupabaseClient | null = supabaseEnabled
  ? createClient(url as string, key as string)
  : null;
