import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";

import styles from "./CTAButton.module.scss";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CTAButton({ href, children, className }: CTAButtonProps) {
  return (
    <Link
      className={cn(ppNeueMontrealMedium.className, styles.button, className)}
      href={href}
    >
      <span className={styles.label}>{children}</span>
      <span className={styles.iconWrap}>
        <ChevronRight aria-hidden="true" size={18} strokeWidth={1.8} />
      </span>
    </Link>
  );
}
