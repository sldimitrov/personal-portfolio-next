export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string[];
};

export const POSTS: Post[] = [
  {
    slug: "a-short-history-of-ai",
    title: "A short history of AI",
    date: "2026-09-01",
    excerpt:
      "From early symbolic systems to today's large language models - a quick tour of how we got here.",
    content: [
      "Artificial intelligence didn't start with chatbots. In the 1950s, researchers were already asking whether machines could reason, and the first few decades of the field were dominated by symbolic AI - systems built on hand-written rules and logic rather than learned patterns.",
      "That approach hit a wall. Rules don't scale to the messiness of the real world, and progress stalled through what's now called the 'AI winter'. What changed things was data and compute: as both became abundant, statistical and neural approaches started to outperform hand-crafted rules on almost everything.",
      "The last decade compressed that trajectory even further. Transformers made it practical to train models on huge amounts of text, and the result is the current generation of large language models - systems that feel less like calculators and more like collaborators.",
      "This is very much a placeholder post to prove out the blog UI end to end. The real version is still being written.",
    ],
  },
  {
    slug: "learning-django-after-react",
    title: "Learning Django after years of React",
    date: "2026-08-15",
    excerpt:
      "Notes on switching mental models from component trees to request/response cycles.",
    content: [
      "Most of my instincts as a developer were built around components: state flows down, events flow up, and the UI is a function of data. Django doesn't think in those terms at all - it thinks in requests, views, and templates rendered on the server.",
      "The hardest adjustment wasn't syntax, it was letting go of client-side assumptions. There's no virtual DOM to lean on, no automatic re-render when state changes. Instead, the database and the ORM become the source of truth, and the request/response cycle is the whole story.",
      "Once that clicked, a lot of Django's conventions started to make sense - migrations, the admin panel, and the ORM all exist to make that server-centric model fast to work in.",
    ],
  },
  {
    slug: "automating-workflows-with-n8n",
    title: "Automating workflows with n8n",
    date: "2026-07-02",
    excerpt:
      "How a visual workflow tool ended up saving hours of repetitive backend glue code.",
    content: [
      "A lot of backend work isn't really about building new features - it's about connecting things that already exist. n8n turned out to be a great fit for that kind of glue work: webhooks, scheduled jobs, and API-to-API syncing without writing a new microservice for each one.",
      "The biggest win wasn't speed, it was visibility - a workflow that would normally be scattered across a few scripts and cron jobs becomes one diagram anyone on the team can read.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}

export function getSortedPosts() {
  return [...POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
