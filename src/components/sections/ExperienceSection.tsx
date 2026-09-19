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

function ColumnHeading({ children }: { children: string }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </h3>
  );
}

export default function ExperienceSection() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience" flip>
      <div className="flex flex-col gap-12">
        <div className="grid gap-12 md:grid-cols-2 md:gap-10">
          <div className="flex flex-col gap-5">
            <ColumnHeading>Work</ColumnHeading>
            {WORK.map((job) => (
              <Card key={job.company} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-fg">{job.role}</p>
                  <p className="text-sm font-medium text-accent">
                    {job.company} · {job.type}
                  </p>
                  <p className="text-sm text-muted">{job.period}</p>
                  <p className="text-sm text-muted">{job.location}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                  <Badge variant="accent">+{job.extraSkills} skills</Badge>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <ColumnHeading>Education</ColumnHeading>
            {EDUCATION.map((edu) => (
              <Card key={edu.school} className="flex flex-col gap-1">
                <p className="font-semibold text-fg">{edu.school}</p>
                <p className="text-sm font-medium text-accent">{edu.degree}</p>
                <p className="text-sm text-muted">{edu.period}</p>
                <p className="text-sm text-muted">{edu.detail}</p>
              </Card>
            ))}
          </div>
        </div>

        <ResumeLink className="btn btn-outline w-fit">
          Download full CV (PDF)
        </ResumeLink>
      </div>
    </Section>
  );
}
