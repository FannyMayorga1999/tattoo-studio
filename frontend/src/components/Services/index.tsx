"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Tattoos",
    desc: "Custom tattoos in every style — from realism to cyber sigilism. Our artists bring your vision to life with precision and artistry.",
    icon: "✦",
  },
  {
    title: "Piercing",
    desc: "Professional body piercing using implant-grade materials. Ear, facial, and body piercings performed in a sterile environment.",
    icon: "◇",
  },
  {
    title: "Cover-Ups",
    desc: "Transform unwanted tattoos into stunning new artwork. Our specialists excel at redesigning and reworking existing pieces.",
    icon: "◆",
  },
  {
    title: "Custom Designs",
    desc: "From concept to skin. We collaborate closely with you to create a one-of-a-kind design that reflects your personal story.",
    icon: "★",
  },
  {
    title: "Removal Consultation",
    desc: "Laser tattoo removal consultations with trusted partners. We help you explore all options for your tattoo journey.",
    icon: "◎",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="relative section-padding bg-ex-900 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-ember/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
            WHAT WE
            <br />
            <span className="text-ember">OFFER</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="card-ex rounded-xl p-6 md:p-7 group"
            >
              <span className="text-2xl text-ember mb-4 block group-hover:scale-110 transition-transform duration-400">{service.icon}</span>
              <h3 className="text-sm font-bold text-ex-100 uppercase tracking-[0.1em] mb-3">{service.title}</h3>
              <p className="text-xs text-ex-500 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
