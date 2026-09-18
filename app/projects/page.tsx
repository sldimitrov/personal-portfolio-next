import PageSection from "@/components/PageSection";
import Card from "@/components/Card";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Projects - Slavi Dimitrov",
  description: "Explore the projects I've built across React, Vue, Django, and PostgreSQL.",
  slug: "projects",
  keywords: ["projects", "portfolio", "work", "case studies"],
});

export default function Projects() {
  return (
    <PageSection eyebrow="Work" title="My Projects">
      <Card className="flex flex-col items-start gap-3">
        <p className="text-zinc-700 dark:text-zinc-300">
          I&apos;m putting together write-ups for the projects I&apos;ve
          shipped. In the meantime, take a look at what I&apos;m building on
          GitHub.
        </p>
        <a
          href="https://github.com/sldimitrov"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-black dark:text-white hover-underline group"
        >
          <span className="group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">github.com/sldimitrov</span> <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      </Card>
    </PageSection>
  );
}
