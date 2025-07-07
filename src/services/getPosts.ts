import { supabase } from "../supabase-client";
import type { Post } from "../types/shared";

export const getPosts = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
