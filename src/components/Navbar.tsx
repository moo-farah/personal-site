import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/icon/transparent.png';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { theme } from '../styles/theme';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/gear', label: 'Gear' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <header className="sticky top-0 z-50 w-full pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 sm:pb-3">
      <nav className="container-width" aria-label="Primary">
        <div className="flex items-center gap-0.5 rounded-full border border-gray-300/70 bg-gray-100/85 px-1.5 py-1 shadow-sm backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/85 sm:gap-1 sm:px-2 sm:py-1.5">
          <Link
            to="/"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:hover:bg-white/10 dark:focus-visible:ring-zinc-500"
            aria-label="Home"
          >
            <img src={logo} alt="" className="h-6 w-6" />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative z-0 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3.5 sm:py-2 sm:text-sm ${
                    isActive
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-zinc-500`}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-full"
                      style={{ backgroundColor: currentTheme.nav.bubble }}
                      layoutId="nav-bubble"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-black/5 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-zinc-500"
            whileTap={{ scale: 0.92 }}
          >
            {isDarkMode ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
