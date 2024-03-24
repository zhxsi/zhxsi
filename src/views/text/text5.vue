<template>
  <div class="main-container -my-4 w-full gap-5 overflow-auto py-4 sm:gap-8">
    <div class="flex">
      <div
        v-for="i in 36"
        :key="i"
        :class="{ '-rotate-2': i % 2 === 0, 'rotate-2': i % 2 !== 0 }"
        class="sm:w-63 relative m-1 aspect-[10/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:rounded-2xl"
      >
        <img alt="" :src="url" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>

<script setup>
const url =
  "https://spotlight.tailwindui.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-4.5c6d0ed6.jpg&w=384&q=75";
</script>

<style lang="scss" scoped>
.main-container {
  &:hover {
    // 过度

    &::-webkit-scrollbar {
      display: block;
      opacity: 1;
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
    height: 8px;
    opacity: 0;
  }

  // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
  &::-webkit-scrollbar-button {
    display: none;
  }

  // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
  &::-webkit-scrollbar-thumb {
    background: rgba(144, 147, 153, 0.3);
    cursor: pointer;
    border-radius: 4px;
  }

  // 边角，即两个滚动条的交汇处
  &::-webkit-scrollbar-corner {
    display: none;
  }

  // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
  &::-webkit-resizer {
    display: none;
  }
  // 隐藏
}
</style>
