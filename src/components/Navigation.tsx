import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { navigationConfig } from '../config';
import { usePrefersReducedMotion } from '../hooks/useMotionPreference';
import { useTheme } from '../hooks/useTheme';

gsap.registerPlugin(ScrollTrigger);

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (reduceMotion) return;

    const trigger = ScrollTrigger.create({
      start: '100px top',
      end: 'max',
      onUpdate: (self) => {
        setIsScrolled(self.progress > 0);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [reduceMotion]);

  if (!navigationConfig.logo) return null;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (!isHome) {
        navigate('/' + href);
      } else {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (    <>
      <nav
        ref={navRef}
        aria-label="Principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-theme-primary/80 backdrop-blur-md py-4 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-16 flex items-center justify-between">
          {/* Logo */}
          <Magnetic strength={0.2}>
            <Link
              to="/"
              className={`text-h6 font-medium transition-colors duration-300 ${
                isScrolled || theme === 'dark' || !isHome ? 'text-theme-primary' : 'text-white'
              } hover:text-highlight`}
            >
              {navigationConfig.logo}
            </Link>
          </Magnetic>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navigationConfig.items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-body transition-colors duration-300 relative group ${
                  isScrolled || theme === 'dark' || !isHome ? 'text-theme-secondary hover:text-theme-primary' : 'text-white/85 hover:text-white'
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-highlight group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            {/* Theme toggle button */}
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={toggleTheme}
                className={`theme-toggle ${
                  !isScrolled && theme === 'light' && isHome ? 'text-white hover:bg-white/10' : ''
                }`}
                aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </Magnetic>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Theme toggle for mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle w-9 h-9"
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center text-theme-primary"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-theme-primary transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navegación móvil"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navigationConfig.items.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-h3 text-theme-primary hover:text-highlight transition-colors duration-300"
              style={{
                transform: isMobileMenuOpen
                  ? 'translateY(0)'
                  : 'translateY(20px)',
                opacity: isMobileMenuOpen ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
