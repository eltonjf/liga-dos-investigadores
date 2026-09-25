import { AUDIO_CLUES, FINAL_AUDIO_CLUE } from "../../data/scenarios/cenario-trofeu";
import { Panel } from "../ui/Panel";
import { RadioInterceptador } from "../puzzles/RadioInterceptador";
import type { GameState } from "../../types";

interface AnalistaAudioProps {
  gameState: GameState | null;
}

export function AnalistaAudio({ gameState }: AnalistaAudioProps) {
  const clues = gameState?.final_terminal_solved ? [...AUDIO_CLUES, FINAL_AUDIO_CLUE] : AUDIO_CLUES;

  return (
    <div className="flex flex-col gap-4">
      <RadioInterceptador solved={gameState?.radio_code_solved ?? false} />
      <Panel title="Gravações Interceptadas" accent="purple">
        {clues.map((clue) => (
          <div key={clue.id} className="rounded-xl border border-slate-700 bg-slate-950 p-4">
            <p className="font-mono text-sm font-bold text-purple-400">{clue.title}</p>
            <p className="mt-1 text-xs text-white/60">{clue.description}</p>

            {clue === FINAL_AUDIO_CLUE && (
              <audio src={FINAL_AUDIO_CLUE.src} className="mt-4 w-full" controls />
            )}
          </div>
        ))}
      </Panel>
    </div>
  );
}
