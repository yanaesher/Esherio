import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";

type Post = {
  id: string;
  title: string;
  content: string;
  created_at: string;
};

export function usePosts(userId?: string, refresh?: boolean) {
  const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("author_id", userId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchPosts();
  }, [userId, refresh]);

  return { data, loading, error };
}
