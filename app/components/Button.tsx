"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onCLick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onCLick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onCLick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition w-full
        ${outline ? "bg-white" : "bg-rose-500"}
      ${outline ? "border-black" : "bg-rose-500"}
      ${outline ? "text-black" : " text-white"} 
      ${small ? "py-1" : "py-3"} 
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"} 
      ${small ? "border-0" : "border-2"}
      `}
    >
      {Icon && <Icon size={24} className=" absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
