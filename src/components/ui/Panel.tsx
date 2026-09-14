import type { PropsWithChildren } from "react";

const ACCENTS = {
  cyan: "text-neon-cyan",
  magenta: "text-neon-magenta",
  lime: "text-neon-lime",
  amber: "text-neon-amber",
} as const;

interface PanelProps extends PropsWithChildren {
  title?: string;
  accent?: keyof typeof ACCENTS;
  className?: string;
}

export function Panel({ title, accent = "cyan", className = "", children }: PanelProps) {
  return (
    <section
      className={`scanlines rounded-xl border border-ink-700 bg-ink-900/80 p-5 shadow-lg ${className}`}
    >
      {title && (
        <h2 className={`mb-3 font-mono text-sm font-bold uppercase tracking-widest text-glow ${ACCENTS[accent]}`}>
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
