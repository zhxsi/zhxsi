<template>
  <div class="h-full w-full">
    <el-scrollbar>
      <div class="flex h-[20vh] w-full">
        <div class="flex h-full w-1/3 items-center justify-end p-2">
          <el-image
            class="aspect-square h-full"
            :src="obj.coverImgUrl"
          ></el-image>
        </div>
        <div class="h-full w-2/3 p-2">
          <div class="h-1/6 w-full text-ellipsis">
            <p>{{ obj.name }}</p>
          </div>
          <div class="h-5/6 w-full">
            <el-tooltip placement="bottom-start" trigger="click">
              <template #content>
                <p
                  v-html="obj.description"
                  class="max-w-7xl overflow-hidden whitespace-pre-line font-mono text-xs font-light not-italic antialiased"
                ></p>
              </template>
              <p
                class="line-clamp-[9] whitespace-pre-line font-mono text-xs font-light not-italic antialiased"
                v-html="obj.description"
              ></p>
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="p-10">
        <el-table :data="obj.tracks" style="width: 100%" :show-header="false">
          <el-table-column type="index" align="center"></el-table-column>
          <!--             min-width="50" -->
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <el-image
                  class="h-16 w-16 rounded-full"
                  :src="scope.row.al.picUrl"
                ></el-image>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <span> {{ scope.row.name }}</span>
                <span v-for="(item, index) in scope.row.alia" :key="index">
                  {{ `(${item})` }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <span v-for="(item, index) in scope.row.ar" :key="index">
                  {{ item.name }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <span>
                  {{ originCoverType(scope.row.originCoverType) }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <span>
                  {{ formatTimeToMinute(scope.row.dt) }}
                </span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center">
            <el-table-column align="center">
              <template #default="scope">
                <div class="flex w-full">
                  <div @click="playNow(scope.row)" class="w-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="mx-auto h-6 w-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                      />
                    </svg>
                  </div>
                  <div @click="addtoplaylist(scope.row)" class="w-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="mx-auto h-6 w-6 cursor-pointer"
                    >
                      >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                      />
                    </svg>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { playlistDetail } from "@/api/songsheet";
import { getSongDetail, getSongUrl } from "@/api/lyrics";
import { formatTimeToMinute } from "@/utils";
const store = useStore();
const route = useRoute();
onMounted(() => {
  getList();
});
const obj = ref({});
const getList = () => {
  playlistDetail({ id: route.query.id }).then((res) => {
    if (res.data.code === 200) {
      obj.value = res.data.playlist;
      delete res.data.playlist.tracks;
      getSongDetail({
        ids: res.data.playlist.trackIds.map((item) => item.id).join(","),
      }).then((res2) => {
        if (res2.data.code === 200) {
          obj.value.tracks = res2.data.songs;
        }
      });
    }
  });
};
// 计算属性,实现过滤
const originCoverType = computed(() => {
  return (value) => {
    const obj = {
      0: "未知",
      1: "原曲",
      2: "翻唱",
    };
    return obj[value];
  };
});

// 立即播放
const playNow = (item) => {
  getSongUrl({ id: item.id }).then((res) => {
    if (res.data.code === 200) {
      item.url = res.data.data[0].url;
      store.playNow(item);
    }
  });
};
// 添加到播放列表
const addtoplaylist = (item) => {
  getSongUrl({ id: item.id }).then((res) => {
    if (res.data.code === 200) {
      item.url = res.data.data[0].url;
      store.addPlayList(item);
    }
  });
};
</script>

<style lang="scss" scoped></style>
