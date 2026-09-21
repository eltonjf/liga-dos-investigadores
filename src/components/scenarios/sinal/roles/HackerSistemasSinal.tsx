import {
  OVERRIDE_CODE,
  PORT_CODE,
  SUSPECT_ROOM_COORD,
  SYMBOLS_CODE,
} from "../../../../data/scenarios/cenario-sinal";
import { patchGameState } from "../../../../hooks/useGameState";
import type { GameState } from "../../../../types";
import { TerminalHacker } from "../../../puzzles/TerminalHacker";
import { Panel } from "../../../ui/Panel";
import { TerminalDuplo } from "../puzzles/TerminalDuplo";

interface HackerSistemasSinalProps {
  sessionId: string;
  gameState: GameState | null;
}

export function HackerSistemasSinal({ sessionId, gameState }: HackerSistemasSinalProps) {
  const symbolsPortSolved = Boolean(gameState?.symbols_port_solved);
  const geoSolved = Boolean(gameState?.geo_tracking_solved);

  return (
    <div className="flex flex-col gap-4">
      <TerminalDuplo
        title="Terminal 1 — Firewall"
        symbolsCode={SYMBOLS_CODE}
        portCode={PORT_CODE}
        solved={symbolsPortSolved}
        onSolved={() => patchGameState(sessionId, { symbols_port_solved: true })}
      />

      {symbolsPortSolved ? (
        <TerminalHacker
          title="Terminal 2 — Rastreio Geográfico"
          code={SUSPECT_ROOM_COORD}
          solved={geoSolved}
          onSolved={() => patchGameState(sessionId, { geo_tracking_solved: true })}
          hint="Digite a coordenada (coluna+linha) que o Detetive achou no mapa da escola."
          mode="text"
        />
      ) : (
        <Panel accent="green">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Terminal 2 bloqueado até derrubar o Firewall.
          </p>
        </Panel>
      )}

      {geoSolved ? (
        <TerminalHacker
          title="Terminal 3 — Override do Laboratório"
          code={OVERRIDE_CODE}
          solved={Boolean(gameState?.override_solved)}
          onSolved={() => patchGameState(sessionId, { override_solved: true })}
          hint="Junte a temperatura de ebulição da água com o número de estados físicos visíveis na cena."
        />
      ) : (
        <Panel accent="green">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Terminal 3 bloqueado até resolver o rastreio geográfico.
          </p>
        </Panel>
      )}
    </div>
  );
}
