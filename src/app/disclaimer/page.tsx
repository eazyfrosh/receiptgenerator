import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Disclaimer — Receipt Studio",
  description: "This is a fictional receipt created for entertainment.",
};

export default function DisclaimerPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-canvas px-6 text-center dark:bg-canvas-dark">
      <Logo size={48} />
      <div className="glass-card flex max-w-md flex-col items-center gap-4 p-8">
        <ShieldAlert size={36} className="text-studio-amber" />
        <p className="font-display text-lg font-extrabold">
          This is a fictional receipt created for entertainment.
        </p>
        <p className="text-sm text-studio-slate">
          It was generated with Receipt Studio, a mockup tool for parody, film props, UI design,
          and educational demonstrations. No real payment was made and no real funds moved. This
          image is not proof of any transaction and must not be used to claim that a payment
          occurred.
        </p>
        <Link href="/" className="btn-primary mt-2">
          Go to Receipt Studio
        </Link>
      </div>
    </div>
  );
}
