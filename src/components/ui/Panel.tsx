import type { PropsWithChildren } from "react";

const ACCENTS = {
  yellow: { border: "border-yellow-400", text: "text-yellow-400", shadow: "shadow-neon-yellow" },
  cyan: { border: "border-cyan-400", text: "text-cyan-400", shadow: "shadow-neon-cyan" },
  purple: { border: "border-purple-500", text: "text-purple-500", shadow: "shadow-neon-purple" },
  orange: { border: "border-orange-400", text: "text-orange-400", shadow: "shadow-neon-orange" },
  green: { border: "border-green-400", text: "text-green-400", shadow: "shadow-neon-green" },
  red: { border: "border-red-400", text: "text-red-400", shadow: "shadow-neon-red" },
} as const;

interface PanelProps extends PropsWithChildren {
  title?: string;
  accent?: keyof typeof ACCENTS;
  className?: string;
}

export function Panel({ title, accent = "cyan", className = "", children }: PanelProps) {
  const a = ACCENTS[accent];
  return (
    <section
      className={`rounded-2xl border-2 bg-slate-900/90 p-5 shadow-lg ${a.border} ${a.shadow} ${className}`}
    >
      {title && (
        <h2 className={`mb-3 text-sm font-bold uppercase tracking-wide ${a.text}`}>{title}</h2>
      )}
      {children}
    </section>
  );
}
