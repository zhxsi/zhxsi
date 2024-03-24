<template>
  <el-scrollbar
    @scroll="handleScroll"
    class="px-4 sm:px-6 lg:px-8"
    ref="scrollbar"
    v-loading="loading"
  >
    <ul
      role="list"
      class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      <li
        v-for="person in list"
        :key="person.id"
        class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow dark:bg-gray-800"
      >
        <div
          class="flex flex-1 cursor-pointer flex-col p-8"
          @click="
            router.push({ path: '/songsheet/detail', query: { id: person.id } })
          "
        >
          <img
            class="mx-auto h-32 w-32 flex-shrink-0 rounded-lg"
            :src="person.coverImgUrl"
            alt=""
          />
          <h3
            class="mt-6 text-left text-sm font-medium text-gray-900 dark:text-gray-200"
          >
            {{ person.name }}
          </h3>
        </div>
      </li>
    </ul>
    <div class="p-6 text-center text-gray-500 dark:text-gray-400">
      <span class="mt-4" v-if="!more"> 没有更多了</span>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { topPlaylist } from "@/api/songsheet";
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getCatList();
});
// 路由进入时获取分类歌单
onBeforeRouteLeave((to, from) => {
  if (to.query.cat !== from.query.cat) {
    getCatList();
  }
});
onBeforeRouteUpdate((to, from) => {
  if (to.query.cat !== from.query.cat) {
    getCatList();
  }
});
// 获取分类歌单
const loading = ref(false);
// 配置
const options = ref({
  offset: 1, // 控制分页
  limit: 36, // 每页显示的数量
  cat: route.query.cat,
});
const list = ref([]);
const more = ref(false);
const getCatList = (cat) => {
  loading.value = true;
  topPlaylist(options.value).then((res) => {
    if (res.data.code === 200) {
      res.data.playlists.forEach((item) => {
        item.coverImgUrl = item.coverImgUrl.replace("http:", "https:");
      });
      list.value.push(...res.data.playlists);
      more.value = res.data.more;
    }
    loading.value = false;
  });
};
const scrollbar = ref(null);
const handleScroll = (e) => {
  const wrapRef = scrollbar.value.wrapRef; // 获取滚动条的dom
  scrollbar.value.moveY = (wrapRef.scrollTop * 100) / wrapRef.clientHeight; // 计算滚动条的移动距离
  scrollbar.value.moveX = (wrapRef.scrollLeft * 100) / wrapRef.clientWidth; // 计算滚动条的移动距离
  const poor = wrapRef.scrollHeight - wrapRef.clientHeight; // 获取滚动条的高度
  if (e.scrollTop + 2 >= poor) {
    handleBottom();
  }
};
// 触底加载
const handleBottom = useThrottleFn(() => {
  if (!more.value) return;
  options.value.offset += 1;
  getCatList();
}, 1000);
</script>
