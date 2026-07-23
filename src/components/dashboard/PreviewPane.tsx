"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useReceiptStore } from "@/lib/store";
import { ReceiptCanvas } from "@/components/receipt/ReceiptCanvas";
import { ExportMenu } from "./ExportMenu";

export function PreviewPane() {
  const data = useReceiptStore((s) => s.data);
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-card flex flex-col items-center gap-6 p-6 sm:p-8"
    >
      <ReceiptCanvas ref={canvasRef} data={data} />
      <ExportMenu canvasRef={canvasRef} data={data} />
    </motion.div>
  );
}
