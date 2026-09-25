import { FlaskConical } from "lucide-react";
import { FRASCOS } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

interface CenaDosFrascosProps {
  solved: boolean;
}

export function CenaDosFrascos({ solved }: CenaDosFrascosProps) {
  if (solved) {
    return (
      <Panel accent="cyan">
        <p className="text-center font-bold uppercase tracking-wide text-cyan-400">
          Sistema Desbloqueado
        </p>
      </Panel>
    );
  }

  return (
    <Panel title="Cena dos Frascos" accent="cyan">
      <div className="flex items-end justify-center gap-6 border-b-4 border-gray-600 bg-slate-900/80 px-6 pb-0 pt-8">
        {FRASCOS.map((frasco) => (
          <div key={frasco.color} className="flex flex-col items-center gap-2 pb-4">
            <FlaskConical size={48} color={frasco.hex} />
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: frasco.hex }}
            >
              {frasco.value}
            </span>
            <span className="text-xs text-white/60">{frasco.color}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">
        Leia em voz alta o número de cada frasco para o Criptógrafo aplicar as fórmulas.
      </p>
    </Panel>
  );
}
