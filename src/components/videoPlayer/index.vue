<template><video ref="videoPlayer" class="video-js" /></template>
<script setup>
import videojs from "video.js";
import "video.js/dist/video-js.css";
import ZHCN from "video.js/dist/lang/zh-CN.json";
videojs.addLanguage("zh-CN", ZHCN);
const videoPlayer = ref(null);
const myPlayer = ref(null);
// 接受父组件传递的参数
const props = defineProps({
  URL: String,
  cover: String,
});
// 初始化播放器
const initVideo = () => {
  myPlayer.value = videojs(
    videoPlayer.value,
    {
      language: "zh-CN",
      poster: props.cover, // poster属性指定视频封面
      controls: false, // controls属性指定是否使用浏览器自带的控制条
      autoplay: true, // autoplay属性指定视频是否自动播放
      muted: true, // muted属性指定是否静音播放
      loop: true, // loop属性指定是否循环播放
      fluid: true,
      playbackRates: [0.25, 0.5, 1, 1.5, 2], // playbackRates属性指定视频播放速度
      // sources属性指定视频源
      sources: [
        {
          src: props.URL,
          type: "video/mp4",
        },
      ],
      // controlBar属性指定控制条选项
      controlBar: {
        remainingTimeDisplay: {
          displayNegative: false,
        },
      },
    },
    () => {
      console.log("播放器初始化完成");
    },
  );
};
// 页面有更新时，重新渲染播放器
// onMounted是
onMounted(() => {
  initVideo();
});

onUnmounted(() => {
  if (myPlayer.value) {
    myPlayer.value.dispose();
    console.log("销毁播放器");
  }
});
// // 播放
// const play = () => {
//   setTimeout(() => {
//     myPlayer.value.muted(true)
//     myPlayer.value.play()
//   }, 3000)
// }
// // 暂停

// const pause = () => {
//   myPlayer.value.pause()
// }
// defineExpose({
//   play,
//   pause
// })
</script>

<style lang="scss" scoped></style>
