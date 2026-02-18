import { useRef, useEffect, useCallback } from 'react';

interface FrameCanvasProps {
  images: HTMLImageElement[];
  frameIndex: number;
  className?: string;
}

export function FrameCanvas({ images, frameIndex, className = '' }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastDrawnFrame = useRef<number>(-1);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = images[index];
    if (!img || !img.complete || !img.naturalWidth) {
      // Draw black frame if image not available
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    // Set canvas size to match viewport at device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);
    }

    // Clear
    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw image with cover fit
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (imgAspect > canvasAspect) {
      // Image is wider - fit by height
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgAspect;
      drawX = (displayWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      // Image is taller - fit by width
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgAspect;
      drawX = 0;
      drawY = (displayHeight - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [images]);

  useEffect(() => {
    if (frameIndex !== lastDrawnFrame.current) {
      lastDrawnFrame.current = frameIndex;
      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  }, [frameIndex, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      lastDrawnFrame.current = -1; // Force redraw
      drawFrame(frameIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className={`h-full w-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
