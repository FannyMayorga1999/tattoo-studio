"use client";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,168,83,0.08),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

      <div className="section-container relative z-10 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gold">
          Custom Tattoo Studio
        </p>
        <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          Art That
          <br />
          <span className="text-gold">Stays With You</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-gray-400 sm:text-lg">
          Seattle-based tattoo artist specializing in custom designs that
          transform your vision into timeless body art.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="#portfolio" className="btn-primary">
            View Portfolio
          </a>
          <a href="#contact" className="btn-outline">
            Book a Session
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
