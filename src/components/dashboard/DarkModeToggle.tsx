"use client";

import { Moon, Sun } from "lucide-react";
import { useReceiptStore } from "@/lib/store";

export function DarkModeToggle() {
  const darkMode = useReceiptStore((s) => s.darkMode);
  const toggleDarkMode = useReceiptStore((s) => s.toggleDarkMode);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="btn-icon"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
