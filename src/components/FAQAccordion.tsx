"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

import type { FAQGroup } from "@/content/landing";
import { cn } from "@/lib/cn";

type FAQAccordionProps = {
  groups: FAQGroup[];
};

const FAQ_SCROLL_DURATION = 880;

export function FAQAccordion({ groups }: FAQAccordionProps) {
  const initialGroup = Math.max(
    0,
    groups.findIndex((group) => group.defaultOpen)
  );
  const [openGroup, setOpenGroup] = useState(initialGroup);
  const [openItem, setOpenItem] = useState(0);
  const reduceMotion = useReducedMotion();
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
        behavior: "auto"
      });
      return;
    }

    animateScrollToElement(groupElement, animationFrameRef);
  }

  return (
    <div className="space-y-2">
      {groups.map((group, groupIndex) => {
        const isGroupOpen = openGroup === groupIndex;

        return (
          <div
            className={cn(
              "overflow-hidden border-b border-ink/10",
              isGroupOpen &&
                "rounded-[7px] border border-white/30 bg-[#95a4a5] p-2 shadow-[0_18px_50px_rgba(31,43,45,0.2)]"
            )}
            key={group.title}
            ref={(element) => {
              groupRefs.current[groupIndex] = element;
            }}
          >
            <button
              aria-expanded={isGroupOpen}
              className={cn(
                "flex min-h-14 w-full items-center justify-between px-3 text-left text-sm font-medium text-ink transition",
                isGroupOpen && "min-h-10 text-white"
              )}
              onClick={() => {
                setOpenGroup(isGroupOpen ? -1 : groupIndex);
                setOpenItem(0);
                window.requestAnimationFrame(() => snapToGroup(groupIndex));
              }}
              type="button"
            >
              <span>{group.title}</span>
              <span aria-hidden="true" className="text-base font-light">
                {isGroupOpen ? "x" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isGroupOpen ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="space-y-1.5 pt-1">
                    {group.items.map((item, itemIndex) => {
                      const isItemOpen = openItem === itemIndex;
                      const panelId = `faq-panel-${groupIndex}-${itemIndex}`;
                      const buttonId = `faq-button-${groupIndex}-${itemIndex}`;

                      return (
                        <div
                          className={cn(
                            "rounded-[5px] border border-white/10 bg-white/8 text-white",
                            isItemOpen && "bg-white/14"
                          )}
                          key={item.question}
                        >
                          <button
                            aria-controls={panelId}
                            aria-expanded={isItemOpen}
                            className="flex min-h-10 w-full items-center justify-between gap-4 px-3 text-left text-[13px] font-medium"
                            id={buttonId}
                            onClick={() =>
                              setOpenItem(isItemOpen ? -1 : itemIndex)
                            }
                            type="button"
                          >
                            <span>{item.question}</span>
                            <span aria-hidden="true" className="text-lg font-light">
                              {isItemOpen ? "-" : "+"}
                            </span>
                          </button>
                          <AnimatePresence initial={false}>
                            {isItemOpen ? (
                              <motion.div
                                animate={{ height: "auto", opacity: 1 }}
                                aria-labelledby={buttonId}
                                className="overflow-hidden"
                                exit={{ height: 0, opacity: 0 }}
                                id={panelId}
                                initial={
                                  reduceMotion ? false : { height: 0, opacity: 0 }
                                }
                                role="region"
                                transition={{
                                  duration: 0.24,
                                  ease: [0.22, 1, 0.36, 1]
                                }}
                              >
                                <p className="px-3 pb-4 text-[12px] leading-5 text-white/78">
                                  {item.answer}
                                </p>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function animateScrollToElement(
  element: HTMLElement,
  animationFrameRef: React.MutableRefObject<number | null>
) {
  const startY = window.scrollY;
  const startTime = performance.now();

  function step(timestamp: number) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / FAQ_SCROLL_DURATION, 1);
    const targetY = getElementTop(element) - getSnapOffset();
    const nextY = startY + (targetY - startY) * easeOutCubic(progress);

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

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}
