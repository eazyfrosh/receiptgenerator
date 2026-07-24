"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { ReceiptCanvas } from "@/components/receipt/ReceiptCanvas";
import { HERO_SAMPLE } from "./samples";

export function HeroSection({
  showSignIn,
  onSignIn,
}: {
  showSignIn: boolean;
  onSignIn: () => void;
}) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
      {/* Decorative gradient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-studio-flux/25 blur-[120px]" />
        <div className="absolute -right-20 top-32 h-80 w-80 rounded-full bg-studio-mint/25 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-studio-flux/20 bg-studio-flux/10 px-3 py-1 text-xs font-semibold text-studio-flux"
          >
            <Sparkles size={13} />
            Fictional receipts for props, parody & design
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Studio-grade{" "}
            <span className="bg-gradient-to-r from-studio-flux to-studio-mintDark bg-clip-text text-transparent">
              fictional receipts
            </span>{" "}
            in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-studio-slate sm:text-lg"
          >
            Design original, wallet-inspired payment receipt mockups for film and
            theatre props, parody, UI design, and classroom demos. Eight distinct
            templates, live preview, and one-click export to PNG, JPG, or PDF —
            every receipt permanently watermarked so it can never pass as real.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.19 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/dashboard" className="btn-primary !px-5 !py-3 text-base">
              Get started — it&apos;s free
              <ArrowRight size={17} />
            </Link>
            {showSignIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="btn-ghost !px-5 !py-3 text-base"
              >
                Sign in
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-6 flex items-center gap-2 text-xs text-studio-slate"
          >
            <ShieldCheck size={14} className="text-studio-mintDark" />
            No sign-up required to start · Every export marked{" "}
            <span className="font-semibold">FICTIONAL</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            // The receipt canvas is a fixed 420px (needed in the editor); on the
            // landing let it shrink to fit narrow screens so it never widens the
            // layout past the viewport. Force the canvas root to fill this
            // (max-w-420) wrapper instead of its intrinsic 420px.
            className="[&>*]:!w-full"
          >
            <ReceiptCanvas data={HERO_SAMPLE} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
