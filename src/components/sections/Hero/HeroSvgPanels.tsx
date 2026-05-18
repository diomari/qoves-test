"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { ComponentType, SVGProps } from "react";
import { useRef } from "react";

import Blocks from "./hero-svg/components/Blocks";
import CurveChart from "./hero-svg/components/CurveChart";
import Level from "./hero-svg/components/Level";
import ScatterPlot from "./hero-svg/components/ScatterPlot";
import SquareChart from "./hero-svg/components/SquareChart";
import Toggle from "./hero-svg/components/Toggle";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

import styles from "./HeroSvgPanels.module.scss";

gsap.registerPlugin(useGSAP);

const heroPanelComponents = {
  blocks: Blocks,
  "curve-chart": CurveChart,
  level: Level,
  "scatter-plot": ScatterPlot,
  "square-chart": SquareChart,
  toggle: Toggle,
} satisfies Record<string, ComponentType<SVGProps<SVGSVGElement>>>;

export type HeroPanelId = keyof typeof heroPanelComponents;

export type HeroSvgPanel = {
  className: string;
  id: HeroPanelId;
};

type HeroSvgPanelsProps = {
  panels: HeroSvgPanel[];
};

export function HeroSvgPanels({ panels }: HeroSvgPanelsProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      const panelElements = gsap.utils.toArray<HTMLElement>(
        "[data-hero-panel]",
        root,
      );

      gsap.set(panelElements, { autoAlpha: 1, clearProps: "transform" });

      if (reduceMotion) {
        return;
      }

      const cleanups: Array<() => void> = [];

      panelElements.forEach((panel) => {
        const siblingPanels = panelElements.filter((item) => item !== panel);
        const svg = panel.querySelector<SVGSVGElement>("svg");
        const panelId = panel.dataset.panelId as HeroPanelId | undefined;

        if (!svg || !panelId) {
          return;
        }

        const svgElements = gsap.utils.toArray<SVGElement>(
          "path, rect, line, circle, ellipse, polygon, polyline, text",
          svg,
        );
        const animatedElements = svgElements.slice(2);

        gsap.set(svgElements, {
          transformOrigin: "center center",
        });

        const timeline = gsap.timeline({
          defaults: { ease: "power2.out", overwrite: "auto" },
          paused: true,
        });

        timeline
          .to(
            siblingPanels,
            {
              autoAlpha: 0.58,
              duration: 0.22,
              filter: "blur(1.5px)",
            },
            0,
          )
          .to(
            panel,
            {
              duration: 0.34,
              filter: "drop-shadow(0 18px 24px rgba(40, 52, 56, 0.2))",
              scale: 1.025,
              zIndex: 20,
            },
            0,
          )
          .to(
            svg,
            {
              duration: 0.22,
              opacity: 1,
            },
            0,
          );

        addInlineSvgHoverAnimation({
          elements: animatedElements,
          panel,
          panelId,
          timeline,
        });

        const play = () => timeline.play();
        const reverse = () => timeline.reverse();

        panel.addEventListener("pointerenter", play);
        panel.addEventListener("pointerleave", reverse);

        cleanups.push(() => {
          panel.removeEventListener("pointerenter", play);
          panel.removeEventListener("pointerleave", reverse);
          timeline.kill();
        });
      });

      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    },
    { dependencies: [reduceMotion], revertOnUpdate: true, scope: rootRef },
  );

  return (
    <div aria-hidden="true" className={styles.root} ref={rootRef}>
      {panels.map((panel) => {
        const PanelComponent = heroPanelComponents[panel.id];

        return (
          <div
            className={cn(styles.panel, panel.className)}
            data-hero-panel
            data-panel-id={panel.id}
            key={panel.id}
          >
            <PanelComponent
              aria-hidden="true"
              className={styles.panelSvg}
            />
          </div>
        );
      })}
    </div>
  );
}

