import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    mode,
    fileURLToPath(new URL("./src/env", import.meta.url))
  );
  const VITE_APP_HOST = env["VITE_APP_HOST"]!;
  const VITE_APP_PORT = +env["VITE_APP_PORT"]!;
  return {
    plugins: [vue()],
    server: {
      host: VITE_APP_HOST,
      port: VITE_APP_PORT,
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const fileTypes: Record<string, string> = {
              "favicon.*": "[name].[ext]",
              "\\.(woff2?|eot|ttf|otf)(\\?.*)?$": "static/fonts/[hash].[ext]",
              "\\.(png|jpe?g|gif|svg)(\\?.*)?$": "static/images/[hash].[ext]",
              "\\.css$": "static/css/[hash].[ext]",
              "\\.(mp4|webm|ogg|mp3|wav|flac|aac)(\\?.*)?$":
                "static/videos/[hash].[ext]",
            };
            for (const fileType in fileTypes) {
              if (
                assetInfo.names.toString() &&
                new RegExp(fileType).test(assetInfo.names.toString())
              ) {
                return fileTypes[fileType];
              }
            }
            return "static/[name]-[hash].[ext]";
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              const packageName = id.split("node_modules/")[1].split("/")[0];
              if (packageName.includes("vue")) {
                return "vue";
              }
              return "vendor";
            }
          },
        },
      },
    },
    envDir: fileURLToPath(new URL("./src/env", import.meta.url)),
    publicDir: false,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
