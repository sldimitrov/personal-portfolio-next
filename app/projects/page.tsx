import PageSection from "@/components/PageSection";
import Card from "@/components/Card";

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
          className="text-sm font-medium text-black underline underline-offset-4 dark:text-white"
        >
          github.com/sldimitrov →
        </a>
      </Card>
    </PageSection>
  );
}
