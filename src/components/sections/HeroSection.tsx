import Link from "next/link";
import Image from "next/image";
import Backdrop from "@/components/Backdrop";
import ResumeLink from "@/components/ResumeLink";

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
    >
      <Backdrop tone="light" />
      <span
        aria-hidden="true"
        className="text-outline [--outline-color:var(--color-navy-100)] pointer-events-none absolute inset-x-0 bottom-2 -z-10 select-none text-center text-[24vw] font-black leading-none tracking-tighter sm:text-[15rem]"
      >
        SLAVI
      </span>

      <div className="relative mb-9">
        <div
          aria-hidden="true"
          className="absolute -inset-12 -z-10 rounded-full bg-aqua-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -inset-3 -z-10 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-aqua-200 via-navy-200 to-navy-300"
        />
        <Image
          src="/images/portrait.webp"
          alt="Slavi Dimitrov"
          width={700}
          height={740}
          sizes="(min-width: 640px) 320px, 240px"
          className="h-auto w-60 rounded-[2rem] object-cover shadow-2xl shadow-navy-600/25 ring-4 ring-white sm:w-80"
          priority
        />
      </div>

      <p className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy-700 backdrop-blur">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-aqua-400"
        />
        Fullstack Developer
      </p>
      <h1
        id="home-title"
        className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-fg sm:text-6xl"
      >
        Hi, I&apos;m{" "}
        <span className="bg-gradient-to-r from-navy-600 to-aqua-400 bg-clip-text text-transparent">
          Slavi Dimitrov
        </span>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-body">
        I build interfaces with React and Vue, and increasingly own the
        backend with Django and PostgreSQL - currently at Waracle.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/#projects" className="btn btn-primary">
          View my work
        </Link>
        <Link href="/#contact" className="btn btn-outline">
          Get in touch
        </Link>
        <ResumeLink className="btn btn-ghost" />
      </div>
    </section>
  );
}
