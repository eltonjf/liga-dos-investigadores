import { CenaDosFrascos } from "../puzzles/CenaDosFrascos";
import type { GameState } from "../../types";

interface PeritoImagensProps {
  gameState: GameState | null;
}

export function PeritoImagens({ gameState }: PeritoImagensProps) {
  return <CenaDosFrascos solved={gameState?.puzzle_1_solved ?? false} />;
}
