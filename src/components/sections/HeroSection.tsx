"use client";

import Image from "next/image";

import { heroContent, type SectionContent } from "@/content/landing";

import { TextPill } from "@/components/shared/TextPill";

export function HeroSection() {
  const content = heroContent;
  return (
    <section className="relative isolate min-h-165 overflow-hidden bg-[#9AAEB5] text-white sm:min-h-190 lg:min-h-215">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#9ba3a6_0%,#9d9a97_52%,#8a8682_100%)] md:bg-[linear-gradient(180deg,#a3b2b9_0%,#9eadb3_32%,#94a1a6_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(202,188,181,0.48)_0%,rgba(191,177,170,0.34)_20%,rgba(171,160,154,0.18)_38%,rgba(154,174,181,0.06)_58%,transparent_78%)] md:bg-[radial-gradient(ellipse_at_50%_38%,rgba(205,189,181,0.56)_0%,rgba(193,178,170,0.42)_16%,rgba(176,163,156,0.24)_30%,rgba(156,168,173,0.08)_44%,transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_24%,transparent_44%)] md:bg-[radial-gradient(ellipse_at_50%_20%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_16%,transparent_30%)]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(149,138,132,0.06)_48%,rgba(77,79,81,0.18)_100%)] md:bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(154,174,181,0.02)_36%,rgba(89,101,106,0.12)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-[linear-gradient(180deg,rgba(132,140,144,0.14),transparent)]" />

      <div className="relative z-10 mx-auto flex min-h-165 w-full max-w-6xl flex-col items-center px-4 pt-24 text-center sm:min-h-190 lg:min-h-215 lg:pt-28">
        <TextPill style="outline" className="mb-5">
          {content.eyebrow}
        </TextPill>
        <div className="px-4">
          <h1 className="max-w-full text-balance text-[32px] mb-2 md:mb-3 md:text-[40px] leading-9 md:leading-12 tracking-tight sm:text-5xl lg:text-7xl">
            {content.heading}{" "}
            {content.headingHighlight ? (
              <span className="opacity-50">{content.headingHighlight}</span>
            ) : null}
          </h1>
          <p className="mt-3 max-w-full text-pretty text-[14px] md:text-[16px] leading-5 text-white/70">
            {content.body}
          </p>
        </div>

        <div className="relative mt-auto h-[436px] w-full max-w-[360px] sm:h-[520px] sm:max-w-[460px] lg:h-[760px] lg:max-w-[768px]">
          <DiagnosticPanel className="left-0 top-4 w-[44%]" variant="chart" />
          <DiagnosticPanel className="right-0 top-10 w-[35%]" variant="axis" />
          <DiagnosticPanel
            className="bottom-24 left-0 w-[48%]"
            variant="grid"
          />
          <DiagnosticPanel
            className="bottom-20 right-1 w-[42%]"
            variant="bars"
          />
          <HeroFigure media={content.media} />
        </div>
      </div>
    </section>
  );
}

function DiagnosticPanel({
  className,
  variant,
}: {
  className: string;
  variant: "chart" | "axis" | "grid" | "bars";
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-[3px] border border-white/8 bg-[#6e7471]/58 p-3 text-left shadow-diagnostic backdrop-blur-sm ${className}`}
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
              <span
                className="block h-px bg-white/70"
                style={{ width: `${width}%` }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function HeroFigure({ media }: { media?: SectionContent["media"] }) {
  const mobileImage = media?.src || media?.poster;
  const mediumImage = "/images/female-top-md.png";
  const wideImage = "/images/female-top-xl.png";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto flex justify-center">
      {mobileImage ? (
        <Image
          alt={media?.alt ?? "Facial analysis portrait"}
          className="h-auto w-90 object-contain object-bottom md:hidden"
          height={873}
          priority={media?.priority}
          sizes="360px"
          src={mobileImage}
          width={720}
        />
      ) : null}
      {mediumImage ? (
        <Image
          alt={media?.alt ?? "Facial analysis portrait"}
          className="hidden h-auto w-90 object-contain object-bottom md:block md:w-[760px] xl:hidden"
          height={1200}
          priority={media?.priority}
          sizes="760px"
          src={mediumImage}
          width={720}
        />
      ) : null}
      {wideImage ? (
        <Image
          alt={media?.alt ?? "Facial analysis portrait"}
          className="hidden h-auto w-90 object-contain object-bottom md:w-[760px] xl:block"
          height={873}
          priority={media?.priority}
          sizes="760px"
          src={wideImage}
          width={720}
        />
      ) : null}
    </div>
  );
}
