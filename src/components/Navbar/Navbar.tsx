import { Logo } from "../Logo";
import { DesktopMenu } from "../Menu/DesktopMenu";
import { MobileMenu } from "../Menu/MobileMenu";

export function Navbar() {
  return (
    <nav className="relative z-50 flex justify-between items-center text-white">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
