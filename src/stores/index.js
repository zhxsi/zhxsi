import { defineStore } from "pinia";
export const useStore = defineStore("main", {
  state: () => {
    return {
      user: null,
      // 当前侧边栏索引
      activeIndex: "0",
      // 当前播放列表
      playList: [],
      // 当前播放歌曲索引
      playIndex: null,
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
    // 立即播放
    playNow(list) {
      this.playList.push(list);
      this.playIndex = this.playList.length - 1;
    },
    // 添加到播放列表
    addPlayList(list) {
      this.playList.push(list);
    },
  },
  persist: true,
});
