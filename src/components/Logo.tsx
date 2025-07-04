import { GiRoughWound } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2 text-2xl">
      <GiRoughWound className="text-3xl text-primary" />
      <span className="font-black uppercase text-white">Esherio</span>
    </NavLink>
  );
}
