import { type ReactElement, cloneElement } from "react";

interface FormInputItemProps {
  icon: ReactElement<React.SVGProps<SVGSVGElement>>;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function FormInputItem({
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
}: FormInputItemProps) {
  const styledIcon = cloneElement(icon, {
    className: "w-5 h-5 text-gray-400",
  });

  return (
    <div className="flex items-center border border-gray-300 rounded pl-3">
      {styledIcon}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
