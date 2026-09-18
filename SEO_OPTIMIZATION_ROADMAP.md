# SEO Optimization & Portfolio Expansion Roadmap

**Last Updated:** 2026-09-18

---

## 🔍 Current SEO Status Audit

### ✅ What's Working
- Clean, semantic HTML structure
- Dark mode support (good for user retention)
- Fast Next.js 15 setup
- Mobile-responsive design
- Good page hierarchy (home → about → projects → blog → contact)
- Blog content with proper dating and excerpts

### ❌ Critical Gaps
- **No meta tags** beyond title/description on individual pages
- **No structured data** (JSON-LD schema missing)
- **No sitemap.xml** or robots.txt
- **No canonical URLs** (could be an issue if deployed)
- **No Open Graph tags** (social sharing looks generic)
- **No internal linking strategy** between blog posts and projects
- **Limited blog content** (3 posts, great but needs more depth)
- **No analytics** mentioned (Google Analytics, Vercel Analytics)
- **No image alt text validation** across all pages
- **No performance monitoring** (Core Web Vitals)

---

## 📈 Phase 1: Essential SEO Foundations (Week 1)

### 1.1 Enhanced Metadata & Meta Tags
Add to each page:
```typescript
export const metadata: Metadata = {
  title: "Page Title | Slavi Dimitrov",
  description: "Concise description (120-160 chars)",
  keywords: "fullstack, react, vue, django, postgresql",
  canonical: "https://yourdomain.com/path",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://yourdomain.com/path",
    siteName: "Slavi Dimitrov - Fullstack Developer",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
};
```

### 1.2 Create Structured Data (Schema.json)
**File:** `app/schema.ts` or inline in layout

```typescript
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Slavi Dimitrov",
    url: "https://yourdomain.com",
    jobTitle: "Fullstack Developer",
    email: "slavidimitrov54@gmail.com",
    image: "https://yourdomain.com/images/slavi.png",
    sameAs: [
      "https://github.com/sldimitrov",
      "https://linkedin.com/in/slavi-dimitrov-311982292/"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Waracle",
    },
    skills: [
      "React", "Vue", "Django", "PostgreSQL", "TypeScript",
      "Next.js", "Full-stack development", "Backend engineering"
    ],
  };
}
```

### 1.3 Generate Sitemap & Robots.txt
**File:** `public/robots.txt`
```
User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://yourdomain.com/sitemap.xml
```

**File:** `app/sitemap.ts` (Next.js 15)
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://yourdomain.com', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://yourdomain.com/about', priority: 0.8 },
    { url: 'https://yourdomain.com/projects', priority: 0.8 },
    { url: 'https://yourdomain.com/blog', priority: 0.7 },
    // Add all blog posts dynamically
    ...POSTS.map(post => ({
      url: `https://yourdomain.com/blog/${post.slug}`,
      priority: 0.6,
      lastModified: post.date,
    })),
  ];
}
```

### 1.4 Configure Analytics
- Add **Google Analytics 4** via `next/script`
- Set up **Vercel Analytics** (automatic with Vercel)
- Track: page views, time on page, blog reading time, link clicks

### 1.5 Image Optimization
- Add proper `alt` text to all images
- Use Next.js `<Image>` component everywhere
- Create optimized OG image (1200x630px)

---

## 🎯 Phase 2: Content & Expertise Showcase (Week 2-3)

### 2.1 Expand Blog with Strategic Posts
Target SEO keywords & showcase expertise:

**Technical Deep Dives:**
- "Building a Production Django API" (Django/PostgreSQL expertise)
- "React Performance Optimization" (React expertise)
- "Full-stack TypeScript Guide" (fullstack positioning)
- "PostgreSQL for Full-stack Developers" (backend focus)
- "Migrating from Create React App to Next.js" (value for audiences)

**Career/Learning Posts:**
- "What I Learned Going Fullstack" (career journey)
- "Building Systems, Not Just Features" (architecture thinking)
- "Testing Strategies for Full-stack Teams" (teaching angle)

**Teaching/Educational:**
- "Web Development Fundamentals" (for your course)
- "Modern Frontend Best Practices 2026" (course content)
- "PostgreSQL Basics for Developers" (course content)

### 2.2 Detailed Project Case Studies
Instead of just GitHub links, add `app/projects/[slug]/page.tsx`:

```markdown
# Project Name
- **Problem:** What you were solving
- **Solution:** Technical approach & decisions
- **Tech Stack:** React, Django, PostgreSQL, n8n
- **Impact:** Metrics: faster, cheaper, user adoption, code reduction
- **Key Learnings:** What you learned building it
- **Code Highlights:** Show key architectural decisions
- **Live Demo:** Link to project (if public)
- **Source Code:** GitHub link
```

### 2.3 Add "Skills & Expertise" Page
Structure like a technical resume:

**By Category:**
- Frontend: React 19, Vue 3, TypeScript, Tailwind, Next.js 15
- Backend: Django, PostgreSQL, RESTful APIs, n8n workflows
- DevOps/Tooling: Git, CI/CD concepts, Docker (if applicable)
- Soft Skills: Teaching, mentoring, remote work, async communication

**With Examples:**
- Each skill links to: blog posts, projects, or code examples
- Show what level you're at (used in production, expert, learning)
- Include years of experience with each

---

## 🚀 Phase 3: Advanced Features for Expertise & Teaching (Week 3+)

### 3.1 Interactive Code Examples & Demos
Create a new `/code-examples` or `/tutorials` section:

```
/tutorials/
  ├── react-hooks-guide/
  ├── django-rest-api/
  ├── postgresql-query-optimization/
  └── typescript-patterns/
