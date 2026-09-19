export type Tone = "light" | "blue";

function Rings({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 640 640"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <circle cx="320" cy="320" r="120" />
      <circle cx="320" cy="320" r="200" />
      <circle cx="320" cy="320" r="280" />
      <circle cx="320" cy="320" r="315" strokeDasharray="4 8" />
    </svg>
  );
}

// Decorative background layer. The parent must be `relative isolate`.
export default function Backdrop({
  tone = "light",
  flip = false,
}: {
  tone?: Tone;
  flip?: boolean;
}) {
  if (tone === "blue") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-brand-gradient"
      >
        <div
          className={`absolute top-10 h-96 w-96 rounded-full bg-aqua-400/20 blur-3xl ${
            flip ? "-left-32" : "-right-32"
          }`}
        />
        <div
          className={`absolute -bottom-32 h-80 w-80 rounded-full bg-navy-400/25 blur-3xl ${
            flip ? "-right-24" : "-left-24"
          }`}
        />
        <div
          className={`bg-grid-pattern absolute inset-0 ${
            flip
              ? "[mask-image:radial-gradient(ellipse_70%_60%_at_0%_0%,black,transparent)]"
              : "[mask-image:radial-gradient(ellipse_70%_60%_at_100%_0%,black,transparent)]"
          }`}
        />
        <Rings
          className={`absolute top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 text-white/10 ${
            flip ? "-left-72" : "-right-72"
          }`}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className={`absolute -top-40 h-[34rem] w-[34rem] rounded-full bg-aqua-200/60 blur-3xl ${
          flip ? "-left-32" : "-right-32"
        }`}
      />
      <div
        className={`absolute -bottom-40 h-[30rem] w-[30rem] rounded-full bg-navy-200/50 blur-3xl ${
          flip ? "-right-32" : "-left-32"
        }`}
      />
      <div
        className={`bg-grid-pattern absolute inset-0 ${
          flip
            ? "[mask-image:radial-gradient(ellipse_70%_60%_at_0%_0%,black,transparent)]"
            : "[mask-image:radial-gradient(ellipse_70%_60%_at_100%_0%,black,transparent)]"
        }`}
      />
      <Rings
        className={`absolute top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 text-navy-300/40 ${
          flip ? "-left-72" : "-right-72"
        }`}
      />
    </div>
  );
}
