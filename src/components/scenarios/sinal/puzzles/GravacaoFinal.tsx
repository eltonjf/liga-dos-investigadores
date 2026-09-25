import { useEffect, useRef, useState } from "react";
import { FINAL_AUDIO_CLUE } from "../../../../data/scenarios/cenario-sinal";
import { Panel } from "../../../ui/Panel";

export function GravacaoFinal() {
  const [playing, setPlaying] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!playing) return;
    const bars = barsRef.current?.children;
    if (!bars) return;
    const interval = setInterval(() => {
      for (const bar of bars) {
        (bar as HTMLElement).style.height = `${10 + Math.random() * 90}%`;
      }
    }, 120);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <Panel title={FINAL_AUDIO_CLUE.title} accent="purple">
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <div ref={barsRef} className="flex h-16 items-end gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-full rounded-sm bg-purple-400/70"
              style={{ height: playing ? "10%" : "6%" }}
            />
          ))}
        </div>

        <audio
          src={FINAL_AUDIO_CLUE.src}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="mt-4 w-full"
          controls
        />

        <p className="mt-2 text-xs text-white/60">
          Descreva em voz alta os sons que ouvir e cruze-os com os dossiês do Especialista em
          Comportamento para ajudar o Detetive a decidir a acusação.
        </p>
      </div>
    </Panel>
  );
}
