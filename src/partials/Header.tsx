import AppIcon from "@/assets/images/icon.svg";
import { cn } from "@/lib/utils";

export default function Header({
  leftContent,
  middleContent,
  rightContent,
}: {
  leftContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}) {
  return (
    <div className={cn("bg-neutral-900", "shrink-0 sticky top-0", "z-50")}>
      <div className="max-w-7xl mx-auto flex items-center gap-2 p-1">
        {/* Left Content */}
        <div className="shrink-0 size-10">{leftContent}</div>

        {/* Middle Content */}
        <div className="grow min-w-0 min-h-0 flex flex-col justify-center">
          {middleContent || (
            <h1
              className={cn(
                "text-center truncate",
                "flex gap-2 items-center justify-center font-bold"
              )}
            >
              <img src={AppIcon} className="h-5" />{" "}
              {import.meta.env.VITE_APP_NAME}
            </h1>
          )}
        </div>

        {/* Right Content */}
        <div className="shrink-0 size-10">{rightContent}</div>
      </div>
    </div>
  );
}
