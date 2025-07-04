import { NavLink } from "react-router-dom";
import { Logo } from "./Logo";

export function GuestNavbar() {
  return (
    <nav className="flex justify-between items-center">
      <Logo />
      <ul className="flex gap-5">
        <li>
          <NavLink
            to="/login"
            className="inset-button hover:bg-surface hover:text-black"
          >
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="inset-button bg-primary  hover:bg-primary-hover transition-colors"
          >
            Join
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
