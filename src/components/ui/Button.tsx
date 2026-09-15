import type { ButtonHTMLAttributes } from "react";

const BASE =
  "rounded-2xl border-2 px-5 py-2.5 font-bold uppercase tracking-wide transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

const VARIANTS = {
  yellow: `${BASE} border-yellow-400 bg-yellow-400/20 text-yellow-300 shadow-neon-yellow hover:bg-yellow-400/30`,
  cyan: `${BASE} border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-neon-cyan hover:bg-cyan-400/30`,
  purple: `${BASE} border-purple-500 bg-purple-500/20 text-purple-300 shadow-neon-purple hover:bg-purple-500/30`,
  orange: `${BASE} border-orange-400 bg-orange-400/20 text-orange-300 shadow-neon-orange hover:bg-orange-400/30`,
  green: `${BASE} border-green-400 bg-green-400/20 text-green-300 shadow-neon-green hover:bg-green-400/30`,
  red: `${BASE} border-red-400 bg-red-400/20 text-red-300 shadow-neon-red hover:bg-red-400/30`,
  primary: `${BASE} border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-neon-cyan hover:bg-cyan-400/30`,
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
}

export function Button({ variant = "cyan", className = "", ...props }: ButtonProps) {
  return <button className={`${VARIANTS[variant]} ${className}`} {...props} />;
}
