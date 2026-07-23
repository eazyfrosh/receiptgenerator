"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProjectsProvider } from "@/components/projects/ProjectsProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProjectsProvider>{children}</ProjectsProvider>
    </AuthProvider>
  );
}
