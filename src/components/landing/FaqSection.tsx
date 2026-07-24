"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is this a real payment app?",
    a: "No. Receipt Studio only generates fictional mockups for entertainment, parody, film and theatre props, UI design, and education. Nothing here moves money or connects to any real bank or wallet.",
  },
  {
    q: "Can I remove the watermark?",
    a: "No — and that's the point. A full-bleed “FICTIONAL · FOR ENTERTAINMENT ONLY · NOT A REAL TRANSACTION” watermark is rendered into every preview and every exported file. It cannot be hidden, disabled, or cropped out without destroying the receipt.",
  },
  {
    q: "What can I legitimately use it for?",
    a: "Film, TV and theatre props; parody and comedy sketches; app and website UI mockups; design portfolios; and classroom demonstrations. Anything where an obviously-fictional receipt is useful and it's clear no real payment occurred.",
  },
  {
    q: "Do I need an account?",
    a: "No. You can start immediately as a guest — projects autosave in your browser. Creating an account (email or Google) adds cloud sync so your projects follow you across devices.",
  },
  {
    q: "Which export formats are supported?",
    a: "PNG, JPG and PDF, all rendered at high resolution and all carrying the permanent watermark and disclaimer.",
  },
  {
    q: "Is my data private?",
    a: "Guests keep everything in their own browser via localStorage. Signed-in users' projects live in their own private space, protected by security rules so only they can read or write their data.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-studio-slate">
            Everything about what Receipt Studio is — and what it isn&apos;t.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="glass-card overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-studio-flux"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-studio-slate">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
