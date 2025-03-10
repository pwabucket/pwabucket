import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { PrimaryButton } from "@/components/Button";
import { memo } from "react";

export default memo(function AppDetailHeader({ app }) {
  const [name, description] = app.description.split(" • ");
  const image = app.homepage + "maskable-icon-512x512.png";

  return (
    <div className="flex gap-2">
      {/* App Icon */}
      <img src={image} alt={name} className="size-24 rounded-3xl" />

      <div className="flex flex-col grow min-w-0 min-h-0 gap-1">
        {/* App Name */}
        <h1 className="font-bold text-3xl font-light">{name}</h1>

        {/* App Description */}
        <p className="text-stone-600 dark:text-stone-400">{description}</p>

        {/* Open */}
        {app.name !== import.meta.env.VITE_APP_ID ? (
          <div className="flex py-1">
            <PrimaryButton
              as="a"
              target="_blank"
              href={app.homepage}
              className="rounded-full px-4 py-1 flex gap-2 items-center"
            >
              <HiOutlineArrowTopRightOnSquare className="size-5" /> Open
            </PrimaryButton>
          </div>
        ) : (
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            Currently Viewing App
          </p>
        )}
      </div>
    </div>
  );
});
