"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useReceiptStore } from "@/lib/store";
import { TEMPLATE_ORDER, TEMPLATE_META, TemplateId } from "@/lib/types";

const SWATCH: Record<TemplateId, string> = {
  "modern-green-wallet": "from-studio-mintDark to-studio-mint",
  "midnight-wallet": "from-[#0E1020] to-studio-flux",
  "neon-transfer": "from-fuchsia-500 to-cyan-400",
  "business-payment": "from-studio-ink to-studio-slate",
  "digital-wallet-pro": "from-studio-ink to-studio-amber",
  "mobile-money": "from-studio-amber to-[#FFFBF0]",
  "instant-transfer": "from-studio-flux to-studio-mint",
  "premium-receipt": "from-[#FAF8F3] to-studio-amber",
};

export function TemplateGallery() {
  const templateId = useReceiptStore((s) => s.data.templateId);
  const setTemplate = useReceiptStore((s) => s.setTemplate);

  return (
    <div className="grid grid-cols-2 gap-3">
      {TEMPLATE_ORDER.map((id) => {
        const active = id === templateId;
        return (
          <motion.button
            key={id}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setTemplate(id)}
            className={clsx(
              "group relative overflow-hidden rounded-xl2 border p-3 text-left transition",
              active
                ? "border-studio-flux ring-2 ring-studio-flux/40"
                : "border-studio-mist/30 hover:border-studio-flux/40"
            )}
          >
            <div className={clsx("h-10 w-full rounded-lg bg-gradient-to-r", SWATCH[id])} />
            <p className="mt-2 truncate text-xs font-bold">{TEMPLATE_META[id].name}</p>
            <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-studio-slate">
              {TEMPLATE_META[id].description}
            </p>
          </motion.button>
        );
      })}
    </div>
  );
}
