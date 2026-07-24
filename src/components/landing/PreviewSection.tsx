"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReceiptCanvas } from "@/components/receipt/ReceiptCanvas";
import { PREVIEW_SAMPLES } from "./samples";

export function PreviewSection() {
  return (
    <section
      id="previews"
      className="relative scroll-mt-20 overflow-hidden px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-studio-flux/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Eight distinct styles, one clear label
          </h2>
          <p className="mt-4 text-studio-slate">
            Real previews rendered live in the app — from midnight glass to neon and
            editorial premium. Every one is permanently watermarked.
          </p>
        </motion.div>

        <div className="mt-14 grid justify-items-center gap-10 md:grid-cols-2 xl:grid-cols-3">
          {PREVIEW_SAMPLES.map((data, i) => (
            <motion.div
              key={data.templateId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              // Force the fixed-width (420px) canvas to fill this responsive
              // wrapper so previews shrink on narrow screens instead of
              // overflowing the grid track.
              className="w-full max-w-[380px] [&>*]:!w-full"
            >
              <ReceiptCanvas data={data} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          <Link href="/dashboard" className="btn-primary !px-5 !py-3 text-base">
            Explore all templates
            <ArrowRight size={17} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
