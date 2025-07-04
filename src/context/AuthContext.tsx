import type { User, Session } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContext {
  user: User | null | undefined;
  isLoading: boolean;
  error: unknown;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ user: User | null }>;
  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
