"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioItem } from "@/types";

const PLACEHOLDER = "/images/placeholder.svg";

interface GalleryProps { items: PortfolioItem[] }

const categories = ["All", "Realism", "Blackwork", "Fine Line", "Geometric", "Anime", "Cyber Sigilism"];

export default function Gallery({ items }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const filtered = activeCategory === "All"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== PLACEHOLDER) img.src = PLACEHOLDER;
  }, []);

  return (
    <section id="gallery" className="relative section-padding bg-ex-950 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-ember/60" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
              OUR
              <br />
              <span className="text-ember">WORK</span>
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.12em] rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-ember text-ex-950 font-bold"
                  : "text-ex-500 border border-ex-700 hover:border-ember/50 hover:text-ember"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                onClick={() => setSelectedImage(item)}
                className={`group relative overflow-hidden rounded-xl card-ex ${
                  i === 0 ? "sm:col-span-2 sm:row-span-2" : "aspect-square"
                }`}
              >
                <img src={item.imageUrl || PLACEHOLDER} alt={item.title} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={handleImgError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ex-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm font-bold text-ex-100 text-left">{item.title}</p>
                  <p className="text-[10px] text-ember uppercase tracking-[0.12em] text-left">{item.category}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-ex-500 py-20 text-sm">No pieces in this category yet.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(18,16,22,0.97)] backdrop-blur-xl p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-xl overflow-hidden border border-ex-700"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-ex-950/70 backdrop-blur flex items-center justify-center text-ex-500 hover:text-ember border border-ex-700 transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-[4/3] md:aspect-[16/10] relative bg-ex-950">
                <img src={selectedImage.imageUrl || PLACEHOLDER} alt={selectedImage.title} className="w-full h-full object-contain" onError={handleImgError} />
              </div>
              <div className="bg-gradient-to-t from-ex-950 via-ex-950/90 to-transparent p-6 pt-12 -mt-16 relative z-10">
                <h3 className="text-xl font-bold text-ex-100">{selectedImage.title}</h3>
                {selectedImage.description && <p className="text-ex-500 text-sm mt-1">{selectedImage.description}</p>}
                <span className="inline-block mt-2 text-[10px] text-ember uppercase tracking-[0.12em] font-semibold">{selectedImage.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
