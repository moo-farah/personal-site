import { motion } from 'framer-motion';
import { Project } from '../components/Project';
import { HobbiesSection } from '../components/HobbiesSection';

const projects = [
  {
    title: "Wildfire Tracker",
    description: "Real-time wildfire tracker using Google Maps and NASA APIs for live data.",
    tech: [
      { name: "JavaScript", color: "blue" },
      { name: "React", color: "cyan" },
      { name: "Google API", color: "neutral" },
      { name: "NASA API", color: "amber" }
    ],
    link: "https://github.com/moo-farah/wildfire-tracker-website",
    previewImage: "https://personal-site-phi-snowy.vercel.app/assets/cypherchat-7f589c33.png"
  },
  {
    title: "Spotify Data Dashboard",
    description: "Dashboard that fetches Spotify's Top 50 songs and visualizes data in text and chart form.",
    tech: [
      { name: "React", color: "cyan" },
      { name: "Spotify API", color: "emerald" },
      { name: "JavaScript", color: "yellow" },
      { name: "Node.js", color: "green" },
    ],
    link: "https://github.com/moo-farah/wildfire-tracker-website",
    previewImage: "https://personal-site-phi-snowy.vercel.app/assets/spotifydash-7d7e663f.png"
  }
];

export const sections = [
    {
      title: "Timeline",
      content: (
        <div className="space-y-4 mb-8">
          {[
            {
              company: "Middlesex University",
              date: "2024 - Now",
              title: "BSc Information Technology",
              description: ["Graduating in July 2026 with a passion for tech and innovation"],
              dotColor: "bg-amber-500"
            },
          
            {
              company: "RelatiPay",
              date: "2026 - Now",
              title: "Co-Founder",
              description: ["Founded a financial startup app enabling users to send money to relatives instantly with one click."],
              dotColor: "bg-green-500"
            },
          ].map((item) => (
            <div key={item.company + item.date} className="relative">
              <div 
                className={`absolute -left-[17px] top-2 w-[9px] h-[9px] rounded-full ${item.dotColor} ring-4 ring-white dark:ring-gray-900`}
              />
              <motion.div
                className="group py-1 transition-colors"
                whileHover={{ scale: 1.05 }}
                style={{ transformOrigin: 'left' }}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <p className="font-medium">{item.company}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 sm:mt-0">{item.date}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">{item.title}</p>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                  {item.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Projects",
      content: (
        <div className="space-y-4">
          {projects.map((project) => (
            <Project key={project.title} project={project} />
          ))}
        </div>
      )
    },
    {
      title: "Hobbies",
      content: <HobbiesSection />
    }
  ]