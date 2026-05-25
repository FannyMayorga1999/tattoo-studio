"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { ContactFormData, TattooStyle } from "@/types";

interface ContactProps { styles: TattooStyle[] }

export default function Contact({ styles }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", email: "", phone: "", tattooStyle: "", preferredDate: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch {
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  if (submitted) {
    return (
      <section id="contact" className="relative section-padding bg-ex-950 overflow-hidden">
        <div className="section-divider" />
        <div className="section-container">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center glass-card rounded-xl p-10 md:p-14"
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-ember/20 flex items-center justify-center">
              <svg className="w-7 h-7 text-ember" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-ex-100 uppercase tracking-[-0.02em] mb-2">Thank You</h2>
            <p className="text-ex-500 text-sm">We&apos;ll be in touch within 24 hours.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClass = "w-full bg-ex-950 border border-ex-700 rounded-lg px-4 py-3 text-ex-100 text-sm placeholder-ex-500 focus:outline-none focus:border-ember/50 focus:shadow-[0_0_15px_rgba(255,90,31,0.06)] transition-all duration-300";

  return (
    <section id="contact" className="relative section-padding bg-ex-900 overflow-hidden text-grid">
      <div className="section-divider" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-ember/4 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-ember/60" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-ember font-medium">Contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.88] tracking-[-0.04em] text-ex-100">
            BOOK YOUR
            <br />
            <span className="text-ember">SESSION</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Name *</label>
                  <input type="text" id="c-name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="c-email" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Email *</label>
                  <input type="email" id="c-email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-phone" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Phone</label>
                  <input type="tel" id="c-phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label htmlFor="c-style" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Style</label>
                  <select id="c-style" name="tattooStyle" value={formData.tattooStyle} onChange={handleChange}
                    className={inputClass + " appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23b7b7b7%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.2rem] bg-[right_0.75rem_center] bg-no-repeat"}
                  >
                    <option value="">Select style</option>
                    {styles.map((s) => (<option key={s.id} value={s.name} className="bg-ex-950">{s.name}</option>))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="c-date" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Preferred Date</label>
                <input type="date" id="c-date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className={inputClass + " [color-scheme:dark]"} />
              </div>
              <div>
                <label htmlFor="c-message" className="block text-[10px] uppercase tracking-[0.15em] text-ex-500 mb-1.5">Message *</label>
                <textarea id="c-message" name="message" required rows={4} value={formData.message} onChange={handleChange} className={inputClass + " resize-none"} placeholder="Tell us about your idea..." />
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3.5 text-sm font-bold uppercase tracking-[0.12em] btn-ember rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Booking Request"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ex-100 mb-3">Visit Us</h3>
              <div className="aspect-[16/9] rounded-lg bg-ex-800 border border-ex-700 flex items-center justify-center mb-3">
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto text-ex-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-[10px] text-ex-500 uppercase tracking-[0.1em]">Map placeholder</p>
                </div>
              </div>
              <p className="text-xs text-ex-500">123 Creative Street, Studio 45<br />Los Angeles, CA 90028</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ex-100 mb-3">Connect</h3>
              <div className="flex gap-3">
                {["IG", "FB", "YT"].map((s) => (
                  <a key={s} href="#" className="w-10 h-10 rounded-lg bg-ex-800 border border-ex-700 flex items-center justify-center text-ex-500 hover:text-ember hover:border-ember/40 transition-all duration-300 text-xs font-bold">
                    {s}
                  </a>
                ))}
              </div>
              <p className="text-xs text-ex-500 mt-4">Follow us for daily flash designs, studio updates, and behind-the-scenes content.</p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-ex-100 mb-2">Studio Hours</h3>
              <div className="space-y-1">
                {[{ d: "Mon–Fri", h: "10AM – 8PM" }, { d: "Saturday", h: "11AM – 6PM" }, { d: "Sunday", h: "By appointment" }].map((day) => (
                  <div key={day.d} className="flex justify-between text-xs">
                    <span className="text-ex-500">{day.d}</span>
                    <span className="text-ex-100 font-medium">{day.h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
