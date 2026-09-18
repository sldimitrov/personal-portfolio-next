import Section from "@/components/Section";
import Badge from "@/components/Badge";

const SKILL_GROUPS = [
  { label: "Backend", skills: ["Python", "Django", "PostgreSQL"], color: "blue" as const },
  { label: "Frontend", skills: ["React", "Vue", "TypeScript", "Tailwind CSS"], color: "purple" as const },
  { label: "Automation & Tools", skills: ["n8n", "Git"], color: "green" as const },
  { label: "Exploring", skills: ["Artificial Intelligence"], color: "orange" as const },
];

export default function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Toolbox" title="My Skills">
      <div className="flex flex-col gap-8 animate-stagger">
        {SKILL_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant={group.color}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
