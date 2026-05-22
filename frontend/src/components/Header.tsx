"use client";

import { useState } from "react";

const navLinks = [
  { label: "Home", section: "home" },
  { label: "About", section: "about" },
  { label: "Portfolio", section: "portfolio" },
  { label: "Styles", section: "styles" },
  { label: "Contact", section: "contact" },
];

function scrollToSection(section: string) {
  const el = document.getElementById(section);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (section: string) => {
    setMobileOpen(false);
    scrollToSection(section);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink-900/80 backdrop-blur-lg">
      <div className="section-container flex h-16 items-center justify-between">
        <button onClick={() => scrollToSection("home")} className="font-display text-xl font-bold text-gold">
          Elena Ink
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => scrollToSection(link.section)}
              className="text-sm text-gray-300 transition-colors hover:text-gold"
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => scrollToSection("contact")} className="btn-primary text-xs">
            Book Now
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col items-center gap-4 border-t border-white/10 bg-ink-900 py-6 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => handleNav(link.section)}
              className="text-sm text-gray-300 transition-colors hover:text-gold"
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNav("contact")} className="btn-primary text-xs">
            Book Now
          </button>
        </nav>
      )}
    </header>
  );
}
