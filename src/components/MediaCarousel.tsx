"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import type { CarouselCard } from "@/content/landing";
import { cn } from "@/lib/cn";

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
  const reduceMotion = useReducedMotion();

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] xl:mx-0 xl:overflow-visible xl:px-0 [&::-webkit-scrollbar]:hidden">
      <div
        className={cn(
          "flex w-max gap-3 xl:w-full xl:gap-6",
          align === "start" ? "xl:justify-start" : "xl:justify-center",
        )}
      >
        {cards.map((card, index) => (
          <motion.article
            className={cn(
              "flex min-h-[160px] w-[294px] shrink-0 flex-col justify-between overflow-hidden rounded-[7px] border p-3 text-left backdrop-blur-xl sm:min-h-[176px] sm:w-[360px] xl:min-h-[212px] xl:min-w-0 xl:flex-1 xl:basis-0 xl:shrink xl:px-5 xl:py-4",
              tone === "dark"
                ? "border-white/18 bg-white/15 text-white shadow-[0_18px_54px_rgba(0,0,0,0.22)]"
                : "border-ink/10 bg-white text-ink shadow-[0_18px_42px_rgba(34,43,44,0.14)]"
            )}
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            key={card.title}
            transition={{
              duration: 0.5,
              delay: index * 0.06,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true, margin: "-10% 0px" }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
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
            <div className="space-y-2 text-left">
              <h3 className="text-lg font-light leading-tight sm:text-xl">
                {card.title}
              </h3>
              <p
                className={cn(
                  "max-w-[22rem] text-[11px] leading-4",
                  tone === "dark" ? "text-white/70" : "text-ink/62"
                )}
              >
                {card.body}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
