import { cn } from "@/lib/utils";
import { memo } from "react";

export const AppScreenshot = memo(function (props) {
  return (
    <img
      {...props}
      className={cn(
        "basis-0 rounded-2xl h-52 bg-stone-100 dark:bg-stone-800",
        props.className
      )}
    />
  );
});

export const AppScreenshotPlaceholder = memo(function ({
  width = 200,
  height = 200,
  ...props
}) {
  const src =
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>
  `);
  return <AppScreenshot {...props} src={src} width={width} height={height} />;
});
