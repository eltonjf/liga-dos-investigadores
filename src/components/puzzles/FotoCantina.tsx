import { Droplets } from "lucide-react";
import { Panel } from "../ui/Panel";

interface FotoCantinaProps {
  locked: boolean;
  solved: boolean;
}

export function FotoCantina({ locked, solved }: FotoCantinaProps) {
  if (locked) {
    return (
      <Panel accent="cyan">
        <p className="text-center text-xs uppercase tracking-wide text-white/40">
          Derrube o Firewall (Fase 1) para liberar a foto da cena.
        </p>
      </Panel>
    );
  }

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
    <Panel title="Foto da Cena — Cantina (Sala 5)" accent="cyan">
      <div className="flex flex-col items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 p-6">
        <Droplets size={48} className="text-cyan-300" />
        <p className="text-center text-sm text-white/70">
          Um copo foi deixado sobre a mesa: parte do gelo já derreteu e virou água.
        </p>
      </div>
      <p className="mt-3 text-xs text-white/60">
        Ciências: quantos estados físicos da água aparecem nessa cena (sólido e líquido)?
      </p>
    </Panel>
  );
}
