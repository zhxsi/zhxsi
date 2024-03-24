<template>
  <div>{{ obj }}</div>
  <div @click="obj.b++">{{ obj.b }}</div>
  {{ objcopy }}
</template>

<script setup>
const obj = reactive({
  formatted: useDateFormat(useNow(), "YYYY-MM-DD HH:mm:ss"),
  b: 0,
});
const objcopy = useCloned(obj);
</script>

<style lang="scss" scoped></style>
