import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageSection from "@/components/PageSection";
import Badge from "@/components/Badge";
import Card from "@/components/Card";
import { PROJECTS, getProjectById } from "@/data/projects";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { getBreadcrumbSchema } from "@/lib/schema";

type Params = Promise<{ slug: string }>;

const STACK_VARIANTS = ["blue", "purple", "green", "orange", "default"] as const;

export function generateStaticParams() {
  return PROJECTS.filter((project) => project.caseStudy).map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project?.caseStudy) {
    return { title: "Project not found" };
  }

  return buildMetadata({
    title: `${project.name} Case Study`,
    description: project.description,
    slug: `projects/${project.id}`,
    keywords: ["case study", project.name, ...project.tags],
  });
}

function CaseStudyHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-semibold tracking-tight text-black dark:text-white">
      {children}
    </h2>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/#projects" },
    { name: project.name, url: `/projects/${project.id}` },
  ]);

  return (
    <PageSection eyebrow="Case study" title={project.name}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c"),
        }}
      />

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <Link
            href="/#projects"
            className="inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 font-medium text-zinc-600 transition-all hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-white"
          >
            <span>←</span>
            <span>Back to projects</span>
          </Link>

          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            {project.description}
          </p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">Role</dt>
              <dd className="font-medium text-black dark:text-white">
                {caseStudy.role}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                Timeline
              </dt>
              <dd className="font-medium text-black dark:text-white">
                {caseStudy.timeline}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-black"
              >
                <span>Live demo</span>
                <span>↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-medium text-black transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
              >
                <span>Source code</span>
                <span>→</span>
              </a>
            )}
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>The problem</CaseStudyHeading>
          <p className="text-zinc-700 dark:text-zinc-300">
            {caseStudy.problem}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>The solution</CaseStudyHeading>
          {caseStudy.solution.map((paragraph) => (
            <p key={paragraph} className="text-zinc-700 dark:text-zinc-300">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>Tech stack</CaseStudyHeading>
          <div className="flex flex-col gap-5">
            {caseStudy.techStack.map((group, index) => (
              <div key={group.category} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      variant={STACK_VARIANTS[index % STACK_VARIANTS.length]}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>Impact</CaseStudyHeading>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            {caseStudy.impact.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-green-600 dark:text-green-400">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <CaseStudyHeading>Code highlights</CaseStudyHeading>
          {caseStudy.codeHighlights.map((highlight) => (
            <Card key={highlight.title} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold text-black dark:text-white">
                  {highlight.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {highlight.description}
                </p>
              </div>
              <pre
                tabIndex={0}
                className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm leading-relaxed text-zinc-100 dark:bg-zinc-900"
              >
                <code className={`language-${highlight.language} font-mono`}>
                  {highlight.code}
                </code>
              </pre>
            </Card>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>Key learnings</CaseStudyHeading>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            {caseStudy.learnings.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-blue-600 dark:text-blue-400">
                  →
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageSection>
  );
}
