<template>
  <el-carousel>
    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
      <el-image :src="item.imageUrl" fit="fill"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { homeBanner } from "@/api/common/homePage";
// 轮播图
const bannerList = ref([]);
const getBanner = () => {
  homeBanner().then((res) => {
    if (res.data.code === 200) {
      bannerList.value = res.data.banners.map((item) => {
        item.imageUrl = item.imageUrl.replace("http", "https");
        return item;
      });
    }
  });
};
onMounted(() => {
  getBanner();
});
</script>

<style lang="scss" scoped>
.el-carousel {
  height: 300px;
  width: 60%;
  margin: auto;
  .el-carousel__item {
    height: 100%;
    width: 100%;
  }
  .el-image {
    height: 100%;
    width: 100%;
  }
}
</style>
