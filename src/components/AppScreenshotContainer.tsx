import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function AppScreenshotContainer(
  props: React.ComponentProps<"div">
) {
  return (
    <div
      {...props}
      className={cn("overflow-auto hidden-scrollbar", props.className)}
    >
      <div className="flex flex-nowrap gap-2">{props.children}</div>
    </div>
  );
});
