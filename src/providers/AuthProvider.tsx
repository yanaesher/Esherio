import { supabase } from "../supabase-client";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../services/authService";
import { type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["auth-session"],
    queryFn: fetchCurrentUser,
    staleTime: 1000 * 60 * 5,
  });

  const signUpWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return {
      user: data.user,
      message: "Registration successful, please check your email to confirm.",
    };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return {
      user: data.user,
      session: data.session,
    };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  };
  const value = {
    user,
    signUpWithEmail,
    signInWithEmail,
    error,
    isLoading,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
