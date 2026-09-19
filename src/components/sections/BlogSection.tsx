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
    <Section id="blog" eyebrow="Writing" title="Latest from the blog">
      <div className="flex flex-col gap-8">
        {posts.length > 0 ? (
          <div className="flex flex-col gap-4 animate-stagger">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <Card className="flex flex-col gap-2 transition-all hover:border-blue-400 dark:hover:border-blue-500">
                  {post.date && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                  <p className="font-medium text-black transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {post.title}
                  </p>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-zinc-700 dark:text-zinc-300">
                      {post.excerpt}
                    </p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 dark:text-zinc-400">
            Posts are on their way - check the blog for the latest.
          </p>
        )}

        <Link
          href="/blog"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-medium text-black transition-colors hover:bg-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
        >
          <span>View all posts</span>
          <span>→</span>
        </Link>
      </div>
    </Section>
  );
}
