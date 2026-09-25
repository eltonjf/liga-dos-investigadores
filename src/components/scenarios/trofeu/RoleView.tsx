import type { GameState, RoleId } from "../../../types";
import { AnalistaAudio } from "../../roles/AnalistaAudio";
import { Criptografo } from "../../roles/Criptografo";
import { DetetiveChefe } from "../../roles/DetetiveChefe";
import { EspecialistaComportamento } from "../../roles/EspecialistaComportamento";
import { HackerSistemas } from "../../roles/HackerSistemas";
import { PeritoImagens } from "../../roles/PeritoImagens";

interface TrofeuRoleViewProps {
  roleId: RoleId;
  sessionId: string;
  gameState: GameState | null;
}

export function TrofeuRoleView({ roleId, sessionId, gameState }: TrofeuRoleViewProps) {
  switch (roleId) {
    case "perito-imagens":
      return <PeritoImagens gameState={gameState} />;
    case "analista-audio":
      return <AnalistaAudio gameState={gameState} />;
    case "criptografo":
      return <Criptografo gameState={gameState} />;
    case "hacker-sistemas":
      return <HackerSistemas sessionId={sessionId} gameState={gameState} />;
    case "especialista-comportamento":
      return <EspecialistaComportamento gameState={gameState} />;
    case "detetive-chefe":
      return <DetetiveChefe sessionId={sessionId} gameState={gameState} />;
    default:
      return null;
  }
}
