"use client";

import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";

import styles from "./ErrorState.module.scss";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>Something went wrong</p>
        <h1 className={styles.title}>The page could not finish rendering.</h1>
        <p className={styles.body}>
          {error.message || "Try refreshing the page or restarting the dev server."}
        </p>
        <button
          className={cn(ppNeueMontrealMedium.className, styles.button)}
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
