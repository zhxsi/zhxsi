<template>
  <el-scrollbar class="relative flex-1 bg-slate-500">
    <div class="absolute flex h-1/4 w-full bg-orange-200">
      <div class="flex h-full w-1/3 items-center justify-end bg-slate-400 p-2">
        <el-image
          class="aspect-square h-full"
          :src="obj.coverImgUrl"
        ></el-image>
      </div>
      <div class="h-full w-2/3 p-2">
        <div class="h-1/6 w-full text-ellipsis">
          <p>{{ obj.name }}</p>
        </div>
        <div class="aa h-5/6 w-full">
          <!-- truncate text-ellipsis -->
          <el-tooltip placement="bottom" raw-content :content="obj.description">
            <span
              class="whitespace-pre font-mono text-xs font-light not-italic antialiased"
              v-html="obj.description"
            ></span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- <div class="absolute bottom-0 h-3/4 w-full bg-orange-400">2</div> -->
  </el-scrollbar>
</template>

<script setup>
import { playlistDetail } from "@/api/songsheet";
const route = useRoute();
onMounted(() => {
  getList();
});
const obj = ref({});
const getList = () => {
  playlistDetail({ id: route.query.id }).then((res) => {
    if (res.data.code === 200) {
      obj.value = res.data.playlist;
      console.log(1, obj.value);
    }
  });
};
</script>

<style lang="scss" scoped></style>
