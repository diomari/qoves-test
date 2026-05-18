import Link from "next/link";

import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";

import styles from "./ErrorState.module.scss";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>404</p>
        <h1 className={styles.title}>This page does not exist.</h1>
        <p className={styles.body}>
          The facial analysis landing page is available from the home route.
        </p>
        <Link className={cn(ppNeueMontrealMedium.className, styles.button)} href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
