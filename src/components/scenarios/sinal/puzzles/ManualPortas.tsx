import { NETWORK_MANUAL } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function ManualPortas() {
  return (
    <Panel title={NETWORK_MANUAL.title} accent="red">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-sm text-white/70">{NETWORK_MANUAL.note}</p>
      </div>
      <p className="mt-3 text-xs text-white/50">
        Peça ao Analista de Áudio o número de batidas de cada grupo, em ordem, para montar a Porta
        de Acesso do Servidor.
      </p>
    </Panel>
  );
}
