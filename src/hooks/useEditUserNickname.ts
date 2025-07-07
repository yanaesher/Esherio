import { useState } from "react";
import { updateUserNickname } from "../services/updateUserProfile";

interface UseEditUserNicknameProps {
  userId: string;
  initialNickname: string;
}

import { useQueryClient } from "@tanstack/react-query";

export const useEditUserNickname = ({
  userId,
  initialNickname,
}: UseEditUserNicknameProps) => {
  const [inputValue, setInputValue] = useState(initialNickname);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      await updateUserNickname(userId, inputValue);
      setIsEditing(false);

      queryClient.invalidateQueries({
        queryKey: ["userProfile", userId],
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    inputValue,
    setInputValue,
    isEditing,
    setIsEditing,
    isSaving,
    error,
    handleSave,
  };
};
