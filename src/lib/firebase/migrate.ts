import { readLocalProjects, clearLocalProjects } from "@/lib/projectsLocal";
import { saveProjectDoc } from "./projects";
import { uploadAvatar, isDataUrl } from "./storage";

/**
 * One-time migration when a guest signs in: push any locally-cached projects
 * up to Firestore (uploading data-URL avatars to Storage along the way), then
 * clear the local cache so Firestore becomes the single source of truth.
 * Idempotent — safe to call again; it simply finds nothing to migrate.
 */
export async function migrateLocalProjectsToCloud(uid: string): Promise<number> {
  const locals = readLocalProjects();
  if (locals.length === 0) return 0;

  for (const project of locals) {
    let avatarUrl = project.data.avatarDataUrl;
    if (isDataUrl(avatarUrl)) {
      try {
        avatarUrl = await uploadAvatar(uid, project.id, avatarUrl);
      } catch {
        avatarUrl = null;
      }
    }
    await saveProjectDoc(uid, {
      ...project,
      data: { ...project.data, avatarDataUrl: avatarUrl },
    });
  }

  clearLocalProjects();
  return locals.length;
}
