import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import { PROJECTS } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Work" title="My Projects">
      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <Card key={project.id} className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-semibold text-black dark:text-white">
                {project.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                {project.description}
              </p>
            </div>

            <p className="text-zinc-700 dark:text-zinc-300">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.caseStudy && (
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <span>Read case study</span>
                  <span>→</span>
                </Link>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-black dark:bg-white dark:text-black hover:opacity-80 transition-opacity"
                >
                  <span>View Live</span>
                  <span>↗</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-black dark:text-white border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>GitHub</span>
                  <span>→</span>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 flex flex-col items-start gap-3 bg-zinc-50 dark:bg-zinc-900/50">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Want to see more? Check out all my work on GitHub.
        </p>
        <a
          href="https://github.com/sldimitrov"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-black dark:text-white hover:bg-white dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-700"
        >
          <span>github.com/sldimitrov</span>
          <span>→</span>
        </a>
      </Card>
    </Section>
  );
}
