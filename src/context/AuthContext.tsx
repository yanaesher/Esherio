import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContext {
  user: User | null | undefined;
  error: unknown;
  signUpWithEmail: (
    email: string,
    password: string
  ) => Promise<{ message: string }>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
