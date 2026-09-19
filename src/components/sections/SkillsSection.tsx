import Section from "@/components/Section";
import Badge from "@/components/Badge";

const SKILL_GROUPS = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python"], color: "default" as const },
  { label: "Frontend", skills: ["React", "Vue", "HTML", "CSS", "Sass", "Tailwind CSS", "MUI"], color: "purple" as const },
  { label: "State & Data", skills: ["Zustand", "TanStack Query", "React Router"], color: "purple" as const },
  { label: "Backend", skills: ["Django", "Django REST Framework", "Node.js", "Express", "Celery"], color: "blue" as const },
  { label: "Databases", skills: ["PostgreSQL", "Supabase", "Redis"], color: "blue" as const },
  { label: "Automation & Integration", skills: ["n8n", "Klaviyo"], color: "green" as const },
  { label: "Infrastructure & Tooling", skills: ["Docker", "Git", "Vite", "Netlify", "Vercel"], color: "orange" as const },
  { label: "Exploring", skills: ["Artificial Intelligence"], color: "default" as const },
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
