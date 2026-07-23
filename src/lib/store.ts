"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { ReceiptData, Project, TemplateId } from "./types";
import { createDefaultReceipt } from "./sampleData";

const HISTORY_LIMIT = 40;

interface ReceiptStore {
  data: ReceiptData;
  past: ReceiptData[];
  future: ReceiptData[];
  projects: Project[];
  currentProjectId: string;
  darkMode: boolean;
  hydrated: boolean;
  revision: number;
  update: (patch: Partial<ReceiptData>) => void;
  setTemplate: (id: TemplateId) => void;
  undo: () => void;
  redo: () => void;
  newProject: () => void;
  loadProject: (id: string) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  renameCurrentProject: (name: string) => void;
  toggleDarkMode: () => void;
  setHydrated: () => void;
}

function projectName(data: ReceiptData): string {
  return `${data.senderName || "Untitled"} → ${data.recipientName || "Receipt"}`;
}

function persistProject(
  projects: Project[],
  currentProjectId: string,
  data: ReceiptData
): Project[] {
  const existing = projects.find((p) => p.id === currentProjectId);
  const updated: Project = {
    id: currentProjectId,
    name: existing?.name || projectName(data),
    data,
    updatedAt: Date.now(),
  };
  const rest = projects.filter((p) => p.id !== currentProjectId);
  return [updated, ...rest].slice(0, 24);
}

export const useReceiptStore = create<ReceiptStore>()(
  persist(
    (set, get) => ({
      data: createDefaultReceipt(),
      past: [],
      future: [],
      projects: [],
      currentProjectId: nanoid(10),
      darkMode: false,
      hydrated: false,
      revision: 0,

      update: (patch) => {
        const { data, past, projects, currentProjectId } = get();
        const nextData = { ...data, ...patch };
        const nextPast = [...past, data].slice(-HISTORY_LIMIT);
        set({
          data: nextData,
          past: nextPast,
          future: [],
          projects: persistProject(projects, currentProjectId, nextData),
        });
      },

      setTemplate: (id) => {
        get().update({ templateId: id });
      },

      undo: () => {
        const { past, data, future } = get();
        if (past.length === 0) return;
        const previous = past[past.length - 1];
        const rest = past.slice(0, -1);
        set((state) => ({
          data: previous,
          past: rest,
          future: [data, ...future].slice(0, HISTORY_LIMIT),
          revision: state.revision + 1,
        }));
      },

      redo: () => {
        const { future, data, past } = get();
        if (future.length === 0) return;
        const next = future[0];
        const rest = future.slice(1);
        set((state) => ({
          data: next,
          past: [...past, data].slice(-HISTORY_LIMIT),
          future: rest,
          revision: state.revision + 1,
        }));
      },

      newProject: () => {
        const fresh = createDefaultReceipt();
        const id = nanoid(10);
        set((state) => ({
          data: fresh,
          past: [],
          future: [],
          currentProjectId: id,
          projects: persistProject(state.projects, id, fresh),
          revision: state.revision + 1,
        }));
      },

      loadProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) return;
        set((state) => ({
          data: project.data,
          currentProjectId: id,
          past: [],
          future: [],
          revision: state.revision + 1,
        }));
      },

      deleteProject: (id) => {
        set((state) => {
          const projects = state.projects.filter((p) => p.id !== id);
          if (state.currentProjectId !== id) return { projects };
          const fresh = createDefaultReceipt();
          const newId = nanoid(10);
          return {
            projects: persistProject(projects, newId, fresh),
            data: fresh,
            currentProjectId: newId,
            past: [],
            future: [],
            revision: state.revision + 1,
          };
        });
      },

      duplicateProject: (id) => {
        const project = get().projects.find((p) => p.id === id);
        if (!project) return;
        const newId = nanoid(10);
        set((state) => ({
          projects: [
            { id: newId, name: `${project.name} copy`, data: project.data, updatedAt: Date.now() },
            ...state.projects,
          ].slice(0, 24),
        }));
      },

      renameCurrentProject: (name) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === state.currentProjectId ? { ...p, name } : p
          ),
        }));
      },

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "receipt-studio-state",
      partialize: (state) => ({
        data: state.data,
        projects: state.projects,
        currentProjectId: state.currentProjectId,
        darkMode: state.darkMode,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);
