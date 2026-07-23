"use client";

import { Copy, Trash2, FilePlus2 } from "lucide-react";
import { useReceiptStore } from "@/lib/store";

export function RecentProjects() {
  const projects = useReceiptStore((s) => s.projects);
  const currentProjectId = useReceiptStore((s) => s.currentProjectId);
  const loadProject = useReceiptStore((s) => s.loadProject);
  const deleteProject = useReceiptStore((s) => s.deleteProject);
  const duplicateProject = useReceiptStore((s) => s.duplicateProject);
  const newProject = useReceiptStore((s) => s.newProject);

  return (
    <div className="flex flex-col gap-2">
      <button type="button" onClick={newProject} className="btn-ghost w-full justify-center">
        <FilePlus2 size={15} />
        New receipt
      </button>

      <div className="mt-1 flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
        {projects.length === 0 && (
          <p className="px-1 py-2 text-xs text-studio-slate">No projects yet.</p>
        )}
        {projects.map((p) => {
          const active = p.id === currentProjectId;
          return (
            <div
              key={p.id}
              className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition ${
                active ? "bg-studio-flux/10" : "hover:bg-studio-mist/10"
              }`}
            >
              <button
                type="button"
                onClick={() => loadProject(p.id)}
                className="min-w-0 flex-1 truncate text-left font-medium"
                title={p.name}
              >
                {p.name}
              </button>
              <button
                type="button"
                onClick={() => duplicateProject(p.id)}
                className="rounded p-1 opacity-0 hover:bg-white/60 group-hover:opacity-100 dark:hover:bg-white/10"
                title="Duplicate"
              >
                <Copy size={13} />
              </button>
              <button
                type="button"
                onClick={() => deleteProject(p.id)}
                className="rounded p-1 opacity-0 hover:bg-studio-coral/10 group-hover:opacity-100"
                title="Delete"
              >
                <Trash2 size={13} className="text-studio-coral" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
