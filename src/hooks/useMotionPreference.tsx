import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

const MotionPreferenceContext = createContext(false);

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <MotionPreferenceContext.Provider value={reduced}>
      {children}
    </MotionPreferenceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook compañero del provider
export function usePrefersReducedMotion(): boolean {
  return useContext(MotionPreferenceContext);
}
