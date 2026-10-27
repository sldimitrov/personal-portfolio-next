"use client";

import { usePathname } from "next/navigation";

// A fake Python traceback for the path that wasn't found - the 404 page's punchline.
export default function NotFoundTerminal() {
  const pathname = usePathname() || "/";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/15 bg-navy-950/70 text-left shadow-2xl shadow-black/30 backdrop-blur">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-brand-yellow" aria-hidden="true" />
        <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-navy-300">find_page.py</span>
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 font-mono text-[13px] leading-relaxed text-navy-100 sm:text-sm">
        <code>
          <span className="text-brand-green">$</span> python find_page.py{" "}
          <span className="break-all text-aqua-300">{pathname}</span>
          {"\n"}
          <span className="text-navy-300">Traceback (most recent call last):</span>
          {"\n"}
          {'  File "find_page.py", line '}
          <span className="text-brand-yellow">404</span>
          {", in <module>\n"}
          <span className="text-[#ff8a80]">PageNotFoundError</span>
          {": it was here a minute ago, I swear.\n\n"}
          <span className="text-navy-300"># Even Python couldn&apos;t find it.</span>
          {"\n"}
          <span className="text-brand-green">$</span>{" "}
          <span
            aria-hidden="true"
            className="inline-block h-4 w-2 translate-y-0.5 bg-navy-100 motion-safe:animate-[blink_1s_steps(1)_infinite]"
          />
        </code>
      </pre>
    </div>
  );
}
