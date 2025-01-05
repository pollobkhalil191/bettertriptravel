// Button.tsx
import React from "react";

interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string; // Optional className to customize styling
  disabled?: boolean; // Optional disabled state
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 rounded-md text-white transition duration-300 ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      } ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
