import { supabase } from "../supabase-client";

interface UpdatePostParams {
  id: string;
  title: string;
  content: string;
}

export async function updatePost({ id, title, content }: UpdatePostParams) {
  const { error } = await supabase
    .from("posts")
    .update({ title, content })
    .eq("id", id);

  if (error) throw new Error(error.message);
}
