import { motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';
import { FadeInSection } from '../utils/FadeInSection';

const Fun = () => {
  usePageTitle('Fun');

  return (
    <div>
      <FadeInSection>
        <motion.h1 className="text-3xl font-bold">Fun</motion.h1>
        <motion.p className="mb-6 text-sm leading-relaxed sm:text-base">
          Play around.
        </motion.p>
      </FadeInSection>
    </div>
  );
};

export default Fun;
