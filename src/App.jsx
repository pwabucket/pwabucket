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
              <div key={data.id} className="flex flex-col gap-2">
                <img
                  src={`${data.homepage}logo.svg`}
                  alt={data.name}
                  className="w-full aspect-square"
                />
                <h1 className="font-bold text-center">
                  {capitalCase(data.name)}
                </h1>
              </div>
            ))}
      </div>
    </div>
  );
};
