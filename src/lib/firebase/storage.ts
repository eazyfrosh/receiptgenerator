import { ref, uploadString, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirebaseStorage } from "./client";

/**
 * Upload an avatar (given as a data: URL) to Storage under the owner's path
 * and return a durable download URL. Firestore documents have a 1 MB limit,
 * so avatars live in Storage and the project doc only holds the URL.
 */
export async function uploadAvatar(
  uid: string,
  projectId: string,
  dataUrl: string
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Storage not configured");
  const path = `users/${uid}/avatars/${projectId}`;
  const objectRef = ref(storage, path);
  await uploadString(objectRef, dataUrl, "data_url");
  return getDownloadURL(objectRef);
}

/** Best-effort delete of a project's avatar object; missing objects are fine. */
export async function deleteAvatar(uid: string, projectId: string): Promise<void> {
  const storage = getFirebaseStorage();
  if (!storage) return;
  try {
    await deleteObject(ref(storage, `users/${uid}/avatars/${projectId}`));
  } catch {
    // object may not exist — ignore
  }
}

export function isDataUrl(value: string | null | undefined): value is string {
  return typeof value === "string" && value.startsWith("data:");
}
