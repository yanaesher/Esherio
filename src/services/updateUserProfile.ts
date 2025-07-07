import { supabase } from "../supabase-client";

export const updateUserNickname = async (userId: string, newValue: string) => {
  const { error } = await supabase
    .from("profiles")
    .update({ nickname: newValue })
    .eq("id", userId);

  if (error) throw Error(`Failed to update nickname: ${error.message}`);
};
