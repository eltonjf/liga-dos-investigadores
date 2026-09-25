import type { ComponentType } from "react";
import type { GameState, Player, RoleDef, RoleId, Scenario } from "../../types";
import { SinalRoleView } from "../../components/scenarios/sinal/RoleView";
import { SinalStatusPanel } from "../../components/scenarios/sinal/StatusPanel";
import { VictoryScreen as SinalVictoryScreen } from "../../components/scenarios/sinal/VictoryScreen";
import { TrofeuRoleView } from "../../components/scenarios/trofeu/RoleView";
import { TrofeuStatusPanel } from "../../components/scenarios/trofeu/StatusPanel";
import * as trofeu from "./cenario-trofeu";
import * as sinal from "./cenario-sinal";

interface BriefingContent {
  title: string;
  body: string;
  highlight?: string;
  missionLine: string;
}

export interface ScenarioDef {
  id: string;
  fallback: Scenario;
  ROLES: RoleDef[];
  BADGES_BY_PLAYER_COUNT: Record<number, RoleId[][]>;
  briefing?: BriefingContent;
  progressPct: (gameState: GameState | null) => number;
  isComplete: (gameState: GameState | null) => boolean;
  StatusPanel: ComponentType<{ gameState: GameState | null }>;
  RoleView: ComponentType<{ roleId: RoleId; sessionId: string; gameState: GameState | null }>;
  VictoryScreen?: ComponentType<{ players: Player[] }>;
}

const TROFEU_SCENARIO: ScenarioDef = {
  id: trofeu.SCENARIO_ID,
  fallback: trofeu.SCENARIO_FALLBACK,
  ROLES: trofeu.ROLES,
  BADGES_BY_PLAYER_COUNT: trofeu.BADGES_BY_PLAYER_COUNT,
  progressPct: (gameState) => {
    const checkpointsDone =
      Number(Boolean(gameState?.puzzle_1_solved)) +
      Number(Boolean(gameState?.radio_code_solved)) +
      Number(Boolean(gameState?.tracking_code_solved)) +
      Number(Boolean(gameState?.final_terminal_solved)) +
      Number(Boolean(gameState?.accusation));
    return (checkpointsDone / 5) * 100;
  },
  isComplete: (gameState) => Boolean(gameState?.accusation),
  StatusPanel: TrofeuStatusPanel,
  RoleView: TrofeuRoleView,
};

const SINAL_SCENARIO: ScenarioDef = {
  id: sinal.SCENARIO_ID,
  fallback: sinal.SCENARIO_FALLBACK,
  ROLES: sinal.ROLES,
  BADGES_BY_PLAYER_COUNT: sinal.BADGES_BY_PLAYER_COUNT,
  briefing: sinal.BRIEFING,
  progressPct: (gameState) => {
    const accusationSolved =
      gameState?.accusation_suspect === sinal.CORRECT_ACCUSATION.suspect &&
      gameState?.accusation_location === sinal.CORRECT_ACCUSATION.location &&
      gameState?.accusation_evidence === sinal.CORRECT_ACCUSATION.evidence;
    const checkpointsDone =
      Number(Boolean(gameState?.symbols_port_solved)) +
      Number(Boolean(gameState?.geo_tracking_solved)) +
      Number(Boolean(gameState?.override_solved)) +
      Number(accusationSolved);
    return (checkpointsDone / 4) * 100;
  },
  isComplete: (gameState) =>
    gameState?.accusation_suspect === sinal.CORRECT_ACCUSATION.suspect &&
    gameState?.accusation_location === sinal.CORRECT_ACCUSATION.location &&
    gameState?.accusation_evidence === sinal.CORRECT_ACCUSATION.evidence,
  StatusPanel: SinalStatusPanel,
  RoleView: SinalRoleView,
  VictoryScreen: SinalVictoryScreen,
};

export const SCENARIOS: Record<string, ScenarioDef> = {
  [TROFEU_SCENARIO.id]: TROFEU_SCENARIO,
  [SINAL_SCENARIO.id]: SINAL_SCENARIO,
};

export const SCENARIO_LIST = [TROFEU_SCENARIO, SINAL_SCENARIO];

export const DEFAULT_SCENARIO_ID = TROFEU_SCENARIO.id;

export function getScenario(id: string | undefined): ScenarioDef {
  return (id && SCENARIOS[id]) || SCENARIOS[DEFAULT_SCENARIO_ID];
}
