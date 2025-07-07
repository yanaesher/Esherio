import { supabase } from "../supabase-client";

interface CreatePostProps {
  author_id: string;
  title: string;
  content: string;
}

export async function createPost({
  author_id,
  title,
  content,
}: CreatePostProps) {
  const { error } = await supabase.from("posts").insert({
    author_id,
    title,
    content,
  });

  if (error) throw new Error(error.message);
}
