import GithubSlugger from "github-slugger";

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

const CODE_FENCE = /^\s*(?:```|~~~)/;
const ATX_HEADING = /^(#{1,6})\s+(.*)$/;

/**
 * Splits content into lines while tracking whether each one sits inside a
 * fenced code block. A `# comment` in a Python sample is not a heading.
 */
function* linesOutsideCodeFences(content: string) {
  let inFence = false;

  for (const line of content.split("\n")) {
    if (CODE_FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) {
      yield line;
    }
  }
}

/** Strips the inline markdown (`code`, **bold**, [links](/x)) out of a heading. */
function toPlainText(markdown: string) {
  return markdown
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/#+\s*$/, "")
    .trim();
}

/**
 * Posts are authored with their own `# Title` line so they stay readable
 * outside the site, but the page already renders that title as its `<h1>`.
 * Drop the duplicate so each page keeps exactly one `<h1>`.
 */
export function stripLeadingH1(content: string) {
  const lines = content.split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim() !== "");

  if (firstContentIndex === -1) {
    return content;
  }

  const match = lines[firstContentIndex].match(ATX_HEADING);

  if (!match || match[1].length !== 1) {
    return content;
  }

  return lines.slice(firstContentIndex + 1).join("\n").trimStart();
}

/**
 * Collects the H2/H3 headings for the table of contents. Ids are generated with
 * the same slugger `rehype-slug` uses, so the anchors line up - including the
 * `-1` suffixes it adds to repeated headings.
 */
export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of linesOutsideCodeFences(content)) {
    const match = line.match(ATX_HEADING);

    if (!match) continue;

    const level = match[1].length;
    const text = toPlainText(match[2]);

    if (!text) continue;

    // Every heading feeds the slugger so the dedupe counter stays in sync with
    // rehype-slug, even for levels the table of contents skips.
    const id = slugger.slug(text);

    if (level === 2 || level === 3) {
      headings.push({ id, text, level });
    }
  }

  return headings;
}

const WORDS_PER_MINUTE = 220;

/** Rough reading time, rounded up, with code blocks counted as prose. */
export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
