import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase-client";
import type { Post } from "../../types/shared";
import { useQueryClient } from "@tanstack/react-query";

interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(post.title);
  const [editedContent, setEditedContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsSaving(true);

    const { error } = await supabase
      .from("posts")
      .update({
        title: editedTitle,
        content: editedContent,
      })
      .eq("id", post.id);

    if (error) {
      console.error("Ошибка обновления поста:", error);
    } else {
      setIsEditing(false);
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);

    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (error) {
      console.error("Ошибка удаления поста:", error);
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
          <div className="flex gap-2">
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
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {post.title}
          </h2>
          <p className="text-gray-700 text-sm">{post.content}</p>
        </>
      )}
    </div>
  );
}
