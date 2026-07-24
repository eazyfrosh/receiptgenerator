"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Cloud, CloudOff, Loader2 } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { AuthModal } from "./AuthModal";
import { signOut } from "@/lib/firebase/auth";
import { useProjects } from "@/components/projects/ProjectsProvider";

export function UserMenu() {
  const { user, available, loading } = useAuth();
  const { syncing } = useProjects();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // With no Firebase configured, don't show auth affordances at all.
  if (!available) return null;

  if (loading) {
    return <Loader2 size={16} className="animate-spin text-studio-slate" />;
  }

  if (!user) {
    return (
      <>
        <button type="button" onClick={() => setModalOpen(true)} className="btn-primary !py-2">
          <Cloud size={15} />
          <span className="hidden sm:inline">Sign in</span>
        </button>
        <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    );
  }

  const label = user.displayName || user.email || "Account";
  const initial = label.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-studio-mist/30 bg-white/60 py-1.5 pl-1.5 pr-2.5 text-sm transition hover:bg-white/90 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-studio-flux to-studio-mintDark text-xs font-bold text-white">
          {user.photoURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.photoURL} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            initial
          )}
        </span>
        <span className="hidden max-w-[120px] truncate font-medium sm:inline">{label}</span>
        {syncing ? (
          <Loader2 size={13} className="animate-spin text-studio-mintDark" />
        ) : (
          <Cloud size={13} className="text-studio-mintDark" />
        )}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="glass-card absolute right-0 top-full z-40 mt-2 w-56 overflow-hidden p-2"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold">{user.displayName || "Signed in"}</p>
              <p className="truncate text-xs text-studio-slate">{user.email}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] text-studio-mintDark">
                {syncing ? (
                  <>
                    <Loader2 size={11} className="animate-spin" /> Syncing…
                  </>
                ) : (
                  <>
                    <Cloud size={11} /> Cloud sync on
                  </>
                )}
              </p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={async () => {
                setMenuOpen(false);
                await signOut();
              }}
              className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-studio-coral transition hover:bg-studio-coral/10"
            >
              <LogOut size={15} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Small inline indicator of guest (local-only) mode, for the topbar. */
export function GuestBadge() {
  const { available, user, loading } = useAuth();
  if (!available || user || loading) return null;
  return (
    <span
      className="hidden items-center gap-1 rounded-full bg-studio-mist/15 px-2.5 py-1 text-[11px] font-medium text-studio-slate sm:inline-flex"
      title="Projects are saved in this browser only. Sign in to sync to the cloud."
    >
      <CloudOff size={12} />
      Local only
    </span>
  );
}
