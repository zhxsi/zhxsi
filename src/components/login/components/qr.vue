<template>
  <div class="flex h-64 w-full items-center justify-center" v-loading="loading">
    <div>
      <img :src="qrImg" alt="" />
    </div>
  </div>
</template>

<script setup>
import { qrCodekey, qrcodeGeneration, qrCodeCheck } from "@/api/login";
const emit = defineEmits(["hideDialog"]);
const hideDialog = () => {
  emit("hideDialog");
};
const qrImg = ref(null);
const loading = ref(false);
const timer = ref(null);

onMounted(() => {
  loading.value = true;
  qrCodekey().then((res) => {
    if (res.data.code === 200) {
      qrcodeGeneration({ key: res.data.data.unikey, qrimg: true }).then((e) => {
        qrImg.value = e.data.data.qrimg;
        loading.value = false;
        // 使用requestAnimationFrame轮询
        timer.value = setInterval(() => {
          qrCodeCheck({ key: res.data.data.unikey }).then((res) => {
            if (res.data.code === 801) {
              loading.value = true;
              hideDialog();
              // console.log("res222:", res.data.message);
            }
          });
        }, 3000);
      });
    }
  });
});

// 组件销毁
onUnmounted(() => {
  loading.value = false;
  qrImg.value = null;
  clearInterval(timer.value);
});
</script>

<style lang="scss" scoped></style>
