import type { GameState } from "../../../../types";
import { DicionarioMestre } from "../puzzles/DicionarioMestre";
import { NotaTermodinamica } from "../puzzles/NotaTermodinamica";
import { Panel } from "../../../ui/Panel";

interface CriptografoSinalProps {
  gameState: GameState | null;
}

export function CriptografoSinal({ gameState }: CriptografoSinalProps) {
  const geoSolved = Boolean(gameState?.geo_tracking_solved);
  return (
    <div className="flex flex-col gap-4">
      <DicionarioMestre />
      {geoSolved ? (
        <NotaTermodinamica />
      ) : (
        <Panel accent="orange">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Encontre a sala no mapa (Fase 2) para liberar a nota técnica.
          </p>
        </Panel>
      )}
    </div>
  );
}
