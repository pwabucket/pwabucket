import { cn } from "@/lib/utils";

export default function GridAppContainer({ children }) {
  return (
    <div
      className={cn(
        "grid gap-3 md:gap-6",
        "[--app-grid-size:theme(spacing.20)]",
        "md:[--app-grid-size:theme(spacing.24)]",
        "grid-cols-[repeat(auto-fill,_minmax(var(--app-grid-size),_1fr))]"
      )}
    >
      {children}
    </div>
  );
}
