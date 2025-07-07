import { supabase } from "../supabase-client";

export async function uploadAvatarToStorage(filePath: string, file: File) {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    return false;
  }

  return true;
}
