import type { ReactNode } from "react";
import Backdrop from "@/components/Backdrop";

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
    <main className="flex flex-1 flex-col">
      <div className="tone-blue relative isolate overflow-hidden py-16 sm:py-20">
        <Backdrop tone="blue" />
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 sm:px-8">
          {eyebrow && (
            <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="relative isolate flex-1 overflow-hidden py-12 sm:py-16">
        <Backdrop tone="light" flip />
        <div className="mx-auto w-full max-w-3xl px-6 sm:px-8">{children}</div>
      </div>
    </main>
  );
}
