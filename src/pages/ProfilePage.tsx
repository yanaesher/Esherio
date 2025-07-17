import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PostList } from "../components/ProfilePageComp/PostList";
import { ProfileNameEditor } from "../components/ProfilePageComp/ProfileNameEditor";
import { AvatarEditor } from "../components/ProfilePageComp/ProfileAvatarEditor";
import { ProfileNameDisplay } from "../components/ProfilePageComp/ProfileNameDisplay";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";

import { ProfileAvatarDisplay } from "../components/ProfilePageComp/ProfileAvatarDisplay";
import { sendMessage } from "../services/sendMessage";

export function ProfilePage() {
  const { user } = useAuth();
  const { id } = useParams();

  const userIdToLoad = id || user?.id;

  const {
    data: profile,
    isLoading,
    isError,
  } = useFetchUserProfile(userIdToLoad || "");

  const [isModalOpen, setModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoadingSpinner className="w-10 h-10" />
      </div>
    );

  if (isError || !profile)
    return <div className="text-red-500 p-4">Failed to load profile</div>;

  const isOwnProfile = user?.id === profile.id;

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setMessageContent("");
  };

  const handleSend = async () => {
    if (!messageContent.trim()) return;

    try {
      if (!user) throw new Error("Not authenticated");
      await sendMessage(user.id, profile.id, messageContent.trim());
      closeModal();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <section className="flex flex-col gap-3 py-8 items-center">
          {isOwnProfile ? (
            <AvatarEditor userId={profile.id} avatarUrl={profile.avatar_url} />
          ) : (
            <ProfileAvatarDisplay avatarUrl={profile.avatar_url} />
          )}

          {isOwnProfile ? (
            <ProfileNameEditor userId={profile.id} />
          ) : (
            <ProfileNameDisplay nickname={profile.nickname} />
          )}

          {!isOwnProfile && (
            <button
              onClick={openModal}
              className=" bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover transition"
            >
              Write a message
            </button>
          )}
        </section>

        <section className="py-10">
          <PostList userId={profile.id} />
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h2 className="text-xl mb-4">New message for {profile.nickname}</h2>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={4}
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Type your message..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded border text-white bg-custom-black hover:bg-gray-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-hover"
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
