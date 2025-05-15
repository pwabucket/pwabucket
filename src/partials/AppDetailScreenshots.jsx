import "yet-another-react-lightbox/styles.css";

import AppScreenshotContainer from "@/components/AppScreenshotContainer";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import useAppManifestQuery from "@/hooks/useAppManifestQuery";
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

export default memo(function AppDetailScreenshots({ app }) {
  const [name] = app.description.split(" • ");
  const { isPending, data: manifest } = useAppManifestQuery(
    app.name,
    app.homepage
  );
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
        src: new URL(screenshot.src, app.homepage).href,
        width: screenshot.sizes.split("x")[0],
        height: screenshot.sizes.split("x")[1],
        alt: name,
      })),
    [app.homepage, name, manifest]
  );

  return isPending ? (
    <AppScreenshotContainer>
      {repeatComponent(
        <>
          <AppScreenshotPlaceholder width={320} height={480} />
          <AppScreenshotPlaceholder width={1280} height={720} />
        </>,
        2
      )}
    </AppScreenshotContainer>
  ) : slides ? (
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
