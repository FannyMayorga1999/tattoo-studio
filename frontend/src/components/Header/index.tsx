"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Artists", href: "#artists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(18,16,22,0.85)] backdrop-blur-xl border-b border-ex-700"
          : "bg-transparent"
      }`}
    >
      <div className="section-container flex items-center justify-between h-18 md:h-20">
        <button onClick={() => handleNav("#home")} className="flex items-baseline gap-1.5">
          <span className="text-lg font-black tracking-[-0.02em] text-ex-100">EXAMPLE</span>
          <span className="text-[10px] font-medium tracking-[0.2em] text-ember uppercase hidden sm:inline">Studio</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="px-3.5 py-2 text-[11px] uppercase tracking-[0.15em] text-ex-500 hover:text-ember transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/booking"
            className="ml-4 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.12em] btn-ember rounded-md"
          >
            Book Session
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative z-50 w-6 h-5 flex flex-col justify-between"
          aria-label="Toggle menu"
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-full h-[1.5px] bg-ex-100 block origin-center" />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-full h-[1.5px] bg-ex-100 block" />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-full h-[1.5px] bg-ex-100 block origin-center" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(18,16,22,0.98)] backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNav(link.href)}
                  className="text-lg uppercase tracking-[0.15em] text-ex-500 hover:text-ember transition-colors py-2"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-6"
              >
                <Link href="/booking" onClick={() => setMobileOpen(false)} className="px-8 py-3 text-sm font-bold uppercase tracking-[0.1em] btn-ember rounded-md">
                  Book Session
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
