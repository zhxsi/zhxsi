<template>
  <div class="drawer">
    <el-drawer
      :model-value="props.lyricsDrawerstate"
      direction="btt"
      size="100%"
      :before-close="hideDrawer"
    >
      <template #default>
        <el-scrollbar>
          <div class="flex h-full w-full overflow-auto text-center outline">
            <p style="white-space: pre-wrap" v-html="lyric.lrc.lyric"></p>
            <!-- <div class="h-full w-1/2">{{ lyric.lrc.lyric }}</div> -->
            <!-- <div class="h-full w-1/2">2</div> -->
          </div></el-scrollbar
        >
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
const props = defineProps({
  lyricsDrawerstate: Boolean,
  lyric: Object,
});
// 进入组件

const emit = defineEmits(["hideDrawer"]);
const hideDrawer = () => {
  emit("hideDrawer");
};
</script>
<style lang="scss" scoped>
.drawer:deep(.el-drawer) {
  position: relative;
  .el-drawer__header {
    z-index: 1;
  }
  .el-drawer__body {
    position: absolute;
    height: 100vh;
    width: 100vw;
  }
}
</style>
