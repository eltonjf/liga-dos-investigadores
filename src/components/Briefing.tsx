import { acceptBriefing } from "../hooks/useGameState";
import { Button } from "./ui/Button";
import type { Player } from "../types";

interface BriefingProps {
  sessionId: string;
  myUid: string;
  players: Player[];
  accepted: string[];
  title?: string;
  body?: string;
  highlight?: string;
  missionLine?: string;
}

const DEFAULT_TITLE = "Transmissão da Diretoria";
const DEFAULT_BODY =
  "Agentes, o Troféu de Ciências foi roubado. Para pegarmos o culpado, vocês precisam trabalhar em equipe. NENHUM DE VOCÊS TEM A RESPOSTA COMPLETA. O Perito vê pistas que o Criptógrafo precisa traduzir. O Hacker só consegue agir se o Analista ouvir as frequências. Falem em voz alta o que estão vendo!";
const DEFAULT_HIGHLIGHT = "NENHUM DE VOCÊS TEM A RESPOSTA COMPLETA.";
const DEFAULT_MISSION_LINE = "Missão: Derrubem o Firewall e encontrem a gravação de segurança.";

export function Briefing({
  sessionId,
  myUid,
  players,
  accepted,
  title = DEFAULT_TITLE,
  body = DEFAULT_BODY,
  highlight = DEFAULT_HIGHLIGHT,
  missionLine = DEFAULT_MISSION_LINE,
}: BriefingProps) {
  const iAccepted = accepted.includes(myUid);
  const acceptedCount = players.filter((p) => accepted.includes(p.uid)).length;
  const bodyParts = highlight && body.includes(highlight) ? body.split(highlight) : [body];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border-2 border-cyan-400 bg-slate-900 p-6 shadow-neon-cyan">
        <h2 className="text-center text-lg font-extrabold uppercase tracking-widest text-cyan-300 text-glow">
          {title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/80">
          {bodyParts.length > 1 ? (
            <>
              {bodyParts[0]}
              <strong className="text-yellow-400">{highlight}</strong>
              {bodyParts[1]}
            </>
          ) : (
            body
          )}
        </p>
        <p className="mt-3 rounded-lg border border-green-400/40 bg-black/40 p-3 font-mono text-sm text-green-400">
          {missionLine}
        </p>

        {iAccepted ? (
          <p className="mt-6 text-center text-sm text-white/60">
            Aguardando outros agentes... ({acceptedCount}/{players.length})
          </p>
        ) : (
          <Button
            variant="primary"
            onClick={() => acceptBriefing(sessionId, myUid)}
            className="mt-6 w-full"
          >
            Aceitar Missão
          </Button>
        )}

        <ul className="mt-4 flex flex-wrap justify-center gap-2">
          {players.map((p) => (
            <li
              key={p.uid}
              className={`rounded-full border px-2 py-1 text-xs ${
                accepted.includes(p.uid)
                  ? "border-green-400 text-green-400"
                  : "border-slate-700 text-white/40"
              }`}
            >
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
