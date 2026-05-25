"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Alexis M.",
    avatar: "AM",
    role: "Full Sleeve • Realism",
    text: "The most incredible tattoo experience I've ever had. The studio is stunning, the artists are true professionals, and the result exceeded every expectation I had.",
  },
  {
    name: "David K.",
    avatar: "DK",
    role: "Back Piece • Japanese",
    text: "I've been getting tattooed for over a decade, and EXAMPLE is on another level. The attention to detail, the cleanliness, the artistry — completely unmatched.",
  },
  {
    name: "Maya L.",
    avatar: "ML",
    role: "Forearm • Fine Line",
    text: "Got my first tattoo here and I couldn't have asked for a better experience. Marcus made me feel completely at ease and the design is absolutely perfect.",
  },
  {
    name: "Ryan T.",
    avatar: "RT",
    role: "Industrial Piercing",
    text: "The piercing studio is just as impressive as the tattoo side. Professional, clean, and the jewelry selection is incredible. Highly recommend.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => { setDirection(1); setCurrent((prev) => (prev + 1) % testimonials.length); };
  const prev = () => { setDirection(-1); setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length); };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative section-padding bg-ex-950 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-ember/3 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-ember/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Testimonials</span>
            <span className="w-8 h-[1px] bg-ember/60" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
            CLIENT
            <br />
            <span className="text-ember">STORIES</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[300px] flex items-center">
            <button onClick={prev}
              className="absolute left-0 z-10 p-3 rounded-full border border-ex-700 text-ex-500 hover:text-ember hover:border-ember/50 transition-all duration-300 bg-ex-950"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex-1 mx-4 md:mx-16 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current} custom={direction} variants={variants}
                  initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="glass-card rounded-xl p-8 md:p-10 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ex-800 border border-ex-700 flex items-center justify-center">
                    <span className="text-sm font-bold text-ember">{testimonials[current].avatar}</span>
                  </div>
                  <span className="text-4xl text-ember/20 block mb-4 font-serif leading-none">"</span>
                  <p className="text-base md:text-lg text-ex-100 leading-relaxed mb-6 italic">
                    {testimonials[current].text}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-ember" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-bold text-ex-100">{testimonials[current].name}</p>
                  <p className="text-ember text-[10px] uppercase tracking-[0.12em] mt-1">{testimonials[current].role}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={next}
              className="absolute right-0 z-10 p-3 rounded-full border border-ex-700 text-ex-500 hover:text-ember hover:border-ember/50 transition-all duration-300 bg-ex-950"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-ember" : "w-1.5 bg-ex-700 hover:bg-ex-500"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
