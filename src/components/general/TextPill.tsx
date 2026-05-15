import localFont from "next/font/local";

import { cn } from "@/lib/cn";

type PillStyle = "default" | "glass" | "outline";

type TextPillProps = {
  style?: PillStyle;
  children: React.ReactNode;
  className?: string;
};

const pillStyles: Record<PillStyle, string> = {
  default:
    "inline-block text-[#9AAEB5] border-[1px] border-[#C7D1D5] text-[#9AAEB5]",
  glass:
    "text-white shadow-glass  backdrop-blur-md border-1 border-[#f2f2f2]/10",
  outline: "text-white border-[1px] border-[#f2f2f2]/10",
};

const zagmaMono = localFont({
  src: "../../assets/fonts/F37ZagmaMonoTrial-Book.otf",
  display: "swap",
});

export function TextPill({
  style = "default",
  children,
  className,
}: TextPillProps) {
  return (
    <div
      className={cn(
        zagmaMono.className,
        "text-[10px] py-1 px-2.5 leading-none  rounded-2xl uppercase",
        pillStyles[style],
        className,
      )}
    >
      <span>{children}</span>
    </div>
  );
}
