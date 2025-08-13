import type { AppItem } from "@/types/app";
import { useMemo } from "react";

export default function useScreenshots(app: AppItem) {
  const { manifest } = app;
  const { name } = manifest!;

  return useMemo(
    () =>
      manifest?.screenshots?.map((screenshot) => ({
        src: new URL(screenshot.src, manifest!._meta.manifestUrl).href,
        width: Number(screenshot.sizes!.split("x")[0]),
        height: Number(screenshot.sizes!.split("x")[1]),
        alt: name,
      })),
    [name, manifest]
  );
}
