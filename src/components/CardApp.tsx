import useScreenshots from "@/hooks/useScreenshots";
import type { AppItem } from "@/types/app";
import { Link } from "react-router";
import { cn, resizeImageUrl } from "@/lib/utils";
import { memo } from "react";

import AppScreenshotContainer from "./AppScreenshotContainer";
import { AppScreenshot } from "./AppScreenshot";

export default memo(function CardApp({ app }: { app: AppItem }) {
  const { repository, manifest } = app;
  const { name, description } = manifest!;
  const isSpotApp = repository.topics?.includes("pwa-spot");
  const image = new URL("pwa-192x192.png", manifest!._meta.manifestUrl).href;
  const slides = useScreenshots(app);
  return (
    <Link
      to={`/apps/${repository.name.replace(/^pwa-/, "")}`}
      className="flex flex-col gap-1"
      title={`${name} - ${description}`}
    >
      <div className="flex gap-2 items-center">
        {/* App Icon */}
        <img
          src={resizeImageUrl({ url: image, size: 96 })}
          alt={name}
          className="size-12 shrink-0  rounded-lg"
        />

        <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
          {/* App Name */}
          <h1
            className={cn("font-bold leading-none truncate", "max-md:text-xs")}
          >
            {name}
          </h1>

          {/* App Description */}
          <p
            className={cn(
              "text-xs leading-none truncate",
              "text-stone-600 dark:text-stone-400"
            )}
          >
            {description}
          </p>

          {isSpotApp && <span className="text-xs text-orange-500">SPOT</span>}
        </div>
      </div>

      <AppScreenshotContainer className="rounded-2xl">
        {slides?.map((slide, i) => (
          <AppScreenshot
            key={i}
            {...slide}
            src={resizeImageUrl({ url: slide.src, height: 416 })}
          />
        ))}
      </AppScreenshotContainer>
    </Link>
  );
});
