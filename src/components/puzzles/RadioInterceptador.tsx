import { RADIO_TRANSMISSION } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

interface RadioInterceptadorProps {
  solved: boolean;
}

export function RadioInterceptador({ solved }: RadioInterceptadorProps) {
  return (
    <Panel title="Rádio Interceptador" accent="purple">
      {solved && (
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-green-400">
          Trava de rádio já decodificada ✓
        </p>
      )}
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="font-mono text-sm font-bold text-purple-400">{RADIO_TRANSMISSION.title}</p>

        <p className="mt-4 rounded-lg border border-purple-500/40 bg-black/40 p-3 font-mono text-sm text-purple-300">
          "{RADIO_TRANSMISSION.transcript}"
        </p>
        <p className="mt-2 text-xs text-white/60">
          Repasse o codinome e os dígitos para o Especialista em Comportamento e o Hacker.
        </p>
      </div>
    </Panel>
  );
}
