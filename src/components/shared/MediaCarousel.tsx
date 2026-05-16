"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

import type { CarouselCard } from "@/content/landing";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

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
    <div
      className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] xl:mx-0 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden"
      ref={rootRef}
    >
      <div
        className={cn(
          "flex w-max gap-3 xl:w-full",
          align === "start" ? "xl:justify-start" : "xl:justify-center",
        )}
      >
        {cards.map((card) => (
          <article
            className={cn(
              "flex min-h-[160px] w-[294px] shrink-0 flex-col justify-between overflow-hidden rounded-[7px] border p-3 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 sm:min-h-[176px] sm:w-[360px] xl:min-w-0 xl:flex-1 xl:basis-0 xl:shrink",
              tone === "dark"
                ? "border-white/18 bg-white/15 text-white shadow-[0_18px_54px_rgba(0,0,0,0.22)]"
                : "border-ink/10 bg-white text-ink shadow-[0_18px_42px_rgba(34,43,44,0.14)]",
            )}
            data-carousel-card
            key={card.title}
          >
            <div className="relative h-[82px] w-[120px] overflow-hidden rounded-[5px] bg-white/16">
              <Image
                alt={card.media.alt}
                className="size-full object-cover"
                height={82}
                src={card.media.src}
                unoptimized
                width={120}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-light leading-tight sm:text-xl">
                {card.title}
              </h3>
              <p
                className={cn(
                  "max-w-[22rem] text-[11px] leading-4",
                  tone === "dark" ? "text-white/70" : "text-ink/62",
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
