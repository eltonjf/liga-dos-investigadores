import { FlaskConical } from "lucide-react";
import { LAB_CONTAINERS } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function FrascosLaboratorio() {
  return (
    <Panel title="Foto da Sala — Laboratório de Ciências" accent="cyan">
      <div className="flex items-end justify-center gap-6 rounded-xl border border-slate-700 bg-slate-900/80 p-6">
        {LAB_CONTAINERS.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-2">
            <FlaskConical size={44} className="text-cyan-300" />
            <span className="text-center text-xs text-white/70">{c.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">
        Ciências: quantos estados físicos da água aparecem visíveis nessa cena? Passe a contagem ao
        Criptógrafo.
      </p>
    </Panel>
  );
}
