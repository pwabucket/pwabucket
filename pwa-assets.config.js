import { defineConfig } from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: {
    transparent: {
      padding: 0,
      sizes: [64, 192, 512],
      favicons: [[64, "favicon.ico"]],
    },
    maskable: {
      sizes: [512],
      resizeOptions: {
        background: "white",
      },
    },
    apple: {
      sizes: [180],
      resizeOptions: {
        background: "white",
      },
    },
  },
  images: ["public/pwa-icon.svg"],
});
