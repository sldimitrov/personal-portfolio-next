import PageSection from "@/components/PageSection";
import Badge from "@/components/Badge";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Skills - Slavi Dimitrov",
  description: "My technical skills in frontend, backend, and automation technologies.",
  slug: "skills",
  keywords: ["skills", "technologies", "tech stack", "tools"],
});

const SKILL_GROUPS = [
  { label: "Backend", skills: ["Python", "Django", "PostgreSQL"], color: "blue" as const },
  { label: "Frontend", skills: ["React", "Vue", "TypeScript", "Tailwind CSS"], color: "purple" as const },
  { label: "Automation & Tools", skills: ["n8n", "Git"], color: "green" as const },
  { label: "Exploring", skills: ["Artificial Intelligence"], color: "orange" as const },
];

export default function Skills() {
  return (
    <PageSection eyebrow="Toolbox" title="My Skills">
      <div className="flex flex-col gap-8 animate-stagger">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {group.label}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant={group.color}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
