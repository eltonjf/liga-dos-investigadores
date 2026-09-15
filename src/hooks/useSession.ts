import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import type { Session } from "../types";

export function useSession(sessionId: string | undefined) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    if (!sessionId) {
      setSession(null);
      return;
    }
    setSession(undefined);
    return onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      setSession(snap.exists() ? ({ id: snap.id, ...snap.data() } as Session) : null);
    });
  }, [sessionId]);

  return session;
}
