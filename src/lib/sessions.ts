import { collection, doc, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { DEFAULT_SCENARIO_ID } from "../data/scenarios/registry";
import { db } from "./firebase";
import { initGameState } from "../hooks/useGameState";
import type { Player, RoleId } from "../types";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(length = 4) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return `LIGA-${code}`;
}

export async function createSession(
  hostUid: string,
  scenarioId: string = DEFAULT_SCENARIO_ID,
): Promise<string> {
  const sessionId = randomCode();
  await setDoc(doc(db, "sessions", sessionId), {
    scenario_id: scenarioId,
    status: "lobby",
    host_id: hostUid,
    player_count: 6,
    created_at: serverTimestamp(),
  });
  return sessionId;
}

export async function setPlayerCount(sessionId: string, count: number) {
  await updateDoc(doc(db, "sessions", sessionId), { player_count: count });
}

export async function pickBadge(
  sessionId: string,
  uid: string,
  name: string,
  roleIds: RoleId[],
) {
  const playersRef = collection(db, "sessions", sessionId, "players");
  const snap = await getDocs(playersRef);
  const taken = new Set(snap.docs.flatMap((d) => (d.data() as Player).role_ids));
  if (roleIds.some((id) => taken.has(id))) {
    throw new Error("Este crachá já foi escolhido por outro investigador.");
  }
  await setDoc(doc(playersRef, uid), {
    uid,
    name,
    role_ids: roleIds,
    joined_at: serverTimestamp(),
  });
}

export async function startGame(sessionId: string) {
  await initGameState(sessionId);
  await updateDoc(doc(db, "sessions", sessionId), { status: "playing" });
}
