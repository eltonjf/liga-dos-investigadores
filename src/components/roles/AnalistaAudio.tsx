import { useEffect, useRef, useState } from "react";
import { AUDIO_CLUES } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";

export function AnalistaAudio() {
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
    <Panel title="Gravações Interceptadas" accent="magenta">
      {AUDIO_CLUES.map((clue) => (
        <div key={clue.id} className="rounded-lg border border-ink-700 bg-ink-950 p-4">
          <p className="font-mono text-sm font-bold text-neon-magenta">{clue.title}</p>
          <p className="mt-1 text-xs text-white/60">{clue.description}</p>

          <div ref={barsRef} className="mt-4 flex h-20 items-end gap-1">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-full rounded-sm bg-neon-magenta/70"
                style={{ height: playing ? "10%" : "4%" }}
              />
            ))}
          </div>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-4 w-full rounded-lg border-2 border-neon-magenta py-2 font-mono uppercase tracking-wide text-neon-magenta hover:bg-neon-magenta/10"
          >
            {playing ? "⏸ Pausar" : "▶ Reproduzir"}
          </button>
          <p className="mt-2 text-[11px] text-white/40">
            Placeholder: substitua por um arquivo real em <code>public/audio/</code> e ligue a um
            elemento <code>&lt;audio&gt;</code> quando o áudio da história estiver pronto.
          </p>
        </div>
      ))}
    </Panel>
  );
}
