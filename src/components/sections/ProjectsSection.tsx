import Link from "next/link";
import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import { PROJECTS } from "@/data/projects";

export default function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="Work" title="My Projects" flip>
      <div className="flex flex-col gap-6">
        {PROJECTS.map((project) => (
          <Card key={project.id} className="flex flex-col gap-5 sm:p-8">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-fg">
                {project.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">
                {project.description}
              </p>
            </div>

            <p className="max-w-2xl text-body">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {project.caseStudy && (
                <Link
                  href={`/projects/${project.id}`}
                  className="btn btn-primary"
                >
                  <span>Read case study</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <span>View live</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <span>GitHub</span>
                  <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        Want to see more?{" "}
        <a
          href="https://github.com/sldimitrov"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Check out all my work on GitHub →
        </a>
      </p>
    </Section>
  );
}
