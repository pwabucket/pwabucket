import { cn } from "@/lib/utils";
import { memo } from "react";
import { AppPhotoAlbum } from "./AppPhotoAlbum";

const createSvgPlaceholder = (width: number, height: number) => {
  return {
    width,
    height,
    src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23262626'/%3E%3C/svg%3E`,
  };
};

const SVG_PLACEHOLDERS = [
  createSvgPlaceholder(1080, 1920),
  createSvgPlaceholder(1080, 1920),
  createSvgPlaceholder(1080, 1920),
  createSvgPlaceholder(1280, 720),
];

export default memo(function CardAppPlaceholder() {
  return (
    <div className="mb-4">
      <div
        className={cn(
          "flex flex-col gap-2 p-4",
          "bg-neutral-900",
          "rounded-lg overflow-clip"
        )}
      >
        <div className="flex gap-2">
          {/* Placeholder Image */}
          <div className="size-10 rounded-md aspect-square bg-neutral-800" />

          <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
            {/* Placeholder Title */}
            <div className="w-full h-3 bg-neutral-800" />
            {/* Placeholder Description */}
            <div className="w-full h-2 bg-neutral-800" />
          </div>
        </div>

        <AppPhotoAlbum
          total={SVG_PLACEHOLDERS.length}
          photos={SVG_PLACEHOLDERS}
          columns={3}
        />
      </div>
    </div>
  );
});
