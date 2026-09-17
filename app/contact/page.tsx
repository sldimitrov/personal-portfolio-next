import PageSection from "@/components/PageSection";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const CONTACT_LINKS = [
  {
    label: "Email",
    href: "mailto:slavidimitrov54@gmail.com",
    Icon: MailIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/slavi-dimitrov-311982292/",
    Icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/sldimitrov",
    Icon: GithubIcon,
  },
];

export default function Contact() {
  return (
    <PageSection eyebrow="Get in touch" title="Let's connect.">
      <p className="max-w-lg text-zinc-700 dark:text-zinc-300">
        The fastest way to reach me is email or LinkedIn — I check both
        regularly.
      </p>
      <div className="flex flex-wrap gap-8">
        {CONTACT_LINKS.map(({ label, href, Icon }) => {
          const isExternal = href.startsWith("http");
          return (
            <a
              key={label}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-3"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 text-black transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white dark:border-zinc-800 dark:text-white dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-black">
                <Icon width={24} height={24} />
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </PageSection>
  );
}
