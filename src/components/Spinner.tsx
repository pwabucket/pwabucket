import { CgSpinner } from "react-icons/cg";
import { memo } from "react";

export default memo(function Spinner() {
  return <CgSpinner className="w-5 h-5 mx-auto animate-spin" />;
});
