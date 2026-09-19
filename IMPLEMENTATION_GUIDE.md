# SEO Implementation Quick Start Guide

Get your critical SEO foundations running in under 3 hours.

---

## Step 1: Enhanced Metadata System (1 hour)

### Create `src/lib/metadata.ts`

```typescript
import type { Metadata } from "next";

interface PageMetadataProps {
  title: string;
  description: string;
  slug?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedDate?: string;
}

export function generateMetadata(props: PageMetadataProps): Metadata {
  const {
    title,
    description,
    slug = "",
    image = "/og-image.png",
    keywords = [],
    type = "website",
    publishedDate,
  } = props;

  const url = `https://slavidimitrov.dev${slug ? `/${slug}` : ""}`;

  return {
    title: `${title} | Slavi Dimitrov`,
    description,
    keywords: [
      "fullstack developer",
      "react",
      "vue",
      "django",
      "postgresql",
      ...keywords,
    ],
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      siteName: "Slavi Dimitrov - Fullstack Developer",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@slavidimitrov",
    },
    ...(publishedDate && {
      authors: [{ name: "Slavi Dimitrov" }],
      publishedTime: publishedDate,
    }),
  };
}
```

### Update `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Slavi Dimitrov - Fullstack Developer",
  description:
    "Fullstack developer specializing in React, Vue, Django, and PostgreSQL. Building production systems at Waracle.",
  keywords: ["fullstack", "developer", "sofia", "bulgaria"],
});

// ... rest of layout
```

### Update Individual Pages

**`app/about/page.tsx`**
```typescript
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "About Slavi - Fullstack Developer",
  description:
    "Learn about my journey from frontend to fullstack, my tech stack, and what I'm working on.",
  slug: "about",
  keywords: ["about", "experience", "skills"],
});

export default function About() {
  // ... existing component
}
```

**`app/projects/page.tsx`**
```typescript
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Projects - Slavi Dimitrov",
  description:
    "Explore the projects I've built across React, Vue, Django, and PostgreSQL.",
  slug: "projects",
  keywords: ["projects", "portfolio", "work"],
});

export default function Projects() {
  // ... existing component
}
```

**`app/blog/page.tsx`**
```typescript
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Blog - Web Development & Fullstack",
  description:
    "Articles on React, Django, PostgreSQL, and fullstack development practices.",
  slug: "blog",
  keywords: ["blog", "articles", "web development", "tutorial"],
});

export default function Blog() {
  // ... existing component
}
```

---

## Step 2: Structured Data (Schema.json) (30 mins)

### Create `src/lib/schema.ts`

```typescript
export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Slavi Dimitrov",
    url: "https://slavidimitrov.dev",
    jobTitle: "Fullstack Developer",
    email: "slavidimitrov54@gmail.com",
    image: "https://slavidimitrov.dev/images/slavi-og.jpg",
    location: {
      "@type": "Place",
      name: "Aytos, Bulgaria",
    },
    sameAs: [
      "https://github.com/sldimitrov",
      "https://linkedin.com/in/slavi-dimitrov-311982292/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Waracle",
      url: "https://www.waracle.com",
    },
    skills: [
      "React",
      "Vue.js",
      "Django",
      "PostgreSQL",
      "TypeScript",
      "Next.js",
      "Full-stack development",
      "Backend engineering",
      "n8n",
    ],
    knowsLanguage: ["en", "bg"],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://slavidimitrov.dev${item.url}`,
    })),
  };
}

export function getBlogPostSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Slavi Dimitrov",
      url: "https://slavidimitrov.dev",
    },
    url: `https://slavidimitrov.dev/blog/${post.slug}`,
  };
}
```

### Update `app/layout.tsx` to Include Schema

```typescript
import { getPersonSchema } from "@/lib/schema";

export default function RootLayout({ children }: LayoutProps<"/">) {
  const schemaMarkup = getPersonSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
      </head>
      <body>
        {/* ... existing content ... */}
      </body>
    </html>
  );
}
```

---

## Step 3: Sitemap & Robots.txt (30 mins)

### Create `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://slavidimitrov.dev/sitemap.xml
```

### Create `app/sitemap.ts`

```typescript
import { MetadataRoute } from "next";
import { getSortedPosts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slavidimitrov.dev";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      changeFrequency: "bi-weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/skills`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/experience`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const blogPosts = getSortedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "never" as const,
    priority: 0.6,
    lastModified: new Date(post.date),
  }));

  return [...staticPages, ...blogPosts];
}
```

### Create `app/robots.ts`

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/private"],
    },
    sitemap: "https://slavidimitrov.dev/sitemap.xml",
  };
}
```

---

## Step 4: Google Analytics (15 mins)

### Install Analytics

```bash
npm install @vercel/analytics
```

### Update `app/layout.tsx`

```typescript
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {/* ... existing content ... */}
        <Analytics />
      </body>
    </html>
  );
}
```

### Optional: Add Google Analytics 4

```typescript
import Script from "next/script";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-YOUR_GA4_ID`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YOUR_GA4_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Step 5: Image Alt Text Audit (30 mins)

### Add Alt Text to All Images

```typescript
// ✅ Good
<Image
  src="/images/slavi-og.jpg"
  alt="Slavi Dimitrov, fullstack developer from Aytos"
  width={1200}
  height={630}
/>

// ❌ Bad
<Image src="/images/slavi-og.jpg" alt="image" width={1200} height={630} />
```

### Checklist
- [ ] Profile images: Include name + role
- [ ] Project screenshots: Describe what's in the image
- [ ] Logos: Name of the technology/platform
- [ ] Decorative images: Empty alt text (`alt=""`)

---

## Step 6: Canonical URLs (15 mins)

Already handled in metadata generation! But verify:

```typescript
// In your metadata helper
canonical: `https://slavidimitrov.dev${slug ? `/${slug}` : ""}`,
```

---

## Testing Checklist

After implementation:

- [ ] **Google Search Console**
  - Add property: https://search.google.com/search-console
  - Submit sitemap
  - Check for crawl errors

- [ ] **Schema Validation**
  - Test at: https://schema.org/validate
  - Copy your page source, validate schema

- [ ] **Meta Tags**
  - Inspect page source (Cmd/Ctrl + U)
  - Verify `<title>`, `<meta name="description">`, `<meta property="og:...">`

- [ ] **Mobile Friendliness**
  - Test at: https://search.google.com/test/mobile-friendly

- [ ] **Page Speed**
  - Test at: https://pagespeed.web.dev/
  - Target: 90+ score on mobile

- [ ] **Social Sharing**
  - Share blog links on Twitter/LinkedIn
  - Verify preview looks good

---

## Next Steps

Once Phase 1 is complete:

1. **Commit these changes:**
   ```bash
   git add .
   git commit -m "feat: add SEO foundations (metadata, schema, sitemap, analytics)"
   ```

2. **Deploy to production**
   - Push to `dev` branch
   - Create PR to `main`
   - Once merged, monitor analytics

3. **Move to Phase 2:**
   - Expand blog with 3-4 new posts
   - Create project case studies
   - Build Skills/Expertise page

4. **Monitor Performance:**
   - Check Google Search Console weekly
   - Monitor Core Web Vitals
   - Track rankings for target keywords

---

**Estimated Time: 2.5-3 hours for Phase 1 implementation**

Let me know if you need help with any of these steps! 🚀
