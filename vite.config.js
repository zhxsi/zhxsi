import { defineConfig, loadEnv } from "vite"; // vite
import vue from "@vitejs/plugin-vue"; // vue
import { fileURLToPath, URL } from "node:url"; // nodejs
import vueJsx from "@vitejs/plugin-vue-jsx"; // jsx
import AutoImport from "unplugin-auto-import/vite"; // 自动导入
import Components from "unplugin-vue-components/vite"; // 组件自动导入
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"; // element-plus自动导入
import Icons from "unplugin-icons/vite"; // icons
import IconsResolver from "unplugin-icons/resolver"; // icons
import ElementPlus from "unplugin-element-plus/vite"; // element-plus
import EslintPlugin from "vite-plugin-eslint"; // eslint
// import viteCompression from "vite-plugin-compression"; // gzip
import { visualizer } from "rollup-plugin-visualizer"; // 可视化捆绑大小
import viteImagemin from "vite-plugin-imagemin"; // 图片压缩
import mkcert from "vite-plugin-mkcert"; //  https
import progress from "vite-plugin-progress"; // 构建显示进度条
import vueSetupExtend from "vite-plugin-vue-setup-extend"; // setup扩展 在setup中使用name属性

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(
    mode,
    fileURLToPath(new URL("./src/env", import.meta.url)),
  );
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
        },
        imports: [
          "vue",
          "vue-router",
          { "@/stores": ["useStore"], "element-plus": ["ElMessage"] },
          "vue-i18n",
          "@vueuse/core",
        ],
      }),
      Components({
        resolvers: [IconsResolver(), ElementPlusResolver()],
      }),
      Icons(),
      ElementPlus({ useSource: true }),
      EslintPlugin({
        // fix: true,
      }),
      // viteCompression({
      //   verbose: true,
      //   disable: false,
      //   algorithm: "gzip",
      //   ext: ".gz",
      //   threshold: 1024 * 10,
      //   deleteOriginFile: true,
      // }),
      visualizer(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        optipng: {
          optimizationLevel: 7,
        },
        mozjpeg: {
          quality: 20,
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4,
        },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
            },
            {
              name: "removeEmptyAttrs",
              active: false,
            },
          ],
        },
      }),
      mkcert(),
      progress({
        color: "green",
        throttle: 1000,
      }),
      vueSetupExtend(),
    ],
    server: {
      host: env.VITE_APP_HOST,
      port: env.VITE_APP_PORT,
      open: true,
      cors: true,
      https: true,
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: function (chunkInfo) {
            if (
              chunkInfo.name === "favicon.ico" ||
              chunkInfo.name === "favicon.png" ||
              chunkInfo.name === "favicon.svg"
            ) {
              return "[name].[ext]";
            }
            if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(chunkInfo.name)) {
              return "static/fonts/[name]-[hash].[ext]";
            }
            if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(chunkInfo.name)) {
              return "static/images/[name]-[hash].[ext]";
            }
            if (/\.css$/.test(chunkInfo.name)) {
              return "static/css/[name]-[hash].[ext]";
            }
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/.test(chunkInfo.name)
            ) {
              return "static/videos/[name]-[hash].[ext]";
            }
            if (/\.js$/.test(chunkInfo.name)) {
              return "static/js/[name]-[hash].[ext]";
            }
          },
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      sourcemap: false,
      assetsInlineLimit: 1024 * 10,
    },
    envDir: fileURLToPath(new URL("./src/env", import.meta.url)),
    publicDir: false,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        img: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          // @use "@/assets/styles/element/light.scss";
          // @use "@/assets/styles/element/dark.scss";
          // @use "@/assets/styles/mixin" as *;
        `,
        },
      },
    },
  };
});
