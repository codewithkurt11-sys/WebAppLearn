/**
 * AuthContext — centralised authentication state.
 *
 * Fixes applied:
 *  1. Loading state correctly waits for INITIAL session restore before
 *     resolving — prevents the flash of "home" page before auth resolves.
 *  2. onAuthStateChange fires setLoading(false) on the INITIAL_SESSION
 *     event so the first render no longer needs a separate getSession() call
 *     (Supabase v2 already fires INITIAL_SESSION on mount).
 *  3. signOut clears ALL in-app state atomically — the StorageService
 *     clearUserData() call was previously duplicated in App.tsx and
 *     Settings.tsx; it is now centralised here.
 *  4. Both signIn and signUp return typed error objects (never throws).
 *  5. AuthProvider is stable across re-renders — the context value is
 *     memoised so consumers don't re-render when an unrelated state changes.
 */

import {
  createContext, useContext, useEffect, useState, useMemo,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, supabaseEnabled } from "../services/supabase";
import { storage } from "../services/storage";

interface AuthCtxType {
  user:    User | null;
  session: Session | null;
  /** true while the initial session is being restored from the Supabase token */
  loading: boolean;
  signIn:  (email: string, password: string) => Promise<{ error: string | null }>;
  signUp:  (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  /**
   * Permanently deletes the current user's Supabase account via the
   * server-side `delete-account` Edge Function (service-role key stays on the
   * server), then signs out locally. Returns a typed error string on failure.
   */
  deleteAccount: () => Promise<{ error: string | null }>;
}

const AuthCtx = createContext<AuthCtxType | null>(null);

export function useAuth(): AuthCtxType {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,    setUser]    = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  // Start as true — we don't know the auth state yet.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseEnabled || !supabase) {
      // No Supabase configured — immediately mark auth as resolved (guest mode).
      setLoading(false);
      return;
    }

    const sb = supabase;

    // Subscribe FIRST (before getSession) to avoid a race where a token
    // refresh fires between getSession() and the listener attaching.
    const { data: { subscription } } = sb.auth.onAuthStateChange((event, s) => {
      setSession(s);
      setUser(s?.user ?? null);

      // INITIAL_SESSION fires once during mount with the restored session.
      // Only after this do we know the real auth state.
      if (event === "INITIAL_SESSION") {
        setLoading(false);
      }
    });

    // Belt-and-suspenders: if Supabase never fires INITIAL_SESSION (very old
    // versions), getSession() guarantees loading resolves.
    sb.auth.getSession().then(({ data: { session: s } }) => {
      // Only update if the listener hasn't already resolved loading.
      setSession(prev => (prev === null ? s : prev));
      setUser(prev => (prev === null ? (s?.user ?? null) : prev));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!supabaseEnabled || !supabase) return { error: "Authentication is not configured." };
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error?.message ?? null };
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : "An unexpected error occurred." };
    }
  };

  const signUp = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!supabaseEnabled || !supabase) return { error: "Authentication is not configured." };
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error: error?.message ?? null };
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : "An unexpected error occurred." };
    }
  };

  const signOut = async (): Promise<void> => {
    // Clear all user-specific localStorage data BEFORE signing out of Supabase
    // so the onAuthStateChange handler sees a clean slate.
    storage.clearUserData();
    if (supabaseEnabled && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.error("[AuthContext] signOut error:", e);
      }
    } else {
      // Offline / no Supabase — manually clear state.
      setUser(null);
      setSession(null);
    }
  };

  /**
   * deleteAccount — permanently removes the user's Supabase auth record.
   *
   * The actual deletion happens server-side in the `delete-account` Edge
   * Function (which alone holds the service-role key). We invoke it with the
   * user's session (the JWT is forwarded automatically), then sign out so the
   * local app state is cleared. This does NOT touch login/signup/session
   * restore logic — it only defines the Delete Account button behavior.
   *
   * NOTE (flagged for schema owner): cascade cleanup of `user_progress` /
   * `feedback` rows is intentionally NOT done here — it belongs to the schema
   * owner (see the Edge Function comment).
   */
  const deleteAccount = async (): Promise<{ error: string | null }> => {
    if (!supabaseEnabled || !supabase) {
      return { error: "Account deletion is not available (auth not configured)." };
    }
    try {
      const { data, error } = await supabase.functions.invoke<{
        success?: boolean;
        error?: string;
      }>("delete-account", { method: "POST" });

      if (error) {
        return { error: error.message || "Failed to delete account." };
      }
      if (!data?.success) {
        return { error: data?.error || "Failed to delete account." };
      }

      // Deletion succeeded server-side — clear local session/state.
      await signOut();
      return { error: null };
    } catch (e: unknown) {
      return { error: e instanceof Error ? e.message : "An unexpected error occurred." };
    }
  };

  // Memoize the context value so downstream consumers only re-render when
  // one of the actual auth values changes, not on every parent render.
  const value = useMemo<AuthCtxType>(
    () => ({ user, session, loading, signIn, signUp, signOut, deleteAccount }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, session, loading]
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
