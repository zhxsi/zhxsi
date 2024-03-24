<template>
  <div class="h-20 w-full">
    <div class="flex h-1/6 w-full items-center">
      <el-slider
        :disabled="store.playList.length === 0"
        v-model="Playprogress"
        :show-tooltip="false"
        class="!h-0"
        @input="input"
        :max="max"
      />
    </div>
    <div class="flex h-5/6 w-full">
      <!-- 左边 -->
      <div class="flex h-full w-2/12">
        <div class="hidden h-full w-1/2 whitespace-nowrap lg:block">
          <el-image
            src="
             https://picsum.photos/200/300
            "
            class="float-right h-full"
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
        <div class="h-full w-full lg:w-1/2">
          <div class="flex h-1/2 w-full items-center justify-center">
            <!-- {{ store.playList[store.currentIndex].name }} -->
            <span>La Vie En Rose </span>
          </div>
          <div class="flex h-1/2 w-full items-center justify-center">
            <span>Sophie Milman </span>
            <!-- <span
              v-for="(item, index) in store.playList[store.currentIndex].ar"
              :key="index"
              >{{ item.name }}
            </span> -->
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="flex h-full w-6/12 items-center justify-center">
        <div class="hidden">
          <audio controls ref="audio" @timeupdate="updata()"></audio>
        </div>
        <div class="flex h-2/3 w-6/12 items-center justify-between">
          <div
            class="flex h-full items-center justify-center"
            @click="switchSongs(true)"
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
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </div>
          <div class="flex h-full items-center justify-center">
            <span v-if="!audioState" @click="prev()">
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
                  d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <span v-else @click="prev()">
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
                  d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"
                />
              </svg>
            </span>
          </div>
          <div
            class="flex h-full items-center justify-center"
            @click="switchSongs(false)"
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="flex h-full w-2/12">
        <div class="flex w-24 items-center text-center">
          <span>
            {{ formatDate(Playprogress) + "/" + formatDate(max) }}
          </span>
        </div>
        <div class="m-6 flex items-center">
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
    </div>
  </div>
</template>

<script setup>
// import yy from "@/assets/music/123.mp3";

const store = useStore();
// console.log(store.playList);
// console.log(store.currentIndex);
// console.log(store.playList[store.currentIndex].url);

// 当前播放歌曲时间
const Playprogress = ref(0);
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
const input = (val) => {
  audio.value.currentTime = val;
  // 取最后一次的值
};
onMounted(() => {
  // audio.value.src = store.playList[store.currentIndex].url.replace(
  //   "http",
  //   "https",
  // );
  audio.value.src = store.hasPlayList
    ? store.playList[store.currentIndex].url.replace("http", "https")
    : "";
  // audio.value.play();
});
const audio = ref(null);
const audioState = ref(false);
const prev = () => {
  audioState.value = !audioState.value;
  if (audioState.value) {
    audio.value.play();
  } else {
    audio.value.pause();
  }
};
// 当前播放的时间节点
const updata = () => {
  Playprogress.value = audio.value.currentTime;
};
const switchSongs = (flag) => {
  if (flag) {
    if (store.currentIndex <= 0) {
      store.currentIndex = 0;
    } else {
      store.currentIndex--;
    }
  } else {
    if (store.currentIndex >= store.playList.length - 1) {
      store.currentIndex = store.playList.length - 1;
    } else {
      store.currentIndex++;
    }
  }
  audioState.value = true;
  audio.value.play();
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
