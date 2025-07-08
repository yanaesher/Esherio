import { usePosts } from "../../hooks/useFetchPosts";
import { useAuth } from "../../hooks/useAuth";

import { LoadingSpinner } from "../LoadingSpinner";
import { Post } from "./Post";

interface PostListProps {
  userId: string;
}

export function PostList({ userId }: PostListProps) {
  const { user } = useAuth();
  const { data: posts, isLoading, isError, error } = usePosts(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  if (!posts?.length) {
    const message =
      user?.id === userId
        ? "You don't have any posts yet"
        : "The user doesn't have any posts yet";

    return <p className="text-center">{message}</p>;
  }

  return (
    <div className="max-w-3/6 mx-auto space-y-6 bg-gray-200 p-8 rounded-2xl flex-col gap-5">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
