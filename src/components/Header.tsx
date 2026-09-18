"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Lock/unlock scroll when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-6 z-50">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black dark:text-white"
          onClick={() => setIsOpen(false)}
        >
          Slavi Dimitrov
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors hover-underline ${
                  isActive
                    ? "font-medium text-black dark:text-white"
                    : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-9 w-9 shrink-0 items-center justify-center text-black md:hidden dark:text-white"
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{ pointerEvents: "auto" }}
          />

          {/* Menu */}
          <nav className="fixed top-16 left-0 right-0 bottom-0 z-50 flex flex-col gap-1 border-b border-zinc-200 bg-white overflow-y-auto md:hidden dark:border-zinc-800 dark:bg-black">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`px-6 py-3 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-black bg-zinc-50 dark:text-white dark:bg-zinc-900"
                      : "text-zinc-600 hover:text-black hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </header>
  );
}
