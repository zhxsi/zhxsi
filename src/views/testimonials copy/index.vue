<template>
  <div
    class="divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0"
  >
    <div
      v-for="(item, index) in list"
      :key="item.id"
      @click="
        () =>
          $router.push({ path: '/songsheet/detail', query: { id: item.id } })
      "
      :class="[
        index === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
        index === 1 ? 'sm:rounded-tr-lg' : '',
        index === item.length - 2 ? 'sm:rounded-bl-lg' : '',
        index === item.length - 1
          ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
          : '',
        'group relative m-3 flex cursor-pointer rounded-lg bg-gray-100 p-6 hover:bg-gray-200',
      ]"
    >
      <div class="flex w-1/3 items-center justify-center">
        <div class="w-1/2">
          <img
            :src="item.coverImgUrl"
            alt=""
            width="100%"
            height="100%"
            class="rounded-lg"
          />
        </div>
      </div>
      <div class="w-2/3">
        <p class="mt-2 text-sm text-gray-500">
          {{ item.description }}
        </p>
        <p class="mt-2 text-sm text-gray-500">
          {{ item.updateFrequency }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toplist } from "@/api/songsheet";
const list = ref([]);
onMounted(() => {
  toplist().then((res) => {
    if (res.data.code === 200) {
      list.value = res.data.list;
      // console.log("list.value:", list.value);
    }
  });
});
</script>
