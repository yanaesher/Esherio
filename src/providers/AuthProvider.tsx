import { supabase } from "../supabase-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentSession } from "../services/authService";
import { type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user, error } = useQuery({
    queryKey: ["auth-session"],
    queryFn: fetchCurrentSession,
    staleTime: 1000 * 60 * 5,
  });

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    return {
      message: "Registration successful, please check your email to confirm.",
    };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["auth-session"] });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["auth-session"] });
  };
  const value = {
    user,
    signUpWithEmail,
    signInWithEmail,
    error,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
