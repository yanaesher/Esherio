import { useAuth } from "../hooks/useAuth";
import { PostList } from "../components/ProfilePageComp/PostList";
import { ProfileNameEditor } from "../components/ProfilePageComp/ProfileNameEditor";
import { AvatarEditor } from "../components/ProfilePageComp/ProfileAvatarEditor";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";

import { LoadingSpinner } from "../components/LoadingSpinner";
import { Popup } from "../components/Popup";

export function ProfilePage() {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    isError,
  } = useFetchUserProfile(user?.id || "");

  if (!user) return null;

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <LoadingSpinner className="w-10 h-10" />
      </div>
    );

  if (isError || !profile)
    return <Popup text="Failed to load profile" className="text-white" />;

  return (
    <main className="main">
      <div className="container">
        <div className="flex  gap-10 py-8">
          <AvatarEditor userId={user.id} avatarUrl={profile.avatar_url} />
          <ProfileNameEditor userId={user.id} />
        </div>

        <div className="py-10">
          <PostList userId={user.id} />
        </div>
      </div>
    </main>
  );
}
