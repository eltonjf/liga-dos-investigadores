import { Panel } from "../ui/Panel";

interface ManualLaboratorioProps {
  solved: boolean;
}

const FORMULAS = [
  "Dígito 1: Soma do frasco Vermelho com o Verde.",
  "Dígito 2: Frasco Amarelo menos o Azul.",
  "Dígito 3: O dobro do frasco Verde.",
  "Dígito 4: Frasco Azul menos o Vermelho.",
];

export function ManualLaboratorio({ solved }: ManualLaboratorioProps) {
  if (solved) {
    return (
      <Panel accent="orange">
        <p className="text-center font-bold uppercase tracking-wide text-orange-400">
          Sistema Desbloqueado
        </p>
      </Panel>
    );
  }

  return (
    <Panel title="Manual do Laboratório" accent="orange">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-orange-400">
          Código de Segurança do Sistema
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {FORMULAS.map((formula) => (
            <li key={formula} className="text-sm text-white/80">
              {formula}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-xs text-white/60">
        Peça os números dos frascos ao Perito de Imagens e calcule os 4 dígitos da senha para o Hacker
        de Sistemas digitar no cofre.
      </p>
    </Panel>
  );
}
