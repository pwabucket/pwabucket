import type { AppItem } from "@/types/app";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import { SiGithub } from "react-icons/si";
import { memo } from "react";

export default memo(function AppDetailHeader({ app }: { app: AppItem }) {
  const { repository, manifest } = app;
  const { name, description } = manifest!;
  const image = new URL("pwa-192x192.png", manifest!._meta.manifestUrl).href;

  return (
    <div className="flex gap-2">
      {/* App Icon */}
      <img src={image} alt={name} className="size-24 rounded-3xl" />

      <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
        {/* App Name */}
        <h1 className="text-3xl font-light">{name}</h1>

        {/* App Description */}
        <p className="text-stone-600 dark:text-stone-400">{description}</p>

        {repository.name === import.meta.env.VITE_APP_ID && (
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Currently Viewing App
          </p>
        )}

        {/* Open */}
        <div className="flex gap-2 py-1">
          {repository.name !== import.meta.env.VITE_APP_ID && (
            <PrimaryButton
              as="a"
              target="_blank"
              href={repository.homepage as string}
              className="rounded-full px-4 py-1 flex gap-2 items-center"
            >
              <HiOutlineArrowTopRightOnSquare className="size-5" /> Open
            </PrimaryButton>
          )}
          <SecondaryButton
            as="a"
            target="_blank"
            href={repository.htmlUrl as string}
            className="rounded-full px-4 py-1 flex gap-2 items-center"
          >
            <SiGithub className="size-5" /> GitHub
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
});
