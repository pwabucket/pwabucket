import type { AppItem } from "@/types/app";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { memo } from "react";

export default memo(function GridApp({ app }: { app: AppItem }) {
  const { repository, manifest } = app;
  const { name, description } = manifest!;
  const image = new URL("pwa-192x192.png", repository.homepage!).href;

  return (
    <Link
      to={`/apps/${repository.name.replace(/^pwa-/, "")}`}
      className="flex flex-col gap-1"
      title={`${name} - ${description}`}
    >
      {/* App Icon */}
      <img
        src={image}
        alt={name}
        className="w-full mb-3 aspect-square rounded-3xl"
      />

      {/* App Name */}
      <h1 className={cn("font-bold leading-none truncate", "max-md:text-xs")}>
        {name}
      </h1>

      {/* App Description */}
      <p
        className={cn(
          "text-xs leading-none truncate",
          "text-stone-600 dark:text-stone-400"
        )}
      >
        {description}
      </p>
    </Link>
  );
});
