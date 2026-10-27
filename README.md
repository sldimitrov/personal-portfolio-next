# Slavi Dimitrov - Portfolio

My personal site: who I am, what I've built, my Python course, and a blog. Live at [slavidimitrov.com](https://www.slavidimitrov.com).

Built with Next.js (App Router), React, TypeScript and Tailwind CSS, deployed on Vercel. There's no database: all content lives in this repo.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). No environment variables are needed.

## Where things live

| What | Where |
| --- | --- |
| Pages and routes | `app/` |
| Home page sections | `src/components/sections/` |
| Shared UI (cards, badges, headers) | `src/components/` |
| Projects and case studies | `src/data/projects.ts` |
| Courses | `src/data/courses.ts` |
| Blog posts | `content/blog/*.md` |
| SEO helpers (metadata, structured data, site URL) | `src/lib/` |
| Images and static files | `public/` |

## Writing a blog post

Add a markdown file to `content/blog/` and push:

```
content/blog/2026-10-27-my-post.md   ->   /blog/my-post
```

Start it with `# Title`, then write. The date comes from the filename and the summary from the first paragraph. Full details are in [content/blog/README.md](content/blog/README.md).

## Scripts

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run lint` - ESLint

## Further reading

- [Writing blog posts](content/blog/README.md) - post format, drafts, images
- [AGENTS.md](AGENTS.md) - project conventions and guidelines for AI coding assistants
- [STYLING_DOCUMENTATION.md](STYLING_DOCUMENTATION.md) - styling approach and accessibility
- [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) - architecture overview (written before the blog moved from Supabase to markdown files)
- [SEO_OPTIMIZATION_ROADMAP.md](SEO_OPTIMIZATION_ROADMAP.md) - SEO plan and portfolio expansion ideas
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - SEO setup steps
- [QUICK_START_ACTION_PLAN.md](QUICK_START_ACTION_PLAN.md) - short-term to-do list
- [CONTENT_IDEAS.md](CONTENT_IDEAS.md) - blog post ideas and outlines
- [IMPROVEMENTS.md](IMPROVEMENTS.md) - log of UI/UX improvements

## License

[MIT](LICENSE)
