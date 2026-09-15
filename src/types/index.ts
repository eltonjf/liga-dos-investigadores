export type RoleId =
  | "perito-imagens"
  | "analista-audio"
  | "criptografo"
  | "hacker-sistemas"
  | "especialista-comportamento"
  | "detetive-chefe";

export type AccentColor = "cyan" | "magenta" | "lime" | "amber";

export interface RoleDef {
  id: RoleId;
  label: string;
  icon: string;
  color: AccentColor;
  tagline: string;
}

export interface Player {
  uid: string;
  name: string;
  role_id: RoleId;
  joined_at?: unknown;
}

export type SessionStatus = "lobby" | "playing" | "finished";

export interface Session {
  id: string;
  scenario_id: string;
  status: SessionStatus;
  host_id: string;
  created_at?: unknown;
}

export interface GameState {
  puzzle_1_solved: boolean;
  battery_tips: number;
  accusation?: string | null;
}

export interface Scenario {
  id: string;
  title: string;
  timeLimit: number;
}
