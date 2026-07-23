import { Smartphone } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function MobileMoney({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-[#FFFBF0] font-body text-studio-ink">
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 font-display font-extrabold text-studio-amber">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-studio-amber/15">
            <Smartphone size={16} />
          </span>
          Mobile Money
        </div>
        <StatusPill status={data.status} />
      </div>

      <div className="px-6 pt-5 text-center">
        <p className="text-[11px] uppercase tracking-widest text-studio-slate">You sent</p>
        <AmountHero data={data} className="mt-1 text-4xl" />
        <div className="mt-3 flex items-center justify-center gap-2">
          <AvatarBubble data={data} size={32} ring="bg-studio-amber/15 text-studio-amber" />
          <p className="text-sm font-bold">{data.recipientName}</p>
        </div>
      </div>

      <div className="relative my-5 flex items-center px-2">
        <div className="h-3 w-3 -translate-x-1/2 rounded-full bg-canvas" />
        <div className="mx-1 flex-1 border-t-2 border-dashed border-studio-mist/50" />
        <div className="h-3 w-3 translate-x-1/2 rounded-full bg-canvas" />
      </div>

      <div className="px-6 pb-1">
        <MetaGrid data={data} labelClass="text-studio-slate" valueClass="text-studio-ink" />
      </div>

      {data.note && (
        <p className="mx-6 mt-4 rounded-lg bg-studio-amber/10 px-3 py-2 text-sm text-studio-ink/80">
          {data.note}
        </p>
      )}

      <div className="flex items-center justify-between px-6 py-4">
        <p className="text-[11px] text-studio-slate">From {data.senderName}</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
