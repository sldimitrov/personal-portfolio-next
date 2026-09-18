import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "blue" | "purple" | "green" | "orange" | "red";
}

const variantClasses = {
  default: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
  blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/30 dark:bg-blue-950/30 dark:text-blue-300",
  purple: "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900/30 dark:bg-purple-950/30 dark:text-purple-300",
  green: "border-green-200 bg-green-50 text-green-700 dark:border-green-900/30 dark:bg-green-950/30 dark:text-green-300",
  orange: "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/30 dark:bg-orange-950/30 dark:text-orange-300",
  red: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/30 dark:bg-red-950/30 dark:text-red-300",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-transform hover:scale-105 ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
