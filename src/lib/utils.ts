import clsx, { type ClassValue } from "clsx";
import repeatElement from "repeat-element";
import { Fragment } from "react";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

export function repeatComponent(component: React.ReactNode, times = 1) {
  return repeatElement(undefined, times).map((_, i) =>
    createElement(Fragment, { key: i, children: component })
  );
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
