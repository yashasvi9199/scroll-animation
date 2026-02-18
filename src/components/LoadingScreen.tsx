interface LoadingScreenProps {
  progress: number;
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-brand/10 blur-[100px] animate-glow" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Spinning ring */}
        <div className="relative h-20 w-20">
          <svg className="h-20 w-20 animate-spin-slow" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="#1e1e1e"
              strokeWidth="3"
            />
            <circle
              cx="40"
              cy="40"
              r="35"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${progress * 220} 220`}
              transform="rotate(-90 40 40)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e8a838" />
                <stop offset="100%" stopColor="#f5c563" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white/80 tabular-nums">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="progress-bar h-full rounded-full bg-linear-to-r from-brand to-brand-light"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <p className="text-sm font-light tracking-[0.3em] uppercase text-white/40">
            Loading Experience
          </p>
        </div>
      </div>
    </div>
  );
}
