"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { nanoid } from "nanoid";
import { Project } from "@/lib/types";
import { useReceiptStore, defaultProjectName } from "@/lib/store";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  readLocalProjects,
  upsertLocalProject,
  deleteLocalProject,
} from "@/lib/projectsLocal";
import {
  subscribeToProjects,
  saveProjectDoc,
  deleteProjectDoc,
} from "@/lib/firebase/projects";
import { uploadAvatar, deleteAvatar, isDataUrl } from "@/lib/firebase/storage";
import { migrateLocalProjectsToCloud } from "@/lib/firebase/migrate";

type SyncMode = "local" | "cloud";

interface ProjectsContextValue {
  projects: Project[];
  loading: boolean;
  syncing: boolean;
  error: string | null;
  mode: SyncMode;
  createNew: () => void;
  open: (id: string) => void;
  rename: (id: string, name: string) => void;
  duplicate: (id: string) => void;
  setArchived: (id: string, archived: boolean) => void;
  remove: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

const AUTOSAVE_DELAY_LOCAL = 250;
const AUTOSAVE_DELAY_CLOUD = 1200;

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading, available } = useAuth();

  const data = useReceiptStore((s) => s.data);
  const currentProjectId = useReceiptStore((s) => s.currentProjectId);
  const currentProjectName = useReceiptStore((s) => s.currentProjectName);
  const hydrated = useReceiptStore((s) => s.hydrated);
  const applyProject = useReceiptStore((s) => s.applyProject);
  const startNewDraft = useReceiptStore((s) => s.startNewDraft);
  const setAvatarUrl = useReceiptStore((s) => s.setAvatarUrl);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mode: SyncMode = user ? "cloud" : "local";
  const migratedFor = useRef<string | null>(null);
  // Latest projects, readable synchronously inside callbacks/timeouts without
  // adding them to dependency arrays (which would thrash the autosave timer).
  const projectsRef = useRef<Project[]>([]);
  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  // --- Load / subscribe -----------------------------------------------------
  // This effect synchronizes an external store (localStorage in guest mode, or
  // the Firestore live cache when signed in) into React state — the documented
  // legitimate use of setState inside an effect.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!hydrated) return;

    // No Firebase, or signed out: guest mode backed by localStorage.
    if (!available || (!authLoading && !user)) {
      setProjects(readLocalProjects());
      setLoading(false);
      setError(null);
      return;
    }

    if (authLoading || !user) return;

    let unsub: (() => void) | undefined;
    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        if (migratedFor.current !== user.uid) {
          migratedFor.current = user.uid;
          await migrateLocalProjectsToCloud(user.uid);
        }
      } catch {
        // Migration is best-effort; subscription still proceeds.
      }
      if (cancelled) return;
      unsub = subscribeToProjects(
        user.uid,
        (list) => {
          setProjects(list);
          setLoading(false);
          setError(null);
        },
        () => {
          setError("Couldn't sync with the cloud. Working offline.");
          setLoading(false);
        }
      );
    })();

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, [hydrated, available, authLoading, user]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // --- Avatar upload (cloud only) ------------------------------------------
  useEffect(() => {
    if (mode !== "cloud" || !user) return;
    if (!isDataUrl(data.avatarDataUrl)) return;
    let cancelled = false;
    uploadAvatar(user.uid, currentProjectId, data.avatarDataUrl)
      .then((url) => {
        if (!cancelled) setAvatarUrl(url);
      })
      .catch(() => {
        // Upload failed; the draft keeps the local preview, and the cloud
        // doc simply persists without an avatar (see buildCurrentProject).
      });
    return () => {
      cancelled = true;
    };
  }, [data.avatarDataUrl, mode, user, currentProjectId, setAvatarUrl]);

  const buildCurrentProject = useCallback((): Project => {
    const existing = projectsRef.current.find((p) => p.id === currentProjectId);
    const now = Date.now();
    // In cloud mode never write a data: URL into Firestore (1 MB doc limit) —
    // keep the last uploaded URL if we have one, else null. The upload effect
    // supplies the real URL and triggers a follow-up save.
    const avatar = data.avatarDataUrl;
    const safeAvatar =
      mode === "cloud" && isDataUrl(avatar)
        ? existing && !isDataUrl(existing.data.avatarDataUrl)
          ? existing.data.avatarDataUrl
          : null
        : avatar;
    return {
      id: currentProjectId,
      name: currentProjectName || defaultProjectName(data),
      data: { ...data, avatarDataUrl: safeAvatar },
      archived: existing?.archived ?? false,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
  }, [currentProjectId, currentProjectName, data, mode]);

  // --- Autosave current draft ----------------------------------------------
  useEffect(() => {
    if (loading || !hydrated) return;
    const delay = mode === "cloud" ? AUTOSAVE_DELAY_CLOUD : AUTOSAVE_DELAY_LOCAL;
    const handle = setTimeout(() => {
      const project = buildCurrentProject();
      if (mode === "local") {
        setProjects(upsertLocalProject(project));
      } else if (user) {
        setSyncing(true);
        saveProjectDoc(user.uid, project)
          .catch(() => setError("Couldn't save to the cloud. Working offline."))
          .finally(() => setSyncing(false));
      }
    }, delay);
    return () => clearTimeout(handle);
  }, [data, currentProjectName, mode, loading, hydrated, user, buildCurrentProject]);

  // --- Mutations ------------------------------------------------------------
  const writeProject = useCallback(
    async (project: Project) => {
      if (mode === "local") {
        setProjects(upsertLocalProject(project));
      } else if (user) {
        setSyncing(true);
        try {
          await saveProjectDoc(user.uid, project);
        } catch {
          setError("Couldn't save to the cloud. Working offline.");
        } finally {
          setSyncing(false);
        }
      }
    },
    [mode, user]
  );

  const createNew = useCallback(() => {
    startNewDraft();
  }, [startNewDraft]);

  const open = useCallback(
    (id: string) => {
      const project = projectsRef.current.find((p) => p.id === id);
      if (project) applyProject(project);
    },
    [applyProject]
  );

  const rename = useCallback(
    (id: string, name: string) => {
      const trimmed = name.trim() || "Untitled";
      if (id === currentProjectId) {
        useReceiptStore.getState().setCurrentName(trimmed);
      }
      const project = projectsRef.current.find((p) => p.id === id);
      if (project) void writeProject({ ...project, name: trimmed, updatedAt: Date.now() });
    },
    [currentProjectId, writeProject]
  );

  const duplicate = useCallback(
    (id: string) => {
      const project = projectsRef.current.find((p) => p.id === id);
      if (!project) return;
      const now = Date.now();
      void writeProject({
        ...project,
        id: nanoid(10),
        name: `${project.name} copy`,
        archived: false,
        createdAt: now,
        updatedAt: now,
      });
    },
    [writeProject]
  );

  const setArchived = useCallback(
    (id: string, archived: boolean) => {
      const project = projectsRef.current.find((p) => p.id === id);
      if (project) void writeProject({ ...project, archived, updatedAt: Date.now() });
    },
    [writeProject]
  );

  const remove = useCallback(
    (id: string) => {
      if (mode === "local") {
        setProjects(deleteLocalProject(id));
      } else if (user) {
        setSyncing(true);
        Promise.all([deleteProjectDoc(user.uid, id), deleteAvatar(user.uid, id)])
          .catch(() => setError("Couldn't delete from the cloud."))
          .finally(() => setSyncing(false));
      }
      if (id === currentProjectId) startNewDraft();
    },
    [mode, user, currentProjectId, startNewDraft]
  );

  const value = useMemo<ProjectsContextValue>(
    () => ({
      projects,
      loading,
      syncing,
      error,
      mode,
      createNew,
      open,
      rename,
      duplicate,
      setArchived,
      remove,
    }),
    [projects, loading, syncing, error, mode, createNew, open, rename, duplicate, setArchived, remove]
  );

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects(): ProjectsContextValue {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within a ProjectsProvider");
  return ctx;
}
