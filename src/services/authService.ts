import { supabase } from "../supabase-client";

export const fetchCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error("Unable to get user data. Please try again later.");
  }
  return data.session?.user ?? null;
};
