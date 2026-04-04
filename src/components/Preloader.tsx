import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Actual window load event
    const handleLoad = () => {
      setProgress(100);
      clearInterval(interval);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true),
      });

      tl.to(textRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      });

      tl.to(containerRef.current, {
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
        duration: 1.2,
        ease: 'expo.inOut',
      }, '-=0.4');
    }
  }, [progress]);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-theme-primary flex flex-col items-center justify-center overflow-hidden"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div ref={textRef} className="relative">
        <h1 className="text-h1 font-medium text-theme-primary mb-4 tracking-tighter overflow-hidden">
          <span className="inline-block animate-reveal">URBAKBLADE</span>
        </h1>
        <div className="w-64 h-[2px] bg-theme-primary/10 relative overflow-hidden">
          <div
            ref={progressRef}
            className="absolute top-0 left-0 h-full bg-highlight transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-4 flex justify-between text-body-sm text-theme-muted font-mono uppercase tracking-widest">
          <span>Establecido 2026</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
