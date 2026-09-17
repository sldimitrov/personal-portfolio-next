import PageSection from "@/components/PageSection";
import Badge from "@/components/Badge";

const SKILL_GROUPS = [
  { label: "Backend", skills: ["Python", "Django", "PostgreSQL"] },
  { label: "Frontend", skills: ["React", "Vue", "TypeScript", "Tailwind CSS"] },
  { label: "Automation & Tools", skills: ["n8n", "Git"] },
  { label: "Exploring", skills: ["Artificial Intelligence"] },
];

export default function Skills() {
  return (
    <PageSection eyebrow="Toolbox" title="My Skills">
      <div className="flex flex-col gap-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {group.label}
            </h2>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
