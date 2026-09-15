import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, type Auth, type User } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Sem credenciais válidas, getAuth() lança de forma síncrona e derruba o
// app inteiro. Só inicializamos de verdade quando todas as chaves existem;
// caso contrário a UI mostra uma tela pedindo para configurar o .env
// (veja src/components/FirebaseConfigGuard.tsx).
export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;

if (firebaseConfigured) {
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
}

// Consumidores só devem tocar em auth/db depois de checar firebaseConfigured
// (ver <FirebaseConfigGuard>), então assumimos não-nulo aqui para não
// espalhar checagens redundantes pelo resto do app.
export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;

export function ensureAnonymousUser(): Promise<User> {
  if (!authInstance) return Promise.reject(new Error("Firebase não configurado."));
  const instance = authInstance;
  return new Promise((resolve, reject) => {
    const unsubscribe = instance.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve(user);
        return;
      }
      signInAnonymously(instance)
        .then((credential) => resolve(credential.user))
        .catch(reject);
    }, reject);
  });
}
