import { defineStore } from "pinia";
export const useStore = defineStore("main", {
  state: () => {
    return {
      user: null,
      img: "https://store.zhxsi.link/动漫/IMG_20230322_220929.jpg",
      // 当前侧边栏索引
      activeIndex: "0",
      // 当前播放列表
      playList: [],
      // 当前播放歌曲索引
      currentIndex: 0,
      // 播放顺序，0为列表循环，1为单曲循环，2为随机播放
      mode: 0,
      // 是否播放
      playing: false,
    };
  },
  getters: {
    // 判断是游客还是登录用户
    account: (state) => {
      if (state.user !== null) {
        return state.user.account !== undefined;
      }
    },
    // 获取用户id
    userId: (state) => {
      if (state.user !== null) {
        return state.user.account.id;
      }
    },
    ids: (state) => {
      return state.id;
    },
    // 判断是否有播放列表
    hasPlayList: (state) => {
      return state.playList.length !== 0;
    },
  },
  // 定义修改state的函数，函数第一个参数是state
  actions: {
    // 设置与清除用户信息
    setUser(user) {
      this.user = user;
    },
    // 刷新cookie
    getCookie(cookie) {
      this.user.cookie = cookie;
    },
  },
  persist: true,
});
