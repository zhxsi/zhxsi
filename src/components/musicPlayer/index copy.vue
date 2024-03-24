<template>
  <div class="flex h-16 w-full justify-between">
    <!-- 左 -->
    <div
      class="flex h-full w-full basis-1/6 justify-end bg-slate-400 lg:basis-1/4"
    >
      <div class="hidden basis-2/4 lg:block" @click="songlyric">
        <div class="float-right h-full cursor-pointer">
          <el-image
            :src="
              store.hasPlayList
                ? store.playList[store.currentIndex].al.picUrl
                : ''
            "
            class="!block h-full"
            fit="fill"
          >
            <template #error>
              <div
                class="flex h-full w-full items-center justify-center bg-slate-200 text-3xl text-slate-500"
              >
                <el-icon><i-ep-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <div class="basis-auto lg:basis-2/4">
        <div class="flex h-1/2 w-full items-center justify-center">
          {{
            store.hasPlayList ? store.playList[store.currentIndex].al.name : ""
          }}
        </div>
        <div class="flex h-1/2 w-full items-center justify-center">
          <span
            v-for="(item, index) in store.hasPlayList
              ? store.playList[store.currentIndex].ar
              : []"
            :key="index"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
    <!-- 中 -->
    <div
      class="h-full w-full basis-4/6 bg-slate-500 px-2 py-2 lg:basis-2/4 lg:px-10"
    >
      <div class="flex h-1/2 w-full items-center justify-center">
        <span @click="changeSong(true)" class="mx-8 cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </span>
        <span
          v-if="store.playing"
          @click="changePlay()"
          class="mx-8 cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </span>
        <span v-else @click="changePlay()" class="mx-8 cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
            />
          </svg>
        </span>
        <span @click="changeSong(false)" class="mx-8 cursor-pointer"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </div>
      <div class="flex h-1/2 w-full items-center justify-center">
        <span class="mr-8 w-12">{{ formatDate(Playprogress) }}</span>
        <el-slider
          :disabled="store.playList.length === 0"
          v-model="Playprogress"
          :show-tooltip="false"
          @input="change"
          :max="max"
        />
        <span class="ml-8 w-12">{{ formatDate(max) }}</span>
      </div>
    </div>
    <!-- 右 -->
    <div class="relative h-full w-full basis-1/6 bg-slate-400 lg:basis-1/4">
      <songList
        class="absolute bottom-16 w-full transition-all duration-300"
        :songListstate="songListstate"
        @hideList="songListstate = false"
      />
      <div
        class="mr-auto flex h-full w-full cursor-pointer items-center justify-center lg:ml-5 lg:w-20"
        @click="playList"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
          />
        </svg>
      </div>
    </div>

    <lyricsDrawer
      :lyricsDrawerstate="lyricsDrawerstate"
      @hideDrawer="
        lyricsDrawerstate = false;
        lyric = null;
      "
      :lyric="lyric"
    />
  </div>
</template>

<script setup>
import { getLyric } from "@/api/lyrics";
import lyricsDrawer from "./components/lyricsDrawer.vue";
import songList from "./components/songList.vue";
const lyricsDrawerstate = ref(false);
const stores = useStore();
// 传入歌词详细信息的变量
const lyric = ref(null);
// 歌词打开
const songlyric = () => {
  getLyric({ id: stores.playList[stores.currentIndex].id }).then((res) => {
    if (res.data.code === 200) {
      console.log("res:", res.data);
      lyric.value = res.data;
      lyricsDrawerstate.value = true;
    }
  });
};
// 开启songListstate
// 当前播放歌曲时间
const Playprogress = ref(0);
const store = useStore();
// 获取歌曲总时长,单位秒
const max = computed(() => {
  return store.playList.length !== 0
    ? store.playList[store.currentIndex].dt / 1000
    : 0;
});
// 格式化时间,HH:mm,传入单位秒
const formatDate = computed(() => {
  return (time) => {
    if (time === undefined) return "00:00";
    const date = new Date(time * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  };
});

const change = (val) => {
  console.log("val:", val);
};
// 切换歌曲
const changeSong = (val) => {
  console.log("val:", val);
  if (val) {
    // store.currentIndex--;
    // 不能小于0
    store.currentIndex = store.currentIndex === 0 ? 0 : store.currentIndex - 1;
    console.log("store.currentIndex:", store.currentIndex);
  } else {
    // store.currentIndex++;
    // 不能大于歌曲总数
    store.currentIndex =
      store.currentIndex === store.playList.length - 1
        ? store.playList.length - 1
        : store.currentIndex + 1;
  }
};
// 切换播放状态
const changePlay = () => {
  store.playing = !store.playing;
};
const songListstate = ref(false);
// 播放列表，方法
const playList = () => {
  console.log("播放列表");
  songListstate.value = !songListstate.value;
};
</script>

<style lang="scss" scoped>
.el-slider:deep(.el-slider__runway) {
  .el-slider__button-wrapper {
    display: none;
  }
  .el-slider__bar {
    background-color: #c14e4e;
  }
}
</style>
