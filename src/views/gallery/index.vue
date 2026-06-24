<template>
  <main class="mx-auto max-w-6xl px-6 pb-16 pt-8">
    <section class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-stone-500">Online Exhibition</p>
        <h1 class="mt-5 font-serif text-5xl font-bold leading-tight text-stone-950 md:text-7xl">
          四幅画的静默展厅
        </h1>
      </div>
      <p class="max-w-2xl text-lg leading-8 text-stone-600">
        这里不是产品介绍页，而是一个围绕真实画作图片构建的展示 demo。每张作品都有独立路由，图片已下载到本地 assets 目录中引用。
      </p>
    </section>

    <section class="mt-12 grid gap-6 md:grid-cols-2">
      <RouterLink
        v-for="painting in paintings"
        :key="painting.slug"
        class="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-xl shadow-stone-200 transition duration-200 hover:-translate-y-1 hover:shadow-2xl"
        :to="`/paintings/${painting.slug}`"
      >
        <img class="h-[420px] w-full rounded-[1.4rem] object-cover" :src="painting.image" :alt="painting.title" />
        <div class="flex items-end justify-between gap-4 p-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">{{ painting.artist }}</p>
            <h2 class="mt-2 font-serif text-3xl font-bold text-stone-950">{{ painting.title }}</h2>
          </div>
          <span class="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 group-hover:border-stone-950 group-hover:text-stone-950">
            View
          </span>
        </div>
      </RouterLink>
    </section>
  </main>
</template>

<script setup lang="ts">
import starryNight from "@/assets/images/paintings/starry-night.jpg";
import girlWithPearlEarring from "@/assets/images/paintings/girl-with-pearl-earring.jpg";
import greatWave from "@/assets/images/paintings/great-wave.jpg";
import waterLilies from "@/assets/images/paintings/water-lilies.jpg";

const paintings = [
  { slug: "starry-night", title: "The Starry Night", artist: "Vincent van Gogh", image: starryNight },
  { slug: "girl-with-pearl-earring", title: "Girl with a Pearl Earring", artist: "Johannes Vermeer", image: girlWithPearlEarring },
  { slug: "great-wave", title: "The Great Wave off Kanagawa", artist: "Katsushika Hokusai", image: greatWave },
  { slug: "water-lilies", title: "Water Lilies", artist: "Claude Monet", image: waterLilies }
];
</script>
