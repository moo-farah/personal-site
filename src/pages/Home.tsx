import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import SpotifyPlaying from '../components/SpotifyPlaying';
import YouTubeLatest from '../components/YouTubeLatest';
import { usePageTitle } from '../hooks/usePageTitle';
import { useLiveTime } from '../hooks/useLiveTime';
import { FadeInSection } from '../utils/FadeInSection';
import { Clock, MapPin } from 'lucide-react';

const Home = () => {
  usePageTitle('');  // Empty string for home page
  const { now, label: timeLabel } = useLiveTime();

  return (
    <div>
      <FadeInSection>
        <section className="space-y-4">
          <motion.div
            className="text-2xl sm:text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypeAnimation
              sequence={[
                'hello, Mohamed here',
              ]}
              wrapper="h1"
              cursor={true}
              repeat={0}
              speed={50}
              style={{ display: 'inline-block' }}
            />
          </motion.div>
          <motion.p
            className="text-sm sm:text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Frontend engineer in Kenya — I build with React and TypeScript. In Y Combinator Startup School, working on Study Squadron. Open to full-time frontend roles.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.35 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} strokeWidth={1.5} className="h-4 w-4 shrink-0" aria-hidden />
              Nairobi, Kenya
            </span>
            <time
              dateTime={now.toISOString()}
              className="inline-flex items-center gap-1.5 tabular-nums"
            >
              <Clock size={16} strokeWidth={1.5} className="h-4 w-4 shrink-0" aria-hidden />
              {timeLabel}
            </time>
          </motion.div>
        </section>
      </FadeInSection>

      <FadeInSection delay={0.2}>
        <motion.section className="space-y-1">
          <div className="py-4">
            <YouTubeLatest />
          </div>
        </motion.section>
      </FadeInSection>

      <FadeInSection delay={0.4}>
        <motion.section className="mt-4">
          <div>
            <SpotifyPlaying />
          </div>
        </motion.section>
      </FadeInSection>
    </div>
  );
};

export default Home; 