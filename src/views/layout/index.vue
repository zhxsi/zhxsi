<template>
  <div>
    <sidebar />
    <div class="flex h-screen flex-col items-center justify-between lg:pl-48">
      <header class="w-full"><parapet /></header>
      <main class="w-full flex-1 overflow-auto py-1">
        <router-view v-slot="{ Component }">
          <keep-alive :include="include">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </main>
      <footer class="w-full">
        <!-- <musicPlayer /> -->
      </footer>
    </div>
  </div>
</template>

<script setup name="layout">
import sidebar from "./components/sidebar.vue";
import parapet from "./components/parapet.vue";
// import musicPlayer from "@/components/musicPlayer/index.vue";
const router = useRoute();

// include处理方法
const include = ref([]);
const includeHandler = (e) => {
  include.value.push(e);
  include.value.forEach((item, index) => {
    if (include.value.indexOf(item) !== index) {
      include.value.splice(index, 1);
    }
  });
};
onBeforeRouteUpdate((to, from) => {
  includeHandler(router.name);
});
onBeforeRouteLeave((to, from) => {
  includeHandler(router.name);
});
</script>
