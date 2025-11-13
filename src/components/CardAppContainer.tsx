import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1200: 3,
  919: 2,
  768: 1,
};

export default function CardAppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {children}
    </Masonry>
  );
}
