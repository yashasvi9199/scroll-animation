export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black py-24">
      {/* Top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-1/2 bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold text-white">
              Scroll<span className="text-brand">XP</span>
            </h3>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              An immersive scroll-driven experience built with React, TypeScript, and Canvas.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Features', 'Design', 'Performance', 'Specs'].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Careers', 'Contact'].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/60 mb-4">Connect</h4>
            <ul className="space-y-2.5">
              {['Twitter', 'GitHub', 'Discord', 'YouTube'].map(item => (
                <li key={item}>
                  <span className="text-sm text-white/30 hover:text-white/60 transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/20">
            © 2024 ScrollXP. Built with React + Canvas.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-white/15">Made with</span>
            <svg className="h-3 w-3 text-brand/40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
