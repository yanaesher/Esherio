import type { Post } from "../types/shared";

interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border mb-6 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>

      <p className="text-gray-700 text-sm">{post.content}</p>
    </div>
  );
}
