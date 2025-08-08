import { memo } from "react";

export default memo(function PageNotFound() {
  return (
    <div className="grow flex flex-col justify-center items-center">
      <h1 className="text-9xl font-light">404</h1>
      <p>Page not found</p>
    </div>
  );
});
