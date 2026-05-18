"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import type { CarouselCard } from "@/content/landing";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import styles from "./MediaCarousel.module.scss";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MediaCarouselProps = {
  cards: CarouselCard[];
  align?: "start" | "center";
  tone?: "light" | "dark";
};

export function MediaCarousel({
  align = "center",
  cards,
  tone = "dark",
}: MediaCarouselProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root || reduceMotion) {
        return;
      }

      const articles = gsap.utils.toArray<HTMLElement>("[data-carousel-card]", root);

      gsap.fromTo(
        articles,
        { autoAlpha: 0, x: 18 },
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            once: true,
            start: "top 90%",
            trigger: root,
          },
          x: 0,
        },
      );
    },
    { dependencies: [reduceMotion], revertOnUpdate: true, scope: rootRef },
  );

  return (
    <div className={styles.viewport} ref={rootRef}>
      <div
        className={cn(
          styles.track,
          align === "start" ? styles.alignStart : styles.alignCenter,
        )}
      >
        {cards.map((card) => (
          <article
            className={cn(
              styles.card,
              tone === "dark" ? styles.cardDark : styles.cardLight,
            )}
            data-carousel-card
            key={card.title}
          >
            <div className={styles.thumbnail}>
              <Image
                alt={card.media.alt}
                className={styles.mediaImage}
                height={82}
                src={card.media.src}
                unoptimized
                width={120}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{card.title}</h3>
              <p
                className={cn(
                  styles.body,
                  tone === "dark" ? styles.bodyDark : styles.bodyLight,
                )}
              >
                {card.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
