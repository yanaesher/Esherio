import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  onClick: () => void;
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-red-600 hover:underline"
    >
      <LogOut className="w-5 h-5" />
      Sign Out
    </button>
  );
}
