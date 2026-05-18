"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const element = ref.current;

      if (!element || reduceMotion) {
        return;
      }

      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          delay,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            once: true,
            start: "top 88%",
            trigger: element,
          },
          y: 0,
        },
      );
    },
    { dependencies: [delay, reduceMotion], revertOnUpdate: true, scope: ref },
  );

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
