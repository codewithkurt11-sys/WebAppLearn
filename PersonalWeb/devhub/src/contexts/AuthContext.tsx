import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase, supabaseEnabled } from "../services/supabase";

interface AuthCtxType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthCtx = createContext<AuthCtxType | null>(null);
export const useAuth = () => useContext(AuthCtx)!;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabaseEnabled) { setLoading(false); return; }
    (supabase.auth.getSession() as Promise<{ data: { session: Session | null } }>).then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: AuthChangeEvent, s: Session | null) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!supabaseEnabled) return { error: "Auth not configured." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signUp = async (email: string, password: string) => {
    if (!supabaseEnabled) return { error: "Auth not configured." };
    const { error } = await supabase.auth.signUp({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    if (!supabaseEnabled) return;
    await supabase.auth.signOut();
  };

  return (
    <AuthCtx.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}
