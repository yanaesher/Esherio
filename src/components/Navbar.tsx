import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <nav className="relative">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
