import { useState } from "react";

interface PopupProps {
  text: string;
  className?: string;
}

export function Popup({ text, className = "" }: PopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="absolute z-50 bg-primary border rounded shadow-lg p-4 flex flex-col gap-2">
      <p className={`text-lg font-semibold ${className}`}>{text}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="self-end text-sm text-gray-500 hover:underline"
      >
        Ok
      </button>
    </div>
  );
}
