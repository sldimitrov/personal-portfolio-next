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
    title: `${post.title} - Slavi Dimitrov`,
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
        className="btn btn-ghost mb-6 w-fit !px-0"
      >
        <span>←</span>
        <span>Back to blog</span>
      </Link>
      {post.date && (
        <p className="text-sm text-muted">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}
      <div className="prose prose-invert max-w-none text-body">
        <p>{post.content}</p>
      </div>
    </PageSection>
  );
}
