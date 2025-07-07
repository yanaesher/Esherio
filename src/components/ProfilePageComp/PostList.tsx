import { usePosts } from "../../hooks/useFetchPosts";

import { LoadingSpinner } from "../LoadingSpinner";
import { Post } from "./Post";

interface PostListProps {
  userId: string;
}

export function PostList({ userId }: PostListProps) {
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
    return <p className="text-center">You don't have any posts yet</p>;
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
