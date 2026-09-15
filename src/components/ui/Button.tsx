import type { ButtonHTMLAttributes } from "react";

const VARIANTS = {
  cyan: "border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 shadow-neon-cyan/30",
  magenta: "border-neon-magenta text-neon-magenta hover:bg-neon-magenta/10 shadow-neon-magenta/30",
  lime: "border-neon-lime text-neon-lime hover:bg-neon-lime/10 shadow-neon-lime/30",
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
}

export function Button({ variant = "cyan", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-lg border-2 bg-ink-900 px-5 py-2.5 font-mono font-semibold uppercase tracking-wider transition disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink-900 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
