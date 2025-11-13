import { cn } from "@/lib/utils";

const Input = (props: React.ComponentProps<"input">) => {
  return (
    <input
      {...props}
      className={cn(
        "bg-neutral-900 rounded-full px-4 py-2",
        "outline-0 focus:ring-2 focus:ring-purple-500"
      )}
    />
  );
};

export { Input };
