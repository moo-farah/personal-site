export type FunCategory = 'hackathon' | 'design' | 'code';

export type FunItem = {
  id: string;
  category: FunCategory;
  title: string;
  description: string;
  date?: string;
  link?: string;
};

export const funCategories = [
  { id: 'all', label: 'All' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'code', label: 'Code' },
  { id: 'design', label: 'Design Concept' },
 
] as const;

export type FunFilter = (typeof funCategories)[number]['id'];

export const funItems: FunItem[] = [
  {
    id: 'orchestrate',
    category: 'hackathon',
    title: 'HackerRank Orchestrate',
    description: '24-hour hackathon: design, build, and ship an AI agent.',
    date: 'Oct 2026',
  },
];
