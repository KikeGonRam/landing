import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { id: string; image: string; title: string; category: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNext,
  onPrev,
}: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      tl.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 lg:p-12"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-[120] text-white/50 hover:text-white transition-colors p-2"
        aria-label="Cerrar"
      >
        <X size={32} />
      </button>

      {/* Navigation - Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-[120] text-white/50 hover:text-white transition-all p-4 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft size={48} />
      </button>

      {/* Navigation - Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[120] text-white/50 hover:text-white transition-all p-4 hover:scale-110"
        aria-label="Siguiente"
      >
        <ChevronRight size={48} />
      </button>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative max-w-6xl w-full aspect-[4/5] lg:aspect-video flex flex-col items-center justify-center gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group w-full h-full flex items-center justify-center">
          <img
            ref={imageRef}
            src={currentImage.image}
            alt={currentImage.title}
            className="max-w-full max-h-full object-contain shadow-2xl"
          />
          
          {/* Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
            <p className="text-highlight font-mono uppercase tracking-widest text-sm mb-2">
              {currentImage.category}
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium tracking-tight">
              {currentImage.title}
            </h2>
          </div>
        </div>

        {/* Counter */}
        <div className="text-white/30 font-mono text-sm tracking-widest uppercase">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
