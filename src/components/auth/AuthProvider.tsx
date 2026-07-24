"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/client";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  /** Whether Firebase is configured at all (controls auth UI visibility). */
  available: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  available: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  // Subscribes to Firebase's auth state (an external system) and mirrors it
  // into React state — the documented legitimate use of setState in an effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, available: isFirebaseConfigured }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
