"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { LandingNav } from "@/components/landing/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PreviewSection } from "@/components/landing/PreviewSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function HomePage() {
  const { user, loading, available } = useAuth();
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);

  // Signed-in users don't need the marketing page — send them to the app.
  useEffect(() => {
    if (available && !loading && user) router.replace("/dashboard");
  }, [available, loading, user, router]);

  // While auth is still resolving (or a signed-in user is being redirected),
  // show a branded loader instead of flashing the landing page. When Firebase
  // isn't configured, `loading` is already false and guests see the page
  // immediately.
  const resolving = available && (loading || Boolean(user));
  if (resolving) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas dark:bg-canvas-dark">
        <div className="flex flex-col items-center gap-3 animate-fade-up">
          <Logo size={40} />
          <p className="text-sm text-studio-slate">Loading Receipt Studio…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-canvas dark:bg-canvas-dark">
      <LandingNav showSignIn={available} onSignIn={() => setAuthOpen(true)} />
      <main>
        <HeroSection showSignIn={available} onSignIn={() => setAuthOpen(true)} />
        <FeaturesSection />
        <PreviewSection />
        <FaqSection />
      </main>
      <LandingFooter showSignIn={available} onSignIn={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
