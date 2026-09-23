import { AUDIO_CLUE_1 } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function RitmoInterceptado() {
  return (
    <Panel title={AUDIO_CLUE_1.title} accent="purple">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <audio
          src={AUDIO_CLUE_1.src}
          className="w-full"
          controls
        />

        <p className="mt-2 text-xs text-white/60">
          Repasse o número de batidas de cada grupo para o Especialista em Comportamento e o Hacker
          de Sistemas.
        </p>
      </div>
    </Panel>
  );
}
