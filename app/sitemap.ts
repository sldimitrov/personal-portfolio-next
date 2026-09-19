import { MetadataRoute } from "next";
import { getSortedPosts } from "@/data/posts";
import { PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://slavidimitrov.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: new Date(),
    },
  ];

  const blogPosts = getSortedPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "never" as const,
    priority: 0.6,
    lastModified: new Date(post.date),
  }));

  const caseStudies = PROJECTS.filter((project) => project.caseStudy).map(
    (project) => ({
      url: `${baseUrl}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    })
  );

  return [...staticPages, ...caseStudies, ...blogPosts];
}
