import type { GameState, RoleId } from "../../../types";
import { AnalistaAudioSinal } from "./roles/AnalistaAudioSinal";
import { CriptografoSinal } from "./roles/CriptografoSinal";
import { DetetiveChefeSinal } from "./roles/DetetiveChefeSinal";
import { EspecialistaComportamentoSinal } from "./roles/EspecialistaComportamentoSinal";
import { HackerSistemasSinal } from "./roles/HackerSistemasSinal";
import { PeritoImagensSinal } from "./roles/PeritoImagensSinal";

interface SinalRoleViewProps {
  roleId: RoleId;
  sessionId: string;
  gameState: GameState | null;
}

export function SinalRoleView({ roleId, sessionId, gameState }: SinalRoleViewProps) {
  switch (roleId) {
    case "perito-imagens":
      return <PeritoImagensSinal gameState={gameState} />;
    case "analista-audio":
      return <AnalistaAudioSinal gameState={gameState} />;
    case "criptografo":
      return <CriptografoSinal gameState={gameState} />;
    case "hacker-sistemas":
      return <HackerSistemasSinal sessionId={sessionId} gameState={gameState} />;
    case "especialista-comportamento":
      return <EspecialistaComportamentoSinal gameState={gameState} />;
    case "detetive-chefe":
      return <DetetiveChefeSinal sessionId={sessionId} gameState={gameState} />;
    default:
      return null;
  }
}
