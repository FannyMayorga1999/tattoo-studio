"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGallery from "@/components/PortfolioGallery";
import TattooStyles from "@/components/TattooStyles";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Artist, PortfolioItem, TattooStyle } from "@/types";
import { getArtist, getPortfolio, getStyles } from "@/lib/api";

export default function Home() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [styles, setStyles] = useState<TattooStyle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [artistData, portfolioData, stylesData] = await Promise.all([
          getArtist(),
          getPortfolio(),
          getStyles(),
        ]);
        setArtist(artistData);
        setPortfolio(portfolioData);
        setStyles(stylesData);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        {!loading && (
          <>
            <About artist={artist} />
            <PortfolioGallery items={portfolio} />
            <TattooStyles styles={styles} />
            <ContactForm styles={styles} />
          </>
        )}
        {loading && (
          <div className="flex h-screen items-center justify-center bg-ink-900">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        )}
      </main>
      <Footer artist={artist} />
    </>
  );
}
