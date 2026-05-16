import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CTAButton({ href, children, className }: CTAButtonProps) {
  return (
    <Link
      className={cn(
        ppNeueMontrealMedium.className,
        "group inline-flex min-h-11 items-center gap-3 rounded-[7px] bg-white/20 px-5 text-sm text-white shadow-glass ring-1 ring-white/25 backdrop-blur-md transition duration-300 hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
      href={href}
    >
      <span>{children}</span>
      <span className="grid size-7 place-items-center rounded-[6px] bg-white/16 ring-1 ring-white/20 transition duration-300 group-hover:translate-x-0.5 group-hover:bg-white/24">
        <ArrowRight aria-hidden="true" size={15} strokeWidth={1.8} />
      </span>
    </Link>
  );
}
