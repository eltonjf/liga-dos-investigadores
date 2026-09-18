import { BookOpen, Compass, Dumbbell, FlaskConical, UtensilsCrossed, Wrench } from "lucide-react";
import { SCHOOL_ROOMS } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

const ROOM_ICONS: Record<string, typeof FlaskConical> = {
  laboratorio: FlaskConical,
  biblioteca: BookOpen,
  ginasio: Dumbbell,
  cantina: UtensilsCrossed,
  oficina: Wrench,
};

const COLS = 4;
const ROWS = 2;

export function MapaTatico() {
  const cells = Array.from({ length: ROWS * COLS }, (_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    return SCHOOL_ROOMS.find((r) => r.col === col && r.row === row) ?? null;
  });

  return (
    <Panel title="Mapa Tático" accent="green">
      <div className="mb-3 flex items-center justify-end gap-1 font-mono text-[10px] text-green-400">
        <Compass size={16} />
        <span>N · S · L · O</span>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}>
        {cells.map((room, i) => {
          const Icon = room ? ROOM_ICONS[room.id] : null;
          return (
            <div
              key={i}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center ${
                room
                  ? "border-green-400 bg-slate-950 shadow-neon-green"
                  : "border-slate-800 bg-slate-900/40"
              }`}
            >
              {Icon && <Icon size={20} className="text-green-400" />}
              {room && <span className="text-[9px] leading-tight text-green-300">{room.label}</span>}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-white/60">
        Use a rosa dos ventos para seguir a rota do bilhete a partir do Laboratório e descobrir o
        destino da fuga.
      </p>
    </Panel>
  );
}
