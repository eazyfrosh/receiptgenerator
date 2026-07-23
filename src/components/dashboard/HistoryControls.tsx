"use client";

import { Undo2, Redo2 } from "lucide-react";
import { useReceiptStore } from "@/lib/store";

export function HistoryControls() {
  const past = useReceiptStore((s) => s.past);
  const future = useReceiptStore((s) => s.future);
  const undo = useReceiptStore((s) => s.undo);
  const redo = useReceiptStore((s) => s.redo);

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={undo}
        disabled={past.length === 0}
        className="btn-icon"
        title="Undo"
      >
        <Undo2 size={16} />
      </button>
      <button
        type="button"
        onClick={redo}
        disabled={future.length === 0}
        className="btn-icon"
        title="Redo"
      >
        <Redo2 size={16} />
      </button>
    </div>
  );
}
