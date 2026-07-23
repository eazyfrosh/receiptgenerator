"use client";

import { useReceiptStore } from "@/lib/store";
import { Logo } from "@/components/Logo";
import { HistoryControls } from "./HistoryControls";
import { DarkModeToggle } from "./DarkModeToggle";

export function Topbar() {
  const currentProjectId = useReceiptStore((s) => s.currentProjectId);
  const projects = useReceiptStore((s) => s.projects);
  const renameCurrentProject = useReceiptStore((s) => s.renameCurrentProject);
  const project = projects.find((p) => p.id === currentProjectId);

  return (
    <header className="glass-panel sticky top-0 z-30 flex items-center justify-between gap-4 px-5 py-3">
      <div className="flex items-center gap-3">
        <Logo size={30} />
        <div className="hidden sm:block">
          <p className="font-display text-sm font-extrabold tracking-tight">Receipt Studio</p>
          <p className="text-[11px] text-studio-slate">Fictional receipt mockups</p>
        </div>
      </div>

      <input
        value={project?.name ?? ""}
        onChange={(e) => renameCurrentProject(e.target.value)}
        placeholder="Untitled project"
        className="hidden max-w-[220px] flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 text-center text-sm font-medium text-studio-ink outline-none hover:border-studio-mist/30 focus:border-studio-flux/50 focus:bg-white/60 dark:text-white md:block"
      />

      <div className="flex items-center gap-2">
        <HistoryControls />
        <DarkModeToggle />
      </div>
    </header>
  );
}
