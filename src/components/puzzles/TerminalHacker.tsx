import { useState } from "react";
import { Panel } from "../ui/Panel";

interface TerminalHackerProps {
  title: string;
  code: string;
  solved: boolean;
  onSolved: () => void;
  hint: string;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Limpar", "0", "⌫"];

export function TerminalHacker({ title, code, solved, onSolved, hint }: TerminalHackerProps) {
  const [digits, setDigits] = useState("");
  const [error, setError] = useState(false);

  if (solved) {
    return (
      <Panel title={title} accent="green">
        <p className="text-center font-bold uppercase tracking-wide text-green-400">
          Sistema Desbloqueado
        </p>
      </Panel>
    );
  }

  function handleKey(key: string) {
    if (error) return;
    if (key === "Limpar") {
      setDigits("");
      return;
    }
    if (key === "⌫") {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (digits.length >= code.length) return;

    const next = digits + key;
    setDigits(next);
    if (next.length === code.length) {
      if (next === code) {
        onSolved();
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setDigits("");
        }, 1000);
      }
    }
  }

  const display = digits.padEnd(code.length, "•").split("").join(" ");

  return (
    <Panel title={title} accent="green">
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
      <p className="mt-3 text-xs text-white/60">{hint}</p>
    </Panel>
  );
}
