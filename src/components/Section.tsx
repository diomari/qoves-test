import { cn } from "@/lib/cn";

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
  innerClassName
}: SectionProps) {
  return (
    <section id={id} className={cn("relative w-full", className)}>
      <div className={cn("mx-auto w-full max-w-6xl px-4", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
