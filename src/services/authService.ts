import { supabase } from "../supabase-client";
import type { User } from "@supabase/supabase-js";

export const fetchCurrentSession = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error("Unable to get user data. Please try again later.");
  }
  return data.session?.user ?? null;
};
