import { Search, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Briefing } from "../components/Briefing";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { getScenario } from "../data/scenarios/registry";
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

  const scenario = getScenario(session.scenario_id);

  const briefingAccepted = gameState?.briefing_accepted ?? [];
  const briefingDone = players.length > 0 && players.every((p) => briefingAccepted.includes(p.uid));

  if (!briefingDone) {
    return (
      <Briefing
        sessionId={sessionId}
        myUid={me.uid}
        players={players}
        accepted={briefingAccepted}
        title={scenario.briefing?.title}
        body={scenario.briefing?.body}
        highlight={scenario.briefing?.highlight}
        missionLine={scenario.briefing?.missionLine}
      />
    );
  }

  if (scenario.VictoryScreen && scenario.isComplete(gameState)) {
    return <scenario.VictoryScreen players={players} />;
  }

  const progressPct = scenario.progressPct(gameState);

  const myRoles = me.role_ids.map((id) => scenario.ROLES.find((r) => r.id === id)!);
  const currentRoleId =
    activeRoleId && me.role_ids.includes(activeRoleId) ? activeRoleId : myRoles[0].id;

  const badges = (
    scenario.BADGES_BY_PLAYER_COUNT[session.player_count ?? 6] ?? scenario.BADGES_BY_PLAYER_COUNT[6]
  ).map((ids) => ids.map((id) => scenario.ROLES.find((r) => r.id === id)!));

  return (
    <main className="mx-auto flex min-h-svh max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400 text-glow" size={28} />
          <Search className="text-cyan-400 text-glow" size={28} />
          <h1 className="text-2xl font-extrabold uppercase tracking-wide text-cyan-300 text-glow">
            {scenario.fallback.title}
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
            <scenario.StatusPanel gameState={gameState} />
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
          <scenario.RoleView roleId={currentRoleId} sessionId={sessionId} gameState={gameState} />
        </section>
      </div>
    </main>
  );
}
