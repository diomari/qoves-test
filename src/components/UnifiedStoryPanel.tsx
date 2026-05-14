"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import type { CarouselCard, SectionContent } from "@/content/landing";

import { CTAButton } from "./CTAButton";
import { GlassPanel } from "./GlassPanel";
import { MediaCarousel } from "./MediaCarousel";

type UnifiedStoryPanelProps = {
  insecuritySection: SectionContent;
  analysisCards: CarouselCard[];
  mindsetSection: SectionContent;
  mindsetCards: CarouselCard[];
};

export function UnifiedStoryPanel({
  insecuritySection,
  analysisCards,
  mindsetSection,
  mindsetCards
}: UnifiedStoryPanelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const videoSource = useResponsiveStoryVideo();
  const scrollYProgress = useStoryScrollProgress(sectionRef);
  const panelScrollProgress = useStickyPanelScrollProgress(sectionRef);

  const firstY = useTransform(scrollYProgress, [0.08, 0.48], [52, -46]);
  const firstOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.42, 0.54],
    [0, 1, 1, 0]
  );
  const secondY = useTransform(scrollYProgress, [0.42, 0.88], [70, -30]);
  const secondOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.55, 0.9, 0.98],
    [0, 1, 1, 0]
  );
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.14]);
  const videoBlur = useTransform(
    panelScrollProgress,
    [0.12, 0.44, 1],
    ["blur(0px)", "blur(7px)", "blur(12px)"]
  );

  return (
    <section
      className="relative h-[220svh] bg-charcoal text-white"
      ref={sectionRef}
    >
      <div className="sticky top-0 isolate h-svh min-h-[760px] overflow-hidden">
        <motion.video
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 size-full object-cover"
          key={videoSource}
          loop
          muted
          playsInline
          poster="/images/lifestyle-poster.svg"
          preload="metadata"
          style={{
            filter: reduceMotion ? "blur(7px)" : videoBlur,
            scale: reduceMotion ? 1.06 : videoScale
          }}
        >
          <source key={videoSource} src={videoSource} type="video/mp4" />
        </motion.video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,18,0.12)_0%,rgba(18,19,18,0.48)_44%,rgba(18,19,18,0.9)_100%)]" />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto grid h-full max-w-6xl items-center px-4 py-12">
          <motion.div
            className="mx-auto flex w-full max-w-3xl flex-col items-center text-center"
            style={{
              opacity: reduceMotion ? 1 : firstOpacity,
              y: reduceMotion ? 0 : firstY
            }}
          >
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
              {insecuritySection.eyebrow}
            </p>
            <h2 className="max-w-sm text-balance text-[2rem] font-light leading-none tracking-normal sm:max-w-2xl sm:text-6xl">
              {insecuritySection.heading}
            </h2>
            <p className="mt-5 max-w-[18rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-md sm:text-sm">
              {insecuritySection.body}
            </p>
            {insecuritySection.cta ? (
              <div className="mt-7">
                <CTAButton href={insecuritySection.cta.href}>
                  {insecuritySection.cta.label}
                </CTAButton>
              </div>
            ) : null}
            <div className="mt-16 w-full">
              <MediaCarousel cards={analysisCards} />
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 top-1/2 mx-auto flex w-full max-w-6xl -translate-y-1/2 flex-col items-center px-4 text-center"
            style={{
              opacity: reduceMotion ? 1 : secondOpacity,
              y: reduceMotion ? 0 : secondY
            }}
          >
            <h2 className="max-w-xs text-balance text-[2rem] font-light leading-none tracking-normal sm:max-w-2xl sm:text-6xl">
              {mindsetSection.heading}
            </h2>
            <p className="mt-5 max-w-[19rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-lg sm:text-sm">
              {mindsetSection.body}
            </p>
            <div className="mt-16 w-full">
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {mindsetCards.map((card) => (
                  <GlassPanel
                    className="min-h-[188px] w-[274px] shrink-0 p-4"
                    key={card.title}
                  >
                    <h3 className="text-lg font-light leading-tight">
                      {card.title}
                    </h3>
                    <p className="mt-14 rounded-[4px] bg-white/12 px-3 py-2 text-[11px] leading-4 text-white/74 ring-1 ring-white/12">
                      {card.body}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function useResponsiveStoryVideo() {
  const [source, setSource] = useState("/videos/landing-video-xs.mp4");

  useEffect(() => {
    const wideQuery = window.matchMedia("(min-width: 1280px)");
    const largeQuery = window.matchMedia("(min-width: 768px)");

    function selectSource() {
      if (wideQuery.matches) {
        setSource("/videos/landing-video-2xl.mp4");
        return;
      }

      if (largeQuery.matches) {
        setSource("/videos/landing-video-lg.mp4");
        return;
      }

      setSource("/videos/landing-video-xs.mp4");
    }

    selectSource();
    wideQuery.addEventListener("change", selectSource);
    largeQuery.addEventListener("change", selectSource);

    return () => {
      wideQuery.removeEventListener("change", selectSource);
      largeQuery.removeEventListener("change", selectSource);
    };
  }, []);

  return source;
}

function useStoryScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 90,
    damping: 26,
    mass: 0.18
  });

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollableDistance = rect.height + window.innerHeight;
      const rawProgress = (window.innerHeight - rect.top) / scrollableDistance;

      progress.set(Math.min(Math.max(rawProgress, 0), 1));
    }

    function requestUpdate() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [progress, sectionRef]);

  return smoothProgress;
}

function useStickyPanelScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 28,
    mass: 0.16
  });

  useEffect(() => {
    let frame = 0;

    function updateProgress() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const stickyDistance = Math.max(rect.height - window.innerHeight, 1);
      const rawProgress = -rect.top / stickyDistance;

      progress.set(Math.min(Math.max(rawProgress, 0), 1));
    }

    function requestUpdate() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [progress, sectionRef]);

  return smoothProgress;
}
