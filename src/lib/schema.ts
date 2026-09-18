export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Slavi Dimitrov",
    url: "https://slavidimitrov.dev",
    jobTitle: "Fullstack Developer",
    email: "slavidimitrov54@gmail.com",
    image: "https://slavidimitrov.dev/images/IMG_8449.PNG",
    location: {
      "@type": "Place",
      name: "Sofia, Bulgaria",
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
    knowsLanguage: ["en", "bg"],
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
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://slavidimitrov.dev/blog/${post.slug}`,
    },
  };
}
