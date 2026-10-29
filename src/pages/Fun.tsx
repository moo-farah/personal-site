import { useRef } from 'react';
import { motion } from 'framer-motion';
import { usePageTitle } from '../hooks/usePageTitle';
import { FadeInSection } from '../utils/FadeInSection';
import { FunCard } from '../components/fun/FunCard';
import { MagneticGrid } from '../components/fun/MagneticGrid';
import { KineticType, type KineticTypeHandle } from '../components/fun/KineticType';
import { Marbles, type MarblesHandle } from '../components/fun/Marbles';
import { OrbitRings } from '../components/fun/OrbitRings';

const actionClass =
  'shrink-0 text-sm text-gray-500 transition-colors hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200';

const Fun = () => {
  usePageTitle('Fun');
  const typeRef = useRef<KineticTypeHandle>(null);
  const marblesRef = useRef<MarblesHandle>(null);

  return (
    <div className="pb-20">
      <FadeInSection>
        <motion.h1 className="text-3xl font-bold">Fun</motion.h1>
        <motion.p className="mb-6 text-sm leading-relaxed sm:text-base">
          Play around.
        </motion.p>
      </FadeInSection>

      <div className="space-y-8">
        <FadeInSection delay={0.1}>
          <FunCard title="Field" hint="Move around. Dots get out of the way.">
            <MagneticGrid />
          </FunCard>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <FunCard
            title="Letters"
            hint="Drag a letter. Shuffle for a new word."
            clip={false}
            action={
              <button type="button" className={actionClass} onClick={() => typeRef.current?.shuffle()}>
                shuffle
              </button>
            }
          >
            <KineticType ref={typeRef} />
          </FunCard>
        </FadeInSection>

        <FadeInSection delay={0.3}>
          <FunCard
            title="Marbles"
            hint="Click or tap to drop one."
            action={
              <button type="button" className={actionClass} onClick={() => marblesRef.current?.reset()}>
                reset
              </button>
            }
          >
            <Marbles ref={marblesRef} />
          </FunCard>
        </FadeInSection>

        <FadeInSection delay={0.4}>
          <FunCard title="Orbit" hint="Tilt the system with your pointer.">
            <OrbitRings />
          </FunCard>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Fun;
