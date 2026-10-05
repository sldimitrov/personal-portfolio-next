import { AUTHOR, SITE_URL, absoluteUrl } from "@/lib/site";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Slavi Dimitrov",
    url: SITE_URL,
    jobTitle: "Fullstack Developer",
    email: "slavidimitrov54@gmail.com",
    image: absoluteUrl("images/IMG_8449.PNG"),
    description:
      "Fullstack developer with a frontend foundation in React and Vue and backend expertise in Django and PostgreSQL. Currently at Waracle.",
    homeLocation: {
      "@type": "Place",
      name: AUTHOR.location,
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
    knowsLanguage: ["en", "bg", "es"],
    knowsAbout: [
      "React",
      "Vue.js",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "TypeScript",
      "Next.js",
      "Node.js",
      "Express",
      "Celery",
      "Redis",
      "Supabase",
      "Docker",
      "Full-stack development",
      "Backend engineering",
      "n8n",
      "Klaviyo",
      "Python",
      "JavaScript",
      "REST APIs",
    ],
  };
}

export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
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
      url: SITE_URL,
    },
    url: absoluteUrl(`blog/${post.slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`blog/${post.slug}`),
    },
  };
}
