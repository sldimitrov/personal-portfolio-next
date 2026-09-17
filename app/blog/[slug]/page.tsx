import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageSection from "@/components/PageSection";
import { POSTS, getPostBySlug } from "@/data/posts";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: `${post.title} — Slavi Dimitrov`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageSection eyebrow="Writing" title={post.title}>
      <Link
        href="/blog"
        className="text-sm font-medium text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        ← Back to blog
      </Link>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <div className="flex flex-col gap-4 text-zinc-700 dark:text-zinc-300">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </PageSection>
  );
}