function addInlineSvgHoverAnimation({
  elements,
  panel,
  panelId,
  timeline,
}: {
  elements: SVGElement[];
  panel: HTMLElement;
  panelId: HeroPanelId;
  timeline: gsap.core.Timeline;
}) {
  if (panelId === "curve-chart") {
    const backFill = panel.querySelector<SVGElement>(
      "[data-curve-fill-back]",
    );
    const frontFill = panel.querySelector<SVGElement>(
      "[data-curve-fill-front]",
    );
    const line = panel.querySelector<SVGElement>("[data-curve-line]");
    const highlight = panel.querySelector<SVGElement>(
      "[data-curve-highlight]",
    );
    const guide = panel.querySelector<SVGElement>("[data-curve-guide]");
    const activeMarker = panel.querySelector<SVGElement>(
      "[data-curve-marker-active]",
    );
    const highlightMarker = panel.querySelector<SVGElement>(
      "[data-curve-marker-highlight]",
    );
    const passiveMarkers = gsap.utils.toArray<SVGElement>(
      "[data-curve-marker-passive]",
      panel,
    );

    if (
      !backFill ||
      !frontFill ||
      !line ||
      !highlight ||
      !guide ||
      !activeMarker ||
      !highlightMarker
    ) {
      return;
    }

    timeline
      .to(backFill, { duration: 0.34, opacity: 0.7, y: -4 }, 0)
      .to(frontFill, { duration: 0.4, opacity: 0.94, y: -10 }, 0.02)
      .to(line, { duration: 0.38, scaleX: 1.015, y: -7 }, 0)
      .to(highlight, { duration: 0.38, scale: 1.04, x: 4, y: -7 }, 0.05)
      .to(guide, { duration: 0.28, opacity: 1, scaleY: 1.16, y: -3 }, 0.08)
      .to(activeMarker, { duration: 0.26, scale: 1.18, y: -6 }, 0.08)
      .to(highlightMarker, { duration: 0.26, scale: 1.2, y: -6 }, 0.08)
      .to(passiveMarkers, { duration: 0.22, opacity: 0.6 }, 0);

    return;
  }

  if (!elements.length) {
    return;
  }

  if (panelId === "square-chart") {
    const blocks = gsap.utils.toArray<SVGElement>("g[opacity] rect", panel);

    timeline.to(
      blocks,
      {
        duration: 0.3,
        opacity: 1,
        scale: 1.14,
        stagger: { amount: 0.24, from: "center" },
      },
      0.02,
    );

    return;
  }

  if (panelId === "blocks") {
    const blocks = gsap.utils.toArray<SVGElement>("path[fill], rect", panel);

    timeline
      .to(
        blocks.slice(8, 32),
        {
          duration: 0.32,
          opacity: 1,
          scale: 1.1,
          stagger: { amount: 0.22, from: "center" },
        },
        0.02,
      )
      .to(blocks.slice(-5), { duration: 0.32, x: 7, opacity: 0.94 }, 0.05);

    return;
  }

  if (panelId === "level") {
    const meterParts = gsap.utils.toArray<SVGElement>(
      "g > path, g > rect",
      panel,
    );

    timeline
      .to(
        meterParts.slice(2, 12),
        {
          duration: 0.34,
          opacity: 1,
          scaleY: 1.08,
          stagger: 0.018,
          y: -2,
        },
        0.02,
      )
      .to(meterParts.slice(-3), { duration: 0.34, x: 10, opacity: 1 }, 0.05);

    return;
  }

  if (panelId === "scatter-plot") {
    const points = gsap.utils.toArray<SVGElement>(
      "circle, rect[fill='white'], path[fill='white']",
      panel,
    );
    const guides = gsap.utils.toArray<SVGElement>(
      "path[stroke], line, rect[stroke]",
      panel,
    );

    timeline
      .to(guides, { duration: 0.28, opacity: 0.78, x: 3 }, 0)
      .to(
        points,
        {
          duration: 0.34,
          opacity: 1,
          scale: 1.15,
          stagger: { amount: 0.18, from: "end" },
          x: 4,
          y: -4,
        },
        0.05,
      );

    return;
  }

  if (panelId === "toggle") {
    const bars = gsap.utils.toArray<SVGElement>("rect, path", panel);

    timeline
      .to(
        bars.slice(3, 16),
        {
          duration: 0.32,
          opacity: 1,
          stagger: 0.016,
          x: 8,
        },
        0.02,
      )
      .to(bars.slice(-8), { duration: 0.32, opacity: 0.92, y: -5 }, 0.08);

    return;
  }

  timeline.to(
    elements,
    {
      duration: 0.32,
      opacity: 1,
      stagger: { amount: 0.18, from: "center" },
      y: -4,
    },
    0.04,
  );
}
