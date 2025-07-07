import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import { useEditUserNickname } from "../../hooks/useEditUserNickname";
import { useEffect } from "react";
import { Popup } from "../Popup";
import { LoadingSpinner } from "../LoadingSpinner";

interface ProfileNameEditorProps {
  userId: string;
}

export function ProfileNameEditor({ userId }: ProfileNameEditorProps) {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useFetchUserProfile(userId);

  const {
    inputValue,
    setInputValue,
    isEditing,
    setIsEditing,
    isSaving,
    handleSave,
    error: saveError,
  } = useEditUserNickname({
    userId: userId,
    initialNickname: profile?.nickname ?? "",
  });

  useEffect(() => {
    if (profile?.nickname) {
      setInputValue(profile.nickname);
    }
  }, [profile?.nickname]);

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <Popup className="text-red-500" text={`Error: ${error.message}`} />;

  return (
    <div className="flex items-center gap-4">
      {!isEditing ? (
        <>
          <h2 className="text-xl font-bold text-gradient">
            {profile?.nickname}
          </h2>
          <button
            className="text-sm text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            className="border px-2 py-1 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="text-sm text-green-600"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            className="text-sm text-gray-500"
            onClick={() => {
              setIsEditing(false);
              setInputValue(profile?.nickname ?? "");
            }}
          >
            Cancel
          </button>
        </>
      )}
      {saveError && <p className="text-sm text-red-500">{saveError}</p>}
    </div>
  );
}
