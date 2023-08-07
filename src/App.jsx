import ProgressiveImage from "react-progressive-graceful-image";
import clsx from "clsx";
import repeat from "repeat-element";
import { capitalCase } from "change-case";
import { useQuery } from "@tanstack/react-query";

export const App = () => {
  const { isLoading, data } = useQuery(["listApps"]);

  return (
    <div className="container p-4 mx-auto">
      <div
        className={clsx(
          "grid gap-3",
          "[--app-grid-size:theme(spacing.24)]",
          "md:[--app-grid-size:theme(spacing.28)]",
          "grid-cols-[repeat(auto-fill,_minmax(var(--app-grid-size),_1fr))]"
        )}
      >
        {isLoading
          ? repeat(undefined, 10).map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                {/* Placeholder Image */}
                <div className="w-full aspect-square rounded-3xl mb-3 bg-neutral-100"></div>
                {/* Placeholder Title */}
                <div className="w-full h-3 bg-neutral-100"></div>
                {/* Placeholder Description */}
                <div className="w-full h-2 bg-neutral-100"></div>
              </div>
            ))
          : data.items.map((data) => (
              <a
                key={data.id}
                href={data.homepage}
                className="flex flex-col gap-1"
                title={`${capitalCase(data.name)} - ${data.description}`}
              >
                {/* App Icon */}
                <ProgressiveImage src={data.homepage + "pwa-192x192.png"}>
                  {(src, loading) => {
                    return loading ? (
                      <div className="w-full aspect-square rounded-3xl mb-3 bg-neutral-100"></div>
                    ) : (
                      <img
                        src={src}
                        alt={capitalCase(data.name)}
                        className="w-full aspect-square rounded-3xl mb-3"
                      />
                    );
                  }}
                </ProgressiveImage>

                {/* App Name */}
                <h1 className="font-bold truncate text-center leading-none">
                  {capitalCase(data.name)}
                </h1>

                {/* App Description */}
                <p className="text-center truncate text-sm leading-none text-stone-600">
                  {data.description}
                </p>
              </a>
            ))}
      </div>
    </div>
  );
};
