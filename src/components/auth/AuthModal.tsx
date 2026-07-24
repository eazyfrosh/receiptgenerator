"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Mail, Lock, User as UserIcon } from "lucide-react";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  authErrorMessage,
} from "@/lib/firebase/auth";

type Mode = "signin" | "signup";

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"email" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setError(null);
    setBusy(null);
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    reset();
    setBusy("email");
    try {
      if (mode === "signup") {
        await signUpWithEmail(email, password, name.trim() || undefined);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(null);
    }
  }

  async function handleGoogle() {
    reset();
    setBusy("google");
    try {
      await signInWithGoogle();
      onClose();
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(null);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-studio-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={mode === "signin" ? "Sign in" : "Create account"}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="glass-card relative z-10 w-full max-w-sm p-6"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1 text-studio-slate hover:bg-studio-mist/10"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <h2 className="font-display text-lg font-extrabold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="mt-1 text-xs text-studio-slate">
              Sync your receipt projects across devices.
            </p>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={busy !== null}
              className="btn-ghost mt-5 w-full justify-center"
            >
              {busy === "google" ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <GoogleGlyph />
              )}
              Continue with Google
            </button>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-studio-mist/30" />
              <span className="text-[10px] uppercase tracking-wide text-studio-slate">or</span>
              <div className="h-px flex-1 bg-studio-mist/30" />
            </div>

            <form onSubmit={handleEmail} className="flex flex-col gap-3">
              {mode === "signup" && (
                <label className="relative block">
                  <UserIcon
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-studio-mist"
                  />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Display name (optional)"
                    className="field-input pl-9"
                    autoComplete="name"
                  />
                </label>
              )}
              <label className="relative block">
                <Mail
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-studio-mist"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="field-input pl-9"
                  autoComplete="email"
                />
              </label>
              <label className="relative block">
                <Lock
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-studio-mist"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="field-input pl-9"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </label>

              {error && (
                <p className="rounded-lg bg-studio-coral/10 px-3 py-2 text-xs text-studio-coral">
                  {error}
                </p>
              )}

              <button type="submit" disabled={busy !== null} className="btn-primary justify-center">
                {busy === "email" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : mode === "signin" ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-studio-slate">
              {mode === "signin" ? "New to Receipt Studio?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  reset();
                }}
                className="font-semibold text-studio-flux hover:underline"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
