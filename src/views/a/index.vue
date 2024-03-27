<template>
  <div>{{ lyric }}</div>
</template>

<script setup>
import { getLyric } from "@/api/lyrics";

const id = ref(190352);
const lyric = ref(null);
onMounted(() => {
  getLyric({ id: id.value }).then((res) => {
    if (res.data.code === 200) {
      lyric.value = parseLrc(res.data.yrc.lyric);
      console.log("lyric.value:", lyric.value);
    }
  });
});
// 解析逐行歌词
function parseLrc(lrc) {
  const lines = lrc.split("\n");
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const str = lines[i];
    if (str.includes("{")) {
      result.push(JSON.parse(str));
    } else {
      const parts = str.split("]");
      if (parts.length > 1) {
        const time = parts[0].split("[")[1];
        const words = parseLrcWord(parts[1]);
        result.push({ time, words });
      }
    }
  }
  return result;
}
// 解析逐字歌词
const parseLrcWord = (lrc) => {
  const words = lrc.split("(");
  const result = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word) {
      const parts = word.split(")");
      if (parts.length > 1) {
        const time = parts[0];
        const duration = parts[1];
        result.push({ time, duration });
      }
    }
  }
  return result;
};
</script>

<style lang="scss" scoped></style>
