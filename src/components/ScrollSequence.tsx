/// <reference types="vite/client" />
import { useCallback } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useFramePreloader } from '../hooks/useFramePreloader';
import { FrameCanvas } from './FrameCanvas';
import { TextOverlay } from './TextOverlay';
import { LoadingScreen } from './LoadingScreen';

const TOTAL_FRAMES = 192;
const SCROLL_HEIGHT_MULTIPLIER = 8; // How many viewports tall the scroll area is

export function ScrollSequence() {
  const { progress, ref } = useScrollProgress(0);
  
  const getFramePath = useCallback((index: number) => {
    const baseUrl = import.meta.env.BASE_URL;
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBaseUrl}frames/frame_${index + 1}.png`;
  }, []);

  const { images, loaded, loadProgress, error } = useFramePreloader(TOTAL_FRAMES, getFramePath);

  // Map scroll progress to frame index
  const frameIndex = Math.min(
    TOTAL_FRAMES - 1,
    Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
  );

  // Background blend opacity - increases as we scroll
  const vignetteOpacity = Math.min(0.7, progress * 0.5);

  if (!loaded && !error) {
    return <LoadingScreen progress={loadProgress} />;
  }

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh` }}
    >
      {/* Sticky container - stays in view while scrolling through the tall section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas layer */}
        <div className="canvas-container absolute inset-0 z-0">
          {error ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-black">
              <div className="relative">
                {/* Animated background sphere */}
                <div 
                  className="absolute inset-0 rounded-full blur-[80px]"
                  style={{
                    background: `conic-gradient(from ${progress * 720}deg, #e8a838, #8b5cf6, #3b82f6, #e8a838)`,
                    opacity: 0.3,
                    width: '300px',
                    height: '300px',
                    transform: `translate(-50%, -50%) scale(${0.8 + progress * 0.4})`,
                    left: '50%',
                    top: '50%',
                  }}
                />
                <div className="relative z-10 flex flex-col items-center gap-6">
                  <div 
                    className="h-48 w-48 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
                    style={{
                      boxShadow: `0 0 ${60 + progress * 40}px ${20 + progress * 20}px rgba(232, 168, 56, ${0.1 + progress * 0.15})`,
                    }}
                  />
                  <p className="text-sm text-white/30 max-w-xs text-center">
                    Place your 192 frames in <code className="text-brand/60 bg-white/5 px-1.5 py-0.5 rounded text-xs">public/frames/</code> as frame_1.png to frame_192.png
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <FrameCanvas images={images} frameIndex={frameIndex} />
          )}
        </div>

        {/* Vignette / background blend overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
          }}
        />

        {/* Top/Bottom gradient blend for seamless transitions */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-black/60 to-transparent z-10 pointer-events-none" />

        {/* Text Overlays - these appear and disappear at different scroll positions */}
        
        {/* Title overlay */}
        <TextOverlay progress={progress} enterAt={0.02} exitAt={0.14} position="center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-2xl">
            Crafted with
            <span className="block bg-linear-to-r from-brand-light to-brand bg-clip-text text-transparent">
              Precision
            </span>
          </h2>
          <p className="mt-4 text-base text-white/60 sm:text-lg drop-shadow-lg">
            Every detail meticulously designed
          </p>
        </TextOverlay>

        {/* Feature 2 */}
        <TextOverlay progress={progress} enterAt={0.34} exitAt={0.46} position="right">
          <div className="flex items-start gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white sm:text-4xl drop-shadow-2xl">
                Immersive Experience
              </h3>
              <p className="mt-3 max-w-md text-sm text-white/50 sm:text-base leading-relaxed drop-shadow-lg">
                Feel every moment come alive with breathtaking clarity and depth that draws you in.
              </p>
            </div>
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 backdrop-blur-sm">
              <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </TextOverlay>

        {/* Feature 3 - Centered big text */}
        <TextOverlay progress={progress} enterAt={0.50} exitAt={0.62} position="center">
          <h3 className="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl drop-shadow-2xl">
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-brand bg-clip-text text-transparent">
              Beyond
            </span>
            <br />
            Imagination
          </h3>
        </TextOverlay>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          <div className="h-[2px] w-20 overflow-hidden rounded-full bg-white/10 sm:w-32">
            <div
              className="h-full rounded-full bg-white/40 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-medium text-white/30 tabular-nums w-8">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Frame counter (subtle) */}
        <div className="absolute top-6 right-6 z-30">
          <span className="text-[10px] font-mono text-white/20 tabular-nums">
            {String(frameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </div>
    </section>
  );
}
