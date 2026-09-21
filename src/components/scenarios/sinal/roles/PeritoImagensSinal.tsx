import type { GameState } from "../../../../types";
import { PainelSimbolos } from "../puzzles/PainelSimbolos";
import { FrascosLaboratorio } from "../puzzles/FrascosLaboratorio";
import { Panel } from "../../../ui/Panel";

interface PeritoImagensSinalProps {
  gameState: GameState | null;
}

export function PeritoImagensSinal({ gameState }: PeritoImagensSinalProps) {
  const geoSolved = Boolean(gameState?.geo_tracking_solved);
  return (
    <div className="flex flex-col gap-4">
      <PainelSimbolos />
      {geoSolved ? (
        <FrascosLaboratorio />
      ) : (
        <Panel accent="cyan">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Encontre a sala no mapa (Fase 2) para liberar a foto da cena.
          </p>
        </Panel>
      )}
    </div>
  );
}
