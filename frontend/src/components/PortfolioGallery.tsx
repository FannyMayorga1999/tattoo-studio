"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/types";

interface PortfolioGalleryProps {
  items: PortfolioItem[];
}

const categories = ["All", "Traditional", "Realism", "Fine Line", "Geometric", "Blackwork", "Watercolor"];

export default function PortfolioGallery({ items }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="section-container">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Portfolio
          </p>
          <h2 className="section-title text-white">Our Work</h2>
          <p className="section-subtitle mx-auto">
            A showcase of our finest pieces across various styles and techniques.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gold text-ink-900"
                  : "bg-ink-700 text-gray-400 hover:bg-ink-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-ink-700 text-left"
            >
              <div className="flex h-full items-center justify-center text-gray-600">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/80 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.category}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-ink-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square w-full max-w-lg bg-ink-700 sm:max-w-xl md:max-w-2xl">
              <div className="flex h-full items-center justify-center text-gray-600">
                <svg className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-white">
                {selectedImage.title}
              </h3>
              {selectedImage.description && (
                <p className="mt-2 text-gray-400">{selectedImage.description}</p>
              )}
              <p className="mt-2 text-sm text-gold">{selectedImage.category}</p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
