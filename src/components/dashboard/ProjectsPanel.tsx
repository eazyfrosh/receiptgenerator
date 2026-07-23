"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  Trash2,
  FilePlus2,
  Search,
  Archive,
  ArchiveRestore,
  Pencil,
  Check,
  Loader2,
  X,
} from "lucide-react";
import { useProjects } from "@/components/projects/ProjectsProvider";
import { useReceiptStore } from "@/lib/store";
import { TEMPLATE_META } from "@/lib/types";
import { formatDate } from "@/lib/format";

type Filter = "active" | "archived";

export function ProjectsPanel() {
  const { projects, loading, createNew, open, rename, duplicate, setArchived, remove } =
    useProjects();
  const currentProjectId = useReceiptStore((s) => s.currentProjectId);

  const [queryText, setQueryText] = useState("");
  const [filter, setFilter] = useState<Filter>("active");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const archivedCount = useMemo(
    () => projects.filter((p) => p.archived).length,
    [projects]
  );

  const visible = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return projects
      .filter((p) => (filter === "archived" ? p.archived : !p.archived))
      .filter((p) => {
        if (!q) return true;
        const haystack = [
          p.name,
          p.data.senderName,
          p.data.recipientName,
          p.data.note,
          TEMPLATE_META[p.data.templateId]?.name ?? "",
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [projects, filter, queryText]);

  function commitRename(id: string) {
    rename(id, renameValue);
    setRenamingId(null);
  }

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={createNew} className="btn-ghost w-full justify-center">
        <FilePlus2 size={15} />
        New receipt
      </button>

      <div className="relative">
        <Search
          size={14}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-studio-mist"
        />
        <input
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
          placeholder="Search projects"
          className="field-input py-2 pl-9 pr-8 text-xs"
        />
        {queryText && (
          <button
            type="button"
            onClick={() => setQueryText("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-studio-mist hover:text-studio-ink dark:hover:text-white"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 rounded-lg bg-studio-mist/10 p-0.5 text-xs">
        <FilterTab active={filter === "active"} onClick={() => setFilter("active")}>
          Active
        </FilterTab>
        <FilterTab active={filter === "archived"} onClick={() => setFilter("archived")}>
          Archived{archivedCount > 0 ? ` (${archivedCount})` : ""}
        </FilterTab>
      </div>

      <div className="flex max-h-[22rem] flex-col gap-1.5 overflow-y-auto pr-1">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-xs text-studio-slate">
            <Loader2 size={14} className="animate-spin" /> Loading projects…
          </div>
        ) : visible.length === 0 ? (
          <p className="px-1 py-6 text-center text-xs text-studio-slate">
            {queryText
              ? "No projects match your search."
              : filter === "archived"
                ? "No archived projects."
                : "No projects yet. Your edits autosave here."}
          </p>
        ) : (
          visible.map((p) => {
            const active = p.id === currentProjectId;
            const isRenaming = renamingId === p.id;
            const isConfirming = confirmDeleteId === p.id;
            return (
              <div
                key={p.id}
                className={`group rounded-xl border px-2.5 py-2 text-xs transition ${
                  active
                    ? "border-studio-flux/40 bg-studio-flux/10"
                    : "border-transparent hover:border-studio-mist/30 hover:bg-studio-mist/10"
                }`}
              >
                {isRenaming ? (
                  <div className="flex items-center gap-1">
                    <input
                      autoFocus
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") commitRename(p.id);
                        if (e.key === "Escape") setRenamingId(null);
                      }}
                      className="field-input py-1 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => commitRename(p.id)}
                      className="btn-icon h-7 w-7"
                      aria-label="Save name"
                    >
                      <Check size={13} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => open(p.id)}
                      className="min-w-0 flex-1 text-left"
                      title={p.name}
                    >
                      <span className="block truncate font-semibold">{p.name}</span>
                      <span className="block truncate text-[10px] text-studio-slate">
                        {TEMPLATE_META[p.data.templateId]?.name ?? "Receipt"} ·{" "}
                        {formatDate(new Date(p.updatedAt).toISOString().slice(0, 10))}
                      </span>
                    </button>

                    <div className="flex items-center opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                      <IconBtn
                        title="Rename"
                        onClick={() => {
                          setRenamingId(p.id);
                          setRenameValue(p.name);
                        }}
                      >
                        <Pencil size={13} />
                      </IconBtn>
                      <IconBtn title="Duplicate" onClick={() => duplicate(p.id)}>
                        <Copy size={13} />
                      </IconBtn>
                      <IconBtn
                        title={p.archived ? "Unarchive" : "Archive"}
                        onClick={() => setArchived(p.id, !p.archived)}
                      >
                        {p.archived ? <ArchiveRestore size={13} /> : <Archive size={13} />}
                      </IconBtn>
                      <IconBtn
                        title="Delete"
                        danger
                        onClick={() => setConfirmDeleteId(isConfirming ? null : p.id)}
                      >
                        <Trash2 size={13} />
                      </IconBtn>
                    </div>
                  </div>
                )}

                {isConfirming && !isRenaming && (
                  <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-studio-coral/10 px-2.5 py-1.5">
                    <span className="text-[11px] text-studio-coral">Delete permanently?</span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          remove(p.id);
                          setConfirmDeleteId(null);
                        }}
                        className="rounded-md bg-studio-coral px-2 py-1 text-[11px] font-semibold text-white"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-md px-2 py-1 text-[11px] font-medium text-studio-slate hover:bg-white/60 dark:hover:bg-white/10"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function FilterTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md px-2 py-1.5 font-semibold transition ${
        active
          ? "bg-white text-studio-ink shadow-sm dark:bg-white/15 dark:text-white"
          : "text-studio-slate hover:text-studio-ink dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function IconBtn({
  title,
  onClick,
  children,
  danger,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`rounded-md p-1.5 transition ${
        danger
          ? "text-studio-coral hover:bg-studio-coral/10"
          : "text-studio-slate hover:bg-white/60 hover:text-studio-ink dark:hover:bg-white/10 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
