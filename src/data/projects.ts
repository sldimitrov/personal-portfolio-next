export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "hackfeed",
    name: "HackFeed",
    description: "A tech news aggregation app built with React and Supabase",
    longDescription:
      "HackFeed is a tech news aggregation app that delivers curated content from the developer world through a clean, responsive interface. The project emphasizes real-time data fetching, modular component structure, and modern frontend practices.",
    tags: ["React", "Supabase", "Real-time", "TypeScript", "Tailwind CSS"],
    link: "https://hack-feed-real.vercel.app/",
    github: "https://github.com/sldimitrov/hackfeed",
  },
];
