import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { SCENARIO_ID } from "../data/scenarios/cenario-trofeu";
import { db } from "./firebase";
import { initGameState } from "../hooks/useGameState";
import type { RoleId } from "../types";

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(length = 4) {
  let code = "";
  for (let i = 0; i < length; i++) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export async function createSession(hostUid: string): Promise<string> {
  const sessionId = randomCode();
  await setDoc(doc(db, "sessions", sessionId), {
    scenario_id: SCENARIO_ID,
    status: "lobby",
    host_id: hostUid,
    created_at: serverTimestamp(),
  });
  return sessionId;
}

export async function pickRole(
  sessionId: string,
  uid: string,
  name: string,
  roleId: RoleId,
) {
  const playersRef = collection(db, "sessions", sessionId, "players");
  const taken = await getDocs(query(playersRef, where("role_id", "==", roleId)));
  if (!taken.empty) {
    throw new Error("Este crachá já foi escolhido por outro investigador.");
  }
  await setDoc(doc(playersRef, uid), {
    uid,
    name,
    role_id: roleId,
    joined_at: serverTimestamp(),
  });
}

export async function startGame(sessionId: string) {
  await initGameState(sessionId);
  await updateDoc(doc(db, "sessions", sessionId), { status: "playing" });
}
