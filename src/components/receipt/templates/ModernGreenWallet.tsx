import { Wallet, ArrowUpRight } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function ModernGreenWallet({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-white font-body text-studio-ink">
      <div className="relative overflow-hidden bg-gradient-to-br from-studio-mintDark to-studio-mint px-6 pb-8 pt-6 text-white">
        <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
              <Wallet size={17} />
            </span>
            Green Wallet
          </div>
          <StatusPill status={data.status} className="bg-white/20 !text-white" />
        </div>
        <div className="relative mt-6 flex items-end gap-2">
          <ArrowUpRight size={26} className="mb-1.5 opacity-90" />
          <AmountHero data={data} className="text-4xl" />
        </div>
        <p className="relative mt-1 text-sm text-white/80">Sent successfully</p>
      </div>

      <div className="flex items-center gap-3 border-b border-studio-mist/20 px-6 py-4">
        <AvatarBubble data={data} ring="bg-studio-mint/20 text-studio-mintDark" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">{data.recipientName}</p>
          <p className="truncate text-xs text-studio-slate">from {data.senderName}</p>
        </div>
      </div>

      {data.note && (
        <p className="border-b border-studio-mist/20 px-6 py-3 text-sm italic text-studio-slate">
          “{data.note}”
        </p>
      )}

      <div className="px-6 py-5">
        <MetaGrid
          data={data}
          labelClass="text-studio-slate"
          valueClass="text-studio-ink"
        />
      </div>

      <div className="flex items-center justify-between border-t border-studio-mist/20 px-6 py-4">
        <p className="text-[11px] text-studio-slate">Receipt Studio · Prop Wallet</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
