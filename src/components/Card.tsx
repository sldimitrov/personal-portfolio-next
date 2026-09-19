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
      className={`rounded-2xl border border-line bg-surface p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
