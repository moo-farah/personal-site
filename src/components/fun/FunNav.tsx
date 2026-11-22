import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { funCategories, type FunFilter } from '../../data/fun';

type FunNavProps = {
  active: FunFilter;
  onSelect: (id: FunFilter) => void;
};

export const FunNav = ({ active, onSelect }: FunNavProps) => {
  const { currentTheme, isDarkMode } = useTheme();
  const [hovered, setHovered] = useState<FunFilter | null>(null);

  return (
    <nav
      aria-label="Fun categories"
      className="flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap hide-scrollbar sm:gap-4"
      onMouseLeave={() => setHovered(null)}
    >
      {funCategories.map((category) => {
        const isActive = active === category.id;
        const isHovered = hovered === category.id;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            onMouseEnter={() => setHovered(category.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`relative shrink-0 px-2.5 py-1 text-sm transition-colors ${
              isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200'
            }`}
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 -z-10 rounded"
                style={{ backgroundColor: currentTheme.nav.bubble }}
                layoutId="fun-category"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
              />
            )}
            {isHovered && !isActive && (
              <motion.div
                className="absolute inset-0 -z-10 rounded"
                layoutId="fun-hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                style={{
                  backgroundColor: isDarkMode
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.05)',
                }}
              />
            )}
            {category.label}
          </button>
        );
      })}
    </nav>
  );
};
