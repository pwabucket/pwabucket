import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";
import { loadEnv } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  /** Env */
  const env = loadEnv(mode, process.cwd());

  return {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    plugins: [
      /** Plugins */
      VitePWA({
        registerType: "autoUpdate",
        workbox: {
          globPatterns: ["**/*.*"],
          maximumFileSizeToCacheInBytes: 5 * 1024 ** 2,
        },
        manifest: {
          name: env.VITE_APP_NAME,
          short_name: env.VITE_APP_NAME,
          description: env.VITE_APP_DESCRIPTION,
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-64x64.png",
              sizes: "64x64",
              type: "image/png",
            },
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
          screenshots: [
            {
              src: "screenshot-mobile-1.jpg",
              sizes: "1080x1920",
              type: "image/jpg",
            },
            {
              src: "screenshot-mobile-2.jpg",
              sizes: "1080x1920",
              type: "image/jpg",
            },
            {
              src: "screenshot-desktop-1.jpg",
              sizes: "1280x720",
              type: "image/jpg",
              form_factor: "wide",
            },
            {
              src: "screenshot-desktop-2.jpg",
              sizes: "1280x720",
              type: "image/jpg",
              form_factor: "wide",
            },
          ],
        },
      }),
      ViteEjsPlugin(env),
      tailwindcss(),
      imagetools(),
      react(),
    ],
  };
});
