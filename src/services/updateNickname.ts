import { supabase } from "../supabase-client";

export async function updateNickname(newNickname: string) {
  const { error } = await supabase.auth.updateUser({
    data: { nickname: newNickname },
  });

  if (error) {
    throw new Error("Failed to update nickname: " + error.message);
  }

  return { success: true };
}
