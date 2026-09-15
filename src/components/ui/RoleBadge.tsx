import type { AccentColor, RoleDef } from "../../types";

const STYLES: Record<AccentColor, { border: string; text: string; bg: string }> = {
  cyan: { border: "border-neon-cyan", text: "text-neon-cyan", bg: "hover:bg-neon-cyan/10" },
  magenta: { border: "border-neon-magenta", text: "text-neon-magenta", bg: "hover:bg-neon-magenta/10" },
  lime: { border: "border-neon-lime", text: "text-neon-lime", bg: "hover:bg-neon-lime/10" },
  amber: { border: "border-neon-amber", text: "text-neon-amber", bg: "hover:bg-neon-amber/10" },
};

interface RoleBadgeProps {
  role: RoleDef;
  takenBy?: string;
  isMine?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export function RoleBadge({ role, takenBy, isMine, disabled, onSelect }: RoleBadgeProps) {
  const s = STYLES[role.color];
  const taken = Boolean(takenBy);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || (taken && !isMine)}
      className={`flex flex-col items-start gap-1 rounded-xl border-2 bg-ink-900/80 p-4 text-left transition disabled:cursor-not-allowed ${s.border} ${!taken ? s.bg : ""} ${taken && !isMine ? "opacity-40" : ""} ${isMine ? "ring-2 ring-offset-2 ring-offset-ink-950 ring-neon-lime" : ""}`}
    >
      <span className="text-3xl">{role.icon}</span>
      <span className={`font-mono text-sm font-bold uppercase tracking-wide ${s.text}`}>{role.label}</span>
      <span className="text-xs text-white/60">{role.tagline}</span>
      <span className="mt-2 text-xs font-semibold text-white/80">
        {taken ? `Escolhido por ${takenBy}` : "Disponível"}
      </span>
    </button>
  );
}
