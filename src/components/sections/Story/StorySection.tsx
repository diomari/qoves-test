"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { CTAButton } from "@/components/shared/CTAButton";
import { GlassPanel } from "@/components/shared/GlassPanel";
import { MediaCarousel } from "@/components/shared/MediaCarousel";
import { TextPill } from "@/components/shared/TextPill";
import {
  analysisCards,
  insecuritySection,
  mindsetCards,
  mindsetSection,
  type MindsetCard,
} from "@/content/landing";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import styles from "./StorySection.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function StorySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const mediaLayerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const firstPanelRef = useRef<HTMLDivElement | null>(null);
  const secondPanelRef = useRef<HTMLDivElement | null>(null);
  const mindsetRef = useRef<HTMLDivElement | null>(null);

  const desktopLeftRef = useRef<HTMLDivElement | null>(null);
  const desktopRightRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const isXlViewport = useIsXlViewport();
  const videoSource = useResponsiveStoryVideo(shouldLoadVideo && !reduceMotion);
  const posterSource =
    insecuritySection.media?.poster ?? "/images/lifestyle-poster.svg";

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || reduceMotion || shouldLoadVideo) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoadVideo(true);
        observer.disconnect();
      },
      {
        rootMargin: "320px 0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [reduceMotion, shouldLoadVideo]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const sticky = stickyRef.current;
      const mediaLayer = mediaLayerRef.current;
      const firstPanel = firstPanelRef.current;
      const secondPanel = secondPanelRef.current;
      const desktopLeft = desktopLeftRef.current;
      const desktopRight = desktopRightRef.current;
      const mindset = mindsetRef.current;

      if (!section || !sticky || !mediaLayer || !firstPanel || !secondPanel) {
        return;
      }

      const stickyHeight = sticky.clientHeight;
      const firstPanelHeight = firstPanel.offsetHeight;
      const firstPanelExitY = -(stickyHeight / 2 + firstPanelHeight / 2 + 100);
      const secondPanelEnterY = isXlViewport ? 72 : 48;

      gsap.killTweensOf([
        mediaLayer,
        firstPanel,
        secondPanel,
        desktopLeft,
        desktopRight,
        videoRef.current,
      ]);

      gsap.set(firstPanel, { autoAlpha: 1, y: 0 });
      gsap.set(secondPanel, { autoAlpha: reduceMotion ? 1 : 0, y: 0 });
      gsap.set(mediaLayer, { filter: "blur(0px)", scale: 1.02 });
      gsap.set(desktopLeft, { y: 0 });
      gsap.set(desktopRight, { y: 0 });

      if (reduceMotion) {
        gsap.set(
          [mediaLayer, firstPanel, secondPanel, desktopLeft, desktopRight],
          {
            clearProps: "filter,transform",
          },
        );
        return;
      }

      const storyTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          end: "bottom bottom",
          scrub: 0.3,
          start: "top top",
          trigger: section,
        },
      });

      storyTimeline
        .fromTo(
          firstPanel,
          { y: 0 },
          {
            duration: 0.58,
            y: firstPanelExitY,
          },
          0,
        )
        .fromTo(
          secondPanel,
          { autoAlpha: 0, y: secondPanelEnterY },
          {
            autoAlpha: 1,
            duration: 0.42,
            y: 0,
          },
          0.75,
        )
        .to(
          mediaLayer,
          {
            duration: 0.42,
            filter: "blur(40px)",
            scale: 1.08,
          },
          0.28,
        );

      storyTimeline.fromTo(
        mindset,
        { y: 100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        0,
      );

      if (desktopLeft) {
        storyTimeline.fromTo(
          desktopLeft,
          { y: 800 },
          {
            duration: 2,
            y: -120,
          },
          1,
        );
      }

      if (desktopRight) {
        storyTimeline.fromTo(
          desktopRight,
          { y: 500 },
          {
            duration: 2,
            y: 0,
          },
          1.8,
        );
      }
    },
    {
      dependencies: [reduceMotion],
      revertOnUpdate: true,
      scope: sectionRef,
    },
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.sticky} ref={stickyRef}>
        <div className={styles.backgroundMediaLayer} ref={mediaLayerRef}>
          {reduceMotion || !shouldLoadVideo ? (
            <Image
              alt=""
              aria-hidden="true"
              className={styles.backgroundMedia}
              fill
              sizes="100vw"
              src={posterSource}
            />
          ) : (
            <video
              aria-hidden="true"
              autoPlay
              className={styles.backgroundMedia}
              key={videoSource}
              loop
              muted
              playsInline
              poster={posterSource}
              preload="metadata"
              ref={videoRef}
            >
              <source key={videoSource} src={videoSource} type="video/mp4" />
            </video>
          )}
        </div>
        <div className={styles.overlayPrimary} />
        <div className={styles.overlaySecondary} />

        <div className={styles.container}>
          <div className={styles.firstPanel} ref={firstPanelRef}>
            <TextPill style="glass" className={styles.introPill}>
              {insecuritySection.eyebrow}
            </TextPill>
            <div className={styles.intro}>
              <h2 className={styles.introTitle}>{insecuritySection.heading}</h2>
              <p className={styles.introBody}>{insecuritySection.body}</p>
              {insecuritySection.cta ? (
                <div className={styles.mobileCta}>
                  <CTAButton href={insecuritySection.cta.href}>
                    {insecuritySection.cta.label}
                  </CTAButton>
                </div>
              ) : null}
            </div>

            <div className={styles.carouselWrap}>
              <MediaCarousel align="start" cards={analysisCards} />
            </div>
          </div>

          <div className={styles.secondPanel} ref={secondPanelRef}>
            <div className={styles.mindsetIntro} ref={mindsetRef}>
              <h2 className={styles.mindsetTitle}>
                {mindsetSection.heading}
                <span className={styles.mindsetTitleHighlight}>
                  {mindsetSection.headingHighlight}
                </span>
              </h2>
              <p className={styles.mindsetBody}>{mindsetSection.body}</p>
            </div>

            <div className={styles.mobileCards}>
              <div className={styles.mobileCardsTrack}>
                {mindsetCards.map((card) => (
                  <MindsetCardPanel
                    card={card}
                    className={styles.mobileMindsetCard}
                    key={card.title}
                  />
                ))}
              </div>
            </div>

            {mindsetCards[0] ? (
              <div className={styles.desktopLeft} ref={desktopLeftRef}>
                <MindsetCardPanel
                  card={mindsetCards[0]}
                  className={styles.desktopMindsetCard}
                />
              </div>
            ) : null}

            {mindsetCards[1] ? (
              <div className={styles.desktopRight} ref={desktopRightRef}>
                <MindsetCardPanel
                  card={mindsetCards[1]}
                  className={styles.desktopMindsetCard}
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
    <GlassPanel className={cn(styles.mindsetCard, className)}>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <div className={styles.cardItems}>
        {(card.items ?? []).map((item) => (
          <div className={styles.cardItem} key={item}>
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

function useResponsiveStoryVideo(enabled: boolean) {
  const [source, setSource] = useState("/videos/landing-video-xs.mp4");

  useEffect(() => {
    if (!enabled) {
      return;
    }

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
  }, [enabled]);

  return source;
}
