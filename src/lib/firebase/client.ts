import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  type Auth,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  connectFirestoreEmulator,
  type Firestore,
} from "firebase/firestore";
import { getStorage, connectStorageEmulator, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Firebase is optional at runtime: with no config the app still runs fully as
 * a local, guest-only experience (localStorage cache). `isFirebaseConfigured`
 * lets the UI decide whether to surface auth/cloud-sync affordances at all,
 * so a fresh clone with no `.env.local` never crashes or shows dead buttons.
 */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

const useEmulators =
  process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true" &&
  typeof window !== "undefined";

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

function ensureApp(): FirebaseApp | null {
  if (!isFirebaseConfigured) return null;
  if (app) return app;
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = ensureApp();
  if (!a) return null;
  if (!authInstance) {
    authInstance = getAuth(a);
    if (useEmulators) {
      try {
        connectAuthEmulator(authInstance, "http://127.0.0.1:9099", {
          disableWarnings: true,
        });
      } catch {
        // already connected — ignore
      }
    }
  }
  return authInstance;
}

export function getDb(): Firestore | null {
  const a = ensureApp();
  if (!a) return null;
  if (!dbInstance) {
    // Offline persistence: IndexedDB-backed cache, shared safely across tabs.
    // Reads/writes work offline and reconcile when connectivity returns.
    dbInstance = initializeFirestore(a, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    });
    if (useEmulators) {
      try {
        connectFirestoreEmulator(dbInstance, "127.0.0.1", 8080);
      } catch {
        // already connected — ignore
      }
    }
  }
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const a = ensureApp();
  if (!a) return null;
  if (!storageInstance) {
    storageInstance = getStorage(a);
    if (useEmulators) {
      try {
        connectStorageEmulator(storageInstance, "127.0.0.1", 9199);
      } catch {
        // already connected — ignore
      }
    }
  }
  return storageInstance;
}

export const googleProvider = new GoogleAuthProvider();
