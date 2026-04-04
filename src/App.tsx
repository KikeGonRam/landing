import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { ParticleField } from './components/ParticleField';
import { SEO } from './components/SEO';
import { Preloader } from './components/Preloader';
import { Home } from './pages/Home';
import { BlogDetail } from './pages/BlogDetail';
import { siteConfig } from './config';
import { MotionPreferenceProvider } from './hooks/useMotionPreference';
import { ThemeProvider } from './hooks/useTheme';
import { Toaster } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  useEffect(() => {
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after initial render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-theme-primary text-theme-primary overflow-x-hidden transition-colors duration-300">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* SEO & Preloader */}
      <SEO />
      <Preloader />

      {/* Custom cursor & Background effects */}
      <CustomCursor />
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <MotionPreferenceProvider>
        <Router>
          <ScrollToTop />
          <AppContent />
        </Router>
      </MotionPreferenceProvider>
    </ThemeProvider>
  );
}

export default App;

