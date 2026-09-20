/**
 * Canonical origin for the site.
 *
 * Production serves `www` and 308-redirects the apex domain to it, so every
 * canonical URL, sitemap entry and structured-data `@id` must use `www` - a
 * canonical that points at a redirect is a wasted signal. If the hosting setup
 * is ever flipped so the apex is primary, change this one line.
 */
export const SITE_URL = "https://www.slavidimitrov.com";

export const SITE_NAME = "Slavi Dimitrov - Fullstack Developer";

export const AUTHOR = {
  name: "Slavi Dimitrov",
  jobTitle: "Fullstack Developer",
  location: "Aytos, Bulgaria",
  email: "slavidimitrov54@gmail.com",
} as const;

/** Joins a path onto the canonical origin without doubling or dropping slashes. */
export function absoluteUrl(path = "") {
  if (!path) return SITE_URL;
  return `${SITE_URL}/${path.replace(/^\//, "")}`;
}
