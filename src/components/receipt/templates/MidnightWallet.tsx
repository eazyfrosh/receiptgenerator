import { ShieldCheck, Moon } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function MidnightWallet({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-[#0E1020] font-body text-white">
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 font-display font-bold tracking-tight text-white/90">
          <Moon size={18} className="text-studio-flux" />
          Midnight Wallet
        </div>
        <ShieldCheck size={18} className="text-studio-flux/70" />
      </div>

      <div className="mx-6 mt-5 rounded-xl2 border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
        <p className="text-[11px] uppercase tracking-widest text-white/40">Amount transferred</p>
        <AmountHero data={data} className="mt-1 text-4xl text-white" />
        <div className="mt-3">
          <StatusPill status={data.status} />
        </div>
      </div>

      <div className="mx-6 mt-5 flex items-center gap-3">
        <AvatarBubble data={data} ring="bg-studio-flux/20 text-studio-flux" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-white">{data.recipientName}</p>
          <p className="truncate text-xs text-white/40">Recipient · via {data.paymentMethod}</p>
        </div>
      </div>

      {data.note && (
        <p className="mx-6 mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/70">
          {data.note}
        </p>
      )}

      <div className="mx-6 mt-5 border-t border-white/10 pt-4">
        <MetaGrid data={data} labelClass="text-white/35" valueClass="text-white/90" />
      </div>

      <div className="mx-6 mt-5 flex items-center justify-between pb-5">
        <p className="text-[11px] text-white/30">From {data.senderName}</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar dark />
    </div>
  );
}
