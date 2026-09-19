import PageSection from "@/components/PageSection";
import ContactForm from "@/components/ContactForm";
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
      <div className="space-y-12">
        {/* Quick Contact Options */}
        <div className="space-y-4">
          <p className="text-body animate-fade-in">
            The fastest way to reach me is email or LinkedIn — I check both
            regularly.
          </p>
          <div className="flex flex-wrap gap-8 animate-stagger">
            {CONTACT_LINKS.map(({ label, href, Icon }) => {
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex flex-col items-center gap-3 animate-hover-scale"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong text-fg transition-all group-hover:border-navy-600 group-hover:bg-navy-600 group-hover:text-white">
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

        {/* Contact Form */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-fg">
            Or send me a message
          </h2>
          <ContactForm />
        </div>
      </div>
    </PageSection>
  );
}
