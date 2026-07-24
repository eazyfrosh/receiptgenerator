import { Project } from "./types";

const KEY = "receipt-studio-projects";
const LIMIT = 100;

function safeParse(raw: string | null): Project[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Backfill fields added after older drafts were saved.
    return parsed.map((p: Partial<Project>) => ({
      id: String(p.id),
      name: typeof p.name === "string" ? p.name : "Untitled",
      data: p.data as Project["data"],
      archived: Boolean(p.archived),
      createdAt: typeof p.createdAt === "number" ? p.createdAt : Date.now(),
      updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : Date.now(),
    }));
  } catch {
    return [];
  }
}

export function readLocalProjects(): Project[] {
  if (typeof window === "undefined") return [];
  return safeParse(window.localStorage.getItem(KEY));
}

function persist(projects: Project[]): Project[] {
  const trimmed = [...projects]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, LIMIT);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(trimmed));
  }
  return trimmed;
}

export function upsertLocalProject(project: Project): Project[] {
  const rest = readLocalProjects().filter((p) => p.id !== project.id);
  return persist([project, ...rest]);
}

export function deleteLocalProject(id: string): Project[] {
  return persist(readLocalProjects().filter((p) => p.id !== id));
}

export function clearLocalProjects(): void {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}
