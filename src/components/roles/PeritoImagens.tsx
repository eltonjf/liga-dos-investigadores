import { CenaDosFrascos } from "../puzzles/CenaDosFrascos";
import { FotoCantina } from "../puzzles/FotoCantina";
import type { GameState } from "../../types";

interface PeritoImagensProps {
  gameState: GameState | null;
}

export function PeritoImagens({ gameState }: PeritoImagensProps) {
  const firewallDown = Boolean(gameState?.puzzle_1_solved) && Boolean(gameState?.radio_code_solved);
  return (
    <div className="flex flex-col gap-4">
      <CenaDosFrascos solved={gameState?.puzzle_1_solved ?? false} />
      <FotoCantina locked={!firewallDown} solved={gameState?.tracking_code_solved ?? false} />
    </div>
  );
}
