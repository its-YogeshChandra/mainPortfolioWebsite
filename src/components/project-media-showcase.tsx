"use client";

import { useCallback, useEffect, useState } from "react";
import type { ProjectMedia } from "@/lib/projects";

type ProjectMediaShowcaseProps = {
  media: ProjectMedia[];
  title: string;
};

const IMAGE_AUTO_CHANGE_MS = 10000;

export function ProjectMediaShowcase({ media, title }: ProjectMediaShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleMedia = media.length > 1;
  const activeMedia = media[activeIndex] ?? media[0];

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? media.length - 1 : currentIndex - 1,
    );
  }, [media.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!hasMultipleMedia || activeMedia?.type !== "image") {
      return;
    }

    const timeoutId = window.setTimeout(showNext, IMAGE_AUTO_CHANGE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeMedia?.type, hasMultipleMedia, showNext]);

  return (
    <div className="col-span-12 overflow-hidden border border-[#e5e7eb] bg-white transition-colors dark:border-[#262626] dark:bg-[#171717]">
      <div className="relative bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <ProjectMediaItem
          media={activeMedia}
          title={`${title} media ${activeIndex + 1}`}
          onVideoEnded={showNext}
        />

        {hasMultipleMedia ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous project media"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center border border-[#d4d4d4] bg-white/90 text-xl font-medium text-[#171717] transition-colors hover:bg-white dark:border-[#525252] dark:bg-[#171717]/90 dark:text-[#f5f5f5] dark:hover:bg-[#262626]"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next project media"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center border border-[#d4d4d4] bg-white/90 text-xl font-medium text-[#171717] transition-colors hover:bg-white dark:border-[#525252] dark:bg-[#171717]/90 dark:text-[#f5f5f5] dark:hover:bg-[#262626]"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {hasMultipleMedia ? (
        <div className="flex items-center justify-between gap-4 border-t border-[#e5e7eb] px-4 py-3 dark:border-[#262626]">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#737373] dark:text-[#a3a3a3]">
            {activeIndex + 1} / {media.length}
          </p>
          <div className="flex gap-2">
            {media.map((item, index) => (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show project media ${index + 1}`}
                aria-current={index === activeIndex}
                className={`size-2 rounded-full transition-colors ${
                  index === activeIndex
                    ? "bg-[#171717] dark:bg-[#f5f5f5]"
                    : "bg-[#d4d4d4] hover:bg-[#737373] dark:bg-[#525252] dark:hover:bg-[#a3a3a3]"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectMediaItem({
  media,
  title,
  className = "w-full max-h-[720px] object-contain",
  onVideoEnded,
}: {
  media: ProjectMedia;
  title: string;
  className?: string;
  onVideoEnded?: () => void;
}) {
  if (media.type === "embed") {
    return (
      <iframe
        src={media.src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full border-0"
      />
    );
  }

  if (media.type === "video") {
    return (
      <video
        src={media.src}
        autoPlay
        controls
        muted
        playsInline
        preload="metadata"
        onEnded={onVideoEnded}
        className={className}
      />
    );
  }

  return <img src={media.src} alt={title} className={className} />;
}