```

Each with:
- Live code editor (CodeSandbox embed or simple Monaco Editor)
- Copy-to-clipboard code blocks
- Before/after comparisons
- Performance metrics

### 3.2 Learning Path / Course Preview
Add `/learning` section:

```
/learning/
├── page.tsx (main learning hub)
├── fullstack-foundations/  (beginner)
├── advanced-django/        (intermediate)
├── production-systems/     (advanced)
```

Each course preview:
- 5-7 lessons (link to blog posts or new content)
- Estimated time to complete
- Prerequisites
- GitHub repo for exercises
- Certificate preview

### 3.3 "Uses" Page
Popular with developers - show your actual tech stack:

```
/uses/
- Editor: VS Code + extensions list
- Terminal: PowerShell / Bash setup
- Keyboard: Hardware + keybindings
- Tools: n8n, GitHub, etc.
- Language: Python, TypeScript, Vue
```

### 3.4 Speaking/Teaching Page
For future lecture opportunities:

```
/speaking/
- Past talks/workshops
- Available topics
- Duration options (30 min, 1 hr, half-day workshop)
- Topics: "Building Production Systems", "Django for Frontenders", etc.
```

### 3.5 Resume/CV (Downloadable)
Add `/resume`:
- Display as PDF
- Also as web version (MDX)
- Link from about page
- Update regularly

---

## 📊 Phase 4: Search & Discovery Optimization

### 4.1 Internal Linking Strategy
- Blog posts → Related projects
- Blog posts → Related tutorials
- Skills → Projects using that skill
- Learning paths → Relevant blog posts

Example:
```tsx
<RelatedContent 
  posts={[...]} 
  projects={[...]} 
  skills={[...]} 
