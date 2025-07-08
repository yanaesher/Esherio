import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { generateAvatarFilePath } from "../../utils/getAvatarFilePath";
import { uploadAvatarToStorage } from "../../services/uploadAvatarToStorage";
import { updateUserAvatarUrl } from "../../services/updateUserAvatarUrl";
import { getAvatarPublicUrl } from "../../services/getAvatarPublicUrl";
import { Image } from "lucide-react";

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
    <div className="relative group w-26 sm:w-28 md:w-32 aspect-square">
      <img
        src={avatarUrl}
        alt="MyAvatar"
        className="w-full h-full rounded-full object-cover border-4 border-gray-300 transition-all duration-200 group-hover:brightness-50"
      />

      {/* Hover icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Image className="text-white w-8 h-8" />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        className="absolute inset-0 cursor-pointer opacity-0 z-10"
        aria-label="Upload avatar"
      />

      {isUploading && (
        <div className="absolute inset-0 bg-white/70 rounded-full flex items-center justify-center text-sm text-gray-600 z-20">
          Uploading...
        </div>
      )}

      {errorMessage && (
        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
