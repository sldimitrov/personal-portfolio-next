import Section from "@/components/Section";
import Photo from "@/components/Photo";
import Card from "@/components/Card";
import {
  SeedlingIcon,
  ExploreIcon,
  LightningIcon,
} from "@/components/icons/RightNowIcons";

const RIGHT_NOW_ITEMS = [
  {
    icon: SeedlingIcon,
    text: "Advancing in Django with PostgreSQL, deeper into the Python ecosystem.",
  },
  {
    icon: ExploreIcon,
    text: "Exploring Artificial Intelligence alongside web and systems work.",
  },
  {
    icon: LightningIcon,
    text: "Fun fact - I love sports just as much as programming.",
  },
];

export default function AboutSection() {
  return (
    <Section id="about" eyebrow="About" title="About Me" tone="blue">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full">
              <Photo src="/images/portrait.webp" alt="Slavi Dimitrov" />
            </div>
            <div>
              <p className="text-lg font-medium text-fg">Slavi Dimitrov</p>
              <p className="text-muted">Fullstack Developer · Aytos, Bulgaria</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 text-body">
            <p>
              I&apos;m a fullstack developer with a strong frontend foundation
              and growing backend expertise in Django. I like environments
              where the problem shapes the stack - where solving something well
              means being willing to learn a new tool mid-project rather than
              forcing an old one to fit.
            </p>
            <p>
              I&apos;ve worked across the stack on everything from startup MVPs
              to production platforms: building interfaces in React and Vue,
              automating workflows with n8n, and increasingly owning the
              backend with Django and PostgreSQL. I care about writing code
              that&apos;s actually maintainable, not just working - and about
              teams that value initiative and clear communication over rigid
              process.
            </p>
          </div>
        </div>

        <Card className="flex h-fit flex-col gap-5">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Right now
          </h3>
          <ul className="flex flex-col gap-5 text-body">
            {RIGHT_NOW_ITEMS.map(({ icon: Icon, text }) => (
              <li key={text} className="group flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent transition-transform group-hover:scale-110 group-hover:-rotate-12" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
