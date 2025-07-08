import { supabase } from "../supabase-client";

export async function getAllProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, nickname, avatar_url");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
