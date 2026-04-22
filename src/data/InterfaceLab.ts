/**
 * Interface Lab page data.
 *
 * This file describes the tools I use to prototype interfaces and create
 * interactive UI animations.
 */

export interface InterfaceLabItem {
  name: string;
  description: string;
  link: string;
}

export interface InterfaceLabCategory {
  category: string;
  items: InterfaceLabItem[];
}

export const interfaceLabCategories: InterfaceLabCategory[] = [
  {
    category: "Prototyping",
    items: [
      {
        name: "Figma",
        description:
          "I design interface concepts and flow prototypes before implementation.",
        link: "https://www.figma.com/",
      },
      {
        name: "Framer",
        description:
          "I quickly turn ideas into interactive product-like prototypes with smooth transitions.",
        link: "https://www.framer.com/",
      },
      {
        name: "Penpot",
        description:
          "Open-source design tooling for wireframes and component exploration.",
        link: "https://penpot.app/",
      },
      {
        name: "FigJam",
        description:
          "Whiteboarding and rapid UI brainstorming before visual polish.",
        link: "https://www.figma.com/figjam/",
      },
    ],
  },
  {
    category: "Animation",
    items: [
      {
        name: "Framer Motion",
        description:
          "My primary React motion library for expressive page and component transitions.",
        link: "https://www.framer.com/motion/",
      },
      {
        name: "GSAP",
        description:
          "Timeline-based animations for complex interactions and storytelling effects.",
        link: "https://gsap.com/",
      },
      {
        name: "Rive",
        description:
          "Interactive real-time animations for polished micro-interactions.",
        link: "https://rive.app/",
      },
      {
        name: "LottieFiles",
        description:
          "Import and optimize lightweight motion assets for the web.",
        link: "https://lottiefiles.com/",
      },
    ],
  },
  {
    category: "Build Playground",
    items: [
      {
        name: "Cursor",
        description:
          "I build quick UI experiments and prototype behavior directly in code.",
        link: "https://cursor.com/",
      },
      {
        name: "CodePen",
        description:
          "Rapid idea sandbox for testing animation snippets and interaction concepts.",
        link: "https://codepen.io/",
      },
      {
        name: "Vercel",
        description:
          "Deploy prototype experiments fast and share live links instantly.",
        link: "https://vercel.com/",
      },
      {
        name: "GitHub",
        description:
          "Version control and iteration history for every interface experiment.",
        link: "https://github.com/",
      },
    ],
  },
];