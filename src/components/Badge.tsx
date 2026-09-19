import type { ReactNode } from "react";

export default function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "accent";
}) {
  return (
    <span className={variant === "accent" ? "chip chip-accent" : "chip"}>
      {children}
    </span>
  );
}
