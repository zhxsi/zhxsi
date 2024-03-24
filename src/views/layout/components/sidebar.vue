<template>
  <div>
    <!-- 小尺寸时显示的侧边栏 -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="cloture">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-56 flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute left-full top-0 flex w-16 justify-center pt-5"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <img
                    class="h-full w-full"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li v-for="(item, index) in obj" :key="index">
                      <ul role="list" class="-mx-2 space-y-1">
                        <div
                          class="text-xs font-semibold leading-6 text-indigo-200"
                        >
                          {{ $t(index) }}
                        </div>
                        <li v-for="(item1, index1) in item" :key="index1">
                          <router-link
                            :to="item1.path"
                            :class="[
                              current === item1.meta.title
                                ? 'bg-indigo-700 text-white  dark:bg-gray-800 dark:text-white'
                                : 'text-indigo-200 hover:bg-indigo-700 hover:text-white dark:hover:bg-gray-800',
                              'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                            ]"
                            class="justify-center"
                          >
                            <component
                              :is="item1.meta.icon"
                              :class="[
                                item.current
                                  ? 'text-white'
                                  : 'text-indigo-200 group-hover:text-white',
                                'h-6 w-6 shrink-0',
                              ]"
                              aria-hidden="true"
                            />
                            {{ $t(item1.meta.title) }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a
                        href="/404"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                      >
                        <Cog6ToothIcon
                          class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                          aria-hidden="true"
                        />
                        404
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- 正常尺寸时显示的侧边栏 -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-48 lg:flex-col"
    >
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-4 dark:bg-gray-900"
      >
        <div
          class="flex h-16 shrink-0 cursor-pointer items-center"
          @click="router.push('/')"
        >
          <img
            class="h-full w-full"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li v-for="(item, index) in obj" :key="index">
              <ul role="list" class="-mx-2 space-y-1">
                <div class="text-xs font-semibold leading-6 text-indigo-200">
                  {{ $t(index) }}
                </div>
                <li v-for="(item1, index1) in item" :key="index1">
                  <router-link
                    :to="item1.path"
                    :class="[
                      current === item1.meta.title
                        ? 'bg-indigo-700 text-white  dark:bg-gray-800 dark:text-white'
                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white dark:hover:bg-gray-800',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    ]"
                    class="justify-center"
                  >
                    <component
                      :is="item1.meta.icon"
                      :class="[
                        item.current
                          ? 'text-white'
                          : 'text-indigo-200 group-hover:text-white',
                        'h-6 w-6 shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ $t(item1.meta.title) }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <a
                href="/404"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
              >
                <Cog6ToothIcon
                  class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                  aria-hidden="true"
                />
                404
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { Cog6ToothIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import bus from "@/utils/bus";
// 获取当前路由
const router = useRouter();
const obj = ref({});
const current = ref("");
const getNavigation = (children, title) => {
  const group = ref({});
  children.forEach((item) => {
    if (
      item.path !== "/" &&
      item.path !== "/404" &&
      item.redirect !== undefined
    ) {
      if (item.meta.group) {
        if (!obj.value[item.meta.group]) {
          obj.value[item.meta.group] = [];
        }
        group.value[item.meta.group].push(item);
      }
    }
    obj.value = group.value;
  });
  current.value = title;
};
// 初始化获取路由
onMounted(() => {
  getNavigation(router.getRoutes(), router.currentRoute.value.meta.title);
});
// 路由跨组件切换时重新获取路由
onBeforeRouteLeave((to, from) => {
  getNavigation(router.getRoutes(), to.meta.title);
});
// 路由同组件切换时重新获取路由
onBeforeRouteUpdate((to, from) => {
  getNavigation(router.getRoutes(), to.meta.title);
});

// 路由变化时重新获取路由,用onBeforeRouteUpdate钩子

const sidebarOpen = ref(false);
bus.on("show", (val) => {
  sidebarOpen.value = val;
});
const cloture = () => {
  sidebarOpen.value = false;
  bus.emit("cloture");
};
</script>

<style lang="scss" scoped></style>
