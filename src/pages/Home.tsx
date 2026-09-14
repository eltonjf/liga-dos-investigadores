import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { useAuthUser } from "../hooks/useAuthUser";
import { createSession } from "../lib/sessions";
import { SCENARIO_FALLBACK } from "../data/scenarios/cenario-trofeu";

export function Home() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!user) return;
    setCreating(true);
    setError(null);
    try {
      const sessionId = await createSession(user.uid);
      navigate(`/lobby/${sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível criar a sala.");
    } finally {
      setCreating(false);
    }
  }

  function handleJoin() {
    const code = joinCode.trim().toUpperCase();
    if (code.length < 4) {
      setError("Digite o código de 4 letras da sala.");
      return;
    }
    navigate(`/lobby/${code}`);
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-8 px-4 py-10">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan text-glow">
          Liga dos Investigadores
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">{SCENARIO_FALLBACK.title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Tempo limite: {SCENARIO_FALLBACK.timeLimit} minutos · 6 investigadores
        </p>
      </div>

      <Panel title="Criar nova sala" accent="cyan" className="w-full">
        <p className="mb-4 text-sm text-white/70">
          Você vira o anfitrião e recebe um código para compartilhar com a equipe.
        </p>
        <Button variant="cyan" onClick={handleCreate} disabled={!user || creating} className="w-full">
          {creating ? "Criando..." : "Criar sala"}
        </Button>
      </Panel>

      <Panel title="Entrar com código" accent="magenta" className="w-full">
        <div className="flex gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            maxLength={4}
            placeholder="XXXX"
            className="w-full rounded-lg border-2 border-ink-700 bg-ink-950 px-3 py-2 text-center font-mono text-lg uppercase tracking-[0.4em] text-neon-magenta outline-none focus:border-neon-magenta"
          />
          <Button variant="magenta" onClick={handleJoin}>
            Entrar
          </Button>
        </div>
      </Panel>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </main>
  );
}
