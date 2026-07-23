import { Zap } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function NeonTransfer({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="relative flex flex-col overflow-hidden bg-[#0A0A0F] font-body text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-fuchsia-500 via-studio-flux to-cyan-400" />
      <div className="pointer-events-none absolute -left-16 top-16 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative flex items-center justify-between px-6 pt-7">
        <div className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-widest text-transparent">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-cyan-300">
            <Zap size={16} />
          </span>
          <span className="bg-gradient-to-r from-fuchsia-400 to-cyan-300 bg-clip-text">
            Neon Transfer
          </span>
        </div>
        <StatusPill status={data.status} />
      </div>

      <div className="relative px-6 pt-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">Instant transfer</p>
        <AmountHero
          data={data}
          className="mt-1 bg-gradient-to-r from-fuchsia-400 via-white to-cyan-300 bg-clip-text text-4xl text-transparent"
        />
      </div>

      <div className="relative mt-6 flex items-center gap-3 px-6">
        <AvatarBubble data={data} ring="bg-fuchsia-500/20 text-fuchsia-300" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{data.recipientName}</p>
          <p className="truncate text-xs text-white/40">{data.senderName} → {data.recipientName}</p>
        </div>
      </div>

      {data.note && (
        <p className="relative mx-6 mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70">
          {data.note}
        </p>
      )}

      <div className="relative mx-6 mt-5 border-t border-white/10 pt-4">
        <MetaGrid data={data} labelClass="text-white/35" valueClass="text-white/90" />
      </div>

      <div className="relative mx-6 mt-5 flex items-center justify-between pb-5">
        <p className="text-[11px] text-white/30">Receipt Studio Prop</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar dark />
    </div>
  );
}
