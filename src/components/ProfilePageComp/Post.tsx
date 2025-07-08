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
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    if (error) {
      setError(`Failed to delete post. Please try again. ${error.message}`);
    }
    setIsDeleting(false);
  };

  return (
    <div className="relative w-full bg-white rounded-xl shadow-lg p-4">
      <div className="absolute top-2 right-2 flex items-center gap-2">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-blue-500 transition"
              aria-label="Edit post"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Delete post"
            >
              <Trash2 className="w-5 h-5" />
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
          <h2 className="text-xl sm:text-2xl text-center font-semibold text-primary mb-4 break-words w-full">
            {post.title}
          </h2>

          <p className="text-sm sm:text-base text-custom-black break-words w-full">
            {post.content}
          </p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
