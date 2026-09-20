import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Assistant and answer-engine crawlers, named explicitly so the intent to be
 * cited is unambiguous rather than merely implied by the wildcard group.
 */
const AI_CRAWLERS = [
  // OpenAI: training, search index, and on-demand browsing respectively.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity.
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini and Apple Intelligence. These are separate from Googlebot
  // and Applebot, which stay covered by the wildcard group.
  "Google-Extended",
  "Applebot-Extended",
  // Meta AI, DuckDuckGo's assistant, and Common Crawl, which feeds many models.
  "meta-externalagent",
  "DuckAssistBot",
  "CCBot",
];

// robots.txt groups do not inherit: a crawler that matches its own named group
// ignores the wildcard group entirely, so every group repeats the exclusions.
const DISALLOW = ["/admin", "/private"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: absoluteUrl("sitemap.xml"),
    host: absoluteUrl(),
  };
}
