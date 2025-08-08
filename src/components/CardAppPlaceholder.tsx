import { ScreenshotsPlaceholder } from "@/partials/AppDetailScreenshots";
import { memo } from "react";

export default memo(function CardAppPlaceholder() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-2">
        {/* Placeholder Image */}
        <div className="size-12 rounded-md aspect-square bg-stone-100 dark:bg-stone-800" />

        <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
          {/* Placeholder Title */}
          <div className="w-full h-3 bg-stone-100 dark:bg-stone-800" />
          {/* Placeholder Description */}
          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800" />
        </div>
      </div>

      <ScreenshotsPlaceholder />
    </div>
  );
});
