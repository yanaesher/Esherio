import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase-client";
import type { Post } from "../../types/shared";
import { useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../services/updatePost";

interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await updatePost({
        id: post.id,
        title: editedTitle,
        content: editedContent,
      });
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (err) {
      setError(`Failed to save post. Please try again : ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);
    setError(null);

    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (error) {
      setError(`Failed to delete post. Please try again. ${error.message}`);
    } else {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    }

    setIsDeleting(false);
  };

  return (
    <div className="relative max-w-md w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden border mb-6 p-4">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-blue-500 transition"
              aria-label="Edit post"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Delete post"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <input
            className="w-full border px-3 py-1 rounded text-sm"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <textarea
            className="w-full border px-3 py-1 rounded text-sm"
            rows={3}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="flex gap-2 items-center">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(post.title);
                setEditedContent(post.content);
                setError(null);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-primary mb-2">
            {post.title}
          </h2>
          <p className="text- text-custom-black">{post.content}</p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
