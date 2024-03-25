<template>
  <el-scrollbar>
    <div class="flex flex-col items-center justify-between">
      <!--  -->
      <div class="my-4 flex h-80 w-full">
        <div class="relative mx-6 h-full w-2/3 rounded-md bg-slate-100">
          <div class="absolute z-10 h-full w-full">
            <el-carousel
              class="m-auto h-full w-10/12"
              @change="getBannerIndex"
              indicator-position="none"
              :interval="5000"
              :motion-blur="true"
              arrow="always"
            >
              <el-carousel-item
                v-for="(item, index) in banner"
                :key="index"
                class="h-full w-full"
              >
                <el-image
                  class="h-full w-full"
                  :src="item.imageUrl"
                  fit="cover"
                  :otion-blur="true"
                ></el-image>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div
            class="absolute h-full w-full bg-cover bg-center blur-sm transition-all duration-300"
            :style="{
              backgroundImage: `url(${banner.length ? banner[bgIndex].imageUrl : ''})`,
            }"
          ></div>
        </div>
        <div
          class="mx-6 flex h-full w-1/3 items-center justify-center rounded-md bg-slate-200"
        >
          <el-button @click="handleCreate" v-if="stores.account">123</el-button>
          <el-button @click="handleCreate" v-if="!stores.account"
            >按钮</el-button
          >
        </div>
      </div>
      <!--  -->
      <div class="my-4 flex h-60 w-full">
        <div class="mx-6 h-full w-full overflow-hidden rounded-md">
          <div class="flex h-1/6 w-full items-center justify-around px-8">
            <div class="flex h-full w-2/3 items-center">
              <div class="text-xl font-bold">推荐歌单</div>
              <div class="ml-6">
                <span
                  v-for="item in playlistCat"
                  :key="item.id"
                  class="color-slate-500 cursor-pointer font-sans text-xs font-bold antialiased"
                  @click="handleSongList(item)"
                >
                  {{ item.name }}
                  <el-divider direction="vertical"></el-divider>
                </span>
              </div>
            </div>
            <div class="flex h-full w-1/3 items-center justify-end">
              <span
                class="color-slate-500 cursor-pointer font-sans text-sm font-bold antialiased"
                >更多</span
              >
            </div>
          </div>
          <div class="h-5/6 w-full">
            <el-scrollbar>
              <div class="flex">
                <div
                  v-for="item in list"
                  :key="item.id"
                  class="sm:w-63 relative m-1 aspect-[10/10] w-44 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
                  @click="handleSongList(item)"
                >
                  <span
                    class="absolute left-0 right-0 top-0 bg-black bg-opacity-50 p-2 text-xs font-black text-white antialiased"
                  >
                    {{ formatNumber(item.playCount) }}
                  </span>
                  <img alt="" :src="item.picUrl" class="h-full w-full" />
                  <span
                    class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white"
                  >
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="my-4 flex h-60 w-full">
        <div class="mx-6 h-full w-full overflow-hidden rounded-md">
          <div class="flex h-1/6 w-full items-center justify-around px-8">
            <div class="flex h-full w-2/3 items-center">
              <div class="text-xl font-bold">新碟上架</div>
            </div>
            <div class="flex h-full w-1/3 items-center justify-end">
              <span
                class="color-slate-500 cursor-pointer font-sans text-sm font-bold antialiased"
                >更多</span
              >
            </div>
          </div>
          <div class="h-5/6 w-full">
            <el-scrollbar>
              <div class="flex">
                <div
                  v-for="item in newAlbum"
                  :key="item.id"
                  class="sm:w-63 relative m-1 aspect-[10/10] w-44 flex-none cursor-pointer overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
                  @click="handleSongList(item)"
                >
                  <img
                    alt=""
                    :src="item.picUrl.replace('http:', 'https:')"
                    class="h-full w-full"
                  />
                  <span
                    class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white"
                  >
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <login
        :dialogVisible="dialogVisible"
        @hideDialog="dialogVisible = false"
      />
    </div>
  </el-scrollbar>
</template>

<script setup>
import { homeBanner } from "@/api/homePage";
import { playlistHot, personalized, topAlbum } from "@/api/songsheet";
import login from "@/components/login/index.vue";
onMounted(() => {
  getBanner();
  getHotList();
  getplaylistCatlist();
  getNewAlbum();
});
const stores = useStore();
const router = useRouter();
// 获取热门歌单的分类标签
const playlistCat = ref([]);
const getplaylistCatlist = () => {
  playlistHot().then((res) => {
    if (res.data.code === 200) {
      playlistCat.value = res.data.tags;
    }
  });
};
// 打开登录框
const dialogVisible = ref(false);
const handleCreate = () => {
  dialogVisible.value = true;
  console.log("dialogVisible.value:", dialogVisible.value);
};
// 获取轮播图方法
const banner = ref([]);
const getBanner = () => {
  homeBanner().then((res) => {
    if (res.data.code === 200) {
      banner.value = res.data.banners.map((item) => {
        return {
          imageUrl: item.imageUrl.replace("http:", "https:"),
        };
      });
    }
  });
};
// 获取推荐歌单方法
const list = ref([]);
const getHotList = () => {
  personalized().then((res) => {
    if (res.data.code === 200) {
      list.value = res.data.result;
    }
  });
};
// 新碟上架
const newAlbum = ref([]);
const getNewAlbum = () => {
  topAlbum().then((res) => {
    if (res.data.code === 200) {
      newAlbum.value = res.data.weekData;
    }
  });
};
// 背景图下标
// 获取轮播图下标
const bgIndex = ref(0);
const getBannerIndex = (e) => {
  bgIndex.value = e;
};
// 点击歌单跳转
const handleSongList = (item) => {
  console.log("item:", item);
  router.push({
    path: "/songsheet/detail",
    query: {
      id: item.id,
    },
  });
};
// 数字格式，十万以内显示数字，十万以上显示xx万
const formatNumber = computed(() => {
  return (num) => {
    if (num < 10000) {
      return num;
    } else {
      return parseInt(num / 10000) + "万";
    }
  };
});
</script>

<style lang="scss" scoped>
.el-carousel {
  :deep(.el-carousel__container) {
    height: 100%;
  }
}
</style>
