import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';
import { FadeInSection } from '../utils/FadeInSection';
import { FunNav } from '../components/fun/FunNav';
import { funItems, type FunFilter } from '../data/fun';

const Fun = () => {
  usePageTitle('Fun');
  const [filter, setFilter] = useState<FunFilter>('all');

  const items = useMemo(
    () =>
      filter === 'all'
        ? funItems
        : funItems.filter((item) => item.category === filter),
    [filter]
  );

  return (
    <div>
      <FadeInSection>
        <motion.h1 className="text-3xl font-bold">Fun</motion.h1>
        <motion.p className="mb-6 text-sm leading-relaxed sm:text-base">
          Play around.
        </motion.p>
      </FadeInSection>

      <FadeInSection delay={0.15}>
        <div className="flex flex-col gap-6">
          <FunNav active={filter} onSelect={setFilter} />

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Nothing here yet.
                  </p>
                ) : (
                  items.map((item) => (
                    <article key={item.id} className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                        {item.link ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400"
                          >
                            {item.title}
                          </a>
                        ) : (
                          <h2 className="text-base font-medium">{item.title}</h2>
                        )}
                        {item.date && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {item.date}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </article>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
};

export default Fun;
