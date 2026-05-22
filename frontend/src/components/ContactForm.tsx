"use client";

import { useState } from "react";
import type { ContactFormData, TattooStyle } from "@/types";

interface ContactFormProps {
  styles: TattooStyle[];
}

export default function ContactForm({ styles }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    tattooStyle: "",
    preferredDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      alert("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="relative py-24 sm:py-32">
        <div className="section-container">
          <div className="mx-auto max-w-xl text-center">
            <div className="mb-6 text-5xl">✓</div>
            <h2 className="font-display text-3xl font-bold text-white">
              Thank You!
            </h2>
            <p className="mt-4 text-gray-400">
              Your message has been received. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="section-container">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Get In Touch
            </p>
            <h2 className="section-title text-white">Book a Session</h2>
            <p className="section-subtitle mx-auto">
              Ready to get your next tattoo? Fill out the form below and we&apos;ll
              discuss your vision.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="tattooStyle" className="block text-sm font-medium text-gray-300">
                  Tattoo Style
                </label>
                <select
                  id="tattooStyle"
                  name="tattooStyle"
                  value={formData.tattooStyle}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                >
                  <option value="">Select a style</option>
                  {styles.map((style) => (
                    <option key={style.id} value={style.name}>
                      {style.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-300">
                Preferred Date
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-white/10 bg-ink-700 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                placeholder="Tell me about your tattoo idea..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
