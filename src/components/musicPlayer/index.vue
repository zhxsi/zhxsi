<template>
  <div class="h-20 w-full">
    <div class="flex h-1/6 w-full items-center overflow-hidden">
      <el-slider
        :disabled="!store.hasPlayList"
        v-model="playprogress"
        :show-tooltip="false"
        class="!h-0"
        @input="input"
        :max="max"
      />
    </div>
    <div class="flex h-5/6 w-full">
      <!-- 左边 -->
      <div class="relative flex h-full w-3/12 overflow-hidden">
        <div class="absolute z-10 h-full w-1/2 bg-white">
          <el-image
            :src="
              store.hasPlayList ? store.playList[store.playIndex].al.picUrl : ''
            "
            class="float-right h-full"
            fit="fill"
          >
            <template #error>
              <div
                class="flex h-full w-[100px] items-center justify-center text-3xl text-slate-500"
              >
                <el-icon><i-ep-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="absolute right-0 h-full w-1/2" ref="songref">
          <div
            class="flex h-1/2 w-full items-center justify-center whitespace-nowrap"
          >
            <span>
              {{
                store.hasPlayList ? store.playList[store.playIndex].name : ""
              }}</span
            >
          </div>
          <div
            class="flex h-1/2 w-full items-center justify-center overflow-hidden whitespace-nowrap"
          >
            <span
              ref="singer"
              v-for="(item, index) in store.hasPlayList
                ? store.playList[store.playIndex].ar
                : []"
              :key="index"
              >{{ item.name }}
            </span>
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
      <div class="relative h-full w-3/12">
        <songList
          :songListstate="songListstate"
          @hideList="songListstate = false"
          class="absolute bottom-16 my-2 w-full transition-all duration-300"
        />
        <div class="flex h-full w-full">
          <div class="mx-3 my-6 w-24 text-center">
            <span>
              {{ formatDate(playprogress) + "/" + formatDate(max) }}
            </span>
          </div>
          <div class="mx-3 my-6 flex items-center" @click="showSongList">
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
  </div>
</template>

<script setup>
import gsap from "gsap";
const store = useStore();

// 当前播放歌曲时间
const playprogress = ref(0);
// 获取歌曲总时长,单位秒
const max = computed(() => {
  return store.playList.length !== 0
    ? store.playList[store.playIndex].dt / 1000
    : 0;
});
//  <div class="flex hidden w-24 items-center text-center">
//           <span>
//             {{ formatDate(Playprogress) + "/" + formatDate(max) }}
//           </span>
//         </div>
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
// 歌曲信息的滚动动画
const songref = ref(null);
const songinfo = ref(null);
const playAnimation = () => {
  songinfo.value = gsap.set(songref.value, { x: 180 });
  songinfo.value = gsap.to(songref.value, {
    x: -180,
    repeat: -1,
    duration: 10,
    ease: "linear",
  });
};

onMounted(() => {
  audio.value.src = store.hasPlayList
    ? store.playList[store.playIndex].url.replace("http", "https")
    : "";
  playAnimation();
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
  playprogress.value = audio.value.currentTime;
  console.log(" playprogress.value:", playprogress.value);
};
const switchSongs = (flag) => {
  if (flag) {
    if (store.playIndex <= 0) {
      store.playIndex = 0;
    } else {
      store.playIndex--;
      songinfo.value.restart();
    }
  } else {
    if (store.playIndex >= store.playList.length - 1) {
      store.playIndex = store.playList.length - 1;
    } else {
      store.playIndex++;
      songinfo.value.restart();
    }
  }
  // songinfo.value.play();

  audioState.value = true;
  // audio.value.play();
};
const songListstate = ref(false);
const showSongList = () => {
  songListstate.value = !songListstate.value;
  // 停止动画
  gsap.killTweensOf(songinfo.value);
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
