import { memo } from "react";

export default memo(function GridAppPlaceholder() {
  return (
    <div className="flex flex-col gap-1">
      {/* Placeholder Image */}
      <div className="w-full mb-3 aspect-square rounded-3xl bg-stone-100 dark:bg-stone-800" />
      {/* Placeholder Title */}
      <div className="w-full h-3 bg-stone-100 dark:bg-stone-800" />
      {/* Placeholder Description */}
      <div className="w-full h-2 bg-stone-100 dark:bg-stone-800" />
    </div>
  );
});
