<template>
  <div>
    <div v-for="(item, index) in obj" :key="index">
      {{ index }}
      <div v-for="(item2, index2) in item" :key="index2">
        {{ item2 }}
      </div>
    </div>
  </div>
</template>

<script setup>
const obj = {
  b: [
    {
      path: "/",
      meta: {
        title: "songsheet",
        grouping: 0,
      },
    },
    {
      path: "/mv2",
      meta: {
        title: "mv2",
        grouping: 0,
      },
    },
  ],
  a: [
    {
      path: "/mv",
      meta: {
        title: "mv",
        grouping: 1,
      },
    },
    {
      path: "/mv3",
      meta: {
        title: "mv3",
        grouping: 1,
      },
    },
  ],
};
// console.log(obj);
</script>

<style lang="scss" scoped></style>
