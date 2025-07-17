import { useMemo } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRealtimeMessages } from "../../hooks/useRealtimeMessages";
import { LoadingSpinner } from "../LoadingSpinner";
import { Popup } from "../Popup";
import { ChatItem } from "./ChatItem";
import type { Message } from "../../types/shared";

interface ChatListProps {
  onSelectChat: (partnerId: string) => void;
  selectedPartnerId: string | null; // Добавляем сюда selectedPartnerId
}

export function ChatList({ onSelectChat, selectedPartnerId }: ChatListProps) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id ?? null;

  const { messages, loading, error } = useRealtimeMessages(userId || "");

  const uniqueChats = useMemo(() => {
    if (!messages || !userId) return [];
    const reversed = [...messages].reverse();
    const map = new Map<string, { partnerId: string; lastMessage: Message }>();

    for (const msg of reversed) {
      const partnerId =
        msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!map.has(partnerId)) {
        map.set(partnerId, { partnerId, lastMessage: msg });
      }
    }

    return Array.from(map.values());
  }, [messages, userId]);

  if (authLoading) return <p>Loading auth...</p>;
  if (!userId) return <p className="text-red-500">Not authenticated</p>;
  if (loading) return <LoadingSpinner />;
  if (error) return <Popup text={error} />;

  return (
    <div>
      {uniqueChats.map((chat) => (
        <ChatItem
          key={chat.partnerId}
          partnerId={chat.partnerId}
          lastMessage={chat.lastMessage}
          onSelect={() => onSelectChat(chat.partnerId)}
          selected={selectedPartnerId === chat.partnerId}
        />
      ))}
    </div>
  );
}
