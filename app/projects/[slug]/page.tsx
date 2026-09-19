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

const STACK_VARIANTS = ["default", "accent"] as const;

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
    <h2 className="text-xl font-semibold tracking-tight text-fg">
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
            className="btn btn-ghost w-fit !px-0"
          >
            <span>←</span>
            <span>Back to projects</span>
          </Link>

          <p className="text-lg text-body">
            {project.description}
          </p>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Role</dt>
              <dd className="font-medium text-fg">
                {caseStudy.role}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">
                Timeline
              </dt>
              <dd className="font-medium text-fg">
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
                className="btn btn-primary"
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
                className="btn btn-outline"
              >
                <span>Source code</span>
                <span>→</span>
              </a>
            )}
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>The problem</CaseStudyHeading>
          <p className="text-body">
            {caseStudy.problem}
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>The solution</CaseStudyHeading>
          {caseStudy.solution.map((paragraph) => (
            <p key={paragraph} className="text-body">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <CaseStudyHeading>Tech stack</CaseStudyHeading>
          <div className="flex flex-col gap-5">
            {caseStudy.techStack.map((group, index) => (
              <div key={group.category} className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
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
          <ul className="flex flex-col gap-3 text-body">
            {caseStudy.impact.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-aqua-400">
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
                <h3 className="font-semibold text-fg">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted">
                  {highlight.description}
                </p>
              </div>
              <pre
                tabIndex={0}
                className="overflow-x-auto rounded-lg bg-navy-950 p-4 text-sm leading-relaxed text-navy-100"
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
          <ul className="flex flex-col gap-3 text-body">
            {caseStudy.learnings.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-navy-600">
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
