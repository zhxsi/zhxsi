<template>
  <div>
    <button @click="increment">++</button>
    <div>{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
function increment() {
  count.value++
}

</script>

<style scoped></style>