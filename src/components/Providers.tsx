"use client";

import { type ReactNode } from "react";
import { ProjectsProvider } from "@/components/projects/ProjectsProvider";

// AuthProvider lives in the root layout so every route (landing + dashboard)
// shares auth state. ProjectsProvider is dashboard-only, so it stays here.
export function Providers({ children }: { children: ReactNode }) {
  return <ProjectsProvider>{children}</ProjectsProvider>;
}
