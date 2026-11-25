// Browser-side limit on how often the contact form can send.
// It stops repeat submissions from the page, but not someone calling
// the email API directly.

const STORAGE_KEY = "contact-form-sends";
const COOLDOWN_MS = 60 * 1000;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// Fallback for browsers that block localStorage
let memorySends: number[] = [];

function readSends(now: number): number[] {
  let sends = memorySends;

  try {
    const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (Array.isArray(stored)) sends = stored;
  } catch {
    // Storage is unavailable or holds invalid data
  }

  return sends.filter((time) => now - time < WINDOW_MS);
}

/** Milliseconds until another message may be sent, or 0 if allowed now. */
export function getSendWaitMs(now = Date.now()): number {
  const sends = readSends(now);
  if (sends.length === 0) return 0;

  const cooldownEnds = Math.max(...sends) + COOLDOWN_MS;
  const windowEnds =
    sends.length >= MAX_PER_WINDOW ? Math.min(...sends) + WINDOW_MS : 0;

  return Math.max(cooldownEnds - now, windowEnds - now, 0);
}

export function recordSend(now = Date.now()): void {
  memorySends = [...readSends(now), now];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memorySends));
  } catch {
    // The in-memory copy still applies until the page reloads
  }
}
