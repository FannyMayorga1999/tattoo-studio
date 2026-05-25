"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative section-padding bg-ex-950 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-ex-700 glow-orange">
              <div className="w-full h-full bg-gradient-to-br from-ex-800 to-ex-950 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3 p-8">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-ex-800/40 border border-ex-700 flex items-center justify-center">
                      <svg className="w-10 h-10 text-ex-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-ember/5 rounded-full border border-ember/20 flex items-center justify-center">
              <span className="text-ember text-[10px] font-bold uppercase tracking-[0.1em] text-center leading-tight">Since<br />2016</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-ember/60" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Our Story</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100 mb-6">
              WHERE ART
              <br />
              <span className="text-ember">MEETS SKIN</span>
            </h2>
            <p className="text-ex-500 text-base leading-relaxed mb-5">
              Founded in 2016, EXAMPLE Tattoo Studio began as a passion project in a small underground space. Today, we are one of the most respected names in the industry, known for pushing creative boundaries while maintaining the highest standards of safety and professionalism.
            </p>
            <p className="text-ex-500 text-base leading-relaxed mb-8">
              Our studio is designed as a sanctuary for creativity — a private, appointment-only space where artists and clients collaborate in an atmosphere of trust and artistic freedom. Every piece we create is a testament to our commitment to excellence.
            </p>
            <div className="flex flex-wrap gap-5">
              {[{ l: "Custom Designs", i: "✦" }, { l: "Sterile Environment", i: "●" }, { l: "Award Winning", i: "★" }, { l: "Since 2016", i: "◆" }].map((item) => (
                <div key={item.l} className="flex items-center gap-2 text-xs text-ex-500">
                  <span className="text-ember">{item.i}</span>
                  {item.l}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
