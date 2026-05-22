"use client";

import type { TattooStyle } from "@/types";

interface TattooStylesProps {
  styles: TattooStyle[];
}

export default function TattooStyles({ styles }: TattooStylesProps) {
  return (
    <section id="styles" className="relative py-24 sm:py-32">
      <div className="section-container">
        <div className="text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Styles
          </p>
          <h2 className="section-title text-white">Explore Styles</h2>
          <p className="section-subtitle mx-auto">
            From traditional to watercolor, discover the range of styles we offer.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((style) => (
            <div
              key={style.id}
              className="group relative overflow-hidden rounded-xl border border-white/5 bg-ink-800/50 p-6 transition-all hover:border-gold/20 hover:bg-ink-800"
            >
              {style.icon && (
                <span className="text-3xl">{style.icon}</span>
              )}
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {style.name}
              </h3>
              {style.description && (
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {style.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
