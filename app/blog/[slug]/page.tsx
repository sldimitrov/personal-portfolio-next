import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Backdrop from "@/components/Backdrop";
import TableOfContents from "@/components/blog/TableOfContents";
import MarkdownContent from "@/components/markdown/MarkdownContent";
import { extractHeadings, readingTime, stripLeadingH1 } from "@/lib/markdown";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getBlogPostSchema } from "@/lib/schema";
import { getPostBySlug, getSortedPosts } from "@/lib/supabase";

type Params = Promise<{ slug: string }>;

// Prerender each post and refresh it in the background, so edits in Supabase
// reach the site without a redeploy.
export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const posts = await getSortedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    // A failing posts API should not fail the build - these pages can still be
    // rendered on demand.
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    slug: `blog/${slug}`,
    type: "article",
    publishedDate: post.date,
  });
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const body = stripLeadingH1(post.content);
  const headings = extractHeadings(body);
  const minutes = readingTime(body);

  return (
    <main className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBlogPostSchema({
              title: post.title,
              excerpt: post.excerpt ?? "",
              date: post.date ?? "",
              slug: post.slug,
            })
          ),
        }}
      />

      <div className="tone-blue relative isolate overflow-hidden py-16 sm:py-20">
        <Backdrop tone="blue" />
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 sm:px-8">
          <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Writing
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-fg sm:text-5xl">
            {post.title}
          </h1>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            {post.date && (
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            )}
            {post.date && <span aria-hidden="true">·</span>}
            <span>{minutes} min read</span>
          </p>
        </div>
      </div>

      <div className="relative isolate flex-1 overflow-hidden py-12 sm:py-16">
        <Backdrop tone="light" flip />
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-8 xl:max-w-6xl">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-12">
            <div className="min-w-0 xl:max-w-3xl">
              <Link href="/blog" className="btn btn-ghost mb-6 w-fit !px-0">
                <span aria-hidden="true">←</span>
                <span>Back to blog</span>
              </Link>

              <TableOfContents headings={headings} variant="inline" />

              <article>
                <MarkdownContent content={body} />
              </article>
            </div>

            <aside className="hidden xl:block">
              <TableOfContents headings={headings} variant="sidebar" />
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
