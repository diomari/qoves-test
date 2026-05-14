import { cn } from "@/lib/cn";

type GlassPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[7px] border border-white/18 bg-white/15 shadow-glass backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
