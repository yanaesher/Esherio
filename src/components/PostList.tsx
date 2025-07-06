import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import { LoadingSpinner } from "./LoadingSpinner";
import { Post } from "./Post";

export function PostList({ refresh }: { refresh?: boolean }) {
  const { user } = useAuth();
  const { data: posts, loading, error } = usePosts(user?.id, refresh);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;
  if (!posts?.length)
    return <p className="text-center">You don't have any posts yet</p>;

  return (
    <div className="max-w-md mx-auto space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
