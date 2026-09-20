import { bundledLanguages, codeToHtml } from "shiki";

/** The site is light-only, so a single light theme is all we load. */
const THEME = "github-light";

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  diff: "Diff",
  docker: "Dockerfile",
  html: "HTML",
  js: "JavaScript",
  json: "JSON",
  jsx: "JSX",
  md: "Markdown",
  py: "Python",
  python: "Python",
  sh: "Shell",
  shell: "Shell",
  sql: "SQL",
  ts: "TypeScript",
  tsx: "TSX",
  yaml: "YAML",
  yml: "YAML",
};

function isBundledLanguage(lang: string): boolean {
  return lang in bundledLanguages;
}

/** Human-readable badge for the code block header. */
export function languageLabel(lang: string | null): string | null {
  if (!lang) return null;
  return LANGUAGE_LABELS[lang] ?? lang.toUpperCase();
}

/**
 * Highlights a snippet to HTML on the server, so no highlighting JavaScript
 * ships to the browser. Unknown languages fall back to unstyled plain text
 * rather than throwing and taking the page down.
 */
export async function highlight(code: string, lang: string | null) {
  const resolved = lang && isBundledLanguage(lang) ? lang : "text";

  return codeToHtml(code, {
    lang: resolved,
    theme: THEME,
    transformers: [
      {
        pre(node) {
          // Shiki paints its own background; the surrounding card owns that, so
          // strip it and keep only the theme's base text colour.
          const style = String(node.properties.style ?? "");
          node.properties.style = style
            .replace(/background-color:[^;]*;?/g, "")
            .trim();
          node.properties.class = "overflow-x-auto p-4 text-sm leading-relaxed";
        },
      },
    ],
  });
}
