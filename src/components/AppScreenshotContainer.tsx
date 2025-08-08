import { memo } from "react";

export default memo(function AppScreenshotContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-auto py-2">
      <div className="flex flex-nowrap gap-2">{children}</div>
    </div>
  );
});
