import Link from "next/link";
import PageSection from "@/components/PageSection";
import Card from "@/components/Card";
import { getSortedPosts } from "@/lib/supabase";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Blog - Web Development & Fullstack",
  description: "Articles on React, Django, PostgreSQL, and fullstack development practices.",
  slug: "blog",
  keywords: ["blog", "articles", "web development", "tutorial", "tech"],
});

export default async function Blog() {
  const posts = await getSortedPosts();

  return (
    <PageSection eyebrow="Writing" title="Blog">
      <div className="flex flex-col gap-4 animate-stagger">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <Card className="flex flex-col gap-2 transition-all hover:border-navy-500">
              {post.date && (
                <p className="text-sm text-muted">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              <p className="font-medium text-fg group-hover:text-navy-600 transition-colors">
                {post.title}
              </p>
              <p className="text-body">
                {post.excerpt}
              </p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-navy-600 transition-all group-hover:translate-x-1">
                <span>Read more</span>
                <span>→</span>
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
