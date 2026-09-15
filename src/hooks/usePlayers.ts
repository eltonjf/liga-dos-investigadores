import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import type { Player } from "../types";

export function usePlayers(sessionId: string | undefined) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!sessionId) {
      setPlayers([]);
      return;
    }
    return onSnapshot(collection(db, "sessions", sessionId, "players"), (snap) => {
      setPlayers(snap.docs.map((d) => d.data() as Player));
    });
  }, [sessionId]);

  return players;
}
