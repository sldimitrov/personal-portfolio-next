"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
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
                className={`text-sm transition-colors ${
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

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-zinc-200 bg-white px-6 py-4 md:hidden dark:border-zinc-800 dark:bg-black">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`rounded-md px-2 py-2 text-sm transition-colors ${
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
      )}
    </header>
  );
}
