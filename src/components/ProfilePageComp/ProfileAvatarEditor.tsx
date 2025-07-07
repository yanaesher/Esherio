import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { generateAvatarFilePath } from "../../utils/getAvatarFilePath";
import { uploadAvatarToStorage } from "../../services/uploadAvatarToStorage";
import { updateUserAvatarUrl } from "../../services/updateUserAvatarUrl";
import { getAvatarPublicUrl } from "../../services/getAvatarPublicUrl";

interface AvatarEditorProps {
  userId: string;
  avatarUrl: string;
}

export function AvatarEditor({ userId, avatarUrl }: AvatarEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setIsUploading(true);

    const filePath = generateAvatarFilePath(userId, file.name);
    const success = await uploadAvatarToStorage(filePath, file);

    if (!success) {
      setErrorMessage("Failed to load image.");
      setIsUploading(false);
      return;
    }

    const publicUrl = getAvatarPublicUrl(filePath);
    const updateSuccess = await updateUserAvatarUrl(userId, publicUrl);

    if (!updateSuccess) {
      setErrorMessage("Failed to save avatar link.");
      setIsUploading(false);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });

    e.target.value = "";
    setIsUploading(false);
  };

  return (
    <div className="relative">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="absolute bottom-0 left-0 text-sm opacity-0 w-full h-full cursor-pointer"
        aria-label="Upload avatar"
      />

      {isUploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-gray-600">
          Uploading...
        </div>
      )}

      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
