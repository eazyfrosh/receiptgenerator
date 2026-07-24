"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggleButton } from "./ThemeToggleButton";

const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#previews", label: "Templates" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav({
  showSignIn,
  onSignIn,
}: {
  showSignIn: boolean;
  onSignIn: () => void;
}) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="glass-panel sticky top-0 z-40 mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6"
    >
      <Link href="/" className="flex items-center gap-2.5">
        <Logo size={32} />
        <span className="font-display text-base font-extrabold tracking-tight">
          Receipt Studio
        </span>
      </Link>

      <nav className="hidden items-center gap-7 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-studio-slate transition hover:text-studio-ink dark:hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggleButton />
        {showSignIn && (
          <button type="button" onClick={onSignIn} className="btn-ghost hidden sm:inline-flex">
            Sign in
          </button>
        )}
        <Link href="/dashboard" className="btn-primary">
          Get started
          <ArrowRight size={15} />
        </Link>
      </div>
    </motion.header>
  );
}
