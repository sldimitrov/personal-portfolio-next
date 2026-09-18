import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col items-center justify-center bg-zinc-50 px-6 py-24 text-center dark:bg-black"
    >
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 animate-fade-in">
        Fullstack Developer
      </p>
      <h1
        id="home-title"
        className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white animate-fade-in-up"
      >
        Hi, I&apos;m Slavi Dimitrov
      </h1>
      <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in-up">
        I build interfaces with React and Vue, and increasingly own the
        backend with Django and PostgreSQL - currently at Waracle.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
        <Link
          href="/#projects"
          className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:scale-105 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          View my work
        </Link>
        <Link
          href="/#contact"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-black transition-all hover:border-zinc-400 hover:scale-105 dark:border-zinc-700 dark:text-white dark:hover:border-zinc-500"
        >
          Get in touch
        </Link>
      </div>
    </section>
  );
}
