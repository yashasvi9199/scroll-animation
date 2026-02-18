import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollProgress {
  progress: number; // 0 to 1
  isInView: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
}

export function useScrollProgress(offset = 0): ScrollProgress {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate how far we've scrolled through this element
    // When the element's top is at the bottom of viewport: progress = 0
    // When the element's bottom is at the top of viewport: progress = 1
    const scrollableDistance = elementHeight - windowHeight + offset;
    const scrolled = -elementTop + offset;
    const rawProgress = scrolled / scrollableDistance;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    setProgress(clampedProgress);
    setIsInView(elementTop < windowHeight && elementTop + elementHeight > 0);
  }, [offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  return { progress, isInView, ref };
}
