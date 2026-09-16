import { useState } from "react";
import { COFRE_PASSWORD } from "../../data/scenarios/cenario-trofeu";
import { patchGameState } from "../../hooks/useGameState";
import { Panel } from "../ui/Panel";

interface TerminalHackerProps {
  sessionId: string;
  solved: boolean;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Limpar", "0", "⌫"];

export function TerminalHacker({ sessionId, solved }: TerminalHackerProps) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState(false);

  if (solved) {
    return (
      <Panel accent="green">
        <p className="text-center font-bold uppercase tracking-wide text-green-400">
          Sistema Desbloqueado
        </p>
      </Panel>
    );
  }

  async function handleKey(key: string) {
    if (error) return;
    if (key === "Limpar") {
      setDigits("");
      return;
    }
    if (key === "⌫") {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (digits.length >= 4) return;

    const next = digits + key;
    setDigits(next);
    if (next.length === 4) {
      if (next === COFRE_PASSWORD) {
        await patchGameState(sessionId, { puzzle_1_solved: true });
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setDigits("");
        }, 1000);
      }
    }
  }

  const display = digits.padEnd(4, "•").split("").join(" ");

  return (
    <Panel title="Terminal do Cofre" accent="green">
      <div
        className={`rounded-xl border-2 bg-black p-4 text-center font-mono text-3xl tracking-widest transition-colors ${
          error ? "animate-shake border-red-500 text-red-400" : "border-slate-700 text-green-400"
        }`}
      >
        {display}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {KEYS.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="rounded-xl border-2 border-green-400 py-3 font-mono text-lg text-green-400 shadow-neon-green hover:bg-green-400/10"
          >
            {key}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-white/60">
        Combine os números dos frascos com as fórmulas do Criptógrafo para descobrir a senha de 4
        dígitos do cofre.
      </p>
    </Panel>
  );
}
