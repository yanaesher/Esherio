import { supabase } from "../supabase-client";
import type { UserProfile } from "../types/shared";

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url")
    .eq("id", userId)
    .single();

  if (error) throw Error(`Failed to get profile: ${error.message}`);
  return data;
};
