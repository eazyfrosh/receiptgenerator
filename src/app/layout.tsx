import type { Metadata } from "next";
import { Sora, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeSync } from "@/components/ThemeSync";
import { AuthProvider } from "@/components/auth/AuthProvider";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Receipt Studio — Fictional Receipt Mockups",
  description:
    "Design original, clearly-labeled fictional payment receipt mockups for film props, parody, and UI design. Every export is permanently watermarked FICTIONAL — not a real transaction.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${manrope.variable} ${jetbrainsMono.variable} font-body min-h-screen`}
      >
        <AuthProvider>
          <ThemeSync />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
