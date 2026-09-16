import { ManualLaboratorio } from "../puzzles/ManualLaboratorio";
import type { GameState } from "../../types";

interface CriptografoProps {
  gameState: GameState | null;
}

export function Criptografo({ gameState }: CriptografoProps) {
  return <ManualLaboratorio solved={gameState?.puzzle_1_solved ?? false} />;
}
