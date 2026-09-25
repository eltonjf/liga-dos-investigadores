import { SYMBOLS } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function DicionarioMestre() {
  return (
    <Panel title="Dicionário Mestre" accent="orange">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-orange-400">
          Tradução dos Símbolos
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {SYMBOLS.map((s) => (
            <li key={s.id} className="flex items-center gap-3 text-sm text-white/80">
              <span className="text-xl">{s.icon}</span>
              <span>
                {s.label} = {s.equation}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs text-white/60">
        Peça ao Perito de Imagens a ordem dos 4 símbolos e calcule cada equação para montar a senha
        de 8 dígitos do Hacker de Sistemas.
      </p>
    </Panel>
  );
}
