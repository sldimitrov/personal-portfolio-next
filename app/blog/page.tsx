import Link from "next/link";
import PageSection from "@/components/PageSection";
import Card from "@/components/Card";
import { getSortedPosts } from "@/data/posts";

export default function Blog() {
  const posts = getSortedPosts();

  return (
    <PageSection eyebrow="Writing" title="Blog">
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="flex flex-col gap-2 transition-colors hover:border-black dark:hover:border-white">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-medium text-black dark:text-white">
                {post.title}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300">
                {post.excerpt}
              </p>
              <span className="text-sm font-medium text-black dark:text-white">
                Read more →
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </PageSection>
  );
}
