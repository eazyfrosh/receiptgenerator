import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  orderBy,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb } from "./client";
import { Project, ReceiptData } from "@/lib/types";

function projectsCollection(uid: string) {
  const db = getDb();
  if (!db) throw new Error("Firestore not configured");
  return collection(db, "users", uid, "projects");
}

/** Firestore rejects `undefined`; normalize a project into a plain, safe doc. */
function toDoc(project: Project): Record<string, unknown> {
  const data: ReceiptData = {
    ...project.data,
    avatarDataUrl: project.data.avatarDataUrl ?? null,
  };
  return {
    id: project.id,
    name: project.name,
    data,
    archived: Boolean(project.archived),
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
}

function fromDoc(id: string, raw: Record<string, unknown>): Project | null {
  const data = raw.data as ReceiptData | undefined;
  if (!data || typeof data !== "object") return null;
  return {
    id,
    name: typeof raw.name === "string" ? raw.name : "Untitled",
    data: { ...data, avatarDataUrl: data.avatarDataUrl ?? null },
    archived: Boolean(raw.archived),
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
    updatedAt: typeof raw.updatedAt === "number" ? raw.updatedAt : Date.now(),
  };
}

export async function saveProjectDoc(uid: string, project: Project): Promise<void> {
  const ref = doc(projectsCollection(uid), project.id);
  await setDoc(ref, toDoc(project), { merge: true });
}

export async function deleteProjectDoc(uid: string, projectId: string): Promise<void> {
  await deleteDoc(doc(projectsCollection(uid), projectId));
}

export async function getAllProjectDocs(uid: string): Promise<Project[]> {
  const snap = await getDocs(projectsCollection(uid));
  return snap.docs
    .map((d) => fromDoc(d.id, d.data() as Record<string, unknown>))
    .filter((p): p is Project => p !== null);
}

/**
 * Live subscription to a user's projects, ordered most-recent first. Emits
 * immediately from the offline cache and again whenever the server syncs.
 */
export function subscribeToProjects(
  uid: string,
  onChange: (projects: Project[]) => void,
  onError?: (error: unknown) => void
): Unsubscribe {
  const q = query(projectsCollection(uid), orderBy("updatedAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const projects = snap.docs
        .map((d) => fromDoc(d.id, d.data() as Record<string, unknown>))
        .filter((p): p is Project => p !== null);
      onChange(projects);
    },
    (error) => onError?.(error)
  );
}
