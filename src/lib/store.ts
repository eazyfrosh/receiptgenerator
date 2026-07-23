"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { ReceiptData, Project, TemplateId } from "./types";
import { createDefaultReceipt } from "./sampleData";

const HISTORY_LIMIT = 40;

/**
 * The editor store owns the *current working draft* and user preferences —
 * not the projects list. The projects list (guest localStorage or signed-in
 * Firestore) is owned by ProjectsProvider, which observes this store and
 * autosaves the draft to the active backend. Splitting them this way keeps a
 * single source of truth for what's on the canvas while letting the storage
 * backend swap underneath it (guest <-> cloud) without touching the editor.
 */
interface EditorStore {
  data: ReceiptData;
  past: ReceiptData[];
  future: ReceiptData[];
  currentProjectId: string;
  currentProjectName: string;
  darkMode: boolean;
  hydrated: boolean;
  // Bumps only when `data` is replaced wholesale (undo/redo/open/new) rather
  // than edited field-by-field, so uncontrolled form inputs know to resync.
  revision: number;

  update: (patch: Partial<ReceiptData>) => void;
  setTemplate: (id: TemplateId) => void;
  setAvatarUrl: (url: string | null) => void;
  undo: () => void;
  redo: () => void;
  startNewDraft: () => void;
  applyProject: (project: Project) => void;
  setCurrentName: (name: string) => void;
  toggleDarkMode: () => void;
  setHydrated: () => void;
}

export function defaultProjectName(data: ReceiptData): string {
  return `${data.senderName || "Untitled"} → ${data.recipientName || "Receipt"}`;
}

export const useReceiptStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      data: createDefaultReceipt(),
      past: [],
      future: [],
      currentProjectId: nanoid(10),
      currentProjectName: "",
      darkMode: false,
      hydrated: false,
      revision: 0,

      update: (patch) => {
        const { data, past } = get();
        const nextData = { ...data, ...patch };
        set({
          data: nextData,
          past: [...past, data].slice(-HISTORY_LIMIT),
          future: [],
        });
      },

      setTemplate: (id) => {
        get().update({ templateId: id });
      },

      // Silent avatar swap (e.g. replacing a data: URL with a Storage URL
      // after upload). Deliberately does NOT push a history entry — it's a
      // storage detail, not a user-visible edit to undo.
      setAvatarUrl: (url) => {
        set((state) => ({ data: { ...state.data, avatarDataUrl: url } }));
      },

      undo: () => {
        const { past, data, future } = get();
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        set((state) => ({
          data: previous,
          past: past.slice(0, -1),
          future: [data, ...future].slice(0, HISTORY_LIMIT),
          revision: state.revision + 1,
        }));
      },

      redo: () => {
        const { future, data, past } = get();
        if (future.length === 0) return;
        const next = future[0];
        set((state) => ({
          data: next,
          past: [...past, data].slice(-HISTORY_LIMIT),
          future: future.slice(1),
          revision: state.revision + 1,
        }));
      },

      startNewDraft: () => {
        const fresh = createDefaultReceipt();
        set((state) => ({
          data: fresh,
          past: [],
          future: [],
          currentProjectId: nanoid(10),
          currentProjectName: defaultProjectName(fresh),
          revision: state.revision + 1,
        }));
      },

      applyProject: (project) => {
        set((state) => ({
          data: project.data,
          currentProjectId: project.id,
          currentProjectName: project.name,
          past: [],
          future: [],
          revision: state.revision + 1,
        }));
      },

      setCurrentName: (name) => set({ currentProjectName: name }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "receipt-studio-editor",
      partialize: (state) => ({
        data: state.data,
        currentProjectId: state.currentProjectId,
        currentProjectName: state.currentProjectName,
        darkMode: state.darkMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
