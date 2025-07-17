import { supabase } from "../supabase-client";

export async function sendMessage(
  senderId: string,
  receiverId: string,
  content: string
): Promise<void> {
  const { error } = await supabase.from("messages").insert([
    {
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}
