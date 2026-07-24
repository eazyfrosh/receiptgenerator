"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useReceiptStore } from "@/lib/store";

export function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const darkMode = useReceiptStore((s) => s.darkMode);
  const toggleDarkMode = useReceiptStore((s) => s.toggleDarkMode);

  // Persisted theme is only known on the client. Render the light-mode icon
  // until mounted so the server and first client paint agree (no hydration
  // mismatch); swap to the real icon afterward.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="btn-icon"
      aria-label="Toggle dark mode"
    >
      {mounted && darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
