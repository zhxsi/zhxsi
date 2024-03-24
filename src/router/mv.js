import layout from "@/views/layout/index.vue";
const route = {
  path: "/mv",
  component: layout,
  redirect: "/mv/index",
  meta: { title: "mv", group: "musiclibrary" },
  children: [
    {
      path: "/mv/index",
      name: "mv",
      meta: { title: "mv" },
      component: () => import("@/views/mv/index.vue"),
    },
  ],
};
export default route;
