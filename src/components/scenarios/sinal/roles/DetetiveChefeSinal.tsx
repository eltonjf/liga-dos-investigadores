import { CORRECT_ACCUSATION } from "../../../../data/scenarios/cenario-sinal";
import type { GameState } from "../../../../types";
import { Panel } from "../../../ui/Panel";
import { FormularioAcusacao } from "../puzzles/FormularioAcusacao";
import { MapaEscola } from "../puzzles/MapaEscola";

interface DetetiveChefeSinalProps {
  sessionId: string;
  gameState: GameState | null;
}

export function DetetiveChefeSinal({ sessionId, gameState }: DetetiveChefeSinalProps) {
  const symbolsPortSolved = Boolean(gameState?.symbols_port_solved);
  const overrideSolved = Boolean(gameState?.override_solved);
  const accusationSolved =
    gameState?.accusation_suspect === CORRECT_ACCUSATION.suspect &&
    gameState?.accusation_location === CORRECT_ACCUSATION.location &&
    gameState?.accusation_evidence === CORRECT_ACCUSATION.evidence;

  return (
    <div className="flex flex-col gap-6">
      {symbolsPortSolved ? (
        <MapaEscola />
      ) : (
        <Panel accent="green">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Derrube o Firewall (Fase 1) para liberar o mapa da escola.
          </p>
        </Panel>
      )}

      {overrideSolved ? (
        <FormularioAcusacao sessionId={sessionId} solved={accusationSolved} />
      ) : (
        <Panel title="Formulário de Acusação Final" accent="yellow">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Aguarde o Hacker liberar o Override do laboratório e o Especialista cruzar os
            depoimentos.
          </p>
        </Panel>
      )}
    </div>
  );
}
