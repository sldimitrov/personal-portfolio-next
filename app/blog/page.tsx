import Link from "next/link";
import PageSection from "@/components/PageSection";
import Card from "@/components/Card";
import { getSortedPosts } from "@/data/posts";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Blog - Web Development & Fullstack",
  description: "Articles on React, Django, PostgreSQL, and fullstack development practices.",
  slug: "blog",
  keywords: ["blog", "articles", "web development", "tutorial", "tech"],
});

export default function Blog() {
  const posts = getSortedPosts();

  return (
    <PageSection eyebrow="Writing" title="Blog">
      <div className="flex flex-col gap-4 animate-stagger">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="flex flex-col gap-2 transition-all hover:border-blue-400 dark:hover:border-blue-500">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-medium text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium text-black dark:text-white inline-block group-hover:translate-x-1 transition-transform">
                Read more →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
