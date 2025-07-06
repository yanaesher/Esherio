import { supabase } from "../supabase-client";

export const getAvatarUrl = (userId: string): string => {
  const { data } = supabase.storage
    .from("avatars")
    .getPublicUrl(`public/${userId}.jpg`);
  return data.publicUrl;
};
