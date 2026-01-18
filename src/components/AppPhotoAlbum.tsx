import {
  ColumnsPhotoAlbum,
  type ColumnsPhotoAlbumProps,
} from "react-photo-album";
import "react-photo-album/columns.css";
import { cn } from "../lib/utils";

type PhotoAlbumProps = ColumnsPhotoAlbumProps & {
  total?: number;
  photos: Array<{ src: string; width: number; height: number }>;
};

export const AppPhotoAlbum = ({
  total = 0,
  photos,
  ...props
}: PhotoAlbumProps) => (
  <ColumnsPhotoAlbum
    {...props}
    photos={photos}
    spacing={5}
    padding={0}
    breakpoints={[300, 600, 1200]}
    render={{
      wrapper: ({ children, ...props }, { index }) => (
        <div {...props} className="relative overflow-clip w-full">
          {children}
          {/* Count */}
          {total > photos.length && index === photos.length - 1 ? (
            <div
              className={cn(
                "absolute inset-0 ",
                "bg-stone-800/20 backdrop-blur-xs",
                "flex justify-center items-center",
                "text-white text-lg font-fredoka-one",
              )}
            >
              +{total - photos.length}
            </div>
          ) : null}
        </div>
      ),

      image: (props, context) => {
        return <img {...props} width={context.width} height={context.height} />;
      },
    }}
  />
);
