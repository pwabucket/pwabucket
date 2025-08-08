import Header from "@/partials/Header";
import { cn } from "@/lib/utils";

export default function AppLayout({
  headerLeftContent,
  headerMiddleContent,
  headerRightContent,
  className,
  children,
}: {
  headerLeftContent?: React.ReactNode;
  headerMiddleContent?: React.ReactNode;
  headerRightContent?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header
        leftContent={headerLeftContent}
        middleContent={headerMiddleContent}
        rightContent={headerRightContent}
      />
      <div
        className={cn(
          "grow w-full min-w-0 min-h-0 container mx-auto p-4",
          "flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
