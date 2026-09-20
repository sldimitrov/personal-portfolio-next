import { MetadataRoute } from "next";
import { getSortedPosts } from "@/lib/supabase";
import { PROJECTS } from "@/data/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // A failing posts API should degrade to a sitemap without posts rather than
  // break the whole route.
  const posts = await getSortedPosts().catch(() => []);

  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    lastModified: post.date ? new Date(post.date) : new Date(),
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
