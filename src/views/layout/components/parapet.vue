<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:bg-black sm:gap-x-6 sm:px-6 lg:px-8"
  >
    <!-- 页面宽度小于 lg 时，显示侧边栏按钮 -->
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
      @click="show"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <!-- 分隔线，同上 -->
    <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
    <!-- 页面宽度大于 lg 时，显示搜索框和用户信息 -->
    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <form class="relative flex flex-1 flex-wrap">
        <div class="float-right">
          <MagnifyingGlassIcon
            class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search-field"
          class="hidden h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0 sm:text-sm lg:block"
          placeholder="搜索..."
          type="search"
          name="search"
          v-model="search"
          @input="aa"
          @focus="bb(true)"
          @blur="bb(false)"
        />
        <div class="hidden w-full lg:block">
          <modal
            :modalVisible="modalVisible"
            @hideDialog="modalVisible = false"
            :search="search"
          />
        </div>
      </form>
      <!-- 消息通知 -->
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- 分隔线 -->
        <div
          class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        />

        <!-- 切换语言 -->
        <div class="text-sm">
          <select
            id="location"
            name="location"
            class="mt-2 hidden w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 outline-none ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 lg:block"
            v-model="lang"
            @change="changeLang($event)"
          >
            <option
              v-for="(item, index) in options"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
          <!-- <div>123</div> -->
        </div>
        <!-- 分隔线 -->
        <div
          class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        />
        <div class="text-sm">
          <el-switch v-model="isDark" @change="isDarkstate()" />
        </div>
        <!-- 分隔线 -->
        <div
          class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          aria-hidden="true"
        />
        <!-- 用户信息 -->
        <Menu as="div" class="relative" v-if="stores.account">
          <!-- MenuButton 为点击按钮，MenuItems 为下拉菜单 -->
          <MenuButton class="-m-1.5 flex items-center p-1.5">
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full bg-gray-50"
              :src="stores.account ? stores.user.profile.avatarUrl : ''"
              alt=""
            />
            <span class="hidden lg:flex lg:items-center">
              <span
                class="ml-4 text-sm font-semibold leading-6 text-gray-900"
                aria-hidden="true"
                >{{ stores.account ? stores.user.profile.nickname : "" }}</span
              >
              <ChevronDownIcon
                class="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </MenuButton>
          <!-- 用户信息下拉菜单 -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
            >
              <MenuItem
                v-for="item in userNavigation"
                :key="item.name"
                v-slot="{ active }"
              >
                <button
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block w-full px-4 py-2 text-left text-sm font-semibold text-gray-900',
                  ]"
                  @click="item.fn"
                >
                  {{ item.name }}
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
        <!-- 未登录时显示登录按钮 -->
        <!-- <router-link v-else class="cursor-pointer text-sm font-semibold text-gray-900">
          登录
        </router-link> -->
        <!-- <router-link
          v-else
          to="/login"
          class="cursor-pointer text-sm font-semibold text-gray-900"
        >
          登录
        </router-link> -->
        <el-button @click="dialogVisible = true" v-if="!stores.account">{{
          $t("login")
        }}</el-button>
      </div>
    </div>
    <login :dialogVisible="dialogVisible" @hideDialog="dialogVisible = false" />
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { Bars3Icon, BellIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import login from "@/components/login/index.vue";
import bus from "@/utils/bus";
import { logout } from "@/api/login";
import modal from "./modal.vue";
const stores = useStore();
const userNavigation = [
  {
    name: "您的个人资料",
    fn: () => {
      console.log(1);
    },
  },
  {
    name: "设置",
    fn: () => {
      console.log(2);
    },
  },
  {
    name: "登出",
    fn: () => {
      logout().then((res) => {
        console.log(res.data.code);
        if (res.data.code === 200) {
          stores.setUser(null);
          ElMessage.success("登出成功");
        }
      });
    },
  },
];
const lang = ref("zh-cn");
const options = [
  { value: "zh-cn", label: "简体中文" },
  { value: "en", label: "English" },
];
const sidebarOpen = ref(false);
const show = () => {
  sidebarOpen.value = true;
  bus.emit("show", sidebarOpen.value);
};
bus.on("cloture", (data) => {
  sidebarOpen.value = data;
});
const dialogVisible = ref(false);
const search = ref("");
const aa = (e) => {
  if (e.target.value.length > 100) {
    e.target.value = e.target.value.slice(0, 100);
  }
};
const changeLanguage = inject("changeLanguage");
const changeLang = (e) => {
  console.log("changeLang", e.target.value);
  changeLanguage(e.target.value);
};
const modalVisible = ref(false);
const bb = (e) => {
  if (e) {
    modalVisible.value = true;
    // console.log("ModalVisible.value:", modalVisible.value);
  }
  // else {
  //   modalVisible.value = false;
  //   // console.log("ModalVisible.value:", modalVisible.value);
  // }
};
const isDark = useDark();
const isDarkstate = () => {
  useToggle(isDark);
};
</script>

<style lang="scss" scoped></style>
