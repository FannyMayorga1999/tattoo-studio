"use client";

import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const floatingOrbs = [
  { size: "w-72 h-72", x: "left-[5%]", y: "top-[15%]", delay: "0s" },
  { size: "w-96 h-96", x: "right-[10%]", y: "bottom-[10%]", delay: "1.5s" },
  { size: "w-48 h-48", x: "left-[45%]", y: "top-[5%]", delay: "3s" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-ex-950 overflow-hidden text-grid">
      {floatingOrbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute ${orb.x} ${orb.y} ${orb.size} rounded-full bg-ember/5 blur-[100px] animate-glow-pulse`}
          style={{ animationDelay: orb.delay }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-br from-ex-950/80 via-transparent to-ex-900/60" />

      <div className="section-container relative z-10 w-full py-20 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[85vh]">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 order-2 lg:order-1"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-ember/60" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Since 2016</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black leading-[0.82] tracking-[-0.05em] text-ex-100 mb-6"
            >
              EXAMPLE
              <br />
              <span className="text-ember">TATTOO</span>
              <br />
              STUDIO
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base md:text-lg text-ex-500 max-w-lg leading-relaxed mb-10">
              Where precision meets passion. Award-winning artists crafting bespoke tattoos in a private, cinematic studio environment.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] btn-ember rounded-md"
              >
                Book Session
              </button>
              <button
                onClick={() => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3.5 text-sm font-bold uppercase tracking-[0.12em] btn-outline rounded-md"
              >
                View Portfolio
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-10 mt-12 pt-8 border-t border-ex-700">
              {[{ n: "12+", l: "Years" }, { n: "5K+", l: "Tattoos" }, { n: "8", l: "Artists" }, { n: "98%", l: "Satisfaction" }].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl md:text-3xl font-black text-ex-100">{s.n}</p>
                  <p className="text-[10px] text-ex-500 uppercase tracking-[0.15em] mt-0.5">{s.l}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-ex-700 glow-orange">
              <div className="absolute inset-0 bg-gradient-to-t from-ex-950 via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-gradient-to-br from-ex-800 to-ex-950 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-36 h-36 mx-auto mb-4 rounded-full border-2 border-ember/25 bg-ex-800/60 flex items-center justify-center">
                    <svg className="w-20 h-20 text-ex-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-ex-500 text-xs uppercase tracking-[0.2em]">Master at work</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-ex-950 border border-ember/20 flex items-center justify-center z-20">
                <span className="text-ember text-[10px] font-bold uppercase tracking-[0.08em] text-center leading-tight">Est.<br />2016</span>
              </div>
              <div className="absolute -top-3 -right-3 w-14 h-14 rounded-full bg-ember/10 border border-ember/25 flex items-center justify-center z-20">
                <svg className="w-6 h-6 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>

            <div className="absolute right-8 bottom-12 hidden lg:flex flex-col gap-2 z-20">
              {["✦ Realism", "✦ Blackwork", "✦ Anime"].map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-[0.15em] text-ex-500 bg-ex-950/80 backdrop-blur px-3 py-1.5 rounded-full border border-ex-700">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-1.5 text-ex-500 text-[10px] uppercase tracking-[0.25em]">
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
