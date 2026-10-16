import { motion } from 'framer-motion';
import { Database, Globe, Star } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiCursor,
  SiFramer,
  SiGit,
  SiExpress,
  SiJavascript,
  SiNodedotjs,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSpotify,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiYoutube,
} from 'react-icons/si';

type SkillIconKey =
  | 'react'
  | 'nextjs'
  | 'typescript'
  | 'javascript'
  | 'tailwind'
  | 'framer'
  | 'vite'
  | 'git'
  | 'cursor'
  | 'nodejs'
  | 'express'
  | 'postgresql'
  | 'sql'
  | 'rest'
  | 'spotify'
  | 'youtube';

const skillIcons: Record<
  SkillIconKey,
  { Icon: IconType; className: string }
> = {
  react: { Icon: SiReact, className: 'text-cyan-500' },
  nextjs: { Icon: SiNextdotjs, className: 'text-gray-900 dark:text-gray-100' },
  typescript: { Icon: SiTypescript, className: 'text-blue-500' },
  javascript: { Icon: SiJavascript, className: 'text-yellow-500' },
  tailwind: { Icon: SiTailwindcss, className: 'text-sky-500' },
  framer: { Icon: SiFramer, className: 'text-purple-500' },
  vite: { Icon: SiVite, className: 'text-violet-500' },
  git: { Icon: SiGit, className: 'text-orange-600' },
  cursor: { Icon: SiCursor, className: 'text-gray-800 dark:text-gray-100' },
  nodejs: { Icon: SiNodedotjs, className: 'text-green-600' },
  express: { Icon: SiExpress, className: 'text-gray-800 dark:text-gray-200' },
  postgresql: { Icon: SiPostgresql, className: 'text-blue-600' },
  sql: { Icon: Database, className: 'text-slate-500' },
  rest: { Icon: Globe, className: 'text-blue-500' },
  spotify: { Icon: SiSpotify, className: 'text-emerald-500' },
  youtube: { Icon: SiYoutube, className: 'text-red-500' },
};

const skillGroups: {
  label: string;
  caption: string;
  items: { name: string; icon: SkillIconKey; dailyDriver?: boolean }[];
}[] = [
  {
    label: 'Frontend',
    caption: 'what users touch',
    items: [
      { name: 'React', icon: 'react', dailyDriver: true },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'TypeScript', icon: 'typescript', dailyDriver: true },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Tailwind CSS', icon: 'tailwind' },
      { name: 'Framer Motion', icon: 'framer' },
    ],
  },
  {
    label: 'Tooling',
    caption: 'how I ship',
    items: [
      { name: 'Vite', icon: 'vite' },
      { name: 'Git', icon: 'git' },
      { name: 'Cursor', icon: 'cursor', dailyDriver: true },
    ],
  },
  {
    label: 'Backend & data',
    caption: 'servers and storage',
    items: [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Express', icon: 'express' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'SQL', icon: 'sql' },
    ],
  },
  {
    label: 'APIs & integrations',
    caption: 'talking to the outside world',
    items: [
      { name: 'REST APIs', icon: 'rest' },
      { name: 'Spotify API', icon: 'spotify' },
      { name: 'YouTube API', icon: 'youtube' },
    ],
  },
];

const SkillPill = ({
  name,
  iconKey,
  dailyDriver,
}: {
  name: string;
  iconKey: SkillIconKey;
  dailyDriver?: boolean;
}) => {
  const { Icon, className } = skillIcons[iconKey];

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50/80 px-2.5 py-1 text-xs text-gray-800 dark:border-gray-700 dark:bg-zinc-900/50 dark:text-gray-200">
      <motion.span
        className="inline-flex shrink-0 items-center"
        whileHover={{ scale: 1.15 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
      >
        <Icon className={`h-3.5 w-3.5 ${className}`} aria-hidden />
      </motion.span>
      <span>{name}</span>
      {dailyDriver && (
        <Star
          className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400"
          aria-label="Daily driver"
        />
      )}
    </span>
  );
};

export const SkillsSection = () => {
  return (
    <div className="mb-8 space-y-5">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Stack I use for interfaces and this portfolio.
      </p>
      {skillGroups.map((group) => (
        <div key={group.label}>
          <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-500">
              {group.label}
            </p>
            <p className="text-xs italic text-gray-400 dark:text-gray-500">
              {group.caption}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <SkillPill
                key={skill.name}
                name={skill.name}
                iconKey={skill.icon}
                dailyDriver={skill.dailyDriver}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
