import { TerminalHacker } from "../puzzles/TerminalHacker";
import type { GameState } from "../../types";

interface HackerSistemasProps {
  sessionId: string;
  gameState: GameState | null;
}

export function HackerSistemas({ sessionId, gameState }: HackerSistemasProps) {
  return <TerminalHacker sessionId={sessionId} solved={gameState?.puzzle_1_solved ?? false} />;
}
