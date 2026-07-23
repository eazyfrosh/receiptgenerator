import { Send } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";
import { initials } from "@/lib/format";

export function InstantTransfer({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-white font-body text-studio-ink">
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 font-display font-bold text-studio-flux">
          <Send size={17} />
          Instant Transfer
        </div>
        <StatusPill status={data.status} />
      </div>

      <div className="relative flex items-center justify-center gap-4 px-6 py-7">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-studio-flux/10 font-display text-sm font-bold text-studio-flux">
            {initials(data.senderName) || "?"}
          </div>
          <p className="max-w-[80px] truncate text-[11px] text-studio-slate">{data.senderName}</p>
        </div>

        <div className="relative flex-1">
          <div className="h-0.5 w-full rounded bg-gradient-to-r from-studio-flux via-studio-mint to-studio-flux bg-[length:200%_100%] animate-shimmer" />
          <Send size={16} className="absolute -top-2 right-0 text-studio-mintDark" />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <AvatarBubble data={data} size={44} ring="bg-studio-mint/15 text-studio-mintDark" />
          <p className="max-w-[80px] truncate text-[11px] text-studio-slate">{data.recipientName}</p>
        </div>
      </div>

      <div className="px-6 text-center">
        <AmountHero data={data} className="text-4xl" />
        <p className="mt-1 text-xs text-studio-slate">Delivered instantly</p>
      </div>

      {data.note && (
        <p className="mx-6 mt-4 rounded-lg border border-studio-flux/15 bg-studio-flux/5 px-3 py-2 text-sm text-studio-ink/80">
          {data.note}
        </p>
      )}

      <div className="px-6 py-5">
        <MetaGrid data={data} labelClass="text-studio-slate" valueClass="text-studio-ink" />
      </div>

      <div className="flex items-center justify-between border-t border-studio-mist/20 px-6 py-4">
        <p className="text-[11px] text-studio-slate">Instant Transfer · Receipt Studio</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
