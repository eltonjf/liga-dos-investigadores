import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalistaAudio } from "../components/roles/AnalistaAudio";
import { Criptografo } from "../components/roles/Criptografo";
import { DetetiveChefe } from "../components/roles/DetetiveChefe";
import { EspecialistaComportamento } from "../components/roles/EspecialistaComportamento";
import { HackerSistemas } from "../components/roles/HackerSistemas";
import { PeritoImagens } from "../components/roles/PeritoImagens";
import { Panel } from "../components/ui/Panel";
import { ROLES } from "../data/scenarios/cenario-trofeu";
import { useAuthUser } from "../hooks/useAuthUser";
import { useGameState } from "../hooks/useGameState";
import { usePlayers } from "../hooks/usePlayers";
import { useSession } from "../hooks/useSession";

export function Game() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const user = useAuthUser();
  const session = useSession(sessionId);
  const players = usePlayers(sessionId);
  const gameState = useGameState(sessionId);

  const me = useMemo(() => players.find((p) => p.uid === user?.uid), [players, user]);

  useEffect(() => {
    if (session === null || (session && session.status !== "playing") || (session && user && !me)) {
      navigate(`/lobby/${sessionId}`);
    }
  }, [session, me, user, sessionId, navigate]);

  if (!sessionId || !me || !session || session.status !== "playing") {
    return (
      <main className="flex min-h-svh items-center justify-center">
        <p className="font-mono text-white/60">Carregando caso...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row">
      <aside className="lg:w-64 lg:shrink-0">
        <Panel title="Equipe" accent="cyan">
          <ul className="flex flex-col gap-2">
            {ROLES.map((role) => {
              const holder = players.find((p) => p.role_id === role.id);
              return (
                <li key={role.id} className="flex items-center gap-2 text-sm">
                  <span>{role.icon}</span>
                  <span className={holder ? "text-white" : "text-white/30"}>
                    {holder?.name ?? "—"}
                  </span>
                  {holder?.uid === user?.uid && (
                    <span className="ml-auto text-[10px] text-neon-lime">você</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-ink-700 pt-3 text-xs text-white/50">
            <p>Pilha da lanterna: {gameState?.battery_tips ?? 100}%</p>
            <p className="mt-1">
              Puzzle 1: {gameState?.puzzle_1_solved ? "resolvido ✓" : "pendente"}
            </p>
          </div>
        </Panel>
      </aside>

      <section className="flex-1">
        <RoleView roleId={me.role_id} sessionId={sessionId} gameState={gameState} />
      </section>
    </main>
  );
}

function RoleView({
  roleId,
  sessionId,
  gameState,
}: {
  roleId: string;
  sessionId: string;
  gameState: ReturnType<typeof useGameState>;
}) {
  switch (roleId) {
    case "perito-imagens":
      return <PeritoImagens />;
    case "analista-audio":
      return <AnalistaAudio />;
    case "criptografo":
      return <Criptografo />;
    case "hacker-sistemas":
      return <HackerSistemas sessionId={sessionId} gameState={gameState} />;
    case "especialista-comportamento":
      return <EspecialistaComportamento />;
    case "detetive-chefe":
      return <DetetiveChefe sessionId={sessionId} gameState={gameState} />;
    default:
      return null;
  }
}
