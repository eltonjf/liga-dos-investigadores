import { BILHETE_INTERCEPTADO, SCHOOL_DOSSIER, SUSPECTS } from "../../data/scenarios/cenario-trofeu";
import type { GameState } from "../../types";
import { Panel } from "../ui/Panel";

interface EspecialistaComportamentoProps {
  gameState: GameState | null;
}

export function EspecialistaComportamento({ gameState }: EspecialistaComportamentoProps) {
  const firewallDown = Boolean(gameState?.puzzle_1_solved) && Boolean(gameState?.radio_code_solved);

  return (
    <div className="flex flex-col gap-4">
      <Panel title={SCHOOL_DOSSIER.title} accent="red">
        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
          <p className="text-sm text-white/70">{SCHOOL_DOSSIER.note}</p>
        </div>
      </Panel>

      {firewallDown && (
        <Panel title="Bilhete Interceptado" accent="red">
          <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="font-mono text-sm text-red-300">"{BILHETE_INTERCEPTADO}"</p>
          </div>
          <p className="mt-3 text-xs text-white/50">
            Passe essa rota para o Detetive Chefe seguir a partir do Laboratório no mapa tático.
          </p>
        </Panel>
      )}

      <Panel title="Dossiês dos Suspeitos" accent="red">
        <div className="flex flex-col gap-3">
          {SUSPECTS.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono font-bold text-red-400">{s.name}</p>
                <span className="text-xs text-white/50">{s.role}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">
                <span className="text-white/40">Álibi: </span>
                {s.alibi}
              </p>
              <p className="mt-1 text-sm text-white/70">
                <span className="text-white/40">Visto por último perto de: </span>
                {s.lastSeenNear}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/50">
          Compare os álibis com as pistas de imagem e áudio para ajudar o Detetive Chefe a decidir.
        </p>
      </Panel>
    </div>
  );
}
