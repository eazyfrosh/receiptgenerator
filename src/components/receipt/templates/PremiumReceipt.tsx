import { Gem } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function PremiumReceipt({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-[#FAF8F3] font-body text-studio-ink">
      <div className="flex items-center justify-between px-7 pt-7">
        <div className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.15em] text-studio-ink/80">
          <Gem size={16} className="text-studio-amber" />
          Premium Receipt
        </div>
        <StatusPill status={data.status} />
      </div>

      <div className="mx-7 my-5 h-px bg-gradient-to-r from-transparent via-studio-amber/60 to-transparent" />

      <div className="px-7 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-studio-slate">Amount</p>
        <AmountHero data={data} className="mt-1 text-[2.75rem] leading-none" />
      </div>

      <div className="mx-7 my-6 flex items-center justify-center gap-3">
        <AvatarBubble data={data} size={40} ring="bg-studio-amber/15 text-studio-amber" />
        <div className="text-left">
          <p className="text-sm font-bold">{data.recipientName}</p>
          <p className="text-xs text-studio-slate">from {data.senderName}</p>
        </div>
      </div>

      {data.note && (
        <p className="px-7 text-center text-sm italic text-studio-slate">“{data.note}”</p>
      )}

      <div className="mx-7 my-5 h-px bg-studio-ink/10" />

      <div className="px-7">
        <MetaGrid data={data} labelClass="text-studio-slate" valueClass="text-studio-ink" />
      </div>

      <div className="mx-7 mt-6 flex items-center justify-between border-t border-studio-ink/10 py-4">
        <p className="font-display text-[11px] uppercase tracking-widest text-studio-slate">
          Receipt Studio Editions
        </p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
