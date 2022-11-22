import React from "react";

export function repeatElement(element: React.ReactElement, n: number) {
  return Array.from(Array(n), (v, i) => (
    <React.Fragment key={i}>{element}</React.Fragment>
  ));
}
