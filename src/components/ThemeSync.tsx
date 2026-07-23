"use client";

import { useEffect } from "react";
import { useReceiptStore } from "@/lib/store";

export function ThemeSync() {
  const darkMode = useReceiptStore((s) => s.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return null;
}
