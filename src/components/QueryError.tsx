import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function QueryError(props: React.ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn("text-red-500 text-sm text-center px-2", props.className)}
    >
      Failed to load!
    </p>
  );
});
