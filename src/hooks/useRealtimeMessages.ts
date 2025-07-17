import { useEffect, useState } from "react";
import { supabase } from "../supabase-client";
import type { Message } from "../types/shared";
import { getAllUserChats } from "../services/getAllChats";

export function useRealtimeMessages(userId: string) {
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllUserChats(userId);
        setMessages(data);
      } catch (err) {
        setError(`Failed to load messages: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    const subscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          // filter убираем, чтобы слушать все новые сообщения
        },
        (payload) => {
          const newMessage = payload.new as Message;
          if (
            newMessage.sender_id === userId ||
            newMessage.receiver_id === userId
          ) {
            setMessages((prev) =>
              prev ? [...prev, newMessage] : [newMessage]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [userId]);

  return { messages, loading, error };
}
