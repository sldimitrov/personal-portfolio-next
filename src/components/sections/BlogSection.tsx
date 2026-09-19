import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { getSortedPosts, type Post } from "@/lib/supabase";

const LATEST_POSTS_COUNT = 3;

// A failing posts API must not take the whole home page down with it.
async function getLatestPosts(): Promise<Post[]> {
  try {
    const posts = await getSortedPosts();
    return posts.slice(0, LATEST_POSTS_COUNT);
  } catch {
    return [];
  }
}

export default async function BlogSection() {
  const posts = await getLatestPosts();

  return (
    <Section id="blog" eyebrow="Writing" title="Latest from the blog" tone="blue">
      <div className="flex flex-col gap-10">
        {posts.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex"
              >
                <Card className="flex w-full flex-col gap-3 group-hover:-translate-y-1 group-hover:border-accent">
                  {post.date && (
                    <p className="text-xs font-medium uppercase tracking-wider text-muted">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <p className="font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
                    {post.title}
                  </p>
                  {post.excerpt && (
                    <p className="line-clamp-3 text-sm text-body">
                      {post.excerpt}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-body">
            Posts are on their way - check the blog for the latest.
          </p>
        )}

        <Link href="/blog" className="btn btn-outline w-fit">
          <span>View all posts</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Section>
  );
}
