import type { AccentColor, RoleDef } from "../../types";

const AVAILABLE_STYLES: Record<AccentColor, { border: string; shadow: string; text: string }> = {
  yellow: { border: "border-yellow-400", shadow: "shadow-neon-yellow", text: "text-yellow-300" },
  cyan: { border: "border-cyan-400", shadow: "shadow-neon-cyan", text: "text-cyan-300" },
  purple: { border: "border-purple-500", shadow: "shadow-neon-purple", text: "text-purple-300" },
  orange: { border: "border-orange-400", shadow: "shadow-neon-orange", text: "text-orange-300" },
  green: { border: "border-green-400", shadow: "shadow-neon-green", text: "text-green-300" },
  red: { border: "border-red-400", shadow: "shadow-neon-red", text: "text-red-300" },
};

interface RoleBadgeProps {
  roles: RoleDef[];
  takenBy?: string;
  isMine?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export function RoleBadge({ roles, takenBy, isMine, disabled, onSelect }: RoleBadgeProps) {
  const taken = Boolean(takenBy);
  const available = AVAILABLE_STYLES[roles[0].color];
  const bundleLabel = roles.length === 3 ? "CRACHÁ TRIPLO" : roles.length === 2 ? "CRACHÁ DUPLO" : null;

  const stateClass = isMine
    ? "border-green-400 bg-green-950/30 shadow-neon-green transform scale-105 transition-transform"
    : taken
      ? "border-red-400/60 bg-red-950/30 opacity-60 cursor-not-allowed overflow-hidden"
      : `${available.border} ${available.shadow} bg-slate-900/60 hover:bg-slate-800 cursor-pointer transition-all`;

  const textClass = isMine ? "text-green-400" : taken ? "text-red-200" : available.text;

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled || (taken && !isMine)}
      className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-4 text-left relative disabled:cursor-not-allowed ${stateClass}`}
    >
      {bundleLabel && (
        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {bundleLabel}
        </span>
      )}
      {roles.map((role) => (
        <div key={role.id} className="flex flex-col items-center gap-0.5">
          <span className="text-3xl">{role.icon}</span>
          <span className={`text-sm font-bold uppercase tracking-wide ${textClass}`}>{role.label}</span>
          <span className="text-xs text-slate-400">{role.tagline}</span>
        </div>
      ))}
      {isMine && (
        <span className="mt-2 rounded-full bg-green-900 px-4 py-1 text-xs font-bold text-green-200">
          SUA CREDENCIAL
        </span>
      )}
      {taken && !isMine && (
        <span className="mt-2 rounded-full bg-red-900 px-4 py-1 text-xs font-bold text-red-200">
          OCUPADO POR: {takenBy?.toUpperCase()}
        </span>
      )}
      {!taken && <span className="mt-2 text-xs font-semibold text-slate-400">Disponível</span>}
    </button>
  );
}
