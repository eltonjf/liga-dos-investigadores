import { REX_NOTE, SUSPECTS, TRACKING_MESSAGE } from "../../../../data/scenarios/cenario-sinal";
import type { GameState } from "../../../../types";
import { Panel } from "../../../ui/Panel";
import { ManualPortas } from "../puzzles/ManualPortas";

interface EspecialistaComportamentoSinalProps {
  gameState: GameState | null;
}

export function EspecialistaComportamentoSinal({ gameState }: EspecialistaComportamentoSinalProps) {
  const symbolsPortSolved = Boolean(gameState?.symbols_port_solved);
  const overrideSolved = Boolean(gameState?.override_solved);

  return (
    <div className="flex flex-col gap-4">
      <ManualPortas />

      {symbolsPortSolved && (
        <Panel title={TRACKING_MESSAGE.title} accent="red">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="font-mono text-sm text-red-300">"{TRACKING_MESSAGE.transcript}"</p>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Passe essa coordenada para o Detetive Chefe conferir no mapa da escola.
          </p>
        </Panel>
      )}

      {overrideSolved && (
        <Panel title="Depoimentos dos Suspeitos" accent="red">
          <div className="flex flex-col gap-3">
            {SUSPECTS.map((s) => (
              <div key={s.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-mono font-bold text-red-400">{s.name}</p>
                  <span className="text-xs text-white/50">{s.role}</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  <span className="text-white/40">Depoimento: </span>
                  {s.claim}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-red-500/40 bg-black/40 p-3">
            <p className="text-sm text-white/70">{REX_NOTE}</p>
          </div>
          <p className="mt-4 text-xs text-white/50">
            Compare os depoimentos com a gravação recuperada para ajudar o Detetive Chefe a decidir.
          </p>
        </Panel>
      )}
    </div>
  );
}
