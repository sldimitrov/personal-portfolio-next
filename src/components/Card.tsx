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
      className={`group relative rounded-2xl border border-zinc-200 bg-white/50 p-6 animate-hover-scale shadow-sm transition-all hover:shadow-lg hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950/50 dark:hover:border-zinc-700 backdrop-blur-sm ${className}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />

      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
