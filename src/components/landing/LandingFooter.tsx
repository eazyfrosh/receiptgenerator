"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { href: "/dashboard", label: "Open the app", external: false },
      { href: "#features", label: "Features", external: false },
      { href: "#previews", label: "Templates", external: false },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "#faq", label: "FAQ", external: false },
      { href: "/disclaimer", label: "Disclaimer", external: false },
    ],
  },
];

export function LandingFooter({
  showSignIn,
  onSignIn,
}: {
  showSignIn: boolean;
  onSignIn: () => void;
}) {
  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl3 bg-gradient-to-br from-studio-flux to-studio-mintDark px-6 py-12 text-center text-white sm:px-12 sm:py-16"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to make your first prop receipt?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/85">
            Start designing in seconds — no account needed. Sign in whenever you
            want your projects synced to the cloud.
          </p>
          <div className="relative mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-studio-flux transition hover:brightness-95 active:scale-[0.98]"
            >
              Get started
              <ArrowRight size={17} />
            </Link>
            {showSignIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10 active:scale-[0.98]"
              >
                Sign in
              </button>
            )}
          </div>
        </motion.div>

        {/* Links */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo size={30} />
              <span className="font-display text-base font-extrabold tracking-tight">
                Receipt Studio
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-studio-slate">
              Original, clearly-labeled fictional receipt mockups for
              entertainment, parody, film production, UI design and education.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-display text-xs font-bold uppercase tracking-wide text-studio-slate">
                {col.heading}
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-studio-slate transition hover:text-studio-ink dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-studio-mist/20 pt-6">
          <p className="text-center text-[11px] leading-relaxed text-studio-slate">
            Receipt Studio generates fictional mockups for entertainment, parody,
            film production, and UI design only. Every receipt is permanently
            watermarked <span className="font-semibold">FICTIONAL — NOT A REAL TRANSACTION</span>{" "}
            and is not proof of any payment.
          </p>
          <p className="mt-3 text-center text-[11px] text-studio-slate">
            © {new Date().getFullYear()} Receipt Studio. Original branding — no real
            brands, logos, or trademarks are used.
          </p>
        </div>
      </div>
    </footer>
  );
}
