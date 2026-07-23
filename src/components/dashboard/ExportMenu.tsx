"use client";

import { useState, RefObject } from "react";
import { Download, Link2, Check, Loader2 } from "lucide-react";
import { exportPng, exportJpg, exportPdf } from "@/lib/export";
import { buildShareUrl } from "@/lib/share";
import { ReceiptData } from "@/lib/types";

export function ExportMenu({
  canvasRef,
  data,
}: {
  canvasRef: RefObject<HTMLDivElement>;
  data: ReceiptData;
}) {
  const [busy, setBusy] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function run(kind: "png" | "jpg" | "pdf") {
    if (!canvasRef.current) return;
    setBusy(kind);
    try {
      const filename = `receipt-studio-${data.receiptNumber || "prop"}`;
      if (kind === "png") await exportPng(canvasRef.current, filename);
      if (kind === "jpg") await exportJpg(canvasRef.current, filename);
      if (kind === "pdf") await exportPdf(canvasRef.current, filename);
    } finally {
      setBusy(null);
    }
  }

  async function copyLink() {
    const url = buildShareUrl(data);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["png", "jpg", "pdf"] as const).map((kind) => (
        <button
          key={kind}
          type="button"
          onClick={() => run(kind)}
          disabled={busy !== null}
          className="btn-ghost"
        >
          {busy === kind ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          {kind.toUpperCase()}
        </button>
      ))}
      <button type="button" onClick={copyLink} className="btn-primary">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
        {copied ? "Link copied" : "Copy share link"}
      </button>
    </div>
  );
}
