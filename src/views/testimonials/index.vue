<template>
  <div class="flex flex-col items-center justify-between outline">
    <div class="my-4 flex h-80 w-full">
      <div class="relative mx-6 h-full w-2/3 rounded-md bg-slate-100">
        <div class="absolute h-full w-full">
          <el-carousel
            class="z-10 m-auto h-full w-10/12"
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
        <el-button @click="handleCreate" v-if="!stores.account">按钮</el-button>
      </div>
    </div>
    <div class="my-4 flex h-60 w-full">
      <div class="mx-6 h-full w-full overflow-hidden rounded-md">
        <div class="flex h-1/6 w-full items-center justify-around px-8">
          <div class="flex h-full w-2/3 items-center">
            <div class="text-xl font-bold">推荐歌单</div>
            <div>
              <!-- <router-link
                v-for="item in playlistCat"
                :key="item.id"
                class="mx-4"
                @click="xk(item)"
              >
                <el-link type="primary" :underline="false">{{
                  item.name
                }}</el-link>
              </router-link> -->
            </div>
          </div>
          <div class="flex h-full w-1/3 items-center justify-end">
            <!-- <router-link class="text-blue-500">
              <el-link type="primary" target="_blank"
                >更多</el-link
              ></router-link
            > -->
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
                <img alt="" :src="item.picUrl" class="h-full w-full" />
                <span
                  class="absolute bottom-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-2 text-white"
                >
                  {{ item.name }}
                </span>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <div class="my-4 flex h-60 w-full">
      <div class="mx-6 h-full w-full rounded-md bg-slate-100">1</div>
    </div>
    <login :dialogVisible="dialogVisible" @hideDialog="dialogVisible = false" />
  </div>
</template>

<script setup>
import { homeBanner } from "@/api/homePage";
import { playlistHot, personalized } from "@/api/songsheet";
import login from "@/components/login/index.vue";
onMounted(() => {
  getBanner();
  getHotList();
  getplaylistCatlist();
});
// const router = useRouter();
// 获取热门歌单的分类标签
const playlistCat = ref([]);
const getplaylistCatlist = () => {
  playlistHot().then((res) => {
    if (res.data.code === 200) {
      playlistCat.value = res.data.tags;
    }
  });
};
const dialogVisible = ref(false);
// 打开登录框
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
const stores = useStore();
// 背景图下标
const bgIndex = ref(0);
// 获取轮播图下标
const getBannerIndex = (e) => {
  bgIndex.value = e;
};
// 点击歌单跳转
const handleSongList = (item) => {
  // router.push({ path: "/songsheet/detail", query: { id: item.id } });
};
// const xk = (e) => {
// router.push({ path: "/songsheet/a", query: { cat: e.name } });
// topPlaylist({ cat: e.name }).then((res) => {
//   console.log("res:", res);
// });
// };
</script>

<style lang="scss" scoped>
.el-carousel {
  :deep(.el-carousel__container) {
    height: 100%;
  }
}
</style>
