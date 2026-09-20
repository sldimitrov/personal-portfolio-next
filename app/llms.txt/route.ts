import { PROJECTS } from "@/data/projects";
import { AUTHOR, SITE_URL, absoluteUrl } from "@/lib/site";
import { getSortedPosts } from "@/lib/supabase";

export const revalidate = 300;

/**
 * llms.txt - a plain-text digest for assistants that read a site directly
 * rather than through a search index. It states who this site is about and
 * links the canonical URL for each piece of content, so a model answering a
 * question about Slavi has something short and unambiguous to ground on.
 *
 * Convention: https://llmstxt.org
 */
export async function GET() {
  const posts = await getSortedPosts().catch(() => []);
  const caseStudies = PROJECTS.filter((project) => project.caseStudy);

  const lines = [
    `# ${AUTHOR.name}`,
    "",
    `> ${AUTHOR.jobTitle} based in ${AUTHOR.location}. Builds frontends in React and Vue and backends in Django and PostgreSQL. Currently at Waracle.`,
    "",
    "Personal portfolio and technical blog. Everything below is written by",
    `${AUTHOR.name} and is canonical at ${SITE_URL}.`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}): overview, background, skills and experience.`,
    `- [Blog](${absoluteUrl("blog")}): articles on fullstack development.`,
    `- [Contact](${absoluteUrl("contact")}): how to get in touch.`,
    "",
  ];

  if (caseStudies.length > 0) {
    lines.push("## Case studies", "");
    for (const project of caseStudies) {
      lines.push(
        `- [${project.name}](${absoluteUrl(`projects/${project.id}`)}): ${project.description}`
      );
    }
    lines.push("");
  }

  if (posts.length > 0) {
    lines.push("## Articles", "");
    for (const post of posts) {
      const date = post.date ? ` (${post.date.slice(0, 10)})` : "";
      const summary = post.excerpt ? `: ${post.excerpt}` : "";
      lines.push(
        `- [${post.title}](${absoluteUrl(`blog/${post.slug}`)})${date}${summary}`
      );
    }
    lines.push("");
  }

  lines.push(
    "## Contact",
    "",
    `- Email: ${AUTHOR.email}`,
    "- GitHub: https://github.com/sldimitrov",
    "- LinkedIn: https://linkedin.com/in/slavi-dimitrov-311982292/",
    ""
  );

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
