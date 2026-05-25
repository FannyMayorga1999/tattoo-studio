"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How do I book a consultation?", a: "Fill out our booking form or call the studio. We recommend booking 2 weeks ahead as slots fill quickly." },
  { q: "What is the pricing structure?", a: "Pricing depends on size, detail, and placement. Most pieces range from $150–$3,000+. A detailed quote is provided during consultation." },
  { q: "How do I prepare for my appointment?", a: "Stay hydrated, eat well beforehand, avoid alcohol for 24 hours. Wear comfortable clothing that allows access to the tattoo area." },
  { q: "What is the healing process like?", a: "Initial healing takes 2–3 weeks, full healing 4–6 weeks. We provide detailed aftercare instructions and a complimentary care kit." },
  { q: "Do you offer touch-ups?", a: "Yes. Free touch-ups within 90 days for any pieces needing minor adjustments. We stand by the quality of our work." },
  { q: "What about piercing aftercare?", a: "Healing varies by piercing (6 weeks–6 months). We provide comprehensive guides and use only hypoallergenic, implant-grade jewelry." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative section-padding bg-ex-900 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-ember/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">FAQ</span>
            <span className="w-8 h-[1px] bg-ember/60" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
            QUESTIONS?
            <br />
            <span className="text-ember">ANSWERS</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`rounded-xl transition-all duration-300 cursor-pointer ${
                openIndex === i ? "card-ex border-ember/25" : "border border-ex-700 hover:border-ex-600"
              }`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5 md:p-6">
                <h3 className="text-sm md:text-base font-bold text-ex-100 pr-4">{faq.q}</h3>
                <div className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? "bg-ember/20" : "bg-ex-800"
                }`}>
                  <motion.svg animate={{ rotate: openIndex === i ? 45 : 0 }} transition={{ duration: 0.3 }}
                    className="w-3.5 h-3.5 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </motion.svg>
                </div>
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-ex-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
