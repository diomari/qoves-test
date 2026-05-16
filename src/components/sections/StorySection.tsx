"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import {
  analysisCards,
  insecuritySection,
  mindsetCards,
  mindsetSection,
  type MindsetCard,
} from "@/content/landing";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { MediaCarousel } from "@/components/shared/MediaCarousel";
import { TextPill } from "@/components/shared/TextPill";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const firstPanelRef = useRef<HTMLDivElement | null>(null);
  const firstTextRef = useRef<HTMLDivElement | null>(null);
  const analysisCardsRef = useRef<HTMLDivElement | null>(null);
  const secondPanelRef = useRef<HTMLDivElement | null>(null);
  const firstMindsetCardRef = useRef<HTMLDivElement | null>(null);
  const secondMindsetCardRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobileViewport = useIsMobileViewport();
  const isMediumLargeViewport = useIsMediumLargeViewport();
  const isXlViewport = useIsXlViewport();
  const videoSource = useResponsiveStoryVideo();

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      gsap.set(secondPanelRef.current, { autoAlpha: reduceMotion ? 1 : 0 });

      if (reduceMotion) {
        gsap.set(videoRef.current, { filter: "blur(7px)", scale: 1.06 });
        gsap.set(
          [
            firstPanelRef.current,
            firstTextRef.current,
            analysisCardsRef.current,
            secondPanelRef.current,
            firstMindsetCardRef.current,
            secondMindsetCardRef.current,
          ],
          { clearProps: "transform" },
        );
        return;
      }

      const firstY = isXlViewport
        ? [140, 0, -420]
        : isMobileViewport
          ? [148, 0, -620]
          : isMediumLargeViewport
            ? [132, 0, -760]
            : [120, 0, -420];

      gsap.fromTo(
        firstPanelRef.current,
        { y: firstY[0] },
        {
          ease: "none",
          keyframes: [{ y: firstY[1] }, { y: firstY[2] }],
          scrollTrigger: {
            end: "bottom bottom",
            scrub: 0.45,
            start: "top top",
            trigger: section,
          },
        },
      );

      gsap.fromTo(
        secondPanelRef.current,
        { autoAlpha: 0, y: 70 },
        {
          autoAlpha: 1,
          ease: "none",
          keyframes: [
            { autoAlpha: 1, y: 0 },
            { autoAlpha: 1, y: -20 },
            { autoAlpha: 0, y: -30 },
          ],
          scrollTrigger: {
            end: "bottom bottom",
            scrub: 0.45,
            start: "35% top",
            trigger: section,
          },
        },
      );

      gsap.fromTo(
        videoRef.current,
        { filter: "blur(0px)", scale: 1.05 },
        {
          ease: "none",
          filter: "blur(12px)",
          scale: 1.14,
          scrollTrigger: {
            end: "bottom bottom",
            scrub: 0.5,
            start: "top top",
            trigger: section,
          },
        },
      );

      if (isXlViewport) {
        gsap.fromTo(
          firstTextRef.current,
          { y: 48 },
          {
            ease: "none",
            scrollTrigger: {
              end: "45% top",
              scrub: 0.4,
              start: "top top",
              trigger: section,
            },
            y: -180,
          },
        );

        gsap.fromTo(
          analysisCardsRef.current,
          { y: 180 },
          {
            ease: "none",
            scrollTrigger: {
              end: "62% top",
              scrub: 0.4,
              start: "8% top",
              trigger: section,
            },
            y: -360,
          },
        );

        gsap.fromTo(
          firstMindsetCardRef.current,
          { y: 260 },
          {
            ease: "none",
            scrollTrigger: {
              end: "88% top",
              scrub: 0.4,
              start: "42% top",
              trigger: section,
            },
            y: 120,
          },
        );

        gsap.fromTo(
          secondMindsetCardRef.current,
          { y: 310 },
          {
            ease: "none",
            scrollTrigger: {
              end: "98% top",
              scrub: 0.4,
              start: "54% top",
              trigger: section,
            },
            y: -82,
          },
        );
      }
    },
    {
      dependencies: [isMediumLargeViewport, isMobileViewport, isXlViewport, reduceMotion],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  return (
    <section
      className="relative h-[220svh] bg-charcoal text-white"
      ref={sectionRef}
    >
      <div className="sticky top-0 isolate h-svh min-h-[760px] overflow-hidden">
        <video
          aria-hidden="true"
          autoPlay
          className="pointer-events-none absolute inset-0 size-full object-cover"
          key={videoSource}
          loop
          muted
          playsInline
          poster="/images/lifestyle-poster.svg"
          preload="metadata"
          ref={videoRef}
        >
          <source key={videoSource} src={videoSource} type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,18,0.12)_0%,rgba(18,19,18,0.48)_44%,rgba(18,19,18,0.9)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-black/10" />

        <div className="relative z-10 mx-auto grid h-full max-w-6xl items-center py-12 md:px-4">
          <div
            className="mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center text-center sm:max-w-3xl xl:max-w-6xl"
            ref={firstPanelRef}
          >
            <div
              className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-2xl"
              ref={firstTextRef}
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
            </div>

            <div className="mt-16 w-full xl:max-w-none" ref={analysisCardsRef}>
              <MediaCarousel align="start" cards={analysisCards} />
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-1/2 mx-auto flex w-full max-w-6xl -translate-y-1/2 flex-col items-center px-4 text-center"
            ref={secondPanelRef}
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
              <div
                className="pointer-events-none absolute left-10 top-[-210px] hidden xl:block lg:left-12"
                ref={firstMindsetCardRef}
              >
                <MindsetCardPanel
                  className="w-[360px] lg:w-[390px]"
                  card={mindsetCards[0]}
                />
              </div>
            ) : null}

            {mindsetCards[1] ? (
              <div
                className="pointer-events-none absolute right-10 top-[120px] hidden xl:block lg:right-12"
                ref={secondMindsetCardRef}
              >
                <MindsetCardPanel
                  className="w-[360px] lg:w-[390px]"
                  card={mindsetCards[1]}
                />
              </div>
            ) : null}
          </div>
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
