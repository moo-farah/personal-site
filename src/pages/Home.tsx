import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import SpotifyPlaying from '../components/SpotifyPlaying';
import YouTubeLatest from '../components/YouTubeLatest';
import { usePageTitle } from '../hooks/usePageTitle';
import { FadeInSection } from '../utils/FadeInSection';

const Home = () => {
  usePageTitle('');  // Empty string for home page

  return (
      <div>
        <FadeInSection>
          <section className="space-y-4 flex flex-col items-center">
            <img
              src="https://raw.githubusercontent.com/moo-farah/mohamedfarah-site/main/src/assets/icon/transparent.png"
              alt="mohamed farah"
              className="w-20 h-20 rounded-full mb-2 border-2 border-gray-300 dark:border-gray-700 shadow"
            />
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
              a software engineer who builds for the web, learns from YC founders, and is on a mission to launch a startup — one line of code at a time.
            </motion.p>
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