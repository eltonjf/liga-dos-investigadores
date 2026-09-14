import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Panel } from "../components/ui/Panel";
import { RoleBadge } from "../components/ui/RoleBadge";
import { ROLES, SCENARIO_FALLBACK } from "../data/scenarios/cenario-trofeu";
import { useAuthUser } from "../hooks/useAuthUser";
import { usePlayers } from "../hooks/usePlayers";
import { useSession } from "../hooks/useSession";
import { pickRole, startGame } from "../lib/sessions";
import type { RoleId } from "../types";

export function Lobby() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const user = useAuthUser();
  const session = useSession(sessionId);
  const players = usePlayers(sessionId);

  const [name, setName] = useState(() => localStorage.getItem("li_name") ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const me = useMemo(() => players.find((p) => p.uid === user?.uid), [players, user]);
  const isHost = Boolean(user && session && session.host_id === user.uid);

  useEffect(() => {
    if (session?.status === "playing") {
      navigate(`/game/${sessionId}`);
    }
  }, [session?.status, sessionId, navigate]);

  useEffect(() => {
    localStorage.setItem("li_name", name);
  }, [name]);

  async function handlePick(roleId: RoleId) {
    if (!user || !sessionId) return;
    if (!name.trim()) {
      setError("Digite seu nome antes de escolher um crachá.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await pickRole(sessionId, user.uid, name.trim(), roleId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível escolher esse crachá.");
    } finally {
      setBusy(false);
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

  if (session === undefined) {
    return <CenteredMessage text="Carregando sala..." />;
  }

  if (session === null) {
    return <CenteredMessage text={`Sala "${sessionId}" não encontrada.`} />;
  }

  return (
    <main className="mx-auto flex min-h-svh max-w-4xl flex-col gap-6 px-4 py-10">
      <header className="text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan text-glow">
          Sala {sessionId}
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">{SCENARIO_FALLBACK.title}</h1>
        <p className="mt-1 text-sm text-white/60">
          Escolha seu crachá de investigador. {players.length}/6 investigadores prontos.
        </p>
      </header>

      {!me && (
        <Panel accent="lime" className="mx-auto w-full max-w-sm">
          <label className="block text-xs font-mono uppercase tracking-widest text-neon-lime">
            Seu nome
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Júlia"
            maxLength={24}
            className="mt-2 w-full rounded-lg border-2 border-ink-700 bg-ink-950 px-3 py-2 text-white outline-none focus:border-neon-lime"
          />
        </Panel>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map((role) => {
          const holder = players.find((p) => p.role_id === role.id);
          return (
            <RoleBadge
              key={role.id}
              role={role}
              takenBy={holder?.name}
              isMine={holder?.uid === user?.uid}
              disabled={busy || Boolean(me)}
              onSelect={() => handlePick(role.id)}
            />
          );
        })}
      </div>

      {error && <p className="text-center text-sm text-red-400">{error}</p>}

      {isHost && (
        <div className="mx-auto flex flex-col items-center gap-2">
          <Button variant="cyan" onClick={handleStart} disabled={busy || players.length === 0}>
            Iniciar investigação
          </Button>
          {players.length < 6 && (
            <p className="text-xs text-white/50">
              O ideal é ter os 6 investigadores prontos, mas você pode começar com menos para testar.
            </p>
          )}
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
