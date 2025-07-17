import { supabase } from "../supabase-client";
import type { Message } from "../types/shared";

export async function getAllUserChats(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId}, receiver_id.eq.${userId}`)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
