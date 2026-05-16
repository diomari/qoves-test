import type { MediaAsset } from "@/content/landing";
import { cn } from "@/lib/cn";

type VideoBackdropProps = {
  media?: MediaAsset;
  className?: string;
  overlayClassName?: string;
};

export function VideoBackdrop({
  media,
  className,
  overlayClassName
}: VideoBackdropProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {media?.type === "video" && media.src ? (
        <video
          className="size-full object-cover"
          poster={media.poster}
          preload="metadata"
          muted
          playsInline
          loop
          autoPlay
        >
          <source src={media.src} type="video/mp4" />
        </video>
      ) : media?.type === "video" && media.responsivePoster ? (
        <picture className="block size-full">
          <source
            media={`(min-width: ${media.responsivePoster.breakpoint ?? 768}px)`}
            srcSet={media.responsivePoster.desktop}
          />
          <img
            alt=""
            className="size-full object-cover"
            src={media.responsivePoster.mobile}
          />
        </picture>
      ) : media?.type === "video" && media.poster ? (
        <div
          className="size-full bg-cover bg-center"
          style={{ backgroundImage: `url(${media.poster})` }}
        />
      ) : media?.type === "image" ? (
        <div
          className="size-full bg-cover bg-center"
          style={{ backgroundImage: `url(${media.src})` }}
        />
      ) : (
        <div className="size-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.22),transparent_30%),linear-gradient(155deg,#8d918c_0%,#686d68_52%,#333634_100%)]" />
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(41,44,42,0.18)_0%,rgba(43,44,42,0.34)_48%,rgba(25,27,26,0.76)_100%)]",
          overlayClassName
        )}
      />
    </div>
  );
}
