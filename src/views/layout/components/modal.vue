<template>
  <div
    v-if="props.modalVisible"
    class="overflow-auto whitespace-pre-wrap rounded-lg bg-slate-100 duration-500"
    :class="[
      !isEmptyObject(obj) && props.search != '' ? 'h-96 p-4' : 'h-0 p-0',
    ]"
    style=""
  >
    <el-scrollbar>
      <div class="px-4 sm:px-0" v-for="(item, index) in obj" :key="index">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          {{ capitalize(index) }}
        </h3>
        <div
          class="cursor-pointer border-t border-gray-100 hover:bg-gray-50"
          @click="ck(item1, index)"
          v-for="(item1, index1) in item"
          :key="index1"
        >
          <dl class="divide-y divide-gray-100">
            <div class="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt class="text-sm font-medium leading-6 text-gray-900">
                {{ item1.name }}
              </dt>
              <dd class="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span v-for="(item2, index2) in item1.artists" :key="index2">
                  <span
                    >{{ item2.name
                    }}{{
                      index2 === item1.artists.length - 1 ? "" : "&nbsp;"
                    }}</span
                  >
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { searchsuggest } from "@/api/search";
const props = defineProps({
  modalVisible: Boolean,
  search: String,
});
const obj = ref({});
// 判断是否为空对象
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};
// 计算属性
const capitalize = computed(() => {
  return (str) => {
    const obj = {
      songs: "歌曲",
      artists: "歌手",
      albums: "专辑",
    };
    return obj[str];
  };
});
// 防抖
watchDebounced(
  () => [props.search],
  ([newVal, oldVal]) => {
    if (newVal !== oldVal) {
      searchsuggest({ keywords: props.search }).then((res) => {
        if (res.data.code === 200) {
          if (!isEmptyObject(res.data.result)) {
            obj.value = sort(res.data.result, res.data.result.order);
          } else {
            obj.value = {};
          }
        } else {
          obj.value = {};
        }
      });
    }
  },
  {
    debounce: 300, // 这里设置防抖时间
    // maxWait: 1000, // 这里设置最大等待时间
  },
);
const sort = (obj, order) => {
  const result = {};
  order.forEach((item) => {
    for (const i in obj) {
      if (i === item) {
        result[i] = obj[i];
      }
    }
  });
  return result;
};
// const emit = defineEmits(["hideDialog"]);
// const route = useRouter();
const ck = (item, index) => {
  console.log("index:", index);
  console.log("item:", item);
  // route.push({ path: "/songsheet/detail", query: { id: item.id } });
  // emit("hideDialog");
};
</script>

<style lang="scss" scoped></style>
