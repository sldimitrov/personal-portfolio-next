import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 animate-hover-scale shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 ${className}`}
    >
      {children}
    </div>
  );
}
