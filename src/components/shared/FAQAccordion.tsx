"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

import type { FAQGroup } from "@/content/landing";
import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP);

type FAQAccordionProps = {
  groups: FAQGroup[];
};

const FAQ_SCROLL_DURATION = 380;

export function FAQAccordion({ groups }: FAQAccordionProps) {
  const initialGroup = Math.max(
    0,
    groups.findIndex((group) => group.defaultOpen),
  );
  const [openGroup, setOpenGroup] = useState(initialGroup);
  const [openItem, setOpenItem] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const groupRefs = useRef<Array<HTMLDivElement | null>>([]);
  const animationFrameRef = useRef<number | null>(null);

  function snapToGroup(groupIndex: number) {
    const groupElement = groupRefs.current[groupIndex];

    if (!groupElement) {
      return;
    }

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    if (reduceMotion) {
      window.scrollTo({
        top: getElementTop(groupElement) - getSnapOffset(),
        behavior: "auto",
      });
      return;
    }

    animateScrollToElement(groupElement, animationFrameRef);
  }

  return (
    <div>
      {groups.map((group, groupIndex) => {
        const isGroupOpen = openGroup === groupIndex;

        return (
          <div
            className={cn(
              "cursor-pointer overflow-hidden border-b border-ink/10 transition duration-200 hover:bg-black/3",
              isGroupOpen &&
                "rounded-[7px] border border-white/30 bg-[linear-gradient(180deg,#788588_0%,#95a6a9_48%,#b7c8cb_100%)] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_18px_50px_rgba(31,43,45,0.2)] hover:brightness-95",
            )}
            key={group.title}
            ref={(element) => {
              groupRefs.current[groupIndex] = element;
            }}
          >
            <button
              aria-expanded={isGroupOpen}
              className={cn(
                ppNeueMontrealMedium.className,
                "cursor-pointer flex min-h-14 w-full items-center justify-between px-3 text-left text-sm text-ink transition",
                isGroupOpen && "min-h-10 text-white",
              )}
              onClick={() => {
                setOpenGroup(isGroupOpen ? -1 : groupIndex);
                setOpenItem(0);
                window.requestAnimationFrame(() => snapToGroup(groupIndex));
              }}
              type="button"
            >
              <span className="text-[20px]">{group.title}</span>
              <span aria-hidden="true" className="text-base font-light">
                {isGroupOpen ? "x" : "+"}
              </span>
            </button>

            <AnimatedCollapse
              closeDuration={0.24}
              open={isGroupOpen}
              openDuration={0.8}
              reduceMotion={reduceMotion}
            >
              <div className="space-y-1.5 pt-1">
                {group.items.map((item, itemIndex) => {
                  const isItemOpen = isGroupOpen && openItem === itemIndex;
                  const panelId = `faq-panel-${groupIndex}-${itemIndex}`;
                  const buttonId = `faq-button-${groupIndex}-${itemIndex}`;

                  return (
                    <div
                      className={cn(
                        "rounded-[5px] border border-white/10 bg-white/8 text-white",
                        isItemOpen && "bg-white/14",
                      )}
                      key={item.question}
                    >
                      <button
                        aria-controls={panelId}
                        aria-expanded={isItemOpen}
                        className={cn(
                          "flex min-h-10 w-full items-center justify-between gap-4 px-3 text-left text-[13px]",
                          isItemOpen && "text-white",
                        )}
                        id={buttonId}
                        onClick={() => setOpenItem(isItemOpen ? -1 : itemIndex)}
                        type="button"
                      >
                        <span>{item.question}</span>
                        <span aria-hidden="true" className="text-lg font-light">
                          {isItemOpen ? "-" : "+"}
                        </span>
                      </button>
                      <AnimatedCollapse
                        closeDuration={0.2}
                        open={isItemOpen}
                        openDuration={1}
                        reduceMotion={reduceMotion}
                      >
                        <p
                          aria-labelledby={buttonId}
                          className="px-3 pb-4 text-[12px] leading-5 text-white/78"
                          id={panelId}
                          role="region"
                        >
                          {item.answer}
                        </p>
                      </AnimatedCollapse>
                    </div>
                  );
                })}
              </div>
            </AnimatedCollapse>
          </div>
        );
      })}
    </div>
  );
}

function AnimatedCollapse({
  children,
  closeDuration = 0.18,
  open,
  openDuration = 0.22,
  reduceMotion,
}: {
  children: React.ReactNode;
  closeDuration?: number;
  open: boolean;
  openDuration?: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  useGSAP(
    () => {
      const element = ref.current;

      if (!element) {
        return;
      }

      gsap.killTweensOf(element);

      if (!initializedRef.current || reduceMotion) {
        gsap.set(element, {
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        });
        initializedRef.current = true;
        return;
      }

      if (open) {
        const openDescendants = element.querySelectorAll<HTMLElement>(
          '[data-faq-collapse][data-faq-open="true"]',
        );

        gsap.set(openDescendants, { height: "auto", opacity: 1 });
        gsap.set(element, { height: "auto", opacity: 1 });

        const targetHeight = element.scrollHeight;

        gsap.fromTo(
          element,
          { height: 0, opacity: 0.98 },
          {
            duration: openDuration,
            ease: "power3.out",
            height: targetHeight,
            opacity: 1,
            onComplete: () => gsap.set(element, { clearProps: "height" }),
          },
        );
        return;
      }

      gsap.to(element, {
        duration: closeDuration,
        ease: "power2.inOut",
        height: 0,
        opacity: 0,
      });
    },
    {
      dependencies: [closeDuration, open, openDuration, reduceMotion],
      revertOnUpdate: false,
      scope: ref,
    },
  );

  return (
    <div
      aria-hidden={!open}
      className="overflow-hidden will-change-[height,opacity]"
      data-faq-collapse
      data-faq-open={open ? "true" : "false"}
      ref={ref}
    >
      {children}
    </div>
  );
}

function animateScrollToElement(
  element: HTMLElement,
  animationFrameRef: React.MutableRefObject<number | null>,
) {
  const startY = window.scrollY;
  const startTime = performance.now();

  function step(timestamp: number) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / FAQ_SCROLL_DURATION, 1);
    const targetY = getElementTop(element) - getSnapOffset();
    const nextY = startY + (targetY - startY) * easeOutQuart(progress);

    window.scrollTo(0, nextY);

    if (progress < 1) {
      animationFrameRef.current = window.requestAnimationFrame(step);
      return;
    }

    animationFrameRef.current = null;
  }

  animationFrameRef.current = window.requestAnimationFrame(step);
}

function getElementTop(element: HTMLElement) {
  return element.getBoundingClientRect().top + window.scrollY;
}

function getSnapOffset() {
  return window.innerWidth < 640 ? 84 : 112;
}

function easeOutQuart(value: number) {
  return 1 - Math.pow(1 - value, 4);
}
