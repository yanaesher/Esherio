interface BurgerMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function BurgerMenuButton({
  isOpen,
  toggleMenu,
}: BurgerMenuButtonProps) {
  return (
    <button
      onClick={toggleMenu}
      className="relative w-8 h-8 flex items-center justify-center md:hidden z-50 group"
      aria-label="Toggle menu"
    >
      {/* Top line */}
      <span
        className={`absolute h-0.5 w-6 bg-primary transform transition duration-300 ease-in-out 
          ${isOpen ? "rotate-45" : "-translate-y-2"}`}
      />

      {/* Middle line */}
      <span
        className={`absolute h-0.5 w-6 bg-primary transition-all duration-300 ease-in-out 
          ${isOpen ? "opacity-0" : ""}`}
      />

      {/* Bottom line */}
      <span
        className={`absolute h-0.5 w-6 bg-primary transform transition duration-300 ease-in-out 
          ${isOpen ? "-rotate-45" : "translate-y-2"}`}
      />
    </button>
  );
}
