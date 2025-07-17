import type { Message } from "../../types/shared";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";

interface ChatItemProps {
  partnerId: string;
  lastMessage: Message;
  onSelect?: () => void;
  selected?: boolean;
}

export function ChatItem({
  partnerId,
  lastMessage,
  onSelect,
  selected,
}: ChatItemProps) {
  const { data: partnerProfile, isLoading: partnerLoading } =
    useFetchUserProfile(partnerId);

  const nickname = partnerLoading
    ? "Loading..."
    : partnerProfile?.nickname || partnerId;

  const avatarUrl = partnerProfile?.avatar_url;

  return (
    <div
      onClick={onSelect}
      className={`flex items-center gap-4 p-2 rounded shadow transition cursor-pointer 
    ${selected ? "bg-gray-400 text-white" : "hover:bg-gray-300"}`}
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`${nickname}'s avatar`}
          className={`w-16 h-16 rounded-full object-cover transition 
       `}
        />
      ) : (
        <div
          className={`w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white text-sm transition
       `}
        >
          {nickname[0]?.toUpperCase()}
        </div>
      )}
      <div>
        <p
          className={`font-medium transition 
        ${selected ? "text-white" : ""}`}
        >
          {nickname}
        </p>
        <p
          className={`text-sm transition 
        ${selected ? "text-gray-400" : "text-gray-500"}`}
        >
          {lastMessage.content}
        </p>
      </div>
    </div>
  );
}
