import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import { EditableUserName } from "../components/EditableUserName";
import { updateNickname } from "../utils/updateNickname";
import { PostList } from "../components/PostList";

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(user?.user_metadata.nickname);
  const [inputValue, setInputValue] = useState(nickname);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) return null;

  const handleNicknameSave = async () => {
    try {
      setIsSaving(true);
      await updateNickname(inputValue);
      setNickname(inputValue);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="flex items-start gap-6 py-8">
          <img
            src={getAvatarUrl(user.id)}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://gdaeuszzkikryuxjfppb.supabase.co/storage/v1/object/public/avatars/public/anon.png";
            }}
          />

          <div className="flex flex-col justify-center gap-3">
            <EditableUserName
              initialName={nickname}
              isEditing={isEditing}
              inputValue={inputValue}
              onInputChange={setInputValue}
            />

            <button
              onClick={
                isEditing ? handleNicknameSave : () => setIsEditing(true)
              }
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>
        </div>

        <div className="py-10">
          <PostList />
        </div>
      </div>
    </main>
  );
}
