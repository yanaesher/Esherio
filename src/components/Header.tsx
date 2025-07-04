import { Navbar } from "./Navbar";
import { GuestNavbar } from "./GuestNavbar";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full flex items-center h-16 z-10 bg-custom-black">
      <div className="container">{user ? <Navbar /> : <GuestNavbar />}</div>
    </header>
  );
}
