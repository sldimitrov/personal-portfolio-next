import fs from "node:fs";
import path from "node:path";
import { stripLeadingH1, toPlainText } from "@/lib/markdown";

/**
 * Blog posts are plain markdown files in `content/blog/`, so publishing is just
 * adding a file and deploying. Nothing in a file is required:
 *
 *   content/blog/2026-10-27-my-post.md  ->  /blog/my-post, dated 2026-10-27
 *
 * The title comes from the first `# Heading` and the excerpt from the first
 * paragraph. An optional `---` frontmatter block can override `title`, `date`,
 * `excerpt` and `slug`, or set `draft: true` to keep a post out of production.
 * Files starting with `_` are drafts too; see content/blog/README.md.
 */

interface Post {
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  date?: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const FILENAME = /^(?:(\d{4}-\d{2}-\d{2})-)?(.+)\.md$/;
const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/;
const EXCERPT_LENGTH = 160;

// Drafts stay visible in `next dev` so they can be previewed before publishing.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

/** Reads a flat `key: value` frontmatter block - all a post ever needs. */
function parseFrontmatter(source: string) {
  const match = source.match(FRONTMATTER);
  if (!match) return { data: {} as Record<string, string>, body: source };

  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^(["'])(.*)\1$/, "$2");
    if (key) data[key] = value;
  }

  return { data, body: source.slice(match[0].length) };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** The first prose paragraph as plain text - headings, code, lists and images are skipped. */
function excerptFrom(body: string) {
  const withoutCode = body.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1.*$/gm, "");
  const paragraph = withoutCode
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|[-*+>|!<]|\d+\.)/.test(block));

  if (!paragraph) return undefined;

  const text = toPlainText(paragraph).replace(/\s+/g, " ");
  if (text.length <= EXCERPT_LENGTH) return text;
  return `${text.slice(0, text.lastIndexOf(" ", EXCERPT_LENGTH))}…`;
}

function readPost(filename: string): { post: Post; draft: boolean } | null {
  const match = filename.match(FILENAME);
  if (!match) return null;

  const source = fs
    .readFileSync(path.join(POSTS_DIR, filename), "utf8")
    .replace(/\r\n/g, "\n");
  const { data, body } = parseFrontmatter(source);
  const content = body.trim();

  const slug = data.slug || match[2].replace(/^_/, "");
  const heading = content.match(/^#\s+(.+)$/m);

  return {
    post: {
      slug,
      title: data.title || (heading ? toPlainText(heading[1]) : titleFromSlug(slug)),
      date: data.date || match[1],
      excerpt: data.excerpt || excerptFrom(stripLeadingH1(content)),
      content,
    },
    draft: data.draft === "true" || filename.startsWith("_"),
  };
}

function fetchPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts: Post[] = [];
  const seen = new Map<string, string>();

  for (const filename of fs.readdirSync(POSTS_DIR)) {
    if (filename.toLowerCase() === "readme.md") continue;

    const entry = readPost(filename);
    if (!entry || (entry.draft && !SHOW_DRAFTS)) continue;
    const { post } = entry;

    // Two files claiming one URL would silently shadow each other - fail the build instead.
    const existing = seen.get(post.slug);
    if (existing) {
      throw new Error(
        `Blog posts "${existing}" and "${filename}" both use the slug "${post.slug}".`
      );
    }
    seen.set(post.slug, filename);

    posts.push(post);
  }

  return posts;
}

async function getPostBySlug(slug: string): Promise<Post | null> {
  return fetchPosts().find((post) => post.slug === slug) ?? null;
}

async function getSortedPosts(): Promise<Post[]> {
  return fetchPosts().sort(
    (a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  );
}

export { getPostBySlug, getSortedPosts, type Post };
