import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500"],
});

const displayFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "EXAMPLE TATTOO STUDIO | Premium Tattoo & Piercing",
  description:
    "Award-winning tattoo studio specializing in realism, blackwork, fine line, and custom designs. Book your session with world-class artists.",
  keywords: ["tattoo", "tattoo studio", "piercing", "custom tattoo", "EXAMPLE", "premium tattoo"],
  openGraph: {
    title: "EXAMPLE TATTOO STUDIO | Premium Tattoo & Piercing",
    description: "Award-winning tattoo studio. Custom designs by world-class artists.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
        {children}
      </body>
    </html>
  );
}
