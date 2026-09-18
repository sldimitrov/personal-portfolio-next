import PageSection from "@/components/PageSection";
import Photo from '@/components/Photo'

export default function About() {
  return (
    <PageSection eyebrow="About" title="About Me">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full overflow-hidden">
          <Photo src="/images/IMG_8449.PNG" alt="Slavi Dimitrov" />
          </div>
        <div>
          <p className="text-lg font-medium text-black dark:text-white">
            Slavi Dimitrov
          </p>
          <p className="text-zinc-500 dark:text-zinc-400">
            Fullstack Developer · Sofia, Bulgaria
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-zinc-700 dark:text-zinc-300 animate-fade-in">
        <p>
          I&apos;m a fullstack developer with a strong frontend foundation and
          growing backend expertise in Django. I like environments where the
          problem shapes the stack - where solving something well means being
          willing to learn a new tool mid-project rather than forcing an old
          one to fit.
        </p>
        <p>
          I&apos;ve worked across the stack on everything from startup MVPs to
          production platforms: building interfaces in React and Vue,
          automating workflows with n8n, and increasingly owning the backend
          with Django and PostgreSQL. I care about writing code that&apos;s
          actually maintainable, not just working - and about teams that
          value initiative and clear communication over rigid process.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-black dark:text-white">
          Right now
        </h2>
        <ul className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-300 animate-stagger">
          <li>
            🌱 Advancing in Django with PostgreSQL, deeper into the Python
            ecosystem.
          </li>
          <li>
            👀 Exploring Artificial Intelligence alongside web and systems
            work.
          </li>
          <li>⚡ Fun fact - I love sports just as much as programming.</li>
        </ul>
      </div>
    </PageSection>
  );
}
