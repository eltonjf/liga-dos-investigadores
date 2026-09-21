import { useEffect, useRef, useState } from "react";
import { AUDIO_CLUES, FINAL_AUDIO_CLUE } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";
import { RadioInterceptador } from "../puzzles/RadioInterceptador";
import type { GameState } from "../../types";

interface AnalistaAudioProps {
  gameState: GameState | null;
}

export function AnalistaAudio({ gameState }: AnalistaAudioProps) {
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

  const clues = gameState?.final_terminal_solved ? [...AUDIO_CLUES, FINAL_AUDIO_CLUE] : AUDIO_CLUES;

  return (
    <div className="flex flex-col gap-4">
      <RadioInterceptador solved={gameState?.radio_code_solved ?? false} />
      <Panel title="Gravações Interceptadas" accent="purple">
        {clues.map((clue) => (
          <div key={clue.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="font-mono text-sm font-bold text-purple-400">{clue.title}</p>
            <p className="mt-1 text-xs text-white/60">{clue.description}</p>

            <div ref={barsRef} className="mt-4 flex h-20 items-end gap-1">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-sm bg-purple-400/70"
                  style={{ height: playing ? "10%" : "4%" }}
                />
              ))}
            </div>

            <button
              onClick={() => setPlaying((p) => !p)}
              className="mt-4 w-full rounded-xl border-2 border-purple-500 py-2 font-mono uppercase tracking-wide text-purple-400 shadow-neon-purple hover:bg-purple-500/10"
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
    </div>
  );
}
