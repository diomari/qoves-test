"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import type { CarouselCard } from "@/content/landing";
import { cn } from "@/lib/cn";

type MediaCarouselProps = {
  cards: CarouselCard[];
  tone?: "light" | "dark";
};

export function MediaCarousel({ cards, tone = "dark" }: MediaCarouselProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-3">
        {cards.map((card, index) => (
          <motion.article
            className={cn(
              "min-h-[168px] w-[172px] shrink-0 overflow-hidden rounded-[7px] border backdrop-blur-xl sm:w-[220px]",
              tone === "dark"
                ? "border-white/18 bg-white/15 text-white"
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
            <div className="relative h-20 overflow-hidden bg-white/16">
              <Image
                alt={card.media.alt}
                className="size-full object-cover"
                height={160}
                src={card.media.src}
                unoptimized
                width={344}
              />
            </div>
            <div className="space-y-2 p-3">
              <h3 className="text-sm font-medium leading-tight">{card.title}</h3>
              <p
                className={cn(
                  "text-[11px] leading-4",
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
