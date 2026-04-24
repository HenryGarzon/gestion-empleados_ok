import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-md
          bg-surface border border-border
          text-text-primary placeholder:text-text-tertiary
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          transition-colors duration-150
          ${error ? "border-destructive focus:ring-destructive" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  );
}