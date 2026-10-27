import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import Card from "@/components/Card";
import NotFoundTerminal from "@/components/NotFoundTerminal";
import { COURSES } from "@/data/courses";
import { YOUTUBE_CHANNEL_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
};

const [course] = COURSES;

// Somewhere useful to go instead - leaning on the things people can learn from.
const DESTINATIONS = [
  {
    href: "/",
    kicker: "Start over",
    title: "Home page",
    description: "Who I am, what I've built, and what I'm working on.",
  },
  {
    href: course.playlistUrl,
    kicker: "Learn Python",
    title: course.title,
    description: "A free beginner course, from installing Python to your first programs.",
  },
  {
    href: YOUTUBE_CHANNEL_URL,
    kicker: "Watch",
    title: "YouTube channel",
    description: "Programming videos, lessons, and whatever I'm learning next.",
  },
  {
    href: "/blog",
    kicker: "Read",
    title: "The blog",
    description: "Notes on React, Django, and fullstack development.",
  },
];

const DIGITS = [
  { char: "4", tilt: "-6deg", delay: "0s" },
  { char: "0", tilt: "3deg", delay: "0.4s" },
  { char: "4", tilt: "7deg", delay: "0.8s" },
];

export default function NotFound() {
  return (
    <main className="tone-blue relative isolate flex flex-1 flex-col overflow-hidden">
      <Backdrop tone="blue" />
      {/* Brand glow: the logo's green and yellow, kept soft so text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand-green/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-0 -z-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-16 text-center sm:py-24">
        <div className="flex flex-col items-center gap-5">
          <p
            aria-hidden="true"
            className="flex select-none gap-2 text-[7rem] font-bold leading-none tracking-tighter sm:gap-4 sm:text-[11rem]"
          >
            {DIGITS.map(({ char, tilt, delay }, index) => (
              <span
                key={index}
                className="text-brand-gradient inline-block motion-safe:animate-[float_4s_ease-in-out_infinite]"
                style={
                  {
                    "--tilt": tilt,
                    animationDelay: delay,
                    transform: `rotate(${tilt})`,
                  } as CSSProperties
                }
              >
                {char}
              </span>
            ))}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
            <span className="sr-only">404 - </span>
            Well, this is awkward.
          </h1>
          <p className="max-w-xl text-lg text-body">
            This page doesn&apos;t exist - or it did, and I refactored it out of
            existence. Either way, no need to leave empty-handed.
          </p>
        </div>

        <NotFoundTerminal />

        <nav aria-labelledby="not-found-destinations" className="w-full">
          <h2
            id="not-found-destinations"
            className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Learn something instead
          </h2>
          <ul className="grid gap-4 text-left sm:grid-cols-2">
            {DESTINATIONS.map(({ href, kicker, title, description }) => {
              const isExternal = href.startsWith("http");
              const content = (
                <Card className="flex h-full w-full flex-col gap-1.5 group-hover:-translate-y-1 group-hover:border-accent motion-reduce:group-hover:translate-y-0">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted">
                    {kicker}
                  </span>
                  <span className="flex items-center justify-between gap-3 font-semibold text-fg transition-colors group-hover:text-accent">
                    {title}
                    <span aria-hidden="true">{isExternal ? "↗" : "→"}</span>
                  </span>
                  <span className="text-sm text-body">{description}</span>
                </Card>
              );

              return (
                <li key={href} className="flex">
                  {isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link href={href} className="group flex w-full">
                      {content}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </main>
  );
}
