import AppScreenshotContainer from "@/components/AppScreenshotContainer";
import useAppManifestQuery from "@/hooks/useAppManifestQuery";
import {
  AppScreenshot,
  AppScreenshotPlaceholder,
} from "@/components/AppScreenshot";
import { memo } from "react";
import { repeatComponent } from "@/lib/utils";

export default memo(function AppDetailScreenshots({ app }) {
  const [name] = app.description.split(" • ");
  const { isPending, data: manifest } = useAppManifestQuery(app.name);

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
  ) : manifest?.screenshots ? (
    <AppScreenshotContainer>
      {manifest?.screenshots?.map((screenshot, i) => (
        <AppScreenshot
          key={i}
          src={app.homepage + screenshot.src}
          alt={name}
          width={screenshot.sizes.split("x")[0]}
          height={screenshot.sizes.split("x")[1]}
        />
      ))}
    </AppScreenshotContainer>
  ) : null;
});
