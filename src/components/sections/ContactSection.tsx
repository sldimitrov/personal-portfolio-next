import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";
import {
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/icons";
import { RESUME_FILENAME, RESUME_HREF } from "@/components/ResumeLink";

const CONTACT_LINKS: {
  label: string;
  href: string;
  Icon: typeof MailIcon;
  download?: string;
}[] = [
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
  {
    label: "Resume",
    href: RESUME_HREF,
    Icon: DownloadIcon,
    download: RESUME_FILENAME,
  },
];

export default function ContactSection() {
  return (
    <Section id="contact" eyebrow="Get in touch" title="Let's connect.">
      <div className="space-y-12">
        {/* Quick Contact Options */}
        <div className="space-y-4">
          <p className="text-zinc-700 dark:text-zinc-300 animate-fade-in">
            The fastest way to reach me is email or LinkedIn — I check both
            regularly.
          </p>
          <div className="flex flex-wrap gap-8 animate-stagger">
            {CONTACT_LINKS.map(({ label, href, Icon, download }) => {
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-3 animate-hover-scale"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-zinc-200 text-black transition-all group-hover:border-black group-hover:bg-black group-hover:text-white dark:border-zinc-800 dark:text-white dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-black">
                    <Icon width={24} height={24} />
                  </span>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    {label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Or send me a message
          </h2>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
