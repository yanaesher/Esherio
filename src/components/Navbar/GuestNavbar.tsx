import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../Logo";
import { BurgerMenuButton } from "../Menu/BurgerMenuButton";

export function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative z-50 flex justify-between items-center">
      <Logo />

      <BurgerMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* Menu for desktop*/}
      <ul className="hidden md:flex gap-5 items-center">
        <li>
          <NavLink
            to="/auth?mode=login"
            className="inset-button hover:bg-surface hover:text-black"
          >
            Log In
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/auth?mode=register"
            className="inset-button bg-primary hover:text-black hover:bg-surface"
          >
            Join
          </NavLink>
        </li>
      </ul>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="
            fixed top-0 left-0 w-full h-full bg-custom-black z-40
            flex flex-col items-center justify-center gap-10 text-lg
            transition-opacity duration-300
          "
        >
          <NavLink
            to="/auth?mode=login"
            className="inset-button px-10 py-4 hover:bg-surface hover:text-black"
          >
            Log In
          </NavLink>
          <NavLink
            to="/auth?mode=register"
            className="inset-button px-10 py-4 bg-primary hover:text-black hover:bg-surface"
          >
            Join
          </NavLink>
        </div>
      )}
    </nav>
  );
}
