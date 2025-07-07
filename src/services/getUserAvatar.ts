import { supabase } from "../supabase-client";

export async function fetchUserAvatarUrl(
  userId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error("Error loading avatar_url:" + error.message);
  }

  return data.avatar_url;
}
