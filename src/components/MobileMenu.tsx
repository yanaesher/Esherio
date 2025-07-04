import { useState } from "react";
import { NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  return (
    <div className="md:hidden relative">
      <button
        onClick={toggleMenu}
        className="p-2"
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      <ul
        className={`
          absolute top-full left-0 right-0 bg-white shadow-md rounded-b-md mt-2 z-50
          transition-all duration-300 ease-in-out origin-top
          ${
            isMenuOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
        role="navigation"
      >
        <li>
          <NavLink to="/communities" className="block p-4 hover:bg-gray-100">
            Communities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community/create"
            className="block p-4 hover:bg-gray-100"
          >
            Create Post
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
