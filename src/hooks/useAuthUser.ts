import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ensureAnonymousUser } from "../lib/firebase";

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let cancelled = false;
    ensureAnonymousUser().then((u) => {
      if (!cancelled) setUser(u);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return user;
}
