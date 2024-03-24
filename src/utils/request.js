import axios from "axios";
// import { Message } from 'element-ui'
// import store from '../store'
// import { getNewToken, setNewToken } from '@/utils/auth'
// import { getNewToken, removeNewToken, setNewToken } from '@/utils/auth'
// import { refreshToken } from '@/api/login'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // api的base_url
  timeout: 90000, // 请求超时时间
  cache: false,
  withCredentials: true,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    config.params = { ...config.params, timestamp: new Date().getTime() };
    return config;
  },
  (error) => {
    console.log(error); // for debug);
    // Message({ showClose: true, center: true, message: error.message, type: 'error', duration: 3 * 1000 })
    // Promise.reject(new Error('errorMsg'))
  },
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (
      res.code === 4001 ||
      res.code === 4002 ||
      res.code === 4003 ||
      res.code === 400 ||
      res.code === 11111 ||
      res.code === 50000
    ) {
      // 出错信息捕捉
      if (
        res.message !== "" &&
        res.message !== null &&
        res.message !== undefined
      ) {
        // Message({ showClose: true, center: true, message: res.message, type: 'error', duration: 3 * 1000 })
      }
      if (res.msg !== "" && res.msg !== null && res.msg !== undefined) {
        // Message({ showClose: true, center: true, message: res.msg, type: 'error', duration: 3 * 1000 })
      }
      // return Promise.reject(new Error('errorMsg'))
    }
    if (res.code === 11112) {
      // 出错信息捕捉
      // if (res.message !== '' && res.message !== null) {
      //   Message({ showClose: true, center: true, message: res.message, type: 'error', duration: 3 * 1000 })
      // }
      // refreshToken().then(res => {
      //   if (res.data.code === 10000) {
      //     console.log('token过期刷新token')
      //     setNewToken(res.data.data.token)
      //     console.log('重新发起请求')
      //     window.location.reload()
      //     this.$store.commit('SET_TOKEN', res.data.data.token)
      //   }
      // })
      // window.location.href = '#/login'
    }
    if (res.code === 11113) {
      if (
        res.message !== "" &&
        res.message !== null &&
        res.message !== undefined
      ) {
        // Message({ showClose: true, center: true, message: res.message, type: 'warning', duration: 3 * 1000 })
      }
      if (res.msg !== "" && res.msg !== null && res.msg !== undefined) {
        // Message({ showClose: true, center: true, message: res.msg, type: 'warning', duration: 3 * 1000 })
      }
    }
    if (res.code === 500) {
      // Message({ showClose: true, center: true, message: '服务器出差了，请稍等哦！', type: 'error', duration: 3 * 1000 })
      // return Promise.reject(new Error('errorMsg'))
    } else {
      return response;
    }
  },
  (error) => {
    if (error.response !== undefined) {
      const res = error.response.data || "";
      const status = error.response.status || "";
      if (status) {
        switch (status) {
          case 400:
            if (res.message !== "" && res.message !== null) {
              // Message({ showClose: true, center: true, message: res.message, type: 'error', duration: 3 * 1000 })
            } else {
              // Message({ showClose: true, center: true, message: '请求参数错误', type: 'error', duration: 3 * 1000 })
            }
            break;
          case 500:
            // Message({ showClose: true, center: true, message: '服务器出差了，请稍等哦！', type: 'error', duration: 3 * 1000 })
            break;
          case 401:
            // if (res.message !== '' && res.message !== null) {
            //   Message({ showClose: true, center: true, message: res.message, type: 'error', duration: 3 * 1000 })
            // }
            // refreshToken().then(res => {
            //   if (res.data.code === 10000) {
            //     console.log('token过期刷新token')
            //     setNewToken(res.data.data.token)
            //     console.log('重新发起请求')
            //     window.location.reload()
            //     this.$store.commit('SET_TOKEN', res.data.data.token)
            //   }
            // })
            break;
        }
      }
    } else {
      // Message({ showClose: true, center: true, message: '出错啦！', type: 'error', duration: 3 * 1000 })
    }

    return Promise.reject(error);
  },
);
export default service;
