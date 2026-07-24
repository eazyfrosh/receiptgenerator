"use client";

import { motion } from "framer-motion";
import {
  LayoutTemplate,
  ShieldAlert,
  Download,
  CloudCog,
  QrCode,
  Wand2,
  History,
  Moon,
} from "lucide-react";

const FEATURES = [
  {
    icon: LayoutTemplate,
    title: "8 original templates",
    body: "Wallet, business, mobile-money, neon and premium styles — each with its own colors, layout, icons and typography.",
  },
  {
    icon: ShieldAlert,
    title: "Non-removable watermark",
    body: "A full-bleed FICTIONAL · FOR ENTERTAINMENT ONLY watermark is baked into every preview and export. It can't be cropped or disabled.",
  },
  {
    icon: Download,
    title: "Export to PNG, JPG & PDF",
    body: "High-resolution, pixel-accurate exports render exactly what you see — watermark and all.",
  },
  {
    icon: CloudCog,
    title: "Accounts & cloud sync",
    body: "Sign in to sync projects across devices with Firebase, or stay a guest with local autosave. Your data, your space.",
  },
  {
    icon: Wand2,
    title: "Live animated preview",
    body: "Every field updates the receipt instantly, with smooth template transitions powered by Framer Motion.",
  },
  {
    icon: QrCode,
    title: "QR & shareable links",
    body: "Each receipt carries a QR code and share link that both open a clear fictional-receipt disclaimer page.",
  },
  {
    icon: History,
    title: "Autosave, undo & redo",
    body: "Never lose a draft. Full history, recent projects, rename, duplicate, archive and search — all built in.",
  },
  {
    icon: Moon,
    title: "Dark mode & responsive",
    body: "A premium glassmorphism interface that looks great in light or dark, on phones, tablets and desktops.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to fake it — clearly
          </h2>
          <p className="mt-4 text-studio-slate">
            Purpose-built for entertainment and design work, with safety baked in
            so nothing you make can be mistaken for a real transaction.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
              className="glass-card group p-5 transition hover:-translate-y-1 hover:shadow-glass-lg"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-studio-flux/15 to-studio-mint/15 text-studio-flux transition group-hover:from-studio-flux group-hover:to-studio-mintDark group-hover:text-white">
                <feature.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold">{feature.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-studio-slate">
                {feature.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
