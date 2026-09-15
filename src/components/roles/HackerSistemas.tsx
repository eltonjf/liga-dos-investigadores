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
    <Panel title="Terminal de Acesso" accent="amber">
      <div className="h-48 overflow-y-auto rounded-lg border border-ink-700 bg-black p-3 font-mono text-sm text-neon-lime">
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {solved && <div className="mt-2 text-neon-cyan">Puzzle 1 desbloqueado para toda a equipe!</div>}
      </div>

      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={solved}
          placeholder="Digite a senha..."
          className="w-full rounded-lg border-2 border-ink-700 bg-ink-950 px-3 py-2 font-mono uppercase text-white outline-none focus:border-neon-amber disabled:opacity-40"
        />
        <button
          type="submit"
          disabled={solved || submitting}
          className="rounded-lg border-2 border-neon-amber px-4 font-mono text-neon-amber hover:bg-neon-amber/10 disabled:opacity-40"
        >
          Enviar
        </button>
      </form>
    </Panel>
  );
}
