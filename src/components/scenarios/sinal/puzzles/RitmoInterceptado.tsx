import { useRef, useState } from "react";
import { AUDIO_CLUE_1, BEAT_PATTERN } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function RitmoInterceptado() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <Panel title={AUDIO_CLUE_1.title} accent="purple">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <div className="flex items-center justify-center gap-3">
          {BEAT_PATTERN.map((count, groupIndex) => (
            <div key={groupIndex} className="flex items-center gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <span
                  key={i}
                  className={`h-4 w-4 rounded-full border border-purple-400 ${
                    playing ? "animate-pulse bg-purple-400/70" : "bg-purple-400/20"
                  }`}
                />
              ))}
              {groupIndex < BEAT_PATTERN.length - 1 && <span className="mx-2 text-purple-400/40">|</span>}
            </div>
          ))}
        </div>

        {/* ponytail: public/audio/audio_1.mp3 ainda não existe; troque pelo arquivo
            real (batidas rítmicas) quando a gravação estiver pronta. */}
        <audio
          ref={audioRef}
          src={AUDIO_CLUE_1.src}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="mt-4 w-full"
          controls
        />

        <p className="mt-4 rounded-lg border border-purple-500/40 bg-black/40 p-3 font-mono text-sm text-purple-300">
          {AUDIO_CLUE_1.description}
        </p>
        <p className="mt-2 text-xs text-white/60">
          Repasse o número de batidas de cada grupo para o Especialista em Comportamento e o Hacker
          de Sistemas.
        </p>
      </div>
    </Panel>
  );
}
