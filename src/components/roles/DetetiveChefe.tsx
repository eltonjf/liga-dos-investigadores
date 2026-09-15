import { useState } from "react";
import { SUSPECTS } from "../../data/scenarios/cenario-trofeu";
import { patchGameState } from "../../hooks/useGameState";
import type { GameState } from "../../types";
import { Panel } from "../ui/Panel";

interface DetetiveChefeProps {
  sessionId: string;
  gameState: GameState | null;
}

export function DetetiveChefe({ sessionId, gameState }: DetetiveChefeProps) {
  const [selected, setSelected] = useState<string | null>(gameState?.accusation ?? null);
  const [confirming, setConfirming] = useState(false);

  const accused = gameState?.accusation;

  async function handleAccuse() {
    if (!selected) return;
    setConfirming(true);
    await patchGameState(sessionId, { accusation: selected });
    setConfirming(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Mapa da Escola" accent="yellow">
        <svg viewBox="0 0 320 180" className="w-full rounded-xl border border-slate-700 bg-slate-950">
          <rect x="10" y="10" width="90" height="70" fill="#141a29" stroke="#22f2ff" />
          <text x="55" y="50" textAnchor="middle" fontSize="9" fill="#22f2ff" fontFamily="monospace">
            QUADRA
          </text>
          <rect x="115" y="10" width="90" height="70" fill="#141a29" stroke="#ffb020" />
          <text x="160" y="50" textAnchor="middle" fontSize="9" fill="#ffb020" fontFamily="monospace">
            TROFÉUS
          </text>
          <rect x="220" y="10" width="90" height="70" fill="#141a29" stroke="#ff2ee6" />
          <text x="265" y="50" textAnchor="middle" fontSize="9" fill="#ff2ee6" fontFamily="monospace">
            BIBLIOTECA
          </text>
          <rect x="10" y="95" width="300" height="70" fill="#141a29" stroke="#b6ff1f" />
          <text x="160" y="135" textAnchor="middle" fontSize="9" fill="#b6ff1f" fontFamily="monospace">
            PÁTIO CENTRAL
          </text>
        </svg>
      </Panel>

      <Panel title="Formulário de Acusação Final" accent="yellow">
        {accused ? (
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
