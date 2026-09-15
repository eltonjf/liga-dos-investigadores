import type { PropsWithChildren } from "react";
import { firebaseConfigured } from "../lib/firebase";

export function FirebaseConfigGuard({ children }: PropsWithChildren) {
  if (firebaseConfigured) return children;

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-amber text-glow">
        Configuração pendente
      </p>
      <h1 className="text-2xl font-bold text-white">Firebase ainda não configurado</h1>
      <p className="text-sm text-white/70">
        Copie <code className="rounded bg-ink-800 px-1.5 py-0.5">.env.example</code> para{" "}
        <code className="rounded bg-ink-800 px-1.5 py-0.5">.env</code>, preencha as credenciais do
        seu projeto Firebase (Authentication anônima + Cloud Firestore) e reinicie{" "}
        <code className="rounded bg-ink-800 px-1.5 py-0.5">npm run dev</code>.
      </p>
    </main>
  );
}
