<template>
  <div class="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <div
      class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
    >
      <div v-for="product in list" :key="product.id" class="group relative">
        <div
          class="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-40"
        >
          <div
            class="h-full w-full"
            @mouseover="play(product.id)"
            @mouseleave="stop(product.id)"
          >
            <div v-if="product.play && product.url" class="h-full w-full">
              <videoPlayer :URL="product.url" :cover="product.cover" />
            </div>
            <div v-else class="h-full w-full">
              <img :src="product.cover" alt="" width="100%" height="100%" />
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <div>
            <h3 class="text-sm text-gray-700">
              <div>
                <div class="text-sm font-medium text-gray-900">
                  {{ product.name }}----{{ product.play }}
                </div>
              </div>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
          </div>
          <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="mv">
import videoPlayer from "@/components/videoPlayer/index.vue";
import { getMv, getMvDetail } from "@/api/getMv";

const list = ref([]);

const getList = () => {
  getMv({ limit: 50 }).then((res) => {
    if (res.data.code === 200) {
      res.data.data.forEach((item) => {
        item.cover = item.cover.replace("http", "https");
        item.url = null;
        item.play = false;
      });
      list.value = res.data.data;
    }
  });
};
onMounted(() => {
  getList();
});
// 移入延迟播放
const play = (item) => {
  list.value.forEach((i) => {
    if (i.id === item) {
      i.play = true;
      useDebounceFn(() => {
        getVideoUrl(item);
      }, 1000)();
    }
  });
};
// 移出停止播放
const stop = (item) => {
  list.value.forEach((i) => {
    if (i.id === item) {
      i.play = false;
    }
  });
};
// 获取视频播放url
const getVideoUrl = (id) => {
  getMvDetail({ id }).then((res) => {
    if (res.data.code === 200) {
      list.value.forEach((item) => {
        if (item.id === id) {
          if (item.play) {
            item.url = res.data.data.url.replace("http", "https");
            item.play = true;
          }
        }
      });
    }

    //  server  {
    //   listen 443;
    //   server_name localhost;
    //   location / {
    //       root: /usr/local/rx/dist;
    //       index: index.html index.htm;
    //       try_files: $uri $uri/ /index.html;
    //   },
    // };
  });
};
getVideoUrl(5436712);
</script>

<style lang="scss" scoped>
:deep(.el-progress-circle) {
  width: 100px !important;
  height: 100px !important;
}
</style>
