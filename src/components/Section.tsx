import type { ReactNode } from "react";
import Backdrop, { type Tone } from "@/components/Backdrop";

export default function Section({
  id,
  eyebrow,
  title,
  tone = "light",
  flip = false,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  tone?: Tone;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative isolate scroll-mt-16 overflow-hidden py-20 text-body sm:py-28 ${
        tone === "blue" ? "tone-blue" : ""
      }`}
    >
      <Backdrop tone={tone} flip={flip} />
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col gap-4">
          {eyebrow && (
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h2
            id={`${id}-title`}
            className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
          <div
            aria-hidden="true"
            className="h-1 w-14 rounded-full bg-gradient-to-r from-navy-500 to-aqua-300"
          />
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
