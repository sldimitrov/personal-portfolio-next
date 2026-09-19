"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

// Only the essentials live in the nav; every other section is reachable by scrolling.
const NAV_LINKS = [
  { href: "/#about", label: "About", sections: ["about", "experience", "skills"] },
  { href: "/#projects", label: "Projects", sections: ["projects"] },
  { href: "/blog", label: "Blog", sections: ["blog"] },
];

const CONTACT_LINK = { href: "/#contact", label: "Contact" };

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "skills",
  "projects",
  "blog",
  "contact",
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Hash links follow the scroll-spy on "/"; page links (Blog) also match their own route
  const isLinkActive = (link: (typeof NAV_LINKS)[number]) =>
    (pathname === "/" && link.sections.includes(activeSection)) ||
    (!link.href.includes("#") && pathname.startsWith(link.href));

  // Scroll-spy: highlight the section crossing a line ~40% down the viewport
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Lock/unlock scroll when menu opens/closes
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link
            href="/#home"
            className="flex items-center gap-3 text-base font-semibold tracking-tight text-fg"
            onClick={() => setIsOpen(false)}
          >
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-600 to-navy-400 text-xs font-bold text-white shadow-sm"
            >
              SD
            </span>
            Slavi Dimitrov
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors ${
                    isActive
                      ? "font-medium text-fg"
                      : "text-muted hover:text-fg"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-accent"
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href={CONTACT_LINK.href}
              className="btn btn-primary !px-5 !py-2"
            >
              {CONTACT_LINK.label}
            </Link>
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-9 w-9 shrink-0 items-center justify-center text-fg md:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {isOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M2.5 5h15M2.5 10h15M2.5 15h15" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside Header */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-40 bg-navy-950/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <nav className="fixed top-16 left-0 right-0 bottom-0 z-50 flex flex-col gap-1 overflow-y-auto border-b border-line bg-white px-6 py-4 md:hidden">
            {NAV_LINKS.map((link) => {
              const isActive = isLinkActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive
                      ? "bg-navy-50 font-medium text-fg"
                      : "text-muted hover:bg-navy-50 hover:text-fg"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={CONTACT_LINK.href}
              onClick={() => setIsOpen(false)}
              className="btn btn-primary mt-4"
            >
              {CONTACT_LINK.label}
            </Link>
          </nav>
        </>
      )}
    </>
  );
}
