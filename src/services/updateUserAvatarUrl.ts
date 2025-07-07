import { supabase } from "../supabase-client";

export async function updateUserAvatarUrl(
  userId: string,
  url: string
): Promise<boolean> {
  const { error } = await supabase
    .from("profiles")
    .update({ avatar_url: url })
    .eq("id", userId);

  if (error) {
    return false;
  }

  return true;
}
