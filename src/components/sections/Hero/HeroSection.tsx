import { getImageProps } from "next/image";
import { preload } from "react-dom";

import { HeroSvgPanels, type HeroSvgPanel } from "./HeroSvgPanels";
import { TextPill } from "@/components/shared/TextPill";
import { heroContent, type SectionContent } from "@/content/landing";

import styles from "./HeroSection.module.scss";

const heroPanels = [
  {
    className: styles.curveChartPanel,
    id: "curve-chart",
  },
  {
    className: styles.levelPanel,
    id: "level",
  },
  {
    className: styles.squareChartPanel,
    id: "square-chart",
  },
  {
    className: styles.blocksPanel,
    id: "blocks",
  },
  {
    className: styles.togglePanel,
    id: "toggle",
  },
  {
    className: styles.scatterPlotPanel,
    id: "scatter-plot",
  },
] satisfies HeroSvgPanel[];

export function HeroSection() {
  const content = heroContent;

  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.gradientBase} />
      <div aria-hidden="true" className={styles.gradientGlow} />
      <div aria-hidden="true" className={styles.gradientHighlight} />
      <div aria-hidden="true" className={styles.gradientShade} />

      <div className={styles.container}>
        <TextPill style="outline" className={styles.pill}>
          {content.eyebrow}
        </TextPill>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {content.heading}{" "}
            {content.headingHighlight ? (
              <span className={styles.titleHighlight}>
                {content.headingHighlight}
              </span>
            ) : null}
          </h1>
          <p className={styles.body}>{content.body}</p>
        </div>

        <div className={styles.figureWrap}>
          <HeroSvgPanels panels={heroPanels} />
          <HeroFigure media={content.media} />
        </div>
      </div>
    </section>
  );
}

function HeroFigure({ media }: { media?: SectionContent["media"] }) {
  if (!media?.src || !media.width || !media.height || media.type !== "image") {
    return null;
  }

  const imageSizes = "(min-width: 768px) 760px, 360px";
  const responsiveSources = media.responsiveSources ?? [];
  const desktopSource = responsiveSources.find(
    (source) => source.media === "(min-width: 1280px)",
  );
  const tabletSource = responsiveSources.find(
    (source) => source.media === "(min-width: 768px)",
  );

  const { props: { srcSet: desktopSrcSet } = {} } = desktopSource
    ? getImageProps({
        alt: media.alt,
        height: desktopSource.height,
        priority: media.priority,
        sizes: imageSizes,
        src: desktopSource.src,
        width: desktopSource.width,
      })
    : { props: {} };

  const { props: { srcSet: tabletSrcSet } = {} } = tabletSource
    ? getImageProps({
        alt: media.alt,
        height: tabletSource.height,
        priority: media.priority,
        sizes: imageSizes,
        src: tabletSource.src,
        width: tabletSource.width,
      })
    : { props: {} };

  const { props: mobileImageProps } = getImageProps({
    alt: media.alt,
    height: media.height,
    priority: media.priority,
    sizes: imageSizes,
    src: media.src,
    width: media.width,
  });

  if (media.priority) {
    preload(media.src, {
      as: "image",
      fetchPriority: "high",
      imageSizes,
      imageSrcSet: mobileImageProps.srcSet,
    });
  }

  return (
    <div className={styles.figure}>
      <picture className={styles.figurePicture}>
        {desktopSrcSet ? (
          <source media="(min-width: 1280px)" srcSet={desktopSrcSet} />
        ) : null}
        {tabletSrcSet ? (
          <source media="(min-width: 768px)" srcSet={tabletSrcSet} />
        ) : null}
        <img
          {...mobileImageProps}
          alt={media.alt ?? "Facial analysis portrait"}
          className={styles.figureImage}
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </picture>
    </div>
  );
}