/>
```

### 4.2 Search-Friendly Blog Post Format
```markdown
---
title: "Building Production APIs with Django"
slug: "django-production-apis"
excerpt: "How to build scalable, secure REST APIs with Django and PostgreSQL"
date: "2026-09-20"
keywords: ["django", "rest-api", "postgresql", "backend"]
readingTime: 8
---
```

### 4.3 RSS Feed
For blog readers & aggregators:
```
/feed.xml
```

### 4.4 Google Search Console Integration
- Verify ownership
- Submit sitemap
- Monitor: impressions, clicks, average position
- Fix crawl errors
- Monitor Core Web Vitals

---

## 🎓 Course/Teaching Content Ideas

### Module 1: Web Fundamentals (Beginner)
- HTTP/HTTPS & Request/Response cycle
- HTML, CSS, JavaScript basics
- Version control with Git
- **Your angle:** Show how frontend & backend talk

### Module 2: Frontend Mastery (Intermediate)
- React fundamentals & hooks
- Component composition & performance
- State management patterns
- TypeScript for React
- **Your angle:** Your React experience + modern practices

### Module 3: Backend Essentials (Intermediate)
- Python fundamentals
- Django basics & MTV pattern
- PostgreSQL fundamentals
- Building APIs
- **Your angle:** Your Django + PostgreSQL expertise

### Module 4: Full-Stack Integration (Advanced)
- Connecting frontend to backend
- Authentication & authorization
- Real-world project architecture
- Deployment & DevOps basics
- **Your angle:** Your production experience

### Module 5: Production Systems (Advanced)
- Database optimization & scaling
- API design patterns
- Caching strategies
- Monitoring & debugging
- **Your angle:** War stories from Waracle

---

## 🔧 Implementation Priority Matrix

| Priority | Task | Impact | Effort | Timeframe |
|----------|------|--------|--------|-----------|
| 🔴 P0 | Metadata on all pages | High | Low | 2 hours |
| 🔴 P0 | Schema.json structured data | High | Medium | 3 hours |
| 🔴 P0 | Sitemap & robots.txt | Medium | Low | 1 hour |
| 🔴 P0 | Google Analytics | Medium | Low | 30 mins |
| 🟠 P1 | Project case studies | High | Medium | 4-6 hours |
| 🟠 P1 | 3-4 more blog posts | High | Medium | 6-8 hours |
| 🟠 P1 | Skills/Expertise page | Medium | Low | 2 hours |
| 🟡 P2 | Learning paths & tutorials | High | High | 8-12 hours |
| 🟡 P2 | "Uses" page | Low | Low | 1 hour |
| 🟡 P2 | Speaking/Teaching page | Medium | Low | 1 hour |
| 🟡 P2 | RSS feed | Medium | Low | 1 hour |

---

## ✅ SEO Checklist Before Launch

- [ ] All pages have unique title tags (50-60 chars)
- [ ] All pages have unique meta descriptions (120-160 chars)
- [ ] Schema.json Person/Organization embedded
- [ ] All images have descriptive alt text
- [ ] Internal links use descriptive anchor text (not "click here")
- [ ] Mobile responsive (test at 375px)
- [ ] Page load speed > 90 Lighthouse score
- [ ] No broken links (internal or external)
- [ ] Canonical URLs configured
- [ ] Open Graph tags for social sharing
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.txt disallowing nothing (or appropriately)
- [ ] Analytics tracking installed
- [ ] 404 page exists and is branded
- [ ] Blog posts have categories/tags for discovery

---

## 📈 Success Metrics to Track

1. **Organic Traffic** - Monthly sessions from search
2. **Keyword Rankings** - Top 20 keywords position
3. **Blog Engagement** - Average read time, bounce rate
4. **Conversion** - Clicks to: GitHub, LinkedIn, email
5. **Page Speed** - Core Web Vitals (LCP, FID, CLS)
6. **Backlinks** - Monitor with Ahrefs/Moz (free tier)

---

## 🎯 Next 90 Days Roadmap

**Weeks 1-2:** Essential SEO (metadata, schema, sitemap)  
**Weeks 3-4:** Content expansion (3+ new blog posts, case studies)  
**Weeks 5-6:** Expertise showcase (Skills page, Projects depth)  
**Weeks 7-8:** Teaching focus (Learning paths, tutorials)  
**Weeks 9-10:** Polish & optimization (internal linking, performance)  
**Weeks 11-12:** Monitoring & iteration (analytics, ranking tracking)

---

## Questions to Ask Yourself

1. **Who is your ideal audience?**
   - Junior devs learning fullstack? → Focus on tutorials
   - Companies hiring? → Focus on project case studies & expertise
   - Both? → Balance content

2. **What makes you unique?**
   - Your teaching ability + production experience
   - Transition from frontend → fullstack
   - Bulgarian perspective on global tech

3. **What do you want from this portfolio?**
   - Better freelance opportunities?
   - Speaking engagements?
   - Teaching opportunities?
   - Full-time roles?
   - Building a personal brand?

Each goal changes your content strategy!

---

**Good luck with your portfolio! These changes will significantly boost your SEO and position you as an expert in your field.** 🚀
