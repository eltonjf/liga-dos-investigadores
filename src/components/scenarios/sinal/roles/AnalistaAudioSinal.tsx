import type { GameState } from "../../../../types";
import { RitmoInterceptado } from "../puzzles/RitmoInterceptado";
import { GravacaoFinal } from "../puzzles/GravacaoFinal";
import { Panel } from "../../../ui/Panel";

interface AnalistaAudioSinalProps {
  gameState: GameState | null;
}

export function AnalistaAudioSinal({ gameState }: AnalistaAudioSinalProps) {
  const overrideSolved = Boolean(gameState?.override_solved);
  return (
    <div className="flex flex-col gap-4">
      <RitmoInterceptado />
      {overrideSolved ? (
        <GravacaoFinal />
      ) : (
        <Panel accent="purple">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Derrube o Override do laboratório (Fase 3) para liberar a gravação recuperada.
          </p>
        </Panel>
      )}
    </div>
  );
}
