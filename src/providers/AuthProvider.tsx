import { supabase } from "../supabase-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentSession } from "../services/authService";
import { type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-session"],
    queryFn: fetchCurrentSession,
    staleTime: 1000 * 60 * 5,
  });

  const signUpWithEmail = async (
    nickname: string,
    email: string,
    password: string
  ) => {
    console.log(nickname);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
        },
      },
    });

    if (error) throw new Error(error.message);

    await queryClient.invalidateQueries({ queryKey: ["auth-session"] });

    return {
      message: "Registration successful, please check your email to confirm.",
    };
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    await queryClient.invalidateQueries({ queryKey: ["auth-session"] });
    return {
      user: data.user,
    };
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
    isLoading,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
