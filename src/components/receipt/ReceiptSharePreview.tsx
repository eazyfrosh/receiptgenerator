"use client";

import { useRef } from "react";
import { ReceiptData } from "@/lib/types";
import { ReceiptCanvas } from "@/components/receipt/ReceiptCanvas";
import { ExportMenu } from "@/components/dashboard/ExportMenu";

export function ReceiptSharePreview({ data }: { data: ReceiptData }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="glass-card flex flex-col items-center gap-6 p-6 sm:p-8">
      <ReceiptCanvas ref={canvasRef} data={data} />
      <ExportMenu canvasRef={canvasRef} data={data} />
    </div>
  );
}
