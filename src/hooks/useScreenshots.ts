import type { AppItem } from "@/types/app";
import { useMemo } from "react";

export default function useScreenshots(app: AppItem) {
  const { repository, manifest } = app;
  const { name } = manifest!;

  return useMemo(
    () =>
      manifest?.screenshots?.map((screenshot) => ({
        src: new URL(screenshot.src, repository.homepage!).href,
        width: Number(screenshot.sizes!.split("x")[0]),
        height: Number(screenshot.sizes!.split("x")[1]),
        alt: name,
      })),
    [repository.homepage, name, manifest]
  );
}
