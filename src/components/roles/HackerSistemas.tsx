import { COFRE_PASSWORD, RADIO_CODE, TRACKING_CODE } from "../../data/scenarios/cenario-trofeu";
import { patchGameState } from "../../hooks/useGameState";
import { TerminalHacker } from "../puzzles/TerminalHacker";
import { Panel } from "../ui/Panel";
import type { GameState } from "../../types";

interface HackerSistemasProps {
  sessionId: string;
  gameState: GameState | null;
}

export function HackerSistemas({ sessionId, gameState }: HackerSistemasProps) {
  const firewallDown = Boolean(gameState?.puzzle_1_solved) && Boolean(gameState?.radio_code_solved);

  return (
    <div className="flex flex-col gap-4">
      <TerminalHacker
        title="Terminal 1 — Cofre"
        code={COFRE_PASSWORD}
        solved={gameState?.puzzle_1_solved ?? false}
        onSolved={() => patchGameState(sessionId, { puzzle_1_solved: true })}
        hint="Combine os números dos frascos com as fórmulas do Criptógrafo para descobrir a senha de 4 dígitos do cofre."
      />
      <TerminalHacker
        title="Terminal 2 — Frequência de Rádio"
        code={RADIO_CODE}
        solved={gameState?.radio_code_solved ?? false}
        onSolved={() => patchGameState(sessionId, { radio_code_solved: true })}
        hint='Peça ao Analista de Áudio o codinome da transmissão e ao Especialista o ano de fundação da escola que ele representa.'
      />
      {firewallDown ? (
        <TerminalHacker
          title="Terminal 3 — Código de Rastreio"
          code={TRACKING_CODE}
          solved={gameState?.tracking_code_solved ?? false}
          onSolved={() => patchGameState(sessionId, { tracking_code_solved: true })}
          hint="Junte o número da sala que o Detetive encontrou no mapa com a resposta de ciências do Perito."
        />
      ) : (
        <Panel accent="green">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Terminal 3 bloqueado até derrubar o Firewall.
          </p>
        </Panel>
      )}
    </div>
  );
}
