import { THERMO_NOTE } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function NotaTermodinamica() {
  return (
    <Panel title={THERMO_NOTE.title} accent="orange">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-sm text-white/70">{THERMO_NOTE.note}</p>
      </div>
      <p className="mt-3 text-xs text-white/60">
        Peça ao Perito de Imagens quantos estados físicos da água aparecem na foto da sala e calcule
        o código de override para o Hacker de Sistemas.
      </p>
    </Panel>
  );
}
