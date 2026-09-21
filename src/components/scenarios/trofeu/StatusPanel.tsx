import type { GameState } from "../../../types";

interface TrofeuStatusPanelProps {
  gameState: GameState | null;
}

export function TrofeuStatusPanel({ gameState }: TrofeuStatusPanelProps) {
  const firewallDown = Boolean(gameState?.puzzle_1_solved) && Boolean(gameState?.radio_code_solved);

  return (
    <div className="mt-4 border-t border-slate-700 pt-3 text-xs text-white/50">
      <p>Pilha da lanterna: {gameState?.battery_tips ?? 100}%</p>
      <p className="mt-1">
        Terminal 1 (cofre): {gameState?.puzzle_1_solved ? "resolvido ✓" : "pendente"}
      </p>
      <p className="mt-1">
        Terminal 2 (rádio): {gameState?.radio_code_solved ? "resolvido ✓" : "pendente"}
      </p>
      <p className="mt-1">Firewall: {firewallDown ? "derrubado ✓" : "ativo"}</p>
      <p className="mt-1">
        Terminal 3 (rastreio): {gameState?.tracking_code_solved ? "resolvido ✓" : "pendente"}
      </p>
      <p className="mt-1">
        Terminal 4 (final): {gameState?.final_terminal_solved ? "resolvido ✓" : "pendente"}
      </p>
    </div>
  );
}
