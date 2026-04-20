"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { syncFromCloud, syncToCloud } from "@/lib/sync";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  syncProgress: () => Promise<void>;
  lastSyncTime: Date | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signInWithGitHub: async () => {},
  signOut: async () => {},
  syncProgress: async () => {},
  lastSyncTime: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);

  // Init session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Auto-sync on load if logged in
      if (session?.user) {
        syncFromCloud().then(() => setLastSyncTime(new Date()));
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (_event === "SIGNED_IN" && session?.user) {
        // Sync cloud data to local on sign in
        syncFromCloud().then(() => setLastSyncTime(new Date()));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGitHub = useCallback(async () => {
    const isProd = process.env.NODE_ENV === "production";
    const redirectTo = isProd
      ? "https://penz7.github.io/android-zero-to-hero/"
      : "http://localhost:3000";

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo,
        scopes: "read:user user:email",
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setLastSyncTime(null);
  }, []);

  const syncProgress = useCallback(async () => {
    if (!user) return;
    await syncToCloud();
    setLastSyncTime(new Date());
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signInWithGitHub,
        signOut,
        syncProgress,
        lastSyncTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
