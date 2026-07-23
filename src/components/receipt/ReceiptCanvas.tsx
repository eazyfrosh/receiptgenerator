"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReceiptData } from "@/lib/types";
import { TEMPLATE_COMPONENTS } from "./templates";
import { Watermark } from "./Watermark";
import { buildShareUrl } from "@/lib/share";
import { generateQrDataUrl } from "@/lib/qrcode";

export const ReceiptCanvas = forwardRef<HTMLDivElement, { data: ReceiptData }>(
  function ReceiptCanvas({ data }, ref) {
    const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
    const Template = TEMPLATE_COMPONENTS[data.templateId];

    useEffect(() => {
      let cancelled = false;
      const timeout = setTimeout(async () => {
        try {
          const url = buildShareUrl(data);
          const qr = await generateQrDataUrl(url);
          if (!cancelled) setQrDataUrl(qr);
        } catch {
          if (!cancelled) setQrDataUrl(null);
        }
      }, 300);
      return () => {
        cancelled = true;
        clearTimeout(timeout);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(data)]);

    return (
      <div
        ref={ref}
        className="relative mx-auto max-w-full overflow-hidden rounded-xl3 shadow-glass-lg"
        style={{ width: 420, clipPath: "inset(0 round 1.75rem)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={data.templateId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Template data={data} qrDataUrl={qrDataUrl} />
          </motion.div>
        </AnimatePresence>
        <Watermark />
      </div>
    );
  }
);
