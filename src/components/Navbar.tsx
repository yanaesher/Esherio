import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="relative z-50 flex justify-between items-center text-white">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
