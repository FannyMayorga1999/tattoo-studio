"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedArtist from "@/components/FeaturedArtist";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
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
            <FeaturedArtist />
            <Gallery items={portfolio} />
            <Services />
            <About />
            <FAQ />
            <Testimonials />
            <Contact styles={styles} />
          </>
        )}
        {loading && (
          <div className="flex items-center justify-center h-screen bg-ex-950">
            <div className="w-6 h-6 rounded-full border border-ember border-t-transparent animate-spin" />
          </div>
        )}
      </main>
      <Footer artist={artist} />
    </>
  );
}
