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
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-8">
          <p className="max-w-md text-lg text-body">
            The fastest way to reach me is email or LinkedIn — I check both
            regularly.
          </p>
          <div className="flex flex-wrap gap-6">
            {CONTACT_LINKS.map(({ label, href, Icon, download }) => {
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-3"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-white/70 text-fg shadow-sm backdrop-blur transition-all group-hover:-translate-y-1 group-hover:border-navy-600 group-hover:bg-navy-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-navy-600/30">
                    <Icon width={24} height={24} />
                  </span>
                  <span className="text-sm font-medium text-muted">
                    {label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
          <h3 className="mb-5 text-lg font-semibold text-fg">
            Or send me a message
          </h3>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
