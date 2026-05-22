import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Elena Ink | Tattoo Studio",
  description:
    "Seattle-based tattoo artist specializing in custom designs, realism, traditional, and fine line tattoos. Book your appointment today.",
  keywords: [
    "tattoo",
    "tattoo artist",
    "Seattle tattoo",
    "custom tattoo",
    "Elena Ink",
  ],
  openGraph: {
    title: "Elena Ink | Tattoo Studio",
    description:
      "Seattle-based tattoo artist specializing in custom designs.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
