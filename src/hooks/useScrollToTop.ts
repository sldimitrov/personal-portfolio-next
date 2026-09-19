"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Smoothly scrolls to the top whenever the route changes. Hash navigations
// (e.g. /#about) are left to the browser so section links still land on
// their section.
export function useScrollToTop() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    if (window.location.hash) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [pathname]);
}
