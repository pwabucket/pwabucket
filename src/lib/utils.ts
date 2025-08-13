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

export function resizeImageUrl({
  url,
  width,
  height,
  size,
}: {
  url: string;
  width?: number;
  height?: number;
  size?: number;
}): string {
  const options: Record<string, string> = {
    url,
    output: "webp",
    q: "100",
  };

  if (width) {
    options["w"] = String(width);
  }
  if (height) {
    options["h"] = String(height);
  }

  if (size) {
    options["w"] = String(size);
    options["h"] = String(size);
  }

  return `//wsrv.nl/?${new URLSearchParams(options).toString()}`;
}
