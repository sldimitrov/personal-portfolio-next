import type { ReactNode } from "react";

export default function PageSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex flex-1 justify-center overflow-hidden">
      {/* Background with gradient and decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50/50 to-white dark:from-black dark:via-black/80 dark:to-zinc-950" />

        {/* Decorative gradient circles */}
        <div className="absolute -top-40 -right-80 h-96 w-96 rounded-full bg-gradient-to-bl from-blue-300/30 to-transparent blur-3xl dark:from-blue-900/20" />
        <div className="absolute -bottom-20 -left-80 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-300/20 to-transparent blur-3xl dark:from-purple-900/10" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-30" />
      </div>

      <main className="relative flex w-full max-w-3xl flex-col gap-12 px-6 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-4 animate-fade-in-down">
          {eyebrow && (
            <span className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white">
            {title}
          </h1>
          <div className="gradient-divider w-12" />
        </div>
        <div className="animate-fade-in-up">
          {children}
        </div>
      </main>
    </div>
  );
}
