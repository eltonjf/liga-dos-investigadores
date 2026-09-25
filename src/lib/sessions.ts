import { doc, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { DEFAULT_SCENARIO_ID } from "../data/scenarios/registry";
import { db } from "./firebase";
import { initGameState } from "../hooks/useGameState";
import type { RoleId } from "../types";

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
  // Um doc por papel em badges/: a transação + regra create-only garantem que
  // dois jogadores clicando ao mesmo tempo não levam o mesmo crachá.
  const badgeRefs = roleIds.map((id) => doc(db, "sessions", sessionId, "badges", id));
  await runTransaction(db, async (tx) => {
    const snaps = await Promise.all(badgeRefs.map((ref) => tx.get(ref)));
    if (snaps.some((s) => s.exists())) {
      throw new Error("Este crachá já foi escolhido por outro investigador.");
    }
    badgeRefs.forEach((ref) => tx.set(ref, { uid }));
    tx.set(doc(db, "sessions", sessionId, "players", uid), {
      uid,
      name,
      role_ids: roleIds,
      joined_at: serverTimestamp(),
    });
  });
}

export async function startGame(sessionId: string) {
  await initGameState(sessionId);
  await updateDoc(doc(db, "sessions", sessionId), { status: "playing" });
}
