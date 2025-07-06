import { NavLink } from "react-router-dom";

interface MenuItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export function MenuItem({ to, icon, label }: MenuItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `navlink inline-flex items-center justify-center gap-2 ${
            isActive ? "navlink-active" : ""
          }`
        }
      >
        <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </NavLink>
    </li>
  );
}
