import { LogIn, Plus, Search, Trophy } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { useAuthUser } from "../hooks/useAuthUser";
import { createSession } from "../lib/sessions";
import { DEFAULT_SCENARIO_ID, SCENARIO_LIST } from "../data/scenarios/registry";

export function Home() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [scenarioId, setScenarioId] = useState(DEFAULT_SCENARIO_ID);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!user) return;
    setCreating(true);
    setError(null);
    try {
      const sessionId = await createSession(user.uid, scenarioId);
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
      setError("Digite o código da sala.");
      return;
    }
    navigate(`/lobby/${code}`);
  }

  if (!user) {
    return (
      <main className="flex min-h-svh items-center justify-center px-4 text-center">
        <p className="font-mono text-white/70">Autenticando...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-8 px-4 py-10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Trophy className="text-yellow-400 text-glow" size={26} />
          <Search className="text-cyan-400 text-glow" size={26} />
          <h1 className="text-2xl font-extrabold tracking-[0.2em] text-cyan-300 text-glow">
            SISTEMA L.I.G.A.
          </h1>
        </div>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.3em] text-slate-400">
          Terminal de Acesso Tático
        </p>
      </div>

      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">
          Liga dos Investigadores
        </p>
      </div>

      <Panel title="Criar nova sala" accent="cyan" className="w-full">
        <p className="mb-3 text-sm text-white/70">Escolha o caso e vire o anfitrião da missão.</p>
        <div className="flex flex-col gap-2">
          {SCENARIO_LIST.map((scenario) => (
            <label
              key={scenario.id}
              className={`flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-3 transition ${
                scenarioId === scenario.id
                  ? "border-cyan-400 bg-cyan-400/10 shadow-neon-cyan"
                  : "border-slate-700"
              }`}
            >
              <span className="flex items-center gap-2">
                <input
                  type="radio"
                  name="scenario"
                  checked={scenarioId === scenario.id}
                  onChange={() => setScenarioId(scenario.id)}
                  className="accent-cyan-400"
                />
                <span className="font-bold text-white">{scenario.fallback.title}</span>
              </span>
              <span className="pl-6 text-xs text-white/50">
                Tempo limite: {scenario.fallback.timeLimit} minutos · 6 investigadores
              </span>
            </label>
          ))}
        </div>
        <Button
          variant="primary"
          onClick={handleCreate}
          disabled={creating}
          className="mt-4 flex w-full items-center justify-center gap-2"
        >
          <Plus size={18} />
          {creating ? "Criando..." : "Criar missão"}
        </Button>
      </Panel>

      <Panel title="Entrar com código" accent="purple" className="w-full">
        <div className="flex gap-2">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            maxLength={10}
            placeholder="LIGA-XXXX"
            className="w-full rounded-2xl border-2 border-slate-700 bg-slate-800 px-4 py-2 text-center font-mono text-lg uppercase tracking-widest text-white outline-none transition-colors focus:border-purple-500 focus:shadow-neon-purple"
          />
          <Button variant="purple" onClick={handleJoin} className="flex items-center gap-2">
            <LogIn size={18} />
            Entrar
          </Button>
        </div>
      </Panel>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </main>
  );
}
