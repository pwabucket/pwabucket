import { memo } from "react";
import Spinner from "./Spinner";

export default memo(function FullPageSpinner() {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4">
      <Spinner />
    </div>
  );
});
