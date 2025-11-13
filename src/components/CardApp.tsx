import useScreenshots from "@/hooks/useScreenshots";
import type { AppItem } from "@/types/app";
import { Link } from "react-router";
import { cn, resizeImageUrl } from "@/lib/utils";
import { memo } from "react";

import { AppPhotoAlbum } from "./AppPhotoAlbum";

const MAX_IMAGES_PREVIEW = 3;
const MAX_IMAGES_COLUMN = 2;

export default memo(function CardApp({ app }: { app: AppItem }) {
  const { repository, manifest } = app;
  const { name, description } = manifest!;
  const isSpotApp = repository.topics?.includes("pwa-spot");
  const image = new URL("pwa-192x192.png", manifest!._meta.manifestUrl).href;
  const slides = useScreenshots(app);
  return (
    <div className="mb-4">
      <Link
        to={`/apps/${repository.name.replace(/^pwa-/, "")}`}
        className={cn(
          "flex flex-col gap-2 p-4",
          "bg-neutral-900",
          "rounded-xl overflow-clip"
        )}
        title={`${name} - ${description}`}
      >
        <div className="flex gap-2 items-center">
          {/* App Icon */}
          <img
            src={resizeImageUrl({ url: image, size: 96 })}
            alt={name}
            className="size-10 shrink-0  rounded-lg"
          />

          <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
            {/* App Name */}
            <h1
              className={cn(
                "font-bold leading-none truncate",
                "max-md:text-xs"
              )}
            >
              {name}
            </h1>

            {/* App Description */}
            <p
              className={cn("text-xs leading-none truncate", "text-stone-400")}
            >
              {description}
            </p>

            {isSpotApp && <span className="text-xs text-orange-500">SPOT</span>}
          </div>
        </div>

        <AppPhotoAlbum
          total={slides.length}
          photos={slides.slice(0, MAX_IMAGES_PREVIEW).map((item) => ({
            ...item,
            src: resizeImageUrl({ url: item.src, width: 400 }),
          }))}
          columns={Math.min(MAX_IMAGES_COLUMN, slides.length)}
        />
      </Link>
    </div>
  );
});
