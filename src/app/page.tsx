"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Topbar } from "@/components/dashboard/Topbar";
import { TemplateGallery } from "@/components/dashboard/TemplateGallery";
import { RecentProjects } from "@/components/dashboard/RecentProjects";
import { CustomizeForm } from "@/components/dashboard/CustomizeForm";
import { PreviewPane } from "@/components/dashboard/PreviewPane";
import { useReceiptStore } from "@/lib/store";

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const hydrated = useReceiptStore((s) => s.hydrated);

  useEffect(() => {
    // Client-mount guard: the persisted store rehydrates from localStorage
    // synchronously on the client, so its values differ from the server's
    // initial render. Gating the dashboard on a mount flag keeps the first
    // client paint identical to the server output and avoids a hydration
    // mismatch. This is the documented use for setState-in-effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !hydrated) {
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
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark">
      <Topbar />
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:px-6">
        <aside className="glass-card flex flex-col gap-6 p-5 lg:order-1">
          <div>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-studio-slate">
              Templates
            </h2>
            <TemplateGallery />
          </div>
          <div>
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-studio-slate">
              Recent projects
            </h2>
            <RecentProjects />
          </div>
        </aside>

        <section className="order-first lg:order-2">
          <PreviewPane />
        </section>

        <aside className="glass-card p-5 lg:order-3">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wide text-studio-slate">
            Customize
          </h2>
          <CustomizeForm />
        </aside>
      </main>

      <footer className="mx-auto max-w-7xl px-6 pb-8 pt-2 text-center text-[11px] text-studio-slate">
        Receipt Studio generates fictional mockups for entertainment, parody, film production, and
        UI design only. Every receipt is permanently watermarked and is not proof of any real
        transaction.
      </footer>
    </div>
  );
}
