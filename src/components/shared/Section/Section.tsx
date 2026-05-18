import { cn } from "@/lib/cn";

import styles from "./Section.module.scss";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export function Section({
  id,
  children,
  className,
  innerClassName,
}: SectionProps) {
  return (
    <section className={cn(styles.section, className)} id={id}>
      <div className={cn(styles.inner, innerClassName)}>{children}</div>
    </section>
  );
}
