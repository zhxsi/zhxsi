<template>
  <Transition>
    <div v-show="props.songListstate" class="h-60 rounded bg-slate-300 p-2">
      <el-scrollbar>
        <div
          v-for="(item, index) in store.hasPlayList ? store.playList : []"
          :key="index"
        >
          <span
            :class="{
              'text-slate-500': index === store.currentIndex,
            }"
            class="cursor-pointer"
            @click="changeSong(index)"
          >
            {{ item.name }}
          </span>
        </div>
      </el-scrollbar>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  songListstate: Boolean,
});
const store = useStore();
console.log("store:", store.playList);
// 切换歌曲
const changeSong = (index) => {
  store.currentIndex = index;
};
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
}
</style>
