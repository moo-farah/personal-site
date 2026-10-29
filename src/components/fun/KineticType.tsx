import { forwardRef, useImperativeHandle, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['play', 'wow', 'hey', 'fun', 'yoo', 'yes'];

export type KineticTypeHandle = {
  shuffle: () => void;
};

export const KineticType = forwardRef<KineticTypeHandle>(function KineticType(_, ref) {
  const [word, setWord] = useState('play');

  useImperativeHandle(ref, () => ({
    shuffle: () => {
      setWord((current) => {
        const options = WORDS.filter((item) => item !== current);
        return options[Math.floor(Math.random() * options.length)] ?? 'fun';
      });
    },
  }), []);

  return (
    <div className="flex h-full items-center justify-center px-4 touch-none">
      <div className="flex items-center justify-center gap-1 sm:gap-1.5">
        <AnimatePresence mode="popLayout">
          {word.split('').map((letter, index) => (
            <motion.span
              key={`${word}-${index}-${letter}`}
              layout
              drag
              dragSnapToOrigin
              dragElastic={0.4}
              whileHover={{ y: -10, scale: 1.08 }}
              whileTap={{ scale: 1.12 }}
              whileDrag={{ scale: 1.16, cursor: 'grabbing' }}
              initial={{ y: 28, opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22, delay: index * 0.04 }}
              className="inline-block cursor-grab select-none text-5xl font-bold text-gray-900 dark:text-white sm:text-6xl"
            >
              {letter}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
});
