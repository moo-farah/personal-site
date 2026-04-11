import { motion } from 'framer-motion';
import { useYouTubeVideoCount } from '../hooks/useYouTubeVideoCount';

const hobbies = [
  {
    title: "YouTube Bingeing",
    description: "Learning from YC founders, coding, and occasionally falling into cat video rabbit holes.",
    statsKey: "youtube" as const,
    color: "rose"
  },
  {
    title: "Startup Dreaming",
    description: "Pitching wild ideas to friends, building MVPs, and collecting rejection emails like Pokémon.",
    stats: "∞ pivots",
    color: "blue"
  },
  {
    title: "Coffee Alchemy",
    description: "Brewing the perfect cup, one caffeine-fueled bug fix at a time.",
    stats: "2 cups/day (minimum)",
    color: "amber"
  },
  {
    title: "Urban Exploring",
    description: "Wandering city streets, finding hidden coffee shops, and people-watching for startup inspiration.",
    stats: "Lost: 4 times this month",
    color: "blue"
  },
];

export const HobbiesSection = () => {
  const { videoCountText, loading } = useYouTubeVideoCount();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
      {hobbies.map((hobby) => {
        const stats =
          hobby.statsKey === "youtube"
            ? loading
              ? "…"
              : (videoCountText ?? "—")
            : hobby.stats!;

        return (
          <motion.div
            key={hobby.title}
            className="group py-1 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <h3 className="font-medium">{hobby.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {hobby.description}
              </p>
              <p
                className={`text-xs text-${hobby.color}-500 dark:text-${hobby.color}-500 mt-2 font-medium`}
              >
                {stats}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
