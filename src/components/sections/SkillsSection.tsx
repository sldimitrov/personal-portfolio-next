import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";

const SKILL_GROUPS = [
  { label: "Languages", skills: ["JavaScript", "TypeScript", "Python"], accent: true },
  { label: "Frontend", skills: ["React", "Vue", "HTML", "CSS", "Sass", "Tailwind CSS", "MUI"] },
  { label: "State & Data", skills: ["Zustand", "TanStack Query", "React Router"] },
  { label: "Backend", skills: ["Django", "Django REST Framework", "Node.js", "Express", "Celery"], accent: true },
  { label: "Databases", skills: ["PostgreSQL", "Supabase", "Redis"], accent: true },
  { label: "Automation & Integration", skills: ["n8n", "Klaviyo"] },
  { label: "Infrastructure & Tooling", skills: ["Docker", "Git", "Vite", "Netlify", "Vercel"] },
  { label: "Exploring", skills: ["Artificial Intelligence"], accent: true },
];

export default function SkillsSection() {
  return (
    <Section id="skills" eyebrow="Toolbox" title="My Skills" tone="blue">
      <div className="grid gap-5 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <Card key={group.label} className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <Badge key={skill} variant={group.accent ? "accent" : "default"}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
