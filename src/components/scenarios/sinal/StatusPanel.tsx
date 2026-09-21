import { CORRECT_ACCUSATION } from "../../../data/scenarios/cenario-sinal";
import type { GameState } from "../../../types";

interface SinalStatusPanelProps {
  gameState: GameState | null;
}

export function SinalStatusPanel({ gameState }: SinalStatusPanelProps) {
  const accusationSolved =
    gameState?.accusation_suspect === CORRECT_ACCUSATION.suspect &&
    gameState?.accusation_location === CORRECT_ACCUSATION.location &&
    gameState?.accusation_evidence === CORRECT_ACCUSATION.evidence;

  return (
    <div className="mt-4 border-t border-slate-700 pt-3 text-xs text-white/50">
      <p>Pilha da lanterna: {gameState?.battery_tips ?? 100}%</p>
      <p className="mt-1">
        Fase 1 — Firewall: {gameState?.symbols_port_solved ? "derrubado ✓" : "pendente"}
      </p>
      <p className="mt-1">
        Fase 2 — Rastreio: {gameState?.geo_tracking_solved ? "resolvido ✓" : "pendente"}
      </p>
      <p className="mt-1">Fase 3 — Override: {gameState?.override_solved ? "resolvido ✓" : "pendente"}</p>
      <p className="mt-1">Fase 4 — Acusação: {accusationSolved ? "confirmada ✓" : "pendente"}</p>
    </div>
  );
}
