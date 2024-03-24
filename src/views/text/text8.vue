<template>
  <div>
    <div v-for="(item, index) in obj" :key="index">
      <!-- 属性名 -->
      <div>
        <span>{{ index }}:</span>
        <!-- 属性值 -->
        <span v-for="(i, idx) in item" :key="idx">{{ i.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { searchmultimatch } from "@/api/search";
const obj = ref({});
onMounted(() => {
  // searchsuggest({ keywords: "海阔天空" }).then((res) => {
  //   if (res.data.code === 200) {
  //     obj.value = sort(res.data.result, res.data.result.order);
  //   }
  // });
  searchmultimatch({ keywords: "海阔天空" }).then((res) => {
    console.log("res:", res.data.result);
    if (res.data.code === 200) {
      obj.value = sort(res.data.result, res.data.result.orders);
    }
  });
});
// 排序
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
</script>

<style lang="scss" scoped></style>
