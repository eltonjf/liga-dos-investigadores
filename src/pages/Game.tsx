import { Search, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnalistaAudio } from "../components/roles/AnalistaAudio";
import { Criptografo } from "../components/roles/Criptografo";
import { DetetiveChefe } from "../components/roles/DetetiveChefe";
import { EspecialistaComportamento } from "../components/roles/EspecialistaComportamento";
import { HackerSistemas } from "../components/roles/HackerSistemas";
import { PeritoImagens } from "../components/roles/PeritoImagens";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { BADGES_BY_PLAYER_COUNT, ROLES, SCENARIO_FALLBACK } from "../data/scenarios/cenario-trofeu";
import { useAuthUser } from "../hooks/useAuthUser";
import { useGameState } from "../hooks/useGameState";
import { usePlayers } from "../hooks/usePlayers";
import { useSession } from "../hooks/useSession";
import type { RoleId } from "../types";

export function Game() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const user = useAuthUser();
  const session = useSession(sessionId);
  const players = usePlayers(sessionId);
  const gameState = useGameState(sessionId);

  const me = useMemo(() => players.find((p) => p.uid === user?.uid), [players, user]);
  const [activeRoleId, setActiveRoleId] = useState<RoleId | null>(null);

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

  const checkpointsDone =
    Number(Boolean(gameState?.puzzle_1_solved)) + Number(Boolean(gameState?.accusation));
  const progressPct = (checkpointsDone / 2) * 100;

  const myRoles = me.role_ids.map((id) => ROLES.find((r) => r.id === id)!);
  const currentRoleId =
    activeRoleId && me.role_ids.includes(activeRoleId) ? activeRoleId : myRoles[0].id;

  const badges = (BADGES_BY_PLAYER_COUNT[session.player_count ?? 6] ?? BADGES_BY_PLAYER_COUNT[6]).map(
    (ids) => ids.map((id) => ROLES.find((r) => r.id === id)!),
  );

  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400 text-glow" size={28} />
          <Search className="text-cyan-400 text-glow" size={28} />
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-cyan-300 text-glow">
            {SCENARIO_FALLBACK.title}
          </h1>
        </div>
        <div className="h-3 w-full max-w-xl overflow-hidden rounded-full border border-slate-700 bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-cyan-400 to-green-400 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className="lg:w-64 lg:shrink-0">
          <Panel title="Equipe" accent="cyan">
            <ul className="flex flex-col gap-2">
              {badges.map((roles) => {
                const holder = players.find((p) => p.role_ids.includes(roles[0].id));
                return (
                  <li key={roles.map((r) => r.id).join("+")} className="flex items-center gap-2 text-sm">
                    <span>{roles.map((r) => r.icon).join(" ")}</span>
                    <span className={holder ? "text-white" : "text-white/30"}>
                      {holder?.name ?? "—"}
                    </span>
                    {holder?.uid === user?.uid && (
                      <span className="ml-auto text-[10px] text-green-400">você</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 border-t border-slate-700 pt-3 text-xs text-white/50">
              <p>Pilha da lanterna: {gameState?.battery_tips ?? 100}%</p>
              <p className="mt-1">
                Puzzle 1: {gameState?.puzzle_1_solved ? "resolvido ✓" : "pendente"}
              </p>
            </div>
          </Panel>
        </aside>

        <section className="flex-1">
          {myRoles.length > 1 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {myRoles.map((role) => (
                <Button
                  key={role.id}
                  variant={role.color}
                  onClick={() => setActiveRoleId(role.id)}
                  className={`flex items-center gap-2 ${currentRoleId === role.id ? "" : "opacity-40"}`}
                >
                  <span>{role.icon}</span>
                  {role.label}
                </Button>
              ))}
            </div>
          )}
          <RoleView roleId={currentRoleId} sessionId={sessionId} gameState={gameState} />
        </section>
      </div>
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
