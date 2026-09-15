import { useState } from "react";
import { TERMINAL_PASSWORD } from "../../data/scenarios/cenario-trofeu";
import { patchGameState } from "../../hooks/useGameState";
import type { GameState } from "../../types";
import { Panel } from "../ui/Panel";

interface HackerSistemasProps {
  sessionId: string;
  gameState: GameState | null;
}

export function HackerSistemas({ sessionId, gameState }: HackerSistemasProps) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<string[]>(["> Sistema de segurança da escola", "> Aguardando senha..."]);
  const [submitting, setSubmitting] = useState(false);

  const solved = gameState?.puzzle_1_solved ?? false;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || submitting) return;
    setSubmitting(true);
    const attempt = input.trim().toUpperCase();
    if (attempt === TERMINAL_PASSWORD) {
      setLog((l) => [...l, `> ${attempt}`, "> ACESSO CONCEDIDO ✓"]);
      await patchGameState(sessionId, { puzzle_1_solved: true });
    } else {
      setLog((l) => [...l, `> ${attempt}`, "> SENHA INCORRETA. Peça a pista ao Criptógrafo."]);
    }
    setInput("");
    setSubmitting(false);
  }

  return (
    <Panel title="Terminal de Acesso" accent="green">
      <div className="h-48 overflow-y-auto rounded-xl border border-slate-700 bg-black p-3 font-mono text-sm text-green-400">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {solved && <div className="mt-2 text-cyan-400">Puzzle 1 desbloqueado para toda a equipe!</div>}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={solved}
          placeholder="Digite a senha..."
          className="w-full rounded-xl border-2 border-slate-700 bg-slate-950 px-3 py-2 font-mono uppercase text-white outline-none focus:border-green-400 focus:shadow-neon-green disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={solved || submitting}
          className="rounded-xl border-2 border-green-400 px-4 font-mono text-green-400 shadow-neon-green hover:bg-green-400/10 disabled:opacity-40"
        >
          Enviar
        </button>
      </form>
    </Panel>
  );
}
