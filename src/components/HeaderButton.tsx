import useNavigateBack from "@/hooks/useNavigateBack";
import type { DynamicComponent } from "@/types/types";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { cn } from "@/lib/utils";

export const HeaderButton: DynamicComponent<
  "button",
  { icon: React.ElementType }
> = function ({ as, icon, ...props }) {
  const Component = as || "button";
  const Icon = icon;

  return (
    <Component
      {...props}
      className={cn(
        "size-10 rounded-full",
        "flex justify-center items-center",
        "hover:bg-stone-100 dark:hover:bg-stone-800",
        props.className
      )}
    >
      <Icon className="size-6" />
    </Component>
  );
};

export function HeaderReturnButton(
  props: Omit<React.ComponentProps<typeof HeaderButton>, "onClick" | "icon">
) {
  const navigateBack = useNavigateBack();
  return (
    <HeaderButton
      {...props}
      onClick={() => navigateBack()}
      icon={HiOutlineArrowLeft}
    />
  );
}
