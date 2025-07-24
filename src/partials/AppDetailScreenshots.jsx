import "yet-another-react-lightbox/styles.css";

import AppScreenshotContainer from "@/components/AppScreenshotContainer";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {
  AppScreenshot,
  AppScreenshotPlaceholder,
} from "@/components/AppScreenshot";
import { memo } from "react";
import { repeatComponent } from "@/lib/utils";
import { useCallback } from "react";
import { useLocation } from "react-router";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const ScreenshotsPlaceholder = () => (
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

export default memo(function AppDetailScreenshots({ app }) {
  const { repository, manifest } = app;
  const { name, description } = manifest;

  const location = useLocation();
  const navigate = useNavigate();
  const slideIndex = location.state?.["__slideIndex"];

  const goToSlide = useCallback(
    (index) => {
      navigate(null, {
        state: {
          ...location.state,
          __slideIndex: index,
        },
      });
    },
    [navigate, location]
  );

  const slides = useMemo(
    () =>
      manifest?.screenshots?.map((screenshot) => ({
        src: new URL(screenshot.src, repository.homepage).href,
        width: screenshot.sizes.split("x")[0],
        height: screenshot.sizes.split("x")[1],
        alt: name,
      })),
    [repository.homepage, name, manifest]
  );

  return slides ? (
    <>
      <AppScreenshotContainer>
        {slides?.map((slide, i) => (
          <AppScreenshot key={i} {...slide} onClick={() => goToSlide(i)} />
        ))}
      </AppScreenshotContainer>
      <Lightbox
        index={slideIndex}
        open={typeof slideIndex !== "undefined"}
        close={() => navigate(-1, { replace: true })}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  ) : null;
});
