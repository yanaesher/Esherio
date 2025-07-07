import { supabase } from "../supabase-client";

export function getAvatarPublicUrl(filePath: string): string {
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
}
