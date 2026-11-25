"use client";

import { FormEvent, useRef, useState } from "react";
import { getSendWaitMs, recordSend } from "@/lib/sendLimit";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

// These IDs are meant to be public: EmailJS sends directly from the browser.
// Next.js inlines them at build time, so each one must be referenced by name.
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "limited"
  >("idle");
  const [waitMinutes, setWaitMinutes] = useState(1);
  const [honeypot, setHoneypot] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const resetStatusLater = () => {
    resetTimer.current = setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Stop an earlier timer from hiding the next status message
    clearTimeout(resetTimer.current);

    // People never see this field, so a value means a bot filled it in.
    // Show success without sending, to give the bot no reason to adapt.
    if (honeypot) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    const waitMs = getSendWaitMs();
    if (waitMs > 0) {
      setWaitMinutes(Math.ceil(waitMs / 60000));
      setSubmitStatus("limited");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error("EmailJS environment variables are missing");
      }

      const response = await fetch(EMAILJS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          // Keys match the {{variables}} used in the EmailJS template
          template_params: formData,
        }),
      });

      if (!response.ok) {
        // EmailJS explains failures in a plain-text body
        throw new Error(`EmailJS ${response.status}: ${await response.text()}`);
      }

      // Only delivered messages count, so a failed send can be retried at once
      recordSend();
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      resetStatusLater();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitStatus("error");
      resetStatusLater();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-4 animate-fade-in"
    >
      {/* Name Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-black dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        />
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-black dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        />
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-sm font-medium text-black dark:text-white"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Your message..."
          rows={5}
          className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-black placeholder-zinc-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:placeholder-zinc-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
        />
      </div>

      {/* Honeypot: hidden from people and screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-extra">Leave this field empty</label>
        <input
          type="text"
          id="contact-extra"
          name="contact-extra"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-900/30 dark:bg-green-950/30 dark:text-green-300">
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Message sent! I&apos;ll get back to you soon.
        </div>
      )}

      {/* Send Limit Message */}
      {submitStatus === "limited" && (
        <div
          role="status"
          className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/30 dark:bg-amber-950/30 dark:text-amber-300"
        >
          Please wait about {waitMinutes}{" "}
          {waitMinutes === 1 ? "minute" : "minutes"} before sending another
          message.
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/30 dark:bg-red-950/30 dark:text-red-300">
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
}
