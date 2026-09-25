import { SYMBOLS } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function PainelSimbolos() {
  return (
    <Panel title="Painel de Símbolos" accent="cyan">
      <div className="grid grid-cols-4 gap-3">
        {SYMBOLS.map((s) => (
          <div
            key={s.id}
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 p-4"
          >
            <span className="text-4xl">{s.icon}</span>
            <span className="text-xs text-white/60">{s.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">
        Leia em voz alta a ordem exata dos 4 símbolos para o Criptógrafo aplicar as equações.
      </p>
    </Panel>
  );
}
