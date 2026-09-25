import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CERTIFICATE_TEXT } from "../../../data/scenarios/cenario-sinal";
import { Button } from "../../ui/Button";
import type { Player } from "../../../types";

interface VictoryScreenProps {
  players: Player[];
}

export function VictoryScreen({ players }: VictoryScreenProps) {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border-2 border-yellow-400 bg-slate-900 p-8 text-center shadow-neon-yellow">
        <Trophy className="mx-auto text-yellow-400 text-glow" size={48} />
        <h1 className="mt-4 text-2xl font-extrabold uppercase tracking-widest text-yellow-300 text-glow">
          {CERTIFICATE_TEXT.title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{CERTIFICATE_TEXT.body}</p>

        <div className="mt-6 rounded-xl border border-yellow-400/40 bg-black/40 p-4">
          <p className="text-xs uppercase tracking-widest text-yellow-400">Equipe Investigadora</p>
          <ul className="mt-2 flex flex-wrap justify-center gap-2">
            {players.map((p) => (
              <li key={p.uid} className="rounded-full border border-yellow-400/60 px-3 py-1 text-xs text-yellow-200">
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        <Button variant="yellow" onClick={() => navigate("/")} className="mt-6">
          Nova Investigação
        </Button>
      </div>
    </main>
  );
}
