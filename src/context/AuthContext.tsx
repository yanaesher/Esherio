import type { User } from "@supabase/supabase-js";
import { createContext } from "react";

interface AuthContext {
  user: User | null | undefined;
  isLoading: boolean;
  signUpWithEmail: (
    username: string,
    email: string,
    password: string
  ) => Promise<{ message: string }>;

  signInWithEmail: (
    email: string,
    password: string
  ) => Promise<{
    user: User;
  }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
