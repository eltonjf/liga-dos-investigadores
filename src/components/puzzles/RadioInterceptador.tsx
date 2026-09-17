import { useEffect, useRef, useState } from "react";
import { RADIO_TRANSMISSION } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

interface RadioInterceptadorProps {
  solved: boolean;
}

export function RadioInterceptador({ solved }: RadioInterceptadorProps) {
  const [playing, setPlaying] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!playing) return;
    const bars = barsRef.current?.children;
    if (!bars) return;
    const interval = setInterval(() => {
      for (const bar of bars) {
        (bar as HTMLElement).style.height = `${10 + Math.random() * 90}%`;
      }
    }, 90);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <Panel title="Rádio Interceptador" accent="purple">
      {solved && (
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-wide text-green-400">
          Trava de rádio já decodificada ✓
        </p>
      )}
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
        <p className="font-mono text-sm font-bold text-purple-400">{RADIO_TRANSMISSION.title}</p>

        <div ref={barsRef} className="mt-4 flex h-20 items-end gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="w-full rounded-sm bg-purple-400/70"
              style={{ height: playing ? "10%" : "4%" }}
            />
          ))}
        </div>

        {/* ponytail: public/audio/radio-interceptado.mp3 ainda não existe; troque
            pelo arquivo real quando a gravação (ruído de rádio + voz robótica) for gravada. */}
        <audio
          ref={audioRef}
          src="/audio/radio-interceptado.mp3"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          className="mt-4 w-full"
          controls
        />

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
