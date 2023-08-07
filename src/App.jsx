import clsx from "clsx";
import { capitalCase } from "change-case";
import { useQuery } from "@tanstack/react-query";

export const App = () => {
  const { isLoading, data } = useQuery(["listApps"]);

  return (
    <div className="container px-4 mx-auto">
      <div
        className={clsx(
          "grid gap-2 grid-cols-[repeat(auto-fill,_minmax(theme(spacing.28),_1fr))]"
        )}
      >
        {isLoading
          ? "Loading..."
          : data.items.map((data) => (
              <a
                key={data.id}
                href={data.homepage}
                className="flex flex-col gap-1"
                title={`${capitalCase(data.name)} - ${data.description}`}
              >
                {/* Icon */}
                <img
                  src={data.homepage + "pwa-192x192.png"}
                  alt={capitalCase(data.name)}
                  className="w-full aspect-square rounded-3xl"
                />

                {/* Name */}
                <h1 className="font-bold text-center">
                  {capitalCase(data.name)}
                </h1>

                {/* Description */}
                <p className="text-center truncate text-sm text-stone-600">
                  {data.description}
                </p>
              </a>
            ))}
      </div>
    </div>
  );
};
