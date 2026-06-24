import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueRouter from "vue-router/vite";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const staticDir = "static";
const envDir = fileURLToPath(new URL("./src/env", import.meta.url));
const srcDir = fileURLToPath(new URL("./src", import.meta.url));
const jsFileName = `${staticDir}/js/[name]-[hash].js`;
const fallbackAssetDir = "assets";
const nodeModulesName = "node_modules";
const defaultHost = "0.0.0.0";
const defaultPort = 5173;

const assetDirByExt: Record<string, string[]> = {
  css: ["css"],
  fonts: ["woff", "woff2", "eot", "ttf", "otf"],
  images: ["png", "jpg", "jpeg", "gif", "svg", "webp", "avif", "ico"],
  media: ["mp4", "webm", "ogg", "mp3", "wav", "flac", "aac"]
};

const assetDirLookup: Record<string, string> = {};

for (const assetDir in assetDirByExt) {
  for (const ext of assetDirByExt[assetDir]) {
    assetDirLookup[ext] = assetDir;
  }
}

function getAssetFileName(assetName = "") {
  const queryIndex = assetName.indexOf("?");
  const fileName =
    queryIndex === -1 ? assetName : assetName.slice(0, queryIndex);
  const normalizedFileName = fileName.toLowerCase();

  if (normalizedFileName.includes("favicon.")) {
    return "[name].[ext]";
  }

  const dotIndex = normalizedFileName.lastIndexOf(".");
  const ext = dotIndex === -1 ? "" : normalizedFileName.slice(dotIndex + 1);
  const assetDir = assetDirLookup[ext] ?? fallbackAssetDir;

  return `${staticDir}/${assetDir}/[name]-[hash].[ext]`;
}

function getNextSeparatorIndex(value: string, startIndex: number) {
  const slashIndex = value.indexOf("/", startIndex);
  const backslashIndex = value.indexOf("\\", startIndex);

  if (slashIndex === -1) {
    return backslashIndex;
  }

  if (backslashIndex === -1) {
    return slashIndex;
  }

  return Math.min(slashIndex, backslashIndex);
}

function getManualChunk(id: string) {
  const nodeModulesIndex = id.lastIndexOf(nodeModulesName);

  if (nodeModulesIndex === -1) {
    return;
  }

  let packageStartIndex = nodeModulesIndex + nodeModulesName.length;
  const separator = id[packageStartIndex];

  if (separator !== "/" && separator !== "\\") {
    return;
  }

  packageStartIndex += 1;
  const firstSeparatorIndex = getNextSeparatorIndex(id, packageStartIndex);
  const scopeOrName =
    firstSeparatorIndex === -1
      ? id.slice(packageStartIndex)
      : id.slice(packageStartIndex, firstSeparatorIndex);

  if (!scopeOrName || scopeOrName === "vue") {
    return;
  }

  if (!scopeOrName.startsWith("@")) {
    return scopeOrName;
  }

  const scopedNameStartIndex = firstSeparatorIndex + 1;
  const scopedNameEndIndex = getNextSeparatorIndex(id, scopedNameStartIndex);
  const scopedName =
    scopedNameEndIndex === -1
      ? id.slice(scopedNameStartIndex)
      : id.slice(scopedNameStartIndex, scopedNameEndIndex);

  return scopedName ? `${scopeOrName}/${scopedName}` : undefined;
}

function toPort(port: string) {
  const parsedPort = Number(port);

  return Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535
    ? parsedPort
    : defaultPort;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, envDir);
  const isProduction = mode === "production";

  return {
    plugins: [
      VueRouter({
        dts: false,
        extensions: [".vue"],
        filePatterns: ["**/index"],
        exclude: [
          "src/views/**/components/**",
          "src/views/**/__*__/**",
          "src/views/**/*.spec.vue",
          "src/views/**/*.test.vue"
        ],
        routesFolder: "src/views",
        logs: false
      }),
      vue(),
      tailwindcss()
    ],
    envDir,
    publicDir: false,
    resolve: {
      alias: {
        "@": srcDir
      }
    },
    server: {
      host: env["VITE_APP_HOST"] || defaultHost,
      port: toPort(env["VITE_APP_PORT"])
    },
    build: {
      minify: isProduction,
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          entryFileNames: jsFileName,
          chunkFileNames: jsFileName,
          assetFileNames: ({ names, originalFileNames }) =>
            getAssetFileName(names[0] ?? originalFileNames[0]),
          manualChunks: getManualChunk
        }
      }
    }
  };
});

