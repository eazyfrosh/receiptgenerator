import { CreditCard } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";

export function DigitalWalletPro({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-white font-body text-studio-ink">
      <div className="relative bg-studio-ink px-6 py-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold">
            <CreditCard size={18} className="text-studio-amber" />
            Wallet Pro
          </div>
          <StatusPill status={data.status} className="bg-white/10 !text-white" />
        </div>
        <AmountHero data={data} className="mt-4 text-4xl" />
        <div className="mt-4 flex items-center gap-3">
          <AvatarBubble data={data} size={40} ring="bg-white/10 text-white" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{data.recipientName}</p>
            <p className="truncate text-xs text-white/50">paid by {data.senderName}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-studio-mist/20 border-b border-studio-mist/20">
        {[
          ["Method", data.paymentMethod],
          ["Receipt", data.receiptNumber],
          ["Balance", data.balanceAfter],
        ].map(([label, value]) => (
          <div key={label} className="px-4 py-3 text-center">
            <p className="text-[10px] uppercase text-studio-slate">{label}</p>
            <p className="truncate text-xs font-bold font-mono">{value}</p>
          </div>
        ))}
      </div>

      {data.note && (
        <p className="px-6 py-3 text-sm italic text-studio-slate">“{data.note}”</p>
      )}

      <div className="px-6 py-5">
        <MetaGrid data={data} labelClass="text-studio-slate" valueClass="text-studio-ink" />
      </div>

      <div className="flex items-center justify-between border-t border-studio-mist/20 px-6 py-4">
        <p className="text-[11px] text-studio-slate">Digital Wallet Pro · Receipt Studio</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
