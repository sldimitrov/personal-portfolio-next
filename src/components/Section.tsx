import type { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-16 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-4 animate-fade-in-down">
          {eyebrow && (
            <span className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {eyebrow}
            </span>
          )}
          <h2
            id={`${id}-title`}
            className="text-3xl font-semibold tracking-tight text-black dark:text-white"
          >
            {title}
          </h2>
          <div className="gradient-divider w-12" />
        </div>
        <div className="animate-fade-in-up">{children}</div>
      </div>
    </section>
  );
}
