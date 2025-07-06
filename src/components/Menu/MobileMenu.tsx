import { useState } from "react";
import { BurgerMenuButton } from "./BurgerMenuButton";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, User, MessageCircle, Users, Edit } from "lucide-react";
import { MobileNavItem } from "./MobileMenuItem";

export function MobileMenu() {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <BurgerMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && (
        <div
          className="
            fixed top-0 left-0 w-full h-full bg-custom-black z-40
            flex flex-col items-center justify-center gap-8
            transition-opacity duration-300
          "
        >
          <MobileNavItem
            to={`/profile/${user.id}`}
            onClick={() => setIsOpen(false)}
            label="Profile"
            icon={<User className="w-5 h-5" />}
          />
          <MobileNavItem
            to={`/messages/${user.id}`}
            onClick={() => setIsOpen(false)}
            label="Messages"
            icon={<MessageCircle className="w-5 h-5" />}
          />
          <MobileNavItem
            to="/communities"
            onClick={() => setIsOpen(false)}
            label="Communities"
            icon={<Users className="w-5 h-5" />}
          />
          <MobileNavItem
            to="/create-post"
            onClick={() => setIsOpen(false)}
            label="Create post"
            icon={<Edit className="w-5 h-5" />}
          />
          <button
            onClick={handleSignOut}
            className="mobile-menu-button text-red-600 flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
