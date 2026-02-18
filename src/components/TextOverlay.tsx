import React, { useMemo } from 'react';

interface TextOverlayProps {
  progress: number;
  enterAt: number;
  exitAt: number;
  children: React.ReactNode;
  position?: 'center' | 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'top-center';
}

export function TextOverlay({
  progress,
  enterAt,
  exitAt,
  children,
  position = 'center',
}: TextOverlayProps) {
  const { opacity, translateY, scale, isVisible } = useMemo(() => {
    const fadeInDuration = 0.04;
    const fadeOutDuration = 0.04;
    const fadeInEnd = enterAt + fadeInDuration;
    const fadeOutStart = exitAt - fadeOutDuration;

    let opacity = 0;
    let translateY = 40;
    let scale = 0.95;

    if (progress < enterAt) {
      opacity = 0;
      translateY = 40;
      scale = 0.95;
    } else if (progress >= enterAt && progress < fadeInEnd) {
      // Fading in
      const t = (progress - enterAt) / fadeInDuration;
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      opacity = eased;
      translateY = 40 * (1 - eased);
      scale = 0.95 + 0.05 * eased;
    } else if (progress >= fadeInEnd && progress < fadeOutStart) {
      // Fully visible
      opacity = 1;
      translateY = 0;
      scale = 1;
    } else if (progress >= fadeOutStart && progress <= exitAt) {
      // Fading out
      const t = (progress - fadeOutStart) / fadeOutDuration;
      const eased = 1 - Math.pow(1 - t, 3);
      opacity = 1 - eased;
      translateY = -30 * eased;
      scale = 1 - 0.05 * eased;
    } else {
      opacity = 0;
      translateY = -30;
      scale = 0.95;
    }

    return {
      opacity,
      translateY,
      scale,
      isVisible: progress >= enterAt && progress <= exitAt,
    };
  }, [progress, enterAt, exitAt]);

  if (!isVisible) return null;

  const positionClasses = {
    'center': 'items-center justify-center text-center',
    'left': 'items-center justify-center text-left px-8 sm:px-16 md:px-24',
    'right': 'items-center justify-end text-right px-8 sm:px-16 md:px-24',
    'bottom-left': 'items-end justify-start text-left p-8 sm:p-16 md:p-24',
    'bottom-right': 'items-end justify-end text-right p-8 sm:p-16 md:p-24',
    'top-center': 'items-start justify-center text-center pt-24',
  };

  return (
    <div
      className={`absolute inset-0 z-20 flex flex-col ${positionClasses[position]} pointer-events-none`}
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        willChange: 'opacity, transform',
      }}
    >
      <div className="pointer-events-auto max-w-2xl">
        {children}
      </div>
    </div>
  );
}
