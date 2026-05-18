"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

import { TextPill } from "@/components/shared/TextPill";
import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import styles from "./PersonalizedPlanSection.module.scss";

gsap.registerPlugin(useGSAP);

const planSteps = [
  "Get your expert facial analysis",
  "Visualise your best looking self",
  "Get your personalized glow-up protocol",
  "Track your progress and see dramatic results",
];

const planImages = {
  After: "/images/plan-after.webp",
  Before: "/images/plan-before.webp",
} satisfies Record<"Before" | "After", string>;

export function PersonalizedPlanSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const activeBgRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      cardRefs.current.forEach((card, index) => {
        const activeBg = activeBgRefs.current[index];
        const isActive = activeStep === index;

        if (!card || !activeBg) {
          return;
        }

        gsap.to(card, {
          borderColor: isActive ? "transparent" : "#edf2f3",
          boxShadow:
            isActive && !reduceMotion
              ? "0 24px 54px rgba(71, 84, 88, 0.18)"
              : "0 0 0 rgba(71, 84, 88, 0)",
          color: isActive ? "#ffffff" : "#111817",
          duration: 0.32,
          ease: "power3.out",
          y: isActive && !reduceMotion ? -2 : 0,
        });

        gsap.to(activeBg, {
          autoAlpha: isActive ? 1 : 0,
          duration: 0.32,
          ease: "power3.out",
        });
      });
    },
    {
      dependencies: [activeStep, reduceMotion],
      revertOnUpdate: false,
      scope: rootRef,
    },
  );

  return (
    <section
      aria-labelledby="personalized-plan-heading"
      className={styles.section}
      ref={rootRef}
    >
      <div aria-hidden="true" className={styles.gridBackground} />

      <div className={styles.container}>
        <header className={styles.header}>
          <TextPill className={styles.pill}>Personalized analysis</TextPill>
          <h2 className={styles.title} id="personalized-plan-heading">
            Get your personalised <span className={styles.highlight}>Qoves plan</span>
          </h2>
          <p className={styles.description}>
            Understand your facial features and start your glow-up today with a
            proven action plan, no plastic surgery needed.
          </p>
        </header>

        <div className={styles.visualGrid}>
          <PlanImageCard label="Before" reverseDot reduceMotion={reduceMotion} />

          <div className={styles.connectorColumn}>
            <div className={styles.connectorTop}>
              <SignalDot
                className={styles.connectorTopSignal}
                reduceMotion={reduceMotion}
                x={[0, 260, 260]}
                y={[0, 0, 136]}
              />
            </div>
            <div className={styles.connectorBottom}>
              <SignalDot
                className={styles.connectorBottomSignal}
                reduceMotion={reduceMotion}
                x={[0, 142, 142]}
                y={[0, 0, 64]}
              />
            </div>
          </div>

          <PlanImageCard label="After" reduceMotion={reduceMotion} />
        </div>

        <div className={styles.stepsGrid}>
          {planSteps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <button
                aria-current={isActive ? "step" : undefined}
                className={styles.stepButton}
                key={step}
                onPointerEnter={() => setActiveStep(index)}
                onPointerLeave={() => setActiveStep(null)}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                type="button"
              >
                <span
                  className={styles.stepButtonBackground}
                  ref={(element) => {
                    activeBgRefs.current[index] = element;
                  }}
                  style={{ opacity: isActive ? 1 : 0 }}
                />
                <span
                  className={cn(
                    ppNeueMontrealMedium.className,
                    styles.stepIndex,
                    isActive && styles.stepIndexActive,
                  )}
                >
                  {index + 1}
                </span>
                <p className={styles.stepText}>{step}</p>
              </button>
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
  reduceMotion: boolean;
  reverseDot?: boolean;
}) {
  return (
    <figure className={styles.imageCard}>
      <div className={styles.imageFrame}>
        <Image
          alt={`${label} Qoves plan portrait`}
          className={styles.image}
          fill
          priority={label === "Before"}
          sizes="(min-width: 1280px) 520px, 420px"
          src={planImages[label]}
        />
        <figcaption className={cn(ppNeueMontrealMedium.className, styles.imageLabel)}>
          {label}
        </figcaption>
        <SignalDot
          className={styles.beforeTopSignal}
          reduceMotion={reduceMotion}
          x={reverseDot ? [120, -130, 120] : [-120, 130, -120]}
        />
        <SignalDot
          className={styles.beforeBottomSignal}
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
  reduceMotion: boolean;
  x: number[];
  y?: number[];
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const element = ref.current;

      if (!element || reduceMotion) {
        return;
      }

      const timeline = gsap.timeline({ repeat: -1, delay });

      x.forEach((xValue, index) => {
        timeline.to(element, {
          duration: index === 0 ? 0 : 2.4,
          ease: "sine.inOut",
          x: xValue,
          y: y[index] ?? 0,
        });
      });
    },
    { dependencies: [delay, reduceMotion, x, y], revertOnUpdate: true, scope: ref },
  );

  return (
    <span
      aria-hidden="true"
      className={cn(styles.signalDot, className)}
      ref={ref}
    />
  );
}
