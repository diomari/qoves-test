"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";

import type {
  CarouselCard,
  MindsetCard,
  SectionContent,
} from "@/content/landing";

import { CTAButton } from "./CTAButton";
import { GlassPanel } from "./GlassPanel";
import { MediaCarousel } from "./MediaCarousel";
import { TextPill } from "./general/TextPill";

type UnifiedStoryPanelProps = {
  insecuritySection: SectionContent;
  analysisCards: CarouselCard[];
  mindsetSection: SectionContent;
  mindsetCards: MindsetCard[];
};

export function UnifiedStoryPanel({
  insecuritySection,
  analysisCards,
  mindsetSection,
  mindsetCards,
}: UnifiedStoryPanelProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isMobileViewport = useIsMobileViewport();
  const isMediumLargeViewport = useIsMediumLargeViewport();
  const isXlViewport = useIsXlViewport();
  const videoSource = useResponsiveStoryVideo();
  const scrollYProgress = useStoryScrollProgress(sectionRef);
  const panelScrollProgress = useStickyPanelScrollProgress(sectionRef);
  const useDesktopParallax = isXlViewport && !reduceMotion;

  const compactFirstY = useTransform(
    panelScrollProgress,
    [0.02, 0.24, 0.5],
    [120, 0, -420],
  );
  const mobileFirstY = useTransform(
    panelScrollProgress,
    [0.02, 0.22, 0.46],
    [148, 0, -620],
  );
  const mediumLargeFirstY = useTransform(
    panelScrollProgress,
    [0.02, 0.22, 0.48],
    [132, 0, -760],
  );
  const secondY = useTransform(scrollYProgress, [0.42, 0.88], [70, -30]);
  const secondOpacity = useTransform(
    scrollYProgress,
    [0.42, 0.55, 0.9, 0.98],
    [0, 1, 1, 0],
  );
  const desktopFirstY = useTransform(
    panelScrollProgress,
    [0, 0.22, 0.46],
    [140, 0, -420],
  );
  const desktopFirstTextY = useTransform(
    panelScrollProgress,
    [0.02, 0.36],
    [48, -180],
  );
  const desktopAnalysisCardsY = useTransform(
    panelScrollProgress,
    [0.08, 0.54],
    [180, -360],
  );
  const desktopSecondY = useTransform(
    panelScrollProgress,
    [0.34, 0.62, 0.94],
    [170, 0, -34],
  );
  const desktopFirstMindsetCardY = useTransform(
    panelScrollProgress,
    [0.42, 0.88],
    [260, 120],
  );
  const desktopSecondMindsetCardY = useTransform(
    panelScrollProgress,
    [0.54, 0.98],
    [310, -82],
  );
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.14]);
  const videoBlur = useTransform(
    panelScrollProgress,
    [0.12, 0.44, 1],
    ["blur(0px)", "blur(7px)", "blur(12px)"],
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
          className="pointer-events-none absolute inset-0 size-full object-cover"
          key={videoSource}
          loop
          muted
          playsInline
          poster="/images/lifestyle-poster.svg"
          preload="metadata"
          style={{
            filter: reduceMotion ? "blur(7px)" : videoBlur,
            scale: reduceMotion ? 1.06 : videoScale,
          }}
        >
          <source key={videoSource} src={videoSource} type="video/mp4" />
        </motion.video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,18,0.12)_0%,rgba(18,19,18,0.48)_44%,rgba(18,19,18,0.9)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto grid h-full max-w-6xl items-center md:px-4 py-12">
          <motion.div
            className="mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center text-center sm:max-w-3xl xl:max-w-6xl"
            style={{
              y: useDesktopParallax
                ? desktopFirstY
                : reduceMotion
                  ? 0
                  : isMobileViewport
                    ? mobileFirstY
                    : isMediumLargeViewport
                      ? mediumLargeFirstY
                    : compactFirstY,
            }}
          >
            <motion.div
              className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-2xl"
              style={{
                y: useDesktopParallax ? desktopFirstTextY : 0,
              }}
            >
              <TextPill style="glass" className="mb-3">
                {insecuritySection.eyebrow}
              </TextPill>
              <h2 className="mx-auto max-w-[20rem] text-balance text-[32px] font-light leading-none tracking-normal sm:max-w-2xl sm:text-[6xl] ">
                {insecuritySection.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-[20rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-md sm:text-sm">
                {insecuritySection.body}
              </p>
              {insecuritySection.cta ? (
                <div className="mt-7 flex w-full justify-center md:hidden">
                  <CTAButton href={insecuritySection.cta.href}>
                    {insecuritySection.cta.label}
                  </CTAButton>
                </div>
              ) : null}
            </motion.div>

            <motion.div
              className="mt-16 w-full xl:max-w-none"
              style={{
                y: useDesktopParallax ? desktopAnalysisCardsY : 0,
              }}
            >
              <MediaCarousel align="start" cards={analysisCards} />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 top-1/2 mx-auto flex w-full max-w-6xl -translate-y-1/2 flex-col items-center px-4 text-center"
            style={{
              opacity: reduceMotion ? 1 : secondOpacity,
              y: useDesktopParallax ? desktopSecondY : reduceMotion ? 0 : secondY,
            }}
          >
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="max-w-xs text-balance text-[2rem] font-light leading-none tracking-normal sm:max-w-2xl sm:text-5xl lg:text-6xl">
                {mindsetSection.heading}
              </h2>
              <p className="mt-5 max-w-[19rem] text-pretty text-xs leading-5 text-white/72 sm:max-w-lg sm:text-sm">
                {mindsetSection.body}
              </p>
            </div>

            <div className="mt-16 w-full xl:hidden">
              <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 text-left [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {mindsetCards.map((card) => (
                  <MindsetCardPanel
                    className="w-[302px] shrink-0 sm:w-[340px] lg:w-[520px]"
                    card={card}
                    key={card.title}
                  />
                ))}
              </div>
            </div>

            {mindsetCards[0] ? (
              <motion.div
                className="pointer-events-none absolute left-10 top-[-210px] hidden xl:block lg:left-12"
                style={{
                  y: useDesktopParallax
                    ? desktopFirstMindsetCardY
                    : reduceMotion
                      ? 0
                      : 0,
                }}
              >
                <MindsetCardPanel
                  className="w-[360px] lg:w-[390px]"
                  card={mindsetCards[0]}
                />
              </motion.div>
            ) : null}

            {mindsetCards[1] ? (
              <motion.div
                className="pointer-events-none absolute right-10 top-[120px] hidden xl:block lg:right-12"
                style={{
                  y: useDesktopParallax
                    ? desktopSecondMindsetCardY
                    : reduceMotion
                      ? 0
                      : 0,
                }}
              >
                <MindsetCardPanel
                  className="w-[360px] lg:w-[390px]"
                  card={mindsetCards[1]}
                />
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MindsetCardPanel({
  card,
  className,
}: {
  card: MindsetCard;
  className?: string;
}) {
  return (
    <GlassPanel
      className={`min-h-[244px] p-4 sm:min-h-[280px] ${className ?? ""}`}
    >
      <h3 className="text-[1.7rem] font-light leading-none tracking-normal text-white sm:text-3xl">
        {card.title}
      </h3>
      <div className="mt-24 space-y-3 sm:mt-28">
        {(card.items ?? []).map((item) => (
          <div
            className="rounded-[4px] bg-white/12 px-4 py-3 text-[11px] leading-5 text-white/88 ring-1 ring-white/12 sm:text-xs"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
}

function useIsXlViewport() {
  const [isXlViewport, setIsXlViewport] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");

    function syncViewport() {
      setIsXlViewport(query.matches);
    }

    syncViewport();
    query.addEventListener("change", syncViewport);

    return () => {
      query.removeEventListener("change", syncViewport);
    };
  }, []);

  return isXlViewport;
}

function useIsMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");

    function syncViewport() {
      setIsMobileViewport(query.matches);
    }

    syncViewport();
    query.addEventListener("change", syncViewport);

    return () => {
      query.removeEventListener("change", syncViewport);
    };
  }, []);

  return isMobileViewport;
}

function useIsMediumLargeViewport() {
  const [isMediumLargeViewport, setIsMediumLargeViewport] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (max-width: 1279px)",
    );

    function syncViewport() {
      setIsMediumLargeViewport(query.matches);
    }

    syncViewport();
    query.addEventListener("change", syncViewport);

    return () => {
      query.removeEventListener("change", syncViewport);
    };
  }, []);

  return isMediumLargeViewport;
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
    mass: 0.18,
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

function useStickyPanelScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
) {
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 28,
    mass: 0.16,
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
