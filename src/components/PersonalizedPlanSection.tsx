"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { ppNeueMontrealMedium } from "@/lib/fonts";

import { TextPill } from "./general/TextPill";

const planSteps = [
  "Get your expert facial analysis",
  "Visualise your best looking self",
  "Get your personalized glow-up protocol",
  "Track your progress and see dramatic results",
];

const placeholderImage = "/images/female-top.png";
const cardTransition = { duration: 0.42, ease: [0.22, 1, 0.36, 1] } as const;

export function PersonalizedPlanSection() {
  const [activeStep, setActiveStep] = useState(1);
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="personalized-plan-heading"
      className="relative hidden min-h-screen overflow-hidden bg-[#fbfbfa] text-ink lg:block"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(154,174,181,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(154,174,181,0.1)_1px,transparent_1px)] bg-[size:380px_310px]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-10 pb-24 pt-12 xl:px-16">
        <header className="mx-auto max-w-4xl text-center">
          <TextPill className="mb-6">Personalized analysis</TextPill>
          <h2
            className="text-balance text-[52px] leading-none tracking-[-0.04em] text-[#233134] xl:text-[58px]"
            id="personalized-plan-heading"
          >
            Get your personalised{" "}
            <span className="text-[#9AAEB5]">Qoves plan</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-7 text-ink/62">
            Understand your facial features and start your glow-up today with a
            proven action plan, no plastic surgery needed.
          </p>
        </header>

        <div className="relative mt-16 grid flex-1 grid-cols-[minmax(320px,520px)_minmax(260px,360px)_minmax(320px,520px)] items-center justify-center gap-0">
          <PlanImageCard label="Before" reverseDot reduceMotion={reduceMotion} />

          <div className="relative mx-[-1px] flex h-full min-h-[560px] flex-col justify-center">
            <div className="relative h-[230px] rounded-[0_0_18px_0] border-b border-r border-[#b8cbd1] bg-white/64">
              <SignalDot
                className="-bottom-1.5 left-[18%]"
                reduceMotion={reduceMotion}
                x={[0, 260, 260]}
                y={[0, 0, 136]}
              />
            </div>
            <div className="relative mt-10 h-[300px] rounded-[18px_0_0_0] border-l border-t border-[#b8cbd1] bg-white/54 shadow-[0_0_18px_rgba(78,102,111,0.18)]">
              <SignalDot
                className="-top-1.5 left-[42%]"
                reduceMotion={reduceMotion}
                x={[0, 142, 142]}
                y={[0, 0, 64]}
              />
            </div>
          </div>

          <PlanImageCard label="After" reduceMotion={reduceMotion} />
        </div>

        <div className="mt-10 grid grid-cols-4 gap-8 border-t border-[#edf2f3] pt-5">
          {planSteps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <motion.article
                animate={{
                  y: isActive && !reduceMotion ? -2 : 0,
                  boxShadow:
                    isActive && !reduceMotion
                      ? "0 24px 54px rgba(71, 84, 88, 0.18)"
                      : "0 0 0 rgba(71, 84, 88, 0)",
                }}
                className={[
                  "relative min-h-[160px] overflow-hidden rounded-[10px] border p-5 transition-colors duration-300",
                  isActive
                    ? "border-transparent text-white"
                    : "border-[#edf2f3] bg-white text-ink",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
                key={step}
                onFocus={() => setActiveStep(index)}
                onPointerEnter={() => setActiveStep(index)}
                tabIndex={0}
                transition={cardTransition}
              >
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0 }}
                  className="absolute inset-0 bg-[linear-gradient(135deg,#8f9694_0%,#9aaeb5_100%)]"
                  transition={cardTransition}
                />
                <span
                  className={[
                    ppNeueMontrealMedium.className,
                    "relative z-10 grid size-6 place-items-center rounded-full text-[12px] transition-colors duration-300",
                    isActive
                      ? "bg-white/22 text-white"
                      : "bg-[#9AAEB5] text-white",
                  ].join(" ")}
                >
                  {index + 1}
                </span>
                <p className="relative z-10 mt-12 max-w-[14rem] text-[21px] leading-[1.08] tracking-[-0.03em]">
                  {step}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PlanImageCard({
  label,
  reduceMotion,
  reverseDot = false,
}: {
  label: "Before" | "After";
  reduceMotion: boolean | null;
  reverseDot?: boolean;
}) {
  return (
    <figure className="rounded-[12px] border border-[#d4e2e6] bg-white p-3">
      <div className="relative flex aspect-[0.83] overflow-hidden rounded-[8px] bg-[#B8CDD3]">
        <Image
          alt={`${label} facial analysis placeholder`}
          className="object-contain object-bottom"
          fill
          priority={label === "Before"}
          sizes="(min-width: 1280px) 520px, 420px"
          src={placeholderImage}
        />
        <figcaption
          className={`${ppNeueMontrealMedium.className} absolute inset-x-0 top-5 text-center text-[15px] uppercase tracking-[0.03em] text-white`}
        >
          {label}
        </figcaption>
        <SignalDot
          className="-top-1.5 left-[48%]"
          reduceMotion={reduceMotion}
          x={reverseDot ? [120, -130, 120] : [-120, 130, -120]}
        />
        <SignalDot
          className="-bottom-1.5 left-[52%]"
          delay={1.4}
          reduceMotion={reduceMotion}
          x={reverseDot ? [-120, 120, -120] : [120, -120, 120]}
        />
      </div>
    </figure>
  );
}

function SignalDot({
  className,
  delay = 0,
  reduceMotion,
  x,
  y = [0, 0, 0],
}: {
  className: string;
  delay?: number;
  reduceMotion: boolean | null;
  x: number[];
  y?: number[];
}) {
  if (reduceMotion) {
    return (
      <span
        aria-hidden="true"
        className={`absolute size-2 rounded-full bg-[#7f969d] shadow-[0_0_0_3px_rgba(154,174,181,0.2)] ${className}`}
      />
    );
  }

  return (
    <motion.span
      animate={{ x, y }}
      aria-hidden="true"
      className={`absolute size-2 rounded-full bg-[#7f969d] shadow-[0_0_0_3px_rgba(154,174,181,0.2)] ${className}`}
      transition={{
        delay,
        duration: 4.8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}
