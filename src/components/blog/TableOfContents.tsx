"use client";

import { useEffect, useMemo, useState } from "react";
import type { Heading } from "@/lib/markdown";

/** Offset for the sticky header, so a heading counts as "reached" at the top. */
const ACTIVE_OFFSET = 112;

/** Tracks whichever heading the reader has most recently scrolled past. */
function useActiveHeading(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const ids = useMemo(() => headings.map((h) => h.id).join(","), [headings]);

  useEffect(() => {
    if (!ids) return;

    const elements = ids
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    function update() {
      const last = elements[elements.length - 1];
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      // The final section is often too short to clear the offset line, so the
      // bottom of the page always belongs to the last heading.
      if (atBottom) {
        setActiveId(last.id);
        return;
      }

      let current = elements[0].id;

      for (const element of elements) {
        if (element.getBoundingClientRect().top > ACTIVE_OFFSET) break;
        current = element.id;
      }

      setActiveId(current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids]);

  return activeId;
}

function HeadingLinks({
  headings,
  activeId,
  onNavigate,
}: {
  headings: Heading[];
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col gap-1 text-sm">
      {headings.map((heading) => {
        const isActive = heading.id === activeId;

        return (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={[
                "block border-l-2 py-1 transition-colors",
                heading.level === 3 ? "pl-6" : "pl-3",
                isActive
                  ? "border-navy-500 font-medium text-navy-700"
                  : "border-line text-muted hover:border-navy-300 hover:text-fg",
              ].join(" ")}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function TableOfContents({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "inline" | "sidebar";
}) {
  const activeId = useActiveHeading(headings);
  const [open, setOpen] = useState(false);

  if (headings.length < 2) return null;

  if (variant === "sidebar") {
    return (
      <nav aria-labelledby="toc-heading" className="sticky top-24">
        <p
          id="toc-heading"
          className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted uppercase"
        >
          On this page
        </p>
        <HeadingLinks headings={headings} activeId={activeId} />
      </nav>
    );
  }

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="mb-8 rounded-xl border border-line bg-navy-50/60 px-4 py-3 xl:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-fg">
        <span>On this page</span>
        <span
          aria-hidden="true"
          className={`text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </summary>
      <div className="mt-3">
        <HeadingLinks
          headings={headings}
          activeId={activeId}
          onNavigate={() => setOpen(false)}
        />
      </div>
    </details>
  );
}
