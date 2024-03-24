<template>
  <div class="h-[80vh] px-4 sm:px-6 lg:px-8">
    <div class="h-[20%] sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          {{ obj.name }}
        </h1>
        <p class="mt-2 text-sm text-gray-700">
          {{ obj.description }}
        </p>
      </div>
      <!-- <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">123</div> -->
    </div>
    <div class="flow-root h-[80%]">
      <div class="-mx-4 -my-2 h-[65vh] overflow-x-auto sm:-mx-6 lg:-mx-8">
        <el-scrollbar ref="scrollbar" v-loading="loading">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(item, index) in obj.tracks" :key="item.id">
                  <td
                    class="whitespace-nowrap py-5 pl-4 pr-3 text-center text-sm sm:pl-0"
                  >
                    {{ index + 1 }}
                  </td>
                  <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                      <div class="h-11 w-11 flex-shrink-0">
                        <!-- <img
                          class="h-11 w-11 rounded-full"
                          :src="item.al.picUrl"
                          alt=""
                        /> -->
                      </div>
                      <div class="ml-4">
                        <div class="font-medium text-gray-900">
                          {{ item.name }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {{ originCoverType(item.originCoverType) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    {{ dt(item.dt) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      @click="ck(item)"
                      class="h-6 w-6 cursor-pointer"
                      :class="[item.aa ? '' : 'fill-red-500 stroke-none']"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </td>
                  <!--  -->
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      data-v-ea893728=""
                      class="h-6 w-6 cursor-pointer"
                      @click="cll(item)"
                    >
                      <path
                        fill="currentColor"
                        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768m-48-247.616L668.608 512 464 375.616zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z"
                      ></path>
                    </svg>
                  </td>
                  <!--  -->
                  <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      data-v-ea893728=""
                      class="h-6 w-6 cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                      ></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { playlistDetail } from "@/api/songsheet";
import { getSongDetail, getSongUrl } from "@/api/lyrics";
const obj = ref({});
// 接收路由参数
const route = useRoute();
onMounted(async () => {
  loading.value = true;
  playlistDetail({ id: route.query.id }).then((res) => {
    if (res.data.code === 200) {
      res.data.playlist.tracks.forEach((item, index) => {
        if (index / 2 === 0) {
          item.aa = true;
        }
      });
      getSongDetail({
        ids: res.data.playlist.trackIds.map((item) => item.id).join(","),
      }).then((res1) => {
        if (res1.data.code === 200) {
          res.data.playlist.tracks = [];
          res.data.playlist.tracks = res1.data.songs;
          obj.value = res.data.playlist;
          // console.log(" obj.value:", obj.value);
        }
        loading.value = false;
      });
    }
  });
});
const options = ref({
  title: "Hello, world from VueUse!",
  dir: "auto",
  lang: "en",
  renotify: true,
  tag: "test",
});
const loading = ref(false);
// 触底
// const scrollbar = ref(null);
// const handleScroll = (e) => {
//   const wrapRef = scrollbar.value.wrapRef; // 获取滚动条的dom
//   scrollbar.value.moveY = (wrapRef.scrollTop * 100) / wrapRef.clientHeight; // 计算滚动条的移动距离
//   scrollbar.value.moveX = (wrapRef.scrollLeft * 100) / wrapRef.clientWidth; // 计算滚动条的移动距离
//   const poor = wrapRef.scrollHeight - wrapRef.clientHeight; // 获取滚动条的高度
//   if (e.scrollTop + 2 >= poor) {
//     loading.value = true;
//     loading.value = false;
//   }
// };
const store = useStore();
const { show } = useWebNotification(options.value);
const ck = (item) => {
  store.id = item.id;
  // console.log("item:", store.id);
  item.aa = !item.aa;
  options.value.title = item.name;
  show();
};
const list = ref([]);
const cll = (item) => {
  list.value.push(item);
  getSongUrl({ id: list.value.map((item) => item.id).join(",") }).then(
    (res) => {
      if (res.data.code === 200) {
        res.data.data.forEach((item) => {
          list.value.forEach((item1) => {
            if (item1.id === item.id) {
              item1.url = item.url;
            }
          });
        });
        store.playList = list.value;
        console.log("store.playList:", store.playList);
      }
    },
  );
};
const dt = computed(() => {
  return (time) => {
    if (time === null || time === undefined || time === "") {
      return "";
    }
    const date = new Date(time);
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${m}:${s}`;
  };
});
const originCoverType = computed(() => {
  return (type) => {
    if (type === null || type === undefined || type === "") {
      return "";
    }
    const obj = {
      0: "未知",
      1: "原曲",
      2: "翻唱",
    };
    return obj[type];
  };
});
</script>
