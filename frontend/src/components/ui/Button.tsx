import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
    secondary: "bg-surface border border-border text-text-primary hover:bg-surface-hover focus:ring-2 focus:ring-border",
    destructive: "bg-destructive text-white hover:bg-destructive-hover focus:ring-2 focus:ring-destructive",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-md transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}