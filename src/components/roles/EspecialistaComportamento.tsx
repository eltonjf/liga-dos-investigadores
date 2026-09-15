import { SUSPECTS } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

export function EspecialistaComportamento() {
  return (
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
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/50">
        Compare os álibis com as pistas de imagem e áudio para ajudar o Detetive Chefe a decidir.
      </p>
    </Panel>
  );
}
