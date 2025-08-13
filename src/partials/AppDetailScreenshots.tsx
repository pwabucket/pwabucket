import "yet-another-react-lightbox/styles.css";
import AppScreenshotContainer from "@/components/AppScreenshotContainer";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import type { AppItem } from "@/types/app";
import {
  AppScreenshot,
  AppScreenshotPlaceholder,
} from "@/components/AppScreenshot";
import { memo } from "react";
import { repeatComponent, resizeImageUrl } from "@/lib/utils";
import { useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import useScreenshots from "@/hooks/useScreenshots";

export const ScreenshotsPlaceholder = () => (
  <AppScreenshotContainer>
    {repeatComponent(
      <>
        <AppScreenshotPlaceholder width={320} height={480} />
        <AppScreenshotPlaceholder width={1280} height={720} />
      </>,
      2
    )}
  </AppScreenshotContainer>
);

export const ScreenshotsLightbox = ({ slides }: { slides: SlideImage[] }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const slideIndex = location.state?.["__slideIndex"];

  return (
    <Lightbox
      index={slideIndex}
      open={typeof slideIndex !== "undefined"}
      close={() => navigate(-1)}
      slides={slides}
      plugins={[Zoom]}
    />
  );
};

export default memo(function AppDetailScreenshots({
  app,
  lightbox = true,
}: {
  app: AppItem;
  lightbox?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSlide = useCallback(
    (index: number) => {
      navigate(location, {
        state: {
          ...location.state,
          __slideIndex: index,
        },
      });
    },
    [navigate, location]
  );

  const slides = useScreenshots(app);

  return slides ? (
    <>
      <AppScreenshotContainer>
        {slides?.map((slide, i) => (
          <AppScreenshot
            key={i}
            {...slide}
            src={resizeImageUrl({ url: slide.src, height: 416 })}
            onClick={() => goToSlide(i)}
          />
        ))}
      </AppScreenshotContainer>

      {lightbox && <ScreenshotsLightbox slides={slides} />}
    </>
  ) : null;
});
