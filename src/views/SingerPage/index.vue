<template>
  <div class="bigbox">
    <!-- 歌手页面 -->
    <!-- 分类导航栏 -->
    <div class="classify_box">
      <!-- {{ list }} -->
      <!-- 图片     -->
      <img :src="imgS" alt="" />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSingerA } from "@/api/getSinger";
export default {
  setup() {
    const list = ref([]);
    const imgS = ref("");
    const getList = () => {
      getSingerA({ limit: 50 }).then((res) => {
        // list.value = res.data;
        // imgS.value = list.value.artists[1].img1v1Url.replace("http", "https");
        // imgS.require(list.value.artists[1].img1v1Url);
        // console.log(imgS.value);
        if (res.data.code === 200) {
          list.value = res.data.artists;
          imgS.value = list.value[1].img1v1Url.replace("http", "https");
        }
      });
    };
    onMounted(() => {
      getList();
    });
    return {
      list,
    };
  },
};
</script>

<style lang="scss" scoped>
.bigbox {
  width: 100%;
  height: 100%;
}
.classify_box {
  width: 100%;
  height: 30%;
  outline: 1px solid red;
}
</style>
