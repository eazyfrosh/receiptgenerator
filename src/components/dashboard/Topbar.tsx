"use client";

import { useReceiptStore } from "@/lib/store";
import { Logo } from "@/components/Logo";
import { HistoryControls } from "./HistoryControls";
import { DarkModeToggle } from "./DarkModeToggle";
import { UserMenu, GuestBadge } from "@/components/auth/UserMenu";

export function Topbar() {
  const currentProjectName = useReceiptStore((s) => s.currentProjectName);
  const setCurrentName = useReceiptStore((s) => s.setCurrentName);

  return (
    <header className="glass-panel sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <Logo size={30} />
        <div className="hidden sm:block">
          <p className="font-display text-sm font-extrabold tracking-tight">Receipt Studio</p>
          <p className="text-[11px] text-studio-slate">Fictional receipt mockups</p>
        </div>
      </div>

      <input
        value={currentProjectName}
        onChange={(e) => setCurrentName(e.target.value)}
        placeholder="Untitled project"
        aria-label="Project name"
        className="hidden max-w-[220px] flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 text-center text-sm font-medium text-studio-ink outline-none hover:border-studio-mist/30 focus:border-studio-flux/50 focus:bg-white/60 dark:text-white md:block"
      />

      <div className="flex items-center gap-2">
        <GuestBadge />
        <HistoryControls />
        <DarkModeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
