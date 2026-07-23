import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F6F7FB",
          dark: "#0B0E14",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#131722",
        },
        studio: {
          flux: "#7C5CFF",
          fluxDark: "#5B3FE0",
          mint: "#2AD9BF",
          mintDark: "#17A895",
          amber: "#FFB020",
          coral: "#FF5470",
          ink: "#12131A",
          slate: "#5B6478",
          mist: "#AEB4C7",
        },
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(18, 19, 26, 0.12)",
        "glass-lg": "0 20px 60px -10px rgba(18, 19, 26, 0.35)",
        glow: "0 0 40px -8px rgba(124, 92, 255, 0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
