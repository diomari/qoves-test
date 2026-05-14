"use client";

import { motion, useReducedMotion } from "motion/react";

import type { SectionContent } from "@/content/landing";

import { VideoBackdrop } from "./VideoBackdrop";

type HeroProps = {
  content: SectionContent;
};

export function Hero({ content }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate min-h-[660px] overflow-hidden bg-stone text-white sm:min-h-[760px] lg:min-h-[860px]">
      <VideoBackdrop
        media={content.media}
        overlayClassName="bg-[linear-gradient(180deg,rgba(71,73,70,0.44)_0%,rgba(87,89,85,0.52)_42%,rgba(40,42,40,0.9)_100%)]"
      />
      <div className="absolute inset-x-0 top-0 z-10 h-28 bg-[linear-gradient(180deg,rgba(43,45,43,0.62),transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-[660px] w-full max-w-6xl flex-col items-center px-4 pt-24 text-center sm:min-h-[760px] lg:min-h-[860px] lg:pt-28">
        <motion.p
          className="mb-4 rounded-full border border-white/25 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-white/80"
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.eyebrow}
        </motion.p>
        <motion.h1
          className="max-w-[16rem] text-balance text-[2rem] font-light leading-[0.96] tracking-normal sm:max-w-lg sm:text-5xl lg:max-w-2xl lg:text-7xl"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.heading}
        </motion.h1>
        <motion.p
          className="mt-5 max-w-[18rem] text-pretty text-xs leading-5 text-white/76 sm:max-w-md sm:text-sm"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.body}
        </motion.p>

        <motion.div
          className="relative mt-auto h-[390px] w-full max-w-[390px] sm:h-[460px] sm:max-w-[460px] lg:h-[560px] lg:max-w-[620px]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98, y: 26 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <DiagnosticPanel className="left-0 top-4 w-[44%]" variant="chart" />
          <DiagnosticPanel className="right-0 top-10 w-[35%]" variant="axis" />
          <DiagnosticPanel className="bottom-24 left-0 w-[48%]" variant="grid" />
          <DiagnosticPanel className="bottom-20 right-1 w-[42%]" variant="bars" />
          <FaceSilhouette />
        </motion.div>
      </div>
    </section>
  );
}

function DiagnosticPanel({
  className,
  variant
}: {
  className: string;
  variant: "chart" | "axis" | "grid" | "bars";
}) {
  return (
    <div
      className={`absolute rounded-[3px] border border-white/8 bg-[#6e7471]/58 p-3 text-left shadow-diagnostic backdrop-blur-sm ${className}`}
    >
      {variant === "chart" ? (
        <div className="space-y-2">
          <div className="h-16 border-b border-l border-white/25 bg-[linear-gradient(135deg,transparent_49%,rgba(255,255,255,0.42)_50%,transparent_51%)]" />
          <div className="h-1 w-10 bg-white/65" />
          <div className="h-1 w-16 bg-white/28" />
        </div>
      ) : null}
      {variant === "axis" ? (
        <div className="flex h-28 items-center justify-center">
          <div className="relative h-full w-px bg-white/56">
            <span className="absolute left-0 top-4 h-px w-9 bg-white/55" />
            <span className="absolute left-0 top-1/2 h-px w-14 bg-white/55" />
            <span className="absolute left-0 bottom-5 h-px w-7 bg-white/55" />
          </div>
        </div>
      ) : null}
      {variant === "grid" ? (
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 40 }).map((_, index) => (
            <span
              className="aspect-square rounded-[1px] bg-white/25"
              key={index}
            />
          ))}
        </div>
      ) : null}
      {variant === "bars" ? (
        <div className="space-y-3">
          {[82, 48, 92, 63].map((width) => (
            <div className="h-px bg-white/18" key={width}>
              <span className="block h-px bg-white/70" style={{ width: `${width}%` }} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FaceSilhouette() {
  return (
    <div className="absolute inset-x-8 bottom-0 mx-auto h-[360px] max-w-[270px] sm:h-[430px] sm:max-w-[320px] lg:h-[520px] lg:max-w-[390px]">
      <div className="absolute inset-x-[22%] top-0 h-[40%] rounded-t-[48%] rounded-b-[42%] bg-[radial-gradient(circle_at_52%_36%,#d2bba5_0%,#b9987d_42%,#7b6658_100%)] shadow-[0_12px_36px_rgba(0,0,0,0.22)]" />
      <div className="absolute left-[20%] top-[22%] h-[24%] w-[11%] rounded-full bg-[#6f5e54]" />
      <div className="absolute right-[20%] top-[22%] h-[24%] w-[11%] rounded-full bg-[#6f5e54]" />
      <div className="absolute inset-x-[12%] bottom-0 h-[62%] rounded-t-[44%] bg-[#202523] shadow-[0_-18px_34px_rgba(0,0,0,0.18)]" />
      <div className="absolute left-1/2 top-[17%] h-[11%] w-[33%] -translate-x-1/2 rounded-full bg-white/28 blur-[18px]" />
      <div className="absolute left-1/2 top-[20%] h-px w-[30%] -translate-x-1/2 bg-white/70" />
      <div className="absolute left-[40%] top-[27%] size-2 rounded-full bg-[#37443e]" />
      <div className="absolute right-[40%] top-[27%] size-2 rounded-full bg-[#37443e]" />
    </div>
  );
}
