import { useAuth } from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export function DesktopMenu() {
  const { signOut } = useAuth();
  return (
    <ul className="flex space-x-4">
      <li>
        <NavLink to="/feed">Feed</NavLink>
      </li>
      <li>
        <NavLink to="/communities">Communities</NavLink>
      </li>
      <li>
        <NavLink to="/messages">Messages</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <button className="cursor-pointer" onClick={signOut}>
          Sign Out
        </button>
      </li>
    </ul>
  );
}
