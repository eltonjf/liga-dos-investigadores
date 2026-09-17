import { arrayUnion, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import type { GameState } from "../types";

const INITIAL_STATE: GameState = {
  briefing_accepted: [],
  puzzle_1_solved: false,
  radio_code_solved: false,
  tracking_code_solved: false,
  battery_tips: 100,
};

function stateRef(sessionId: string) {
  return doc(db, "sessions", sessionId, "game_state", "progress");
}

export function useGameState(sessionId: string | undefined) {
  const [state, setState] = useState<GameState | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setState(null);
      return;
    }
    return onSnapshot(stateRef(sessionId), (snap) => {
      setState(snap.exists() ? (snap.data() as GameState) : null);
    });
  }, [sessionId]);

  return state;
}

export async function initGameState(sessionId: string) {
  await setDoc(stateRef(sessionId), INITIAL_STATE, { merge: true });
}

export async function patchGameState(sessionId: string, patch: Partial<GameState>) {
  await updateDoc(stateRef(sessionId), patch);
}

export async function acceptBriefing(sessionId: string, uid: string) {
  await updateDoc(stateRef(sessionId), { briefing_accepted: arrayUnion(uid) });
}
