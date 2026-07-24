import { ReceiptData } from "@/lib/types";
import { initials, formatAmount, formatDate, formatTime } from "@/lib/format";
import { CheckCircle2, Clock3, XCircle, ShieldAlert } from "lucide-react";
import clsx from "clsx";

export interface TemplateProps {
  data: ReceiptData;
  qrDataUrl: string | null;
}

export function AvatarBubble({
  data,
  size = 48,
  ring,
}: {
  data: ReceiptData;
  size?: number;
  ring?: string;
}) {
  return (
    <div
      className={clsx(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full font-display font-bold",
        ring
      )}
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {data.avatarDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.avatarDataUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initials(data.recipientName) || "?"}</span>
      )}
    </div>
  );
}

const STATUS_STYLE: Record<
  ReceiptData["status"],
  { icon: typeof CheckCircle2; classes: string }
> = {
  Completed: {
    icon: CheckCircle2,
    classes: "bg-studio-mint/15 text-studio-mintDark",
  },
  Pending: {
    icon: Clock3,
    classes: "bg-studio-amber/15 text-studio-amber",
  },
  Failed: {
    icon: XCircle,
    classes: "bg-studio-coral/15 text-studio-coral",
  },
};

export function StatusPill({
  status,
  className,
}: {
  status: ReceiptData["status"];
  className?: string;
}) {
  const { icon: Icon, classes } = STATUS_STYLE[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
        classes,
        className
      )}
    >
      <Icon size={14} strokeWidth={2.5} />
      {status}
    </span>
  );
}

export function AmountHero({
  data,
  className,
}: {
  data: ReceiptData;
  className?: string;
}) {
  return (
    <div className={clsx("font-display font-extrabold tracking-tight", className)}>
      {formatAmount(data.amount, data.currency)}
    </div>
  );
}

export function MetaGrid({
  data,
  className,
  labelClass,
  valueClass,
}: {
  data: ReceiptData;
  className?: string;
  labelClass?: string;
  valueClass?: string;
}) {
  const rows: [string, string][] = [
    ["Date", formatDate(data.date)],
    ["Time", formatTime(data.time)],
    ["Payment method", data.paymentMethod],
    ["Transaction ID", data.transactionId],
    ["Reference no.", data.referenceNumber],
    ["Receipt no.", data.receiptNumber],
    ["Balance after", formatAmount(data.balanceAfter, data.currency)],
  ];
  return (
    <div className={clsx("grid grid-cols-2 gap-x-4 gap-y-3", className)}>
      {rows.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <div className={clsx("text-[10px] uppercase tracking-wider", labelClass)}>
            {label}
          </div>
          <div className={clsx("truncate text-sm font-semibold font-mono", valueClass)}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FictionalFooterBar({ dark }: { dark?: boolean }) {
  return (
    <div
      className={clsx(
        "relative z-50 flex items-center justify-center gap-1.5 border-t px-4 py-2",
        dark
          ? "border-white/10 bg-black/30 text-white/85"
          : "border-studio-ink/10 bg-studio-ink/[0.03] text-studio-ink/70"
      )}
    >
      <ShieldAlert size={11} className="shrink-0 opacity-80" />
      <p className="font-display text-[9.5px] font-bold uppercase leading-none tracking-[0.13em]">
        Fictional · For Entertainment Only · Not a Real Transaction
      </p>
    </div>
  );
}

export function QrBlock({
  qrDataUrl,
  label,
  className,
}: {
  qrDataUrl: string | null;
  label?: string;
  className?: string;
}) {
  if (!qrDataUrl) return null;
  return (
    <div className={clsx("flex flex-col items-center gap-1", className)}>
      {/* Solid white chip behind the code: the QR's own pixels are a fixed
          dark-on-transparent render, so it needs guaranteed contrast no
          matter which template (light or near-black) sits behind it. */}
      <div className="rounded-md bg-white p-1.5 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrDataUrl} alt="Fictional receipt disclaimer QR code" className="h-14 w-14" />
      </div>
      <span className="text-[9px] uppercase tracking-wide opacity-60">
        {label ?? "Scan for disclaimer"}
      </span>
    </div>
  );
}
