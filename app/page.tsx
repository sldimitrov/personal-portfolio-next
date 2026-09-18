import Link from "next/link";
import StarField from "@/components/StarField";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Background gradient with grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-blue-50/20 to-zinc-50 dark:from-black dark:via-blue-950/10 dark:to-black" />

        {/* Shooting stars - dark mode only */}
        <StarField />

        {/* Animated gradient orbs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-300/20 blur-3xl dark:from-blue-900/20 dark:to-purple-900/20" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-300/20 to-blue-300/20 blur-3xl dark:from-emerald-900/20 dark:to-blue-900/20" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 dark:opacity-20" />
      </div>

      <div className="relative">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400 animate-fade-in">
          Fullstack Developer
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-black sm:text-5xl dark:text-white animate-fade-in-up">
          Hi, I&apos;m Slavi Dimitrov
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400 animate-fade-in-up">
          I build interfaces with React and Vue, and increasingly own the
          backend with Django and PostgreSQL - currently at Waracle.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
          <Link
            href="/projects"
            className="relative rounded-full bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition-all hover:bg-zinc-900 hover:scale-105 dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-zinc-100"
          >
            <span className="relative z-10">View my work</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity hover:opacity-100 blur-lg" />
          </Link>
          <Link
            href="/contact"
            className="relative rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-black transition-all hover:border-zinc-400 hover:scale-105 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:border-zinc-600 dark:hover:bg-zinc-900/50"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </div>
  );
}
