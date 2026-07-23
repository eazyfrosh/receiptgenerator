import { Landmark } from "lucide-react";
import {
  TemplateProps,
  AvatarBubble,
  StatusPill,
  AmountHero,
  MetaGrid,
  FictionalFooterBar,
  QrBlock,
} from "./shared";
import { formatDate } from "@/lib/format";

export function BusinessPayment({ data, qrDataUrl }: TemplateProps) {
  return (
    <div className="flex flex-col bg-white font-body text-studio-ink">
      <div className="flex items-center justify-between border-b-2 border-studio-ink px-6 py-5">
        <div className="flex items-center gap-2 font-display font-extrabold uppercase tracking-wide">
          <Landmark size={18} />
          Business Payment
        </div>
        <p className="text-xs text-studio-slate">{formatDate(data.date)}</p>
      </div>

      <div className="flex items-center justify-between px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-studio-slate">Total amount</p>
          <AmountHero data={data} className="text-3xl" />
        </div>
        <StatusPill status={data.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 border-y border-dashed border-studio-mist/40 px-6 py-4">
        <div className="flex items-center gap-2">
          <AvatarBubble data={data} size={36} ring="bg-studio-ink/5 text-studio-ink" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase text-studio-slate">Payer</p>
            <p className="truncate text-sm font-semibold">{data.senderName}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase text-studio-slate">Payee</p>
          <p className="truncate text-sm font-semibold">{data.recipientName}</p>
        </div>
      </div>

      <div className="px-6 py-5">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-studio-slate">
          Invoice detail
        </p>
        <MetaGrid data={data} labelClass="text-studio-slate" valueClass="text-studio-ink" />
      </div>

      {data.note && (
        <p className="border-t border-studio-mist/30 px-6 py-3 text-sm text-studio-slate">
          Memo: {data.note}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-studio-mist/30 px-6 py-4">
        <p className="text-[11px] text-studio-slate">Authorized copy · Receipt Studio</p>
        <QrBlock qrDataUrl={qrDataUrl} />
      </div>

      <FictionalFooterBar />
    </div>
  );
}
