import type { MediaAsset } from "@/content/landing";
import { cn } from "@/lib/cn";

import styles from "./VideoBackdrop.module.scss";

type VideoBackdropProps = {
  media?: MediaAsset;
  className?: string;
  overlayClassName?: string;
};

export function VideoBackdrop({
  media,
  className,
  overlayClassName,
}: VideoBackdropProps) {
  return (
    <div aria-hidden="true" className={cn(styles.root, className)}>
      {media?.type === "video" && media.src ? (
        <video
          autoPlay
          className={styles.media}
          loop
          muted
          playsInline
          poster={media.poster}
          preload="metadata"
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : media?.type === "video" && media.responsivePoster ? (
        <picture className={styles.picture}>
          <source
            media={`(min-width: ${media.responsivePoster.breakpoint ?? 768}px)`}
            srcSet={media.responsivePoster.desktop}
          />
          <img alt="" className={styles.media} src={media.responsivePoster.mobile} />
        </picture>
      ) : media?.type === "video" && media.poster ? (
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${media.poster})` }}
        />
      ) : media?.type === "image" ? (
        <div
          className={styles.poster}
          style={{ backgroundImage: `url(${media.src})` }}
        />
      ) : (
        <div className={styles.fallback} />
      )}
      <div className={cn(styles.overlay, overlayClassName)} />
    </div>
  );
}
