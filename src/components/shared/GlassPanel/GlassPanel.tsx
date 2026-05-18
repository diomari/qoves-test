import { cn } from "@/lib/cn";

import styles from "./GlassPanel.module.scss";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return <div className={cn(styles.panel, className)}>{children}</div>;
}
