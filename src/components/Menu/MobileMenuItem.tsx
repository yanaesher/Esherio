import { NavLink } from "react-router-dom";

interface MobileNavItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function MobileNavItem({
  to,
  label,
  icon,
  onClick,
}: MobileNavItemProps) {
  return (
    <NavLink to={to} onClick={onClick} className="mobile-menu-button">
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </NavLink>
  );
}
