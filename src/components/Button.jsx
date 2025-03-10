import { cn } from "@/lib/utils";
import { memo } from "react";

export const Button = memo(function ({ as: Component = "button", ...props }) {
  return (
    <Component
      {...props}
      className={cn("p-2 rounded-xl", "disabled:opacity-80", props.className)}
    />
  );
});

export const PrimaryButton = memo(function (props) {
  return (
    <Button
      {...props}
      className={cn("bg-purple-500 text-white", props.className)}
    />
  );
});

export const SecondaryButton = memo(function (props) {
  return (
    <Button
      {...props}
      className={cn(
        "bg-black text-white",
        "dark:bg-white dark:text-black",
        props.className
      )}
    />
  );
});
