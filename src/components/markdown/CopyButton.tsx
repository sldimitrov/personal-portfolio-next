"use client";

import { useEffect, useRef, useState } from "react";

const RESET_DELAY = 2000;

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => setCopied(false), RESET_DELAY);
    } catch {
      // Clipboard access can be denied - leave the label untouched rather than
      // claiming a copy that never happened.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-navy-100 hover:text-navy-700 focus-visible:bg-navy-100"
    >
      {copied ? (
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M13 4.5 6.5 11.5 3 8" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="5.75" y="5.75" width="8.5" height="8.5" rx="1.75" />
          <path
            d="M10.25 3.75A1.75 1.75 0 0 0 8.5 2h-4.75A1.75 1.75 0 0 0 2 3.75V8.5c0 .966.784 1.75 1.75 1.75"
            strokeLinecap="round"
          />
        </svg>
      )}
      <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
