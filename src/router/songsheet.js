import layout from "@/views/layout/index.vue";
const route = {
  path: "/songsheet",
  component: layout,
  redirect: "/songsheet/index",
  meta: { title: "songsheet", group: "musiclibrary" },
  children: [
    {
      path: "/songsheet/index",
      name: "songsheetindex",
      meta: { title: "songsheetindex" },
      component: () => import("@/views/songsheet/index.vue"),
    },
    {
      path: "/songsheet/detail",
      name: "songsheetidetail",
      meta: { title: "songsheetdetail" },
      component: () => import("@/views/songsheet/detail/index.vue"),
    },
  ],
};
export default route;
