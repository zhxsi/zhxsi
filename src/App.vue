<template>
  <div class="min-h-screen bg-[#f8f2e8] text-stone-950">
    <header class="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <RouterLink class="font-serif text-2xl font-bold" to="/gallery">Quiet Gallery</RouterLink>
      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink class="nav-link" to="/gallery">Gallery</RouterLink>
        <RouterLink class="nav-link" to="/paintings/starry-night">Starry Night</RouterLink>
        <RouterLink class="nav-link" to="/paintings/great-wave">Great Wave</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
.nav-link {
  border-radius: 999px;
  padding: 8px 14px;
  color: rgb(87 83 78);
  font-size: 14px;
  font-weight: 600;
  transition: background-color 160ms ease, color 160ms ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: rgb(41 37 36);
  color: white;
}
</style>
