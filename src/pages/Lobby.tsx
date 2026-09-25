import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { RoleBadge } from "../components/ui/RoleBadge";
import { getScenario } from "../data/scenarios/registry";
import { useAuthUser } from "../hooks/useAuthUser";
import { usePlayers } from "../hooks/usePlayers";
import { useSession } from "../hooks/useSession";
import { pickBadge, setPlayerCount, startGame } from "../lib/sessions";
import type { RoleId } from "../types";

const PLAYER_COUNTS = [2, 3, 4, 5, 6];

export function Lobby() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const user = useAuthUser();
  const session = useSession(sessionId);
  const players = usePlayers(sessionId);

  const [name, setName] = useState(() => localStorage.getItem("li_name") ?? "");
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingBadge, setPendingBadge] = useState<RoleId[] | null>(null);

  const scenario = getScenario(session?.scenario_id);
  const me = useMemo(() => players.find((p) => p.uid === user?.uid), [players, user]);
  const isHost = Boolean(user && session && session.host_id === user.uid);
  const playerCount = session?.player_count ?? 6;
  const badges = useMemo(
    () =>
      (scenario.BADGES_BY_PLAYER_COUNT[playerCount] ?? scenario.BADGES_BY_PLAYER_COUNT[6]).map((ids) =>
        ids.map((id) => scenario.ROLES.find((r) => r.id === id)!),
      ),
    [playerCount, scenario],
  );
  const assignedRoleIds = useMemo(() => new Set(players.flatMap((p) => p.role_ids)), [players]);
  const allRolesAssigned = scenario.ROLES.every((r) => assignedRoleIds.has(r.id));

  useEffect(() => {
    if (session?.status === "playing") {
      navigate(`/game/${sessionId}`);
    }
  }, [session?.status, sessionId, navigate]);

  useEffect(() => {
    localStorage.setItem("li_name", name);
  }, [name]);

  function handleConfirmName() {
    if (!name.trim()) {
      setError("Digite seu nome antes de continuar.");
      return;
    }
    setError(null);
    setNameConfirmed(true);
  }

  async function doPick(roleIds: RoleId[]) {
    if (!user || !sessionId) return;
    if (!name.trim()) {
      setError("Digite seu nome antes de escolher um crachá.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await pickBadge(sessionId, user.uid, name.trim(), roleIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível escolher esse crachá.");
    } finally {
      setBusy(false);
    }
  }

  function handleSelectBadge(roleIds: RoleId[]) {
    if (roleIds.length > 1) {
      setPendingBadge(roleIds);
    } else {
      doPick(roleIds);
    }
  }

  async function handleConfirmBadge() {
    if (!pendingBadge) return;
    await doPick(pendingBadge);
    setPendingBadge(null);
  }

  async function handleSetPlayerCount(count: number) {
    if (!sessionId) return;
    try {
      await setPlayerCount(sessionId, count);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível alterar o número de jogadores.");
    }
  }

  async function handleStart() {
    if (!sessionId) return;
    setBusy(true);
    setError(null);
    try {
      await startGame(sessionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível iniciar o caso.");
    } finally {
      setBusy(false);
    }
  }

  if (!user) {
    return <CenteredMessage text="Autenticando..." />;
  }

  if (session === undefined) {
    return <CenteredMessage text="Carregando sala..." />;
  }

  if (session === null) {
    return <CenteredMessage text={`Sala "${sessionId}" não encontrada.`} />;
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-4xl flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400">Sala {sessionId}</p>
        <h1 className="mt-2 text-2xl font-bold text-white">{scenario.fallback.title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Escolha seu crachá de investigador. {assignedRoleIds.size}/{scenario.ROLES.length} papéis
          distribuídos.
        </p>
      </header>

      <div className="mx-auto flex flex-col items-center gap-2">
        <p className="text-xs uppercase tracking-widest text-slate-400">Jogadores nesta missão</p>
        {isHost ? (
          <div className="flex gap-2">
            {PLAYER_COUNTS.map((count) => (
              <button
                key={count}
                onClick={() => handleSetPlayerCount(count)}
                disabled={players.length > 0}
                className={`h-10 w-10 rounded-full border-2 font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                  playerCount === count
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-neon-cyan"
                    : "border-slate-700 text-slate-400 hover:border-slate-500"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        ) : (
          <p className="font-bold text-cyan-300">{playerCount}</p>
        )}
      </div>

      {!me && !nameConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-96 rounded-2xl border-2 border-cyan-400 bg-slate-900 p-6 shadow-neon-cyan">
            <label className="block text-xs font-mono uppercase tracking-widest text-slate-400">Seu nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirmName()}
              placeholder="Ex: Júlia"
              maxLength={24}
              className="mt-2 w-full rounded-2xl border-2 border-slate-700 bg-slate-800 px-4 py-2 text-white outline-none transition-colors focus:border-cyan-400 focus:shadow-neon-cyan"
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            <Button variant="primary" onClick={handleConfirmName} className="mt-4 w-full">
              Continuar
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((roles) => {
          const holder = players.find((p) => p.role_ids.includes(roles[0].id));
          return (
            <RoleBadge
              key={roles.map((r) => r.id).join("+")}
              roles={roles}
              takenBy={holder?.name}
              isMine={holder?.uid === user?.uid}
              disabled={busy || Boolean(me) || !nameConfirmed}
              onSelect={() => handleSelectBadge(roles.map((r) => r.id))}
            />
          );
        })}
      </div>

      {error && nameConfirmed && <p className="text-center text-sm text-red-400">{error}</p>}

      {isHost && (
        <div className="mx-auto flex flex-col items-center gap-2">
          <Button variant="primary" onClick={handleStart} disabled={busy || !allRolesAssigned}>
            Iniciar investigação
          </Button>
          {!allRolesAssigned && (
            <p className="text-xs text-white/50">
              Faltam {scenario.ROLES.length - assignedRoleIds.size} papéis para distribuir antes de
              começar.
            </p>
          )}
        </div>
      )}

      {pendingBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="w-96 rounded-2xl border-2 border-yellow-400 bg-slate-900 p-6 shadow-neon-yellow">
            <p className="font-bold uppercase tracking-wide text-yellow-400">Atenção</p>
            <p className="mt-2 text-sm text-white/80">
              Este crachá exige cuidar de {pendingBadge.length === 3 ? "três ferramentas" : "duas ferramentas"}!
              Você vai alternar entre elas com abas na tela de jogo.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="yellow" onClick={handleConfirmBadge} disabled={busy} className="flex-1">
                Confirmar
              </Button>
              <Button
                variant="primary"
                onClick={() => setPendingBadge(null)}
                disabled={busy}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function CenteredMessage({ text }: { text: string }) {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 text-center">
      <p className="font-mono text-white/70">{text}</p>
    </main>
  );
}
