import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function GridAppPlaceholder({
  width = 200,
  height = 200,
  ...props
}) {
  const src =
    "data:image/svg+xml," +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"></svg>
  `);
  return (
    <img
      {...props}
      src={src}
      className={cn(
        "rounded-2xl h-52 bg-stone-100 dark:bg-stone-800",
        props.className
      )}
    />
  );
});
