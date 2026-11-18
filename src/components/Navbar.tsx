import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import logo from '../assets/icon/dots-icon.svg';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/fun', label: 'Fun' },
  { path: '/contact', label: 'Contact' },
];

const SCROLL_THRESHOLD = 80;
const INFLOW_HEIGHT = 72;
const SPACER_HEIGHT = 76;

const pillMotion = {
  initial: { opacity: 0, y: -16, scale: 0.96, x: '-50%' },
  animate: { opacity: 1, y: 0, scale: 1, x: '-50%' },
  exit: { opacity: 0, y: -12, scale: 0.98, x: '-50%' },
};

const pillMotionReduced = {
  initial: { opacity: 0, x: '-50%' },
  animate: { opacity: 1, x: '-50%' },
  exit: { opacity: 0, x: '-50%' },
};

const activePath = (pathname: string) =>
  pathname === '/gear' ? '/fun' : pathname;

const Navbar = () => {
  const { isDarkMode, toggleTheme, currentTheme } = useTheme();
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const isHome = location.pathname === '/';
  const currentPath = activePath(location.pathname);
  const [docked, setDocked] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setDocked(true);
      return;
    }

    const onScroll = () => setDocked(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const showInFlow = isHome && !docked;

  return (
    <>
      {showInFlow ? (
        <header className="w-full">
          <nav className="container-width py-4">
            <NavRow
              currentPath={currentPath}
              bubbleColor={currentTheme.nav.bubble}
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              variant="inflow"
            />
          </nav>
        </header>
      ) : (
        <div
          aria-hidden
          style={{ height: isHome ? INFLOW_HEIGHT : SPACER_HEIGHT }}
        />
      )}

      <AnimatePresence>
        {docked && (
          <motion.header
            className="fixed left-1/2 top-3 z-50 w-[calc(100%-1.5rem)] max-w-xl"
            initial={reduceMotion ? pillMotionReduced.initial : pillMotion.initial}
            animate={reduceMotion ? pillMotionReduced.animate : pillMotion.animate}
            exit={reduceMotion ? pillMotionReduced.exit : pillMotion.exit}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: 'spring', stiffness: 420, damping: 32 }
            }
          >
            <nav
              className="flex items-center rounded-full px-2 py-1.5 shadow-lg shadow-black/30"
              style={{ backgroundColor: currentTheme.nav.pill }}
            >
              <NavRow
                currentPath={currentPath}
                bubbleColor={currentTheme.nav.pillBubble}
                isDarkMode={isDarkMode}
                onToggleTheme={toggleTheme}
                variant="pill"
              />
            </nav>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

const NavRow = ({
  variant = 'inflow',
  currentPath,
  bubbleColor,
  isDarkMode,
  onToggleTheme,
}: {
  variant?: 'inflow' | 'pill';
  currentPath: string;
  bubbleColor: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}) => {
  const isPill = variant === 'pill';

  return (
  <div className="flex w-full items-center justify-between gap-1">
    <Link
      to="/"
      className="flex shrink-0 items-center"
      aria-label="Mohamed Farah — home"
    >
      <img
        src={logo}
        width={isPill ? 28 : 32}
        height={isPill ? 28 : 32}
        alt=""
        className={`${isPill ? 'h-7 w-7 invert' : 'h-8 w-8 dark:invert'}`}
        decoding="async"
      />
    </Link>

    <div className="flex items-center whitespace-nowrap">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            aria-current={isActive ? 'page' : undefined}
            className={`relative rounded-full transition-colors ${
              isPill
                ? 'px-2 py-1.5 text-xs sm:px-3 sm:text-sm'
                : 'px-3 py-2 text-sm'
            } ${
              isPill
                ? isActive
                  ? 'text-white'
                  : 'text-neutral-400 hover:text-white'
                : isActive
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {item.label}
            {isActive && (
              <motion.div
                className="absolute inset-0 -z-10 rounded-full"
                style={{ backgroundColor: bubbleColor }}
                layoutId="bubble"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </Link>
        );
      })}
    </div>

    <motion.button
      type="button"
      onClick={onToggleTheme}
      className={
        isPill
          ? 'shrink-0 rounded-full bg-white p-2 text-neutral-900'
          : 'shrink-0 rounded-full p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </motion.button>
  </div>
  );
};

export default Navbar;
