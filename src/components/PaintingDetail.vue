<template>
  <article class="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
    <div class="order-2 lg:order-1">
      <RouterLink class="text-sm font-semibold text-stone-500 hover:text-stone-950" to="/gallery">
        返回画廊
      </RouterLink>
      <p class="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">{{ painting.artist }}</p>
      <h1 class="mt-4 font-serif text-5xl font-bold leading-tight text-stone-950 md:text-7xl">
        {{ painting.title }}
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">{{ painting.description }}</p>

      <dl class="mt-8 grid gap-4 text-sm sm:grid-cols-2">
        <div class="rounded-2xl border border-stone-200 bg-white/70 p-4">
          <dt class="text-stone-500">Year</dt>
          <dd class="mt-1 font-semibold text-stone-950">{{ painting.year }}</dd>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-white/70 p-4">
          <dt class="text-stone-500">Medium</dt>
          <dd class="mt-1 font-semibold text-stone-950">{{ painting.medium }}</dd>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-white/70 p-4 sm:col-span-2">
          <dt class="text-stone-500">Collection</dt>
          <dd class="mt-1 font-semibold text-stone-950">{{ painting.origin }}</dd>
        </div>
      </dl>

      <div class="mt-8 flex gap-3">
        <span
          v-for="color in painting.palette"
          :key="color"
          class="h-10 w-10 rounded-full border border-stone-200"
          :style="{ backgroundColor: color }"
        ></span>
      </div>
    </div>

    <figure class="order-1 rounded-[2rem] bg-white p-4 shadow-2xl shadow-stone-300 lg:order-2">
      <img class="max-h-[680px] w-full rounded-[1.4rem] object-cover" :src="painting.image" :alt="painting.title" />
    </figure>
  </article>
</template>

<script setup lang="ts">
import starryNight from "@/assets/images/paintings/starry-night.jpg";
import girlWithPearlEarring from "@/assets/images/paintings/girl-with-pearl-earring.jpg";
import greatWave from "@/assets/images/paintings/great-wave.jpg";
import waterLilies from "@/assets/images/paintings/water-lilies.jpg";

type PaintingSlug = "starry-night" | "girl-with-pearl-earring" | "great-wave" | "water-lilies";

const props = defineProps<{
  slug: PaintingSlug;
}>();

const paintingBySlug = {
  "starry-night": {
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    origin: "Museum of Modern Art, New York",
    medium: "Oil on canvas",
    image: starryNight,
    palette: ["#172554", "#facc15", "#0f766e"],
    description: "旋转的夜空、明亮的星体和宁静村庄形成强烈对比，是后印象派最具辨识度的画面之一。"
  },
  "girl-with-pearl-earring": {
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "c. 1665",
    origin: "Mauritshuis, The Hague",
    medium: "Oil on canvas",
    image: girlWithPearlEarring,
    palette: ["#111827", "#1d4ed8", "#f8fafc"],
    description: "人物转身回望，光线集中在面庞与珍珠耳饰上，画面克制却充满亲密感。"
  },
  "great-wave": {
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "1831",
    origin: "Thirty-six Views of Mount Fuji",
    medium: "Woodblock print",
    image: greatWave,
    palette: ["#0f4c81", "#e0f2fe", "#334155"],
    description: "巨浪以几乎图案化的方式压向舟船，远处的富士山让画面在动势中保持稳定。"
  },
  "water-lilies": {
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1919",
    origin: "Metropolitan Museum of Art",
    medium: "Oil on canvas",
    image: waterLilies,
    palette: ["#31572c", "#90a955", "#cad2c5"],
    description: "莫奈以水面反光和睡莲色块构成柔和空间，边界被光线和笔触慢慢溶解。"
  }
};

const painting = paintingBySlug[props.slug];
</script>
