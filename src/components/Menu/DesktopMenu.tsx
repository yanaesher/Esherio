import { Users, MessageCircle, User, Edit } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { MenuItem } from "./MenuItem";
import { SignOutButton } from "./SignOutButton";

export function DesktopMenu() {
  const { signOut, user } = useAuth();

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="hidden md:flex items-center justify-between">
        <ul className="flex gap-8 items-center">
          <MenuItem
            to={`/profile/${user.id}`}
            icon={<User />}
            label="Profile"
          />
          <MenuItem
            to={`/messages/${user.id}`}
            icon={<MessageCircle />}
            label="Messages"
          />
          <MenuItem to="/users" icon={<Users />} label="Users" />
          <MenuItem to="/create-post" icon={<Edit />} label="Create post" />
        </ul>
      </div>
      <div className="hidden md:flex justify-end">
        <SignOutButton onClick={onSignOut} />
      </div>
    </>
  );
}
