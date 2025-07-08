import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "./LoadingSpinner";
import { createPost } from "../services/createPost";

export function CreatePost() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!user) return;

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await createPost({
        author_id: user.id,
        title,
        content,
      });

      setTitle("");
      setContent("");
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl border-2 border-surface shadow-md space-y-4">
      <h2 className="text-xl font-bold">Create Post</h2>

      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2 rounded"
        rows={3}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-primary text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? <LoadingSpinner /> : "Publish"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">Post created 🎉</p>}
    </div>
  );
}
