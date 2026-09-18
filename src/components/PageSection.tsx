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
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-12 px-6 py-16 sm:px-8 sm:py-24">
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
