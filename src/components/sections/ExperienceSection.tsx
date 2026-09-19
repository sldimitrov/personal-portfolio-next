import Section from "@/components/Section";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import ResumeLink from "@/components/ResumeLink";

const WORK = [
  {
    role: "Software Engineer",
    company: "Waracle",
    type: "Full-time",
    period: "Aug 2025 – Present · 1 yr 2 mos",
    location: "Aytos, Sofia City, Bulgaria · Hybrid",
    skills: ["React.js", "Django", "React Native"],
    extraSkills: 3,
  },
  {
    role: "Software Development Intern",
    company: "Е АЙ Концепт",
    type: "Full-time",
    period: "Sep 2024 – Jul 2025 · 11 mos",
    location: "Remote",
    skills: ["Front-End Development", "Problem Solving"],
    extraSkills: 3,
  },
];

const EDUCATION = [
  {
    school: 'University of Plovdiv "Paisii Hilendarski"',
    degree: "Bachelor of Engineering, Computer Software Engineering",
    period: "Jul 2026 – Jul 2030",
    detail: "Grade: I",
  },
  {
    school: "Software University (SoftUni)",
    degree: "Python Fullstack Developer, Computer Software Engineering",
    period: "Mar 2023 – May 2024",
    detail:
      "Grade: 6.00 · Python Basics, Python Fundamentals, Python Advanced, Upskilling program, Python OOP",
  },
];

export default function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Work
          </h3>
          <div className="flex flex-col gap-4 animate-stagger">
            {WORK.map((job) => (
              <Card key={job.company} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-black dark:text-white">
                    {job.role}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {job.company} · {job.type}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {job.period}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {job.location}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="purple">
                      {skill}
                    </Badge>
                  ))}
                  <Badge variant="purple">+{job.extraSkills} skills</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Education
          </h3>
          <div className="flex flex-col gap-4 animate-stagger">
            {EDUCATION.map((edu) => (
              <Card key={edu.school} className="flex flex-col gap-1">
                <p className="font-medium text-black dark:text-white">
                  {edu.school}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.degree}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.period}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {edu.detail}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <ResumeLink className="inline-flex w-fit items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 font-medium text-black transition-colors hover:bg-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900">
          Download full CV (PDF)
        </ResumeLink>
      </div>
    </Section>
  );
}
