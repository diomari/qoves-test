"use client";

import { ppNeueMontrealMedium } from "@/lib/fonts";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-paper px-6 text-center text-ink">
      <div className="max-w-sm">
        <p className="text-xs uppercase tracking-[0.22em] text-ink/45">
          Something went wrong
        </p>
        <h1 className="mt-4 text-3xl font-light leading-tight">
          The page could not finish rendering.
        </h1>
        <p className="mt-4 text-sm leading-6 text-ink/62">
          {error.message || "Try refreshing the page or restarting the dev server."}
        </p>
        <button
          className={`${ppNeueMontrealMedium.className} mt-7 min-h-11 rounded-[7px] bg-ink px-5 text-sm text-white transition hover:bg-ink/86 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40`}
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
