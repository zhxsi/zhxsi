// 歌手页面 路由配置
import layout from "@/views/layout/index.vue";
const route = {
  path: "/SingerPage",
  component: layout,
  redirect: "/SingerPage/index",
  meta: { title: "SingerPage", group: "musiclibrary" },
  children: [
    {
      path: "/SingerPage/index",
      name: "SingerPage",
      meta: { title: "SingerPage" },
      component: () => import("@/views/SingerPage/index.vue"),
    },
  ],
};
export default route;
