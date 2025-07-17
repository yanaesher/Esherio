// hooks/useSendMessage.ts
import { useState } from "react";
import { supabase } from "../supabase-client";

interface SendMessageParams {
  sender_id: string;
  receiver_id: string;
  content: string;
}

export function useSendMessage() {
  const [sending, setSending] = useState(false);

  const sendMessage = async ({
    sender_id,
    receiver_id,
    content,
  }: SendMessageParams) => {
    setSending(true);
    try {
      const { error } = await supabase.from("messages").insert([
        {
          sender_id,
          receiver_id,
          content,
          created_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending };
}
