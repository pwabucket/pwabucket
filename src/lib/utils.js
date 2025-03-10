import clsx from "clsx";
import repeatElement from "repeat-element";
import { Fragment } from "react";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

export function repeatComponent(component, times = 1) {
  return repeatElement(undefined, times).map((_, i) =>
    createElement(Fragment, { key: i, children: component })
  );
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
