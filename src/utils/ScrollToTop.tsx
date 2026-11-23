import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace('#', '');
    let cancelled = false;
    let attempts = 0;

    const tryScroll = () => {
      if (cancelled) return;

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      attempts += 1;
      if (attempts < 50) {
        window.setTimeout(tryScroll, 50);
      }
    };

    // Wait for the page-exit animation (AnimatePresence mode="wait") so About is mounted.
    const start = window.setTimeout(tryScroll, 450);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
