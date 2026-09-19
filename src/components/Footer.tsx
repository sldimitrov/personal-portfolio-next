import Link from "next/link";
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

const FOOTER_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="tone-blue relative isolate overflow-hidden bg-footer-gradient text-navy-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-navy-600/20 blur-3xl"
      />
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex max-w-sm flex-col gap-3">
            <p className="text-lg font-semibold tracking-tight text-white">
              Slavi Dimitrov
            </p>
            <p className="text-sm leading-relaxed text-navy-300">
              Fullstack developer building interfaces in React and Vue, and
              owning the backend with Django and PostgreSQL.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm"
          >
            {FOOTER_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-navy-300 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-navy-300 sm:flex-row">
          <p>© {new Date().getFullYear()} Slavi Dimitrov. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="text-navy-300 transition-colors hover:text-aqua-300"
              >
                <Icon width={20} height={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
