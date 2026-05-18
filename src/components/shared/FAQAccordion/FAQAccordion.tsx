"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Plus, X, Minus } from "lucide-react";

import type { FAQGroup } from "@/content/landing";
import { cn } from "@/lib/cn";
import { ppNeueMontrealMedium } from "@/lib/fonts";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import styles from "./FAQAccordion.module.scss";

gsap.registerPlugin(useGSAP);

type FAQAccordionProps = {
  groups: FAQGroup[];
};

const FAQ_SCROLL_DURATION = 260;

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
  const pendingSnapGroupRef = useRef<number | null>(null);

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
    <div className={styles.root}>
      {groups.map((group, groupIndex) => {
        const isGroupOpen = openGroup === groupIndex;

        return (
          <div
            className={cn(styles.group, isGroupOpen && styles.groupOpen)}
            key={group.title}
            ref={(element) => {
              groupRefs.current[groupIndex] = element;
            }}
          >
            <button
              aria-expanded={isGroupOpen}
              className={cn(
                ppNeueMontrealMedium.className,
                styles.groupButton,
                isGroupOpen && styles.groupButtonOpen,
              )}
              onClick={() => {
                const nextGroup = isGroupOpen ? -1 : groupIndex;
                setOpenGroup(nextGroup);
                setOpenItem(0);

                if (nextGroup === -1) {
                  pendingSnapGroupRef.current = null;
                  return;
                }

                if (reduceMotion) {
                  window.requestAnimationFrame(() => snapToGroup(groupIndex));
                  return;
                }

                pendingSnapGroupRef.current = groupIndex;
              }}
              type="button"
            >
              <span className={styles.groupTitle}>{group.title}</span>
              <span aria-hidden="true" className={styles.groupToggle}>
                {isGroupOpen ? (
                  <X className={styles.iconCancel} size={16} />
                ) : (
                  <Plus className={styles.iconPlus} size={16} />
                )}
              </span>
            </button>

            <AnimatedCollapse
              closeDuration={0.5}
              onOpenComplete={() => {
                if (pendingSnapGroupRef.current === groupIndex) {
                  pendingSnapGroupRef.current = null;
                  snapToGroup(groupIndex);
                }
              }}
              open={isGroupOpen}
              openDuration={0.75}
              reduceMotion={reduceMotion}
            >
              <div className={styles.groupItems}>
                {group.items.map((item, itemIndex) => {
                  const isItemOpen = isGroupOpen && openItem === itemIndex;
                  const panelId = `faq-panel-${groupIndex}-${itemIndex}`;
                  const buttonId = `faq-button-${groupIndex}-${itemIndex}`;

                  return (
                    <div
                      className={cn(styles.item, isItemOpen && styles.itemOpen)}
                      key={item.question}
                    >
                      <button
                        aria-controls={panelId}
                        aria-expanded={isItemOpen}
                        className={styles.itemButton}
                        id={buttonId}
                        onClick={() => setOpenItem(isItemOpen ? -1 : itemIndex)}
                        type="button"
                      >
                        <span>{item.question}</span>
                        <span className={styles.overlay}></span>
                        <span aria-hidden="true" className={styles.itemToggle}>
                          {isItemOpen ? (
                            <Minus size={16} />
                          ) : (
                            <Plus size={16} />
                          )}
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
                          className={styles.answer}
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
  onOpenComplete,
  open,
  openDuration = 0.22,
  reduceMotion,
}: {
  children: React.ReactNode;
  closeDuration?: number;
  onOpenComplete?: () => void;
  open: boolean;
  openDuration?: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);
  const onOpenCompleteRef = useRef(onOpenComplete);

  useEffect(() => {
    onOpenCompleteRef.current = onOpenComplete;
  }, [onOpenComplete]);

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
        if (open) {
          onOpenCompleteRef.current?.();
        }
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
            onComplete: () => {
              gsap.set(element, { clearProps: "height" });
              onOpenCompleteRef.current?.();
            },
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
      className={styles.collapse}
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
