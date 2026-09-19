export interface CodeHighlight {
  title: string;
  description: string;
  language: string;
  code: string;
}

export interface CaseStudy {
  role: string;
  timeline: string;
  problem: string;
  solution: string[];
  techStack: { category: string; items: string[] }[];
  impact: string[];
  learnings: string[];
  codeHighlights: CodeHighlight[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  caseStudy?: CaseStudy;
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
    caseStudy: {
      role: "Solo developer - frontend and Supabase backend",
      timeline: "June - July 2025",
      problem:
        "Built as a technical assignment: ship a full-stack social feed where users can register, post, like, share, comment and report content, with an admin moderation flow on top. The goal was to show real SQL-backed architecture rather than a UI wired to mock data - a feed that joins posts, profiles, likes and shares, filters by user, and stays snappy as it grows.",
      solution: [
        "Supabase provides the PostgreSQL database, JWT-based auth and file storage, so the frontend talks to real tables instead of a hand-rolled API. Posts, profiles, likes and shares live in separate tables, and a Postgres view (feed_posts_shared) joins them into the exact shape the UI needs - including like counts, whether the current user liked a post, and who shared it.",
        "On the client, every read goes through a custom TanStack Query hook and every write through a mutation that invalidates the relevant cache key. Components stay declarative: they call a hook and render loading, error and data states. The feed uses infinite pagination with a page size of five, so the first paint stays cheap regardless of how many posts exist.",
        "The app is split by responsibility: pages map to routes, hooks own data logic, a services layer wraps every Supabase call, Yup schemas validate forms, and a small Zustand store holds the session. Role-based access separates regular users from admins, who can review reports and delete any post.",
      ],
      techStack: [
        { category: "Frontend", items: ["React 19", "TypeScript", "Vite", "React Router"] },
        { category: "Styling & UI", items: ["Tailwind CSS", "MUI", "Framer Motion"] },
        { category: "Data & State", items: ["TanStack Query", "Zustand", "React Hook Form", "Yup"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Supabase Auth", "Supabase Storage"] },
        { category: "Tooling & i18n", items: ["i18next", "ESLint", "Prettier", "Vercel"] },
      ],
      impact: [
        "Shipped end to end: a public live demo on Vercel and an open-source repository.",
        "Covers the full feed lifecycle - auth, posting, likes, shares, comments, reports, and profile editing with avatar upload or preset avatars.",
        "Admin moderation flow with role-based access: admins can review reported posts and delete any post.",
        "Bilingual interface (English and Bulgarian) using i18next with browser language detection.",
        "Roughly 3,000 lines of TypeScript organised into 11 custom hooks and 8 service modules, keeping UI components thin.",
      ],
      learnings: [
        "Moving joins and aggregates into a Postgres view is far simpler than stitching several queries together on the client - the frontend gets one flat row per feed item.",
        "TanStack Query's cache keys and invalidation make a feed feel live without a socket: after a mutation the affected list refetches. The next step would be Supabase Realtime subscriptions for true push updates.",
        "The comment and share cooldown lives in client state, so it resets on reload and can be bypassed. Real rate limiting belongs in the database (RLS policies or a function), which is the main thing I would change.",
        "Splitting hooks, services and schemas early kept a 3,000-line codebase easy to navigate, and made features like reports and shares cheap to add.",
      ],
      codeHighlights: [
        {
          title: "Infinite pagination with TanStack Query",
          description:
            "The next page offset is derived from how many pages are already loaded, and pagination stops as soon as a page comes back short. Stale and garbage-collection times keep navigation between feed and profile instant.",
          language: "ts",
          code: `export function useInfinitePosts(PAGE_SIZE: number = 5) {
  return useInfiniteQuery<Post[], Error, InfiniteData<Post[]>, string[], number>({
    queryKey: [QUERY_POSTS],
    queryFn: ({ pageParam = 0 }) => PostsService.list(pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length * PAGE_SIZE,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}`,
        },
      ],
    },
  },
];

export function getProjectById(id: string) {
  return PROJECTS.find((project) => project.id === id);
}
