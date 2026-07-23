import Link from "next/link";
import { ShieldAlert, AlertTriangle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { decodeReceiptServer } from "@/lib/share";
import { isValidReceiptData } from "@/lib/validate";
import { ReceiptSharePreview } from "@/components/receipt/ReceiptSharePreview";

export default async function SharedReceiptPage({
  params,
}: {
  params: Promise<{ data: string }>;
}) {
  const { data: encoded } = await params;
  const decoded = decodeReceiptServer(encoded);
  const valid = isValidReceiptData(decoded);

  return (
    <div className="min-h-screen bg-canvas px-4 py-10 dark:bg-canvas-dark">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6">
        <Logo size={40} />

        <div className="glass-card flex w-full flex-col items-center gap-3 p-6 text-center">
          <ShieldAlert size={28} className="text-studio-amber" />
          <p className="font-display text-base font-extrabold">
            This is a fictional receipt created for entertainment.
          </p>
          <p className="text-xs text-studio-slate">
            Shared from Receipt Studio. Not a real transaction — see the{" "}
            <Link href="/disclaimer" className="underline">
              full disclaimer
            </Link>
            .
          </p>
        </div>

        {valid && decoded ? (
          <ReceiptSharePreview
            data={{
              ...decoded,
              avatarDataUrl:
                typeof decoded.avatarDataUrl === "string" ? decoded.avatarDataUrl : null,
            }}
          />
        ) : (
          <div className="glass-card flex flex-col items-center gap-3 p-8 text-center">
            <AlertTriangle size={26} className="text-studio-coral" />
            <p className="text-sm font-semibold">This share link is invalid or corrupted.</p>
            <Link href="/" className="btn-primary mt-1">
              Create a receipt
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
