export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top gradient orb */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-brand/8 blur-[120px] animate-glow" />
        {/* Side accents */}
        <div className="absolute top-1/3 left-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-1/4 right-[-10%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Overline badge */}
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] uppercase text-white/60 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            Scroll Experience
          </span>
        </div>

        {/* Main heading */}
        <h1 className="animate-fade-in-up-delay-1 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="block">Feel Every</span>
          <span className="block bg-linear-to-r from-brand-light via-brand to-brand-dark bg-clip-text text-transparent">
            Frame
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up-delay-2 max-w-xl text-base font-light leading-relaxed text-white/50 sm:text-lg md:text-xl">
          An immersive scroll-driven experience that brings every detail to life.
          Scroll down to explore.
        </p>

        {/* CTA area */}
        <div className="animate-fade-in-up-delay-3 flex items-center gap-6">
          <button className="group relative overflow-hidden rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-brand hover:text-black hover:shadow-lg hover:shadow-brand/25">
            <span className="relative z-10">Explore</span>
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white">
            Learn more
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <div className="animate-bounce-slow flex flex-col items-center">
          <div className="h-10 w-[1px] bg-linear-to-b from-white/40 to-transparent" />
          <svg className="h-4 w-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>

      {/* Bottom fade to black */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
