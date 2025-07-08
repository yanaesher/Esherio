import { useState } from "react";

interface PopupProps {
  text: string;
  className?: string;
}

export function Popup({ text, className = "" }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-primary border rounded shadow-lg p-4 flex flex-col gap-2 max-w-sm w-full mx-4">
        <p className={`text-lg font-semibold text-white ${className}`}>
          {text}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="self-end text-sm text-white/70 hover:underline"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
