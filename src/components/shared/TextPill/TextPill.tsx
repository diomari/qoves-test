import { cn } from "@/lib/cn";
import { zagmaMonoBook } from "@/lib/fonts";

import styles from "./TextPill.module.scss";

type PillStyle = "default" | "glass" | "outline";

type TextPillProps = {
  style?: PillStyle;
  children: React.ReactNode;
  className?: string;
};

const pillStyles: Record<PillStyle, string> = {
  default: styles.default,
  glass: styles.glass,
  outline: styles.outline,
};

export function TextPill({
  style = "default",
  children,
  className,
}: TextPillProps) {
  return (
    <div
      className={cn(
        zagmaMonoBook.className,
        styles.pill,
        pillStyles[style],
        className,
      )}
    >
      <span>{children}</span>
    </div>
  );
}
