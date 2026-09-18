import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageSection from "@/components/PageSection";
import { getPostBySlug } from "@/lib/supabase";

type Params = Promise<{ slug: string }>;

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

  return {
    title: `${post.title} — Slavi Dimitrov`,
    description: post.excerpt || post.content.substring(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageSection eyebrow="Writing" title={post.title}>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:text-black dark:hover:text-white"
      >
        <span>←</span>
        <span>Back to blog</span>
      </Link>
      {post.date && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className="prose prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
        <p>{post.content}</p>
      </div>
    </PageSection>
  );
}
