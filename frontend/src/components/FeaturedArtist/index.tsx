"use client";

import { motion } from "framer-motion";

const artists = [
  {
    name: "Marcus Webb",
    role: "Lead Artist",
    specialties: ["Realism", "Blackwork"],
    bio: "15+ years crafting photorealistic pieces. International award winner.",
    initials: "MW",
    color: "from-ember/20 to-transparent",
  },
  {
    name: "Yuki Tanaka",
    role: "Senior Artist",
    specialties: ["Anime", "Neo-Traditional"],
    bio: "Master of anime-inspired tattoos with a bold contemporary edge.",
    initials: "YT",
    color: "from-ember/15 to-transparent",
  },
  {
    name: "Sasha Rivera",
    role: "Artist",
    specialties: ["Fine Line", "Geometric"],
    bio: "Minimalist precision, creating delicate architectural body art.",
    initials: "SR",
    color: "from-ember/10 to-transparent",
  },
  {
    name: "Kai Nakamura",
    role: "Artist",
    specialties: ["Cyber Sigilism", "Blackwork"],
    bio: "Pushing boundaries with cybernetic and futuristic tattoo design.",
    initials: "KN",
    color: "from-ember/15 to-transparent",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function FeaturedArtist() {
  return (
    <section id="artists" className="relative section-padding bg-ex-900 overflow-hidden text-grid">
      <div className="section-divider" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-ember/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">The Team</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
            AWARD
            <br />
            <span className="text-ember">WINNING</span>
            <br />
            ARTISTS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {artists.map((a, i) => (
            <motion.div
              key={a.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group card-ex rounded-xl p-6 md:p-7 text-center relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${a.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-ex-800 border border-ex-700 group-hover:border-ember/40 transition-all duration-500 flex items-center justify-center overflow-hidden">
                  <span className="text-lg font-black text-ex-500 group-hover:text-ember transition-colors duration-500">{a.initials}</span>
                </div>
                <h3 className="text-base font-bold text-ex-100 mb-0.5">{a.name}</h3>
                <p className="text-[10px] text-ember uppercase tracking-[0.15em] font-semibold mb-2">{a.role}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {a.specialties.map((s) => (
                    <span key={s} className="text-[9px] uppercase tracking-[0.1em] text-ex-500 bg-ex-800/60 px-2 py-0.5 rounded-full border border-ex-700">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-ex-500 leading-relaxed">{a.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] btn-outline rounded-md"
          >
            Meet the Full Team
          </button>
        </motion.div>
      </div>
    </section>
  );
}
