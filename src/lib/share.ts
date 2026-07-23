import { ReceiptData } from "./types";

// Shareable links encode the receipt data directly in the URL fragment so a
// receipt can be viewed without any backend. Nothing here is sent to a
// server on this app's side.
export function encodeReceipt(data: ReceiptData): string {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeReceipt(encoded: string): ReceiptData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as ReceiptData;
  } catch {
    return null;
  }
}

export function buildShareUrl(data: ReceiptData): string {
  const encoded = encodeReceipt(data);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/r/${encoded}`;
}

// Server-side (Node) decode counterpart to decodeReceipt, for use in Server
// Components where atob/TextDecoder-on-bytes-from-btoa isn't the concern —
// Buffer is available instead.
export function decodeReceiptServer(encoded: string): ReceiptData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = Buffer.from(padded, "base64").toString("utf-8");
    return JSON.parse(json) as ReceiptData;
  } catch {
    return null;
  }
}
