import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "outline",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-3.5 py-2.5 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-3.5 text-md",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-neutral text-text-color shadow-theme-xs hover:bg-neutral-active disabled:bg-text-secondary",
    outline:
      "bg-transparent text-text-color-light outline outline-light hover:bg-light hover:text-text-color focus:bg-light focus:text-text-color transition-all",
    outlinesecondary:
      "bg-transparent text-text-color-light outline outline-light hover:bg-secondary hover:text-text-color-light hover:outline-secondary focus:outline-secondary focus:bg-secondary focus:text-text-color-light transition-all",
    secondary:
      "bg-secondary text-text-color-light hover:bg-secondary-light  transition-all",
  };

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg transition cursor-pointer ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} 
      ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
