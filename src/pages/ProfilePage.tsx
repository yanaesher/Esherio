import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PostList } from "../components/ProfilePageComp/PostList";
import { ProfileNameEditor } from "../components/ProfilePageComp/ProfileNameEditor";
import { AvatarEditor } from "../components/ProfilePageComp/ProfileAvatarEditor";
import { ProfileNameDisplay } from "../components/ProfilePageComp/ProfileNameDisplay";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Popup } from "../components/Popup";
import { ProfileAvatarDisplay } from "../components/ProfilePageComp/ProfileAvatarDisplay";

export function ProfilePage() {
  const { user } = useAuth();
  const { id } = useParams();

  const userIdToLoad = id || user?.id;

  const {
    data: profile,
    isLoading,
    isError,
  } = useFetchUserProfile(userIdToLoad || "");

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
        <div className="flex gap-3 py-8 items-center">
          {user?.id === profile.id ? (
            <AvatarEditor userId={profile.id} avatarUrl={profile.avatar_url} />
          ) : (
            <ProfileAvatarDisplay avatarUrl={profile.avatar_url} />
          )}

          {user?.id === profile.id ? (
            <ProfileNameEditor userId={profile.id} />
          ) : (
            <ProfileNameDisplay nickname={profile.nickname} />
          )}
        </div>

        <div className="py-10">
          <PostList userId={profile.id} />
        </div>
      </div>
    </main>
  );
}
