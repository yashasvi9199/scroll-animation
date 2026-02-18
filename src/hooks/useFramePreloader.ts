import { useState, useEffect, useRef } from 'react';

interface PreloaderState {
  images: HTMLImageElement[];
  loaded: boolean;
  loadProgress: number;
  totalFrames: number;
  error: boolean;
}

export function useFramePreloader(
  totalFrames: number,
  getFramePath: (index: number) => string
): PreloaderState {
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    let failedCount = 0;
    const images: HTMLImageElement[] = new Array(totalFrames);
    
    // Load frames in batches for better performance
    const batchSize = 10;
    let currentBatch = 0;

    const loadBatch = () => {
      const start = currentBatch * batchSize;
      const end = Math.min(start + batchSize, totalFrames);

      for (let i = start; i < end; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        
        img.onload = () => {
          loadedCount++;
          images[i] = img;
          setLoadProgress(loadedCount / totalFrames);
          
          if (loadedCount + failedCount === totalFrames) {
            imagesRef.current = images;
            setLoaded(true);
          }
        };
        
        img.onerror = () => {
          failedCount++;
          // Still track progress even on failure
          setLoadProgress((loadedCount + failedCount) / totalFrames);
          
          if (loadedCount + failedCount === totalFrames) {
            imagesRef.current = images;
            if (loadedCount === 0) {
              setError(true);
            }
            setLoaded(true);
          }
        };
        
        images[i] = img;
      }

      currentBatch++;
      if (currentBatch * batchSize < totalFrames) {
        // Small delay between batches to not overwhelm the browser
        setTimeout(loadBatch, 50);
      }
    };

    loadBatch();

    return () => {
      // Cleanup
      images.forEach(img => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [totalFrames, getFramePath]);

  return {
    images: imagesRef.current,
    loaded,
    loadProgress,
    totalFrames,
    error,
  };
}
