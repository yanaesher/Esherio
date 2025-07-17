// Chat.tsx
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRealtimeMessages } from "../../hooks/useRealtimeMessages";
import { useSendMessage } from "../../hooks/useSendMessage";
import { LoadingSpinner } from "../LoadingSpinner";

interface ChatProps {
  partnerId: string;
}

export function Chat({ partnerId }: ChatProps) {
  const { user, isLoading: authLoading } = useAuth();
  const userId = user?.id ?? "";
  const { messages, loading } = useRealtimeMessages(userId);
  const { sendMessage, sending } = useSendMessage();
  const [text, setText] = useState("");

  const filteredMessages = messages?.filter(
    (msg) =>
      (msg.sender_id === userId && msg.receiver_id === partnerId) ||
      (msg.sender_id === partnerId && msg.receiver_id === userId)
  );

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({
      sender_id: userId,
      receiver_id: partnerId,
      content: text.trim(),
    });
    setText("");
  };

  if (authLoading || loading) return <LoadingSpinner />;
  if (!userId) return <p>Not authenticated</p>;

  return (
    <div className="flex flex-col h-full rounded shadow">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredMessages?.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded max-w-xs break-words shadow ${
              msg.sender_id === userId
                ? "ml-auto bg-blue-600 text-white text-right"
                : "mr-auto bg-gray-200 text-gray-900 rounded-bl-none"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={sending}
        >
          Send
        </button>
      </div>
    </div>
  );
}
