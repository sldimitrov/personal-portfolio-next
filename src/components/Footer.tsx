import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";

const SOCIAL_LINKS = [
  { href: "https://github.com/sldimitrov", label: "GitHub", Icon: GithubIcon },
  {
    href: "https://www.linkedin.com/in/slavi-dimitrov-311982292/",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
  {
    href: "mailto:slavidimitrov54@gmail.com",
    label: "Email",
    Icon: MailIcon,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-zinc-500 sm:flex-row sm:justify-between dark:text-zinc-400">
        <p>© {new Date().getFullYear()} Slavi Dimitrov. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-zinc-500 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <Icon width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
