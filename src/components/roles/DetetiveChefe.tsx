import { useState } from "react";
import { SUSPECTS } from "../../data/scenarios/cenario-trofeu";
import { patchGameState } from "../../hooks/useGameState";
import type { GameState } from "../../types";
import { MapaTatico } from "../puzzles/MapaTatico";
import { Panel } from "../ui/Panel";

interface DetetiveChefeProps {
  sessionId: string;
  gameState: GameState | null;
}

export function DetetiveChefe({ sessionId, gameState }: DetetiveChefeProps) {
  const [selected, setSelected] = useState<string | null>(gameState?.accusation ?? null);
  const [confirming, setConfirming] = useState(false);

  const accused = gameState?.accusation;
  const firewallDown = Boolean(gameState?.puzzle_1_solved) && Boolean(gameState?.radio_code_solved);
  const finalTerminalSolved = Boolean(gameState?.final_terminal_solved);

  async function handleAccuse() {
    if (!selected) return;
    setConfirming(true);
    await patchGameState(sessionId, { accusation: selected });
    setConfirming(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {firewallDown ? (
        <MapaTatico />
      ) : (
        <Panel accent="green">
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Derrube o Firewall (Fase 1) para liberar o mapa tático.
          </p>
        </Panel>
      )}

      <Panel title="Formulário de Acusação Final" accent="yellow">
        {!finalTerminalSolved ? (
          <p className="text-center text-xs uppercase tracking-wide text-white/40">
            Aguarde o Hacker liberar o sistema final e o Analista de Áudio ouvir a gravação recuperada.
          </p>
        ) : accused ? (
          <p className="text-center font-mono text-yellow-400">
            Acusação registrada: {SUSPECTS.find((s) => s.id === accused)?.name}
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {SUSPECTS.map((s) => (
                <label
                  key={s.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition ${
                    selected === s.id ? "border-yellow-400 bg-yellow-400/10 shadow-neon-yellow" : "border-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="suspect"
                    checked={selected === s.id}
                    onChange={() => setSelected(s.id)}
                    className="accent-yellow-400"
                  />
                  <span className="font-mono text-white">{s.name}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleAccuse}
              disabled={!selected || confirming}
              className="mt-4 w-full rounded-xl border-2 border-yellow-400 py-2 font-mono uppercase tracking-wide text-yellow-400 shadow-neon-yellow hover:bg-yellow-400/10 disabled:opacity-40"
            >
              Confirmar acusação
            </button>
          </>
        )}
      </Panel>
    </div>
  );
}
